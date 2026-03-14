import proj4 from 'proj4';
import { GeoJSON } from 'ol/format.js';
import OSM from 'ol/source/OSM.js';
import { Fill, Style } from 'ol/style.js';
import { Color, Vector3 } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

import ColorMap from '@giro3d/giro3d/core/ColorMap.js';
import ColorMapMode from '@giro3d/giro3d/core/ColorMapMode.js';
import CoordinateSystem from '@giro3d/giro3d/core/geographic/CoordinateSystem.js';
import Extent from '@giro3d/giro3d/core/geographic/Extent.js';
import Instance from '@giro3d/giro3d/core/Instance.js';
import BlendingMode from '@giro3d/giro3d/core/layer/BlendingMode.js';
import ColorLayer from '@giro3d/giro3d/core/layer/ColorLayer.js';
import ElevationLayer from '@giro3d/giro3d/core/layer/ElevationLayer.js';
import MaskLayer, { MaskMode } from '@giro3d/giro3d/core/layer/MaskLayer.js';
import Map from '@giro3d/giro3d/entities/Map.js';
import { MapLightingMode } from '@giro3d/giro3d/entities/MapLightingOptions.js';
import DrawTool, { conditions } from '@giro3d/giro3d/interactions/DrawTool.js';
import GeoTIFFSource from '@giro3d/giro3d/sources/GeoTIFFSource.js';
import TiledImageSource from '@giro3d/giro3d/sources/TiledImageSource.js';
import VectorSource from '@giro3d/giro3d/sources/VectorSource.js';

const PALETTE_STOPS = {
  turbo: ['#30123b', '#4145ab', '#469ee8', '#42d5bb', '#a3e146', '#f9c932', '#ef6a18', '#7a0403'],
  inferno: ['#000004', '#1b0c41', '#4a0c6b', '#781c6d', '#a52c60', '#cf4446', '#ed6925', '#fb9b06', '#f7d13d', '#fcffa4'],
};

function makeGradientFromStops(stops, shades = 256) {
  const colors = [];

  for (let i = 0; i < shades; i += 1) {
    const t = shades <= 1 ? 0 : i / (shades - 1);
    const scaled = t * (stops.length - 1);
    const idx = Math.floor(scaled);
    const localT = Math.min(1, scaled - idx);
    const c0 = new Color(stops[idx]);
    const c1 = new Color(stops[Math.min(stops.length - 1, idx + 1)]);
    colors.push(c0.lerp(c1, localT));
  }

  return colors;
}

function makeColorMapColors(styleConfig = {}) {
  if (Array.isArray(styleConfig.palette) && styleConfig.palette.length >= 2) {
    const sorted = [...styleConfig.palette].sort((a, b) => a.value - b.value);
    return makeGradientFromStops(sorted.map(p => p.color));
  }

  const rampName = styleConfig.colormap_name ?? 'turbo';
  return makeGradientFromStops(PALETTE_STOPS[rampName] ?? PALETTE_STOPS.turbo);
}

function lonLatToProjected(center, fromCrs, toCrs) {
  if (fromCrs === toCrs) {
    return center;
  }
  const [x, y] = proj4(fromCrs, toCrs, center);
  return [x, y];
}

function zoomToAltitude(camera, zoom, latitudeDeg, viewportHeightPx = 900) {
  const metersPerPixel = (156543.03392 * Math.cos((latitudeDeg * Math.PI) / 180)) / 2 ** zoom;
  const safeFovDeg = Number.isFinite(camera.fov) && camera.fov > 0 ? camera.fov : 45;
  const fovRad = (safeFovDeg * Math.PI) / 180;
  const altitude = (metersPerPixel * viewportHeightPx) / (2 * Math.tan(fovRad / 2));
  return Number.isFinite(altitude) && altitude > 0 ? altitude : 1200;
}

function buildHomeCamera(target, altitude, pitchDeg = 0, bearingDeg = 0) {
  const pitchRad = (Math.max(0, Math.min(85, pitchDeg)) * Math.PI) / 180;
  const bearingRad = (bearingDeg * Math.PI) / 180;
  const horizontalDistance = altitude * Math.tan(pitchRad);
  const dx = -Math.sin(bearingRad) * horizontalDistance;
  const dy = -Math.cos(bearingRad) * horizontalDistance;
  return new Vector3(target.x + dx, target.y + dy, altitude);
}

function parseBlendingMode(value) {
  switch ((value ?? '').toLowerCase()) {
    case 'none':
      return BlendingMode.None;
    case 'add':
      return BlendingMode.Add;
    case 'multiply':
      return BlendingMode.Multiply;
    case 'normal':
    default:
      return BlendingMode.Normal;
  }
}

function parseMaskMode(value) {
  switch ((value ?? '').toLowerCase()) {
    case 'inverted':
      return MaskMode.Inverted;
    case 'normal':
    default:
      return MaskMode.Normal;
  }
}

function layerZOrderValue(layerConfig) {
  return Number.isFinite(layerConfig.z_order) ? layerConfig.z_order : 0;
}

function createLayerSwitch(container, layerConfig, checked, onToggle) {
  const label = document.createElement('label');
  label.className = 'switch-row';
  label.htmlFor = `layer-${layerConfig.id}`;

  const input = document.createElement('input');
  input.id = `layer-${layerConfig.id}`;
  input.type = 'checkbox';
  input.setAttribute('role', 'switch');
  input.checked = checked;

  const text = document.createElement('span');
  text.textContent = layerConfig.name;

  input.addEventListener('change', event => {
    onToggle(event.target.checked);
  });

  label.appendChild(input);
  label.appendChild(text);
  container.appendChild(label);
}

function createMeasurementWidget(instance) {
  const tool = new DrawTool({ instance });
  const shapes = [];
  const numberFormat = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
  });
  const options = {
    lengthUnit: 'm',
    areaUnit: 'm',
  };
  let abortController = null;

  const distanceButton = document.getElementById('measure-distance');
  const areaButton = document.getElementById('measure-area');
  const heightButton = document.getElementById('measure-height');
  const angleButton = document.getElementById('measure-angle');
  const clearButton = document.getElementById('measure-clear');
  const lengthUnitSelect = document.getElementById('measure-length-unit');
  const areaUnitSelect = document.getElementById('measure-area-unit');

  const formatLength = ({ length }) => {
    switch (options.lengthUnit) {
      case 'ft':
        return `${numberFormat.format(Math.round(length * 3.28084))} ft`;
      case 'm':
      default:
        return `${numberFormat.format(Math.round(length))} m`;
    }
  };

  const formatArea = ({ area }) => {
    switch (options.areaUnit) {
      case 'ha':
        return `${numberFormat.format(area / 10000)} ha`;
      case 'acre':
        return `${numberFormat.format(area / 4_046.8564224)} acres`;
      case 'm':
      default:
        if (area > 1_000_000) {
          return `${numberFormat.format(area / 1_000_000)} km²`;
        }
        return `${numberFormat.format(Math.round(area))} m²`;
    }
  };

  const setDrawingDisabled = disabled => {
    distanceButton.disabled = disabled;
    areaButton.disabled = disabled;
    heightButton.disabled = disabled;
    angleButton.disabled = disabled;
  };

  const updateClearButton = () => {
    clearButton.disabled = shapes.length === 0 && abortController == null;
  };

  const redrawLabels = () => {
    for (const shape of shapes) {
      shape.rebuildLabels();
    }
    instance.notifyChange();
  };

  const startDrawing = (factory, factoryOptions) => {
    if (abortController) {
      abortController.abort();
    }
    const currentAbort = new AbortController();
    abortController = currentAbort;
    setDrawingDisabled(true);
    updateClearButton();

    factory
      .bind(tool)({
        signal: currentAbort.signal,
        endCondition: conditions.rightClick,
        ...factoryOptions,
      })
      .then(shape => {
        if (shape) {
          shapes.push(shape);
        }
      })
      .catch(error => {
        if (error?.message !== 'aborted') {
          console.error('Failed to create measurement', error);
        }
      })
      .finally(() => {
        if (abortController === currentAbort) {
          abortController = null;
        }
        setDrawingDisabled(false);
        updateClearButton();
      });
  };

  distanceButton.addEventListener('click', () => {
    startDrawing(tool.createLineString, {
      showSegmentLabels: true,
      segmentLabelFormatter: formatLength,
      showLineLabel: true,
      lineLabelFormatter: formatLength,
    });
  });

  areaButton.addEventListener('click', () => {
    startDrawing(tool.createPolygon, {
      showSurfaceLabel: true,
      surfaceLabelFormatter: formatArea,
      showLineLabel: true,
      lineLabelFormatter: formatLength,
    });
  });

  heightButton.addEventListener('click', () => {
    startDrawing(tool.createVerticalMeasure, {
      verticalLineLabelFormatter: ({ vertexIndex, length }) => {
        if (vertexIndex === 0) {
          return null;
        }
        return formatLength({ length });
      },
      segmentLabelFormatter: formatLength,
    });
  });

  angleButton.addEventListener('click', () => {
    startDrawing(tool.createSector, {});
  });

  clearButton.addEventListener('click', () => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    for (const shape of shapes) {
      instance.remove(shape);
    }
    shapes.length = 0;
    setDrawingDisabled(false);
    updateClearButton();
    instance.notifyChange();
  });

  lengthUnitSelect.addEventListener('change', event => {
    options.lengthUnit = event.target.value;
    redrawLabels();
  });

  areaUnitSelect.addEventListener('change', event => {
    options.areaUnit = event.target.value;
    redrawLabels();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && abortController) {
      abortController.abort();
    }
  });

  updateClearButton();
}

async function loadConfig() {
  const response = await fetch('./map_layers.json');
  if (!response.ok) {
    throw new Error(`Cannot load config: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function createTerrainLayer(elevationConfig, extent, crs) {
  const elevationSource = new GeoTIFFSource({
    url: elevationConfig.source,
    crs,
    channels: elevationConfig.channels ?? [0],
  });

  return new ElevationLayer({
    name: elevationConfig.name ?? 'Terrain Elevation',
    source: elevationSource,
    extent,
    minmax: {
      min: elevationConfig.min ?? 0,
      max: elevationConfig.max ?? 0,
    },
    resolutionFactor: elevationConfig.resolution_factor ?? 0.5,
  });
}

async function bootstrap() {
  const config = await loadConfig();

  const mapConfig = config.map;
  if (mapConfig?.proj4 && mapConfig?.crs) {
    proj4.defs(mapConfig.crs, mapConfig.proj4);
  }

  const crs = CoordinateSystem.register(mapConfig.crs, mapConfig.proj4);
  const [centerX, centerY] = lonLatToProjected(
    mapConfig.center,
    mapConfig.center_crs ?? 'EPSG:4326',
    mapConfig.crs,
  );

  const extentWidth = mapConfig.extent_size?.[0] ?? 2400;
  const extentHeight = mapConfig.extent_size?.[1] ?? 2400;
  const maxExtentSize = Math.max(extentWidth, extentHeight);
  const extent = Extent.fromCenterAndSize(crs, { x: centerX, y: centerY }, extentWidth, extentHeight);

  const instance = new Instance({
    target: 'view',
    crs,
    backgroundColor: mapConfig.background_color ?? '#ededed',
  });
  const defaultBackgroundColor = mapConfig.background_color ?? '#ededed';
  const noColorMapBackgroundColor = mapConfig.elevation_no_colormap_background_color ?? '#ffffff';
  const layerOffsets = mapConfig.layer_offsets ?? {};
  const minOverlayZTerrainOff = Math.max(2, maxExtentSize * 0.01);
  const overlayZTerrainOn = Number.isFinite(layerOffsets.overlay_terrain_on_z)
    ? layerOffsets.overlay_terrain_on_z
    : 0.2;
  const overlayZTerrainOff = Number.isFinite(layerOffsets.overlay_terrain_off_z)
    ? Math.max(layerOffsets.overlay_terrain_off_z, minOverlayZTerrainOff)
    : minOverlayZTerrainOff;
  const osmMapZ = Number.isFinite(layerOffsets.osm_map_z) ? layerOffsets.osm_map_z : 0;

  const osmMap = new Map({
    extent,
    terrain: { enabled: false },
    lighting: { enabled: false },
    backgroundOpacity: 0,
  });
  osmMap.renderOrder = 0;
  osmMap.object3d.position.z = osmMapZ;
  instance.add(osmMap);

  const baseLayerConfig = mapConfig.base_layer;
  if (baseLayerConfig?.is_active !== false && baseLayerConfig?.type === 'osm') {
    const osmBaseLayer = new ColorLayer({
      name: baseLayerConfig.name ?? 'OpenStreetMap',
      extent,
      userData: { z_order: layerZOrderValue(baseLayerConfig) },
      source: new TiledImageSource({
        source: new OSM(),
      }),
    });
    osmMap.addLayer(osmBaseLayer);
  }

  const hillshadingConfig = mapConfig.hillshading ?? {};
  const hillshadingEnabled = hillshadingConfig.enabled !== false;
  const hillshadingIsMasked = hillshadingConfig.is_masked !== false;
  const elevationIsMasked = config.elevation?.is_masked !== false;
  const overlayMapOptions = {
    extent,
    terrain: { enabled: mapConfig.terrain_enabled !== false },
    lighting: {
      enabled: false,
      mode: MapLightingMode.Hillshade,
      elevationLayersOnly: hillshadingConfig.elevation_layers_only ?? false,
      hillshadeAzimuth: hillshadingConfig.azimuth ?? 315,
      hillshadeZenith: hillshadingConfig.zenith ?? 45,
      hillshadeIntensity: hillshadingConfig.intensity ?? 1,
      zFactor: hillshadingConfig.z_factor ?? 1,
    },
  };

  const unmaskedMap = new Map(overlayMapOptions);
  unmaskedMap.renderOrder = 900;
  unmaskedMap.object3d.position.z = unmaskedMap.terrain.enabled ? overlayZTerrainOn : overlayZTerrainOff;
  unmaskedMap.lighting.enabled = hillshadingEnabled && !hillshadingIsMasked;
  instance.add(unmaskedMap);

  const maskedMap = new Map(overlayMapOptions);
  maskedMap.renderOrder = 1000;
  maskedMap.object3d.position.z = maskedMap.terrain.enabled ? overlayZTerrainOn : overlayZTerrainOff;
  maskedMap.lighting.enabled = hillshadingEnabled && hillshadingIsMasked;
  instance.add(maskedMap);

  let maskedTerrainLayer = null;
  let unmaskedTerrainLayer = null;
  if (config.elevation?.is_active !== false) {
    if (elevationIsMasked) {
      maskedTerrainLayer = createTerrainLayer(config.elevation, extent, crs);
      maskedMap.addLayer(maskedTerrainLayer);
    } else {
      unmaskedTerrainLayer = createTerrainLayer(config.elevation, extent, crs);
      unmaskedMap.addLayer(unmaskedTerrainLayer);
    }
  }

  const indexedLayers = (config.layers ?? [])
    .map((layerConfig, originalIndex) => ({ layerConfig, originalIndex }))
    .sort((a, b) => {
      const zA = layerZOrderValue(a.layerConfig);
      const zB = layerZOrderValue(b.layerConfig);
      if (zA !== zB) {
        return zA - zB;
      }
      return a.originalIndex - b.originalIndex;
    });

  const renderLayers = indexedLayers;
  const listLayers = [...indexedLayers].sort((a, b) => {
      const zA = layerZOrderValue(a.layerConfig);
      const zB = layerZOrderValue(b.layerConfig);
      if (zA !== zB) {
        return zB - zA;
      }
      return a.originalIndex - b.originalIndex;
    });
  const layersListEl = document.getElementById('layers-list');
  const runtimeLayers = [];
  const switchDescriptors = [];
  const layerVisibilityState = new globalThis.Map();
  let maskLayer = null;
  const hillshadingSwitch = document.getElementById('hillshading-toggle');

  const updateMaskVisibility = () => {
    const hasVisibleLayer = Array.from(layerVisibilityState.values()).some(Boolean);
    const showOverlayMaps = hasVisibleLayer || hillshadingSwitch.checked;
    maskedMap.visible = showOverlayMaps;
    unmaskedMap.visible = showOverlayMaps;
    if (maskLayer) {
      maskLayer.visible = showOverlayMaps;
    }
  };

  for (const { layerConfig, originalIndex } of renderLayers) {
    const isMaskedLayer = layerConfig.id === 'elevation'
      ? elevationIsMasked
      : layerConfig.is_masked !== false;
    const targetMap = isMaskedLayer ? maskedMap : unmaskedMap;
    const targetTerrainLayer = isMaskedLayer ? maskedTerrainLayer : unmaskedTerrainLayer;
    const styleConfig = layerConfig.style_config ?? {};
    const min = styleConfig.value_range?.min ?? layerConfig.min ?? 0;
    const max = styleConfig.value_range?.max ?? layerConfig.max ?? 1;

    if (layerConfig.id === 'elevation' && targetTerrainLayer) {
      targetTerrainLayer.colorMap = new ColorMap({
        colors: makeColorMapColors(styleConfig),
        min,
        max,
        mode: ColorMapMode.Elevation,
      });
      targetTerrainLayer.colorMap.active = layerConfig.is_active !== false;
      layerVisibilityState.set(layerConfig.id, targetTerrainLayer.colorMap.active);
      targetMap.backgroundColor = targetTerrainLayer.colorMap.active
        ? defaultBackgroundColor
        : noColorMapBackgroundColor;
      switchDescriptors.push({
        layerConfig,
        originalIndex,
        checked: targetTerrainLayer.colorMap.active,
        onToggle: checked => {
          layerVisibilityState.set(layerConfig.id, checked);
          targetTerrainLayer.colorMap.active = checked;
          targetMap.backgroundColor = checked ? defaultBackgroundColor : noColorMapBackgroundColor;
          updateMaskVisibility();
          instance.notifyChange(maskedMap);
          instance.notifyChange(unmaskedMap);
        },
      });
      continue;
    }

    const source = new GeoTIFFSource({
      url: layerConfig.url,
      crs,
      channels: layerConfig.channels,
    });

    const layerOptions = {
      name: layerConfig.name,
      source,
      extent,
      opacity: styleConfig.opacity ?? 1,
      blendingMode: parseBlendingMode(styleConfig.blending_mode),
    };

    if (layerConfig.type === 'cog_rgb') {
      const layer = new ColorLayer(layerOptions);
      layer.visible = layerConfig.is_active !== false;
      layerVisibilityState.set(layerConfig.id, layer.visible);
      targetMap.addLayer(layer);
      runtimeLayers.push({ layerConfig, layer, map: targetMap });
      switchDescriptors.push({
        layerConfig,
        originalIndex,
        checked: layer.visible,
        onToggle: checked => {
          layerVisibilityState.set(layerConfig.id, checked);
          layer.visible = checked;
          updateMaskVisibility();
          instance.notifyChange(maskedMap);
          instance.notifyChange(unmaskedMap);
        },
      });
      continue;
    }

    const layer = new ColorLayer({
      ...layerOptions,
      colorMap: new ColorMap({
        colors: makeColorMapColors(styleConfig),
        min,
        max,
        mode: ColorMapMode.Elevation,
      }),
    });

    layer.visible = layerConfig.is_active !== false;
    layerVisibilityState.set(layerConfig.id, layer.visible);
    targetMap.addLayer(layer);
    runtimeLayers.push({ layerConfig, layer, map: targetMap });
    switchDescriptors.push({
      layerConfig,
      originalIndex,
      checked: layer.visible,
      onToggle: checked => {
        layerVisibilityState.set(layerConfig.id, checked);
        layer.visible = checked;
        updateMaskVisibility();
        instance.notifyChange(maskedMap);
        instance.notifyChange(unmaskedMap);
      },
    });
  }

  const maskLayerConfig = mapConfig.mask_layer;
  if (maskLayerConfig?.is_active !== false && maskLayerConfig?.type === 'geojson_mask') {
    const maskProjectionId = maskLayerConfig.data_projection ?? mapConfig.crs;
    const maskProjection = maskProjectionId === mapConfig.crs ? crs : CoordinateSystem.get(maskProjectionId);

    maskLayer = new MaskLayer({
      name: maskLayerConfig.name ?? 'mask',
      extent,
      maskMode: parseMaskMode(maskLayerConfig.mask_mode),
      source: new VectorSource({
        data: {
          url: maskLayerConfig.url,
          format: new GeoJSON(),
        },
        dataProjection: maskProjection,
        style: new Style({
          fill: new Fill({ color: maskLayerConfig.fill_color ?? 'white' }),
        }),
      }),
    });
    maskedMap.addLayer(maskLayer);
  }

  const descriptorById = new globalThis.Map(
    switchDescriptors.map(item => [item.layerConfig.id, item]),
  );
  for (const { layerConfig } of listLayers) {
    const descriptor = descriptorById.get(layerConfig.id);
    if (!descriptor) {
      continue;
    }
    createLayerSwitch(layersListEl, descriptor.layerConfig, descriptor.checked, descriptor.onToggle);
  }

  const camera = instance.view.camera;
  const homeTarget = new Vector3(centerX, centerY, 0);
  const homeAltitude = zoomToAltitude(camera, mapConfig.zoom ?? 17, mapConfig.center[1]);
  const homePosition = buildHomeCamera(
    homeTarget,
    homeAltitude,
    mapConfig.pitch ?? 0,
    mapConfig.bearing ?? 0,
  );

  camera.position.copy(homePosition);

  const controls = new MapControls(camera, instance.domElement);
  controls.target.copy(homeTarget);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  controls.maxPolarAngle = Math.PI / 2.05;
  controls.saveState();
  instance.view.setControls(controls);
  createMeasurementWidget(instance);

  const terrainSwitch = document.getElementById('terrain-deformation');
  terrainSwitch.checked = maskedMap.terrain.enabled;
  terrainSwitch.addEventListener('change', event => {
    const terrainEnabled = event.target.checked;
    maskedMap.terrain = {
      ...maskedMap.terrain,
      enabled: terrainEnabled,
    };
    unmaskedMap.terrain = {
      ...unmaskedMap.terrain,
      enabled: terrainEnabled,
    };
    maskedMap.object3d.position.z = terrainEnabled ? overlayZTerrainOn : overlayZTerrainOff;
    unmaskedMap.object3d.position.z = terrainEnabled ? overlayZTerrainOn : overlayZTerrainOff;
    instance.notifyChange(maskedMap);
    instance.notifyChange(unmaskedMap);
  });

  hillshadingSwitch.checked = hillshadingEnabled;
  hillshadingSwitch.addEventListener('change', event => {
    const enabled = event.target.checked;
    maskedMap.lighting.enabled = enabled && hillshadingIsMasked;
    unmaskedMap.lighting.enabled = enabled && !hillshadingIsMasked;
    updateMaskVisibility();
    instance.notifyChange(maskedMap);
    instance.notifyChange(unmaskedMap);
  });

  document.getElementById('home-button').addEventListener('click', () => {
    camera.position.copy(homePosition);
    controls.target.copy(homeTarget);
    controls.update();
    instance.notifyChange(maskedMap);
    instance.notifyChange(unmaskedMap);
  });

  updateMaskVisibility();
  instance.notifyChange(maskedMap);
  instance.notifyChange(unmaskedMap);

  return { instance, map: maskedMap, runtimeLayers };
}

bootstrap().catch(error => {
  console.error('Failed to initialize map from map_layers.json', error);
});
