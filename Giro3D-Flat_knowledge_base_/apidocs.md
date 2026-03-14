# Consolidated API Documentation

## Source: manuals/apidocs/README.md

Source Path: manuals/apidocs/README.md

# API Manuals

Сгенерировано из официальных TypeDoc-модулей: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/*.html`.

- Refer to the API Docs super-file, section: manuals/apidocs/controls.md
- Refer to the API Docs super-file, section: manuals/apidocs/core.cache.md
- Refer to the API Docs super-file, section: manuals/apidocs/core.features.md
- Refer to the API Docs super-file, section: manuals/apidocs/core.geographic.md
- Refer to the API Docs super-file, section: manuals/apidocs/core.md
- Refer to the API Docs super-file, section: manuals/apidocs/core.layer.md
- Refer to the API Docs super-file, section: manuals/apidocs/core.picking.md
- Refer to the API Docs super-file, section: manuals/apidocs/entities.md
- Refer to the API Docs super-file, section: manuals/apidocs/external.md
- Refer to the API Docs super-file, section: manuals/apidocs/external.ol.md
- Refer to the API Docs super-file, section: manuals/apidocs/external.olgeom.md
- Refer to the API Docs super-file, section: manuals/apidocs/external.olsource.md
- Refer to the API Docs super-file, section: manuals/apidocs/external.three.AudioContext.md
- Refer to the API Docs super-file, section: manuals/apidocs/external.three.md
- Refer to the API Docs super-file, section: manuals/apidocs/formats.md
- Refer to the API Docs super-file, section: manuals/apidocs/helpers.md
- Refer to the API Docs super-file, section: manuals/apidocs/interactions.md
- Refer to the API Docs super-file, section: manuals/apidocs/renderer.SimpleGeometry.md
- Refer to the API Docs super-file, section: manuals/apidocs/renderer.md
- Refer to the API Docs super-file, section: manuals/apidocs/sources.md
- Refer to the API Docs super-file, section: manuals/apidocs/sources.las.config.md
- Refer to the API Docs super-file, section: manuals/apidocs/sources.las.md
- Refer to the API Docs super-file, section: manuals/apidocs/utils.md

---

## Source: manuals/apidocs/controls.md

Source Path: manuals/apidocs/controls.md

# API Module: controls

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/controls.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/controls.html`

## Исходный файл модуля
- controls/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/controls/api.ts#L1

## Состав модуля по TypeDoc

### Classes
- [FirstPersonControls](https://giro3d.org/latest/apidoc/classes/controls.FirstPersonControls.html)
- [GlobeControls](https://giro3d.org/latest/apidoc/classes/controls.GlobeControls.html)

### Interfaces
- [FirstPersonControlsOptions](https://giro3d.org/latest/apidoc/interfaces/controls.FirstPersonControlsOptions.html)
- [GlobeControlsEvents](https://giro3d.org/latest/apidoc/interfaces/controls.GlobeControlsEvents.html)
- [GlobeControlsOptions](https://giro3d.org/latest/apidoc/interfaces/controls.GlobeControlsOptions.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/controls.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>controls | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="controls.html">controls</a></li></ul><h1>Namespace controls</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/controls/api.ts#L1">controls/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/controls.FirstPersonControls.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>First<wbr/>Person<wbr/>Controls</span></a>
<a href="../classes/controls.GlobeControls.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Globe<wbr/>Controls</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/controls.FirstPersonControlsOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>First<wbr/>Person<wbr/>Controls<wbr/>Options</span></a>
<a href="../interfaces/controls.GlobeControlsEvents.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Globe<wbr/>Controls<wbr/>Events</span></a>
<a href="../interfaces/controls.GlobeControlsOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Globe<wbr/>Controls<wbr/>Options</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/controls/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import type FirstPersonControls from './FirstPersonControls';
import type { FirstPersonControlsOptions } from './FirstPersonControls';
import type GlobeControls from './GlobeControls';
import type { GlobeControlsEvents, GlobeControlsOptions } from './GlobeControls';

export {
    FirstPersonControls,
    FirstPersonControlsOptions,
    GlobeControls,
    GlobeControlsEvents,
    GlobeControlsOptions,
};
```

---

## Source: manuals/apidocs/core.cache.md

Source Path: manuals/apidocs/core.cache.md

# API Module: cache

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/core.cache.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/core.cache.html`

## Исходный файл модуля
- core/Cache.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/core/Cache.ts#L1

## Состав модуля по TypeDoc

### Classes
- [Cache](https://giro3d.org/latest/apidoc/classes/core.cache.Cache.html)

### Interfaces
- [CacheConfiguration](https://giro3d.org/latest/apidoc/interfaces/core.cache.CacheConfiguration.html)
- [CacheOptions](https://giro3d.org/latest/apidoc/interfaces/core.cache.CacheOptions.html)

### Variables
- [DEFAULT_CAPACITY](https://giro3d.org/latest/apidoc/variables/core.cache.DEFAULT_CAPACITY.html)
- [DEFAULT_MAX_ENTRIES](https://giro3d.org/latest/apidoc/variables/core.cache.DEFAULT_MAX_ENTRIES.html)
- [DEFAULT_TTL](https://giro3d.org/latest/apidoc/variables/core.cache.DEFAULT_TTL.html)
- [GlobalCache](https://giro3d.org/latest/apidoc/variables/core.cache.GlobalCache.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/core.cache.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>cache | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="core.html">core</a></li><li><a href="core.cache.html">cache</a></li></ul><h1>Namespace cache</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/core/Cache.ts#L1">core/Cache.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/core.cache.Cache.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Cache</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/core.cache.CacheConfiguration.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Cache<wbr/>Configuration</span></a>
<a href="../interfaces/core.cache.CacheOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Cache<wbr/>Options</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Variables</h3><div class="tsd-index-list"><a href="../variables/core.cache.DEFAULT_CAPACITY.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>CAPACITY</span></a>
<a href="../variables/core.cache.DEFAULT_MAX_ENTRIES.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>MAX_<wbr/>ENTRIES</span></a>
<a href="../variables/core.cache.DEFAULT_TTL.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>TTL</span></a>
<a href="../variables/core.cache.GlobalCache.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Global<wbr/>Cache</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/core/Cache.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { LRUCache } from 'lru-cache';

import type MemoryUsage from './MemoryUsage';

import { isMemoryUsage, type GetMemoryUsageContext } from './MemoryUsage';

/**
 * The options for a cache entry.
 */
interface CacheOptions {
    /**
     * The time to live of this entry, in milliseconds.
     */
    ttl?: number;
    /**
     * The entry size, in bytes. It does not have to be an exact value, but
     * it helps the cache determine when to remove entries to save memory.
     */
    size?: number;
    /**
     * A optional callback called when the entry is deleted from the cache.
     */
    onDelete?: (entry: unknown) => void;
}

/**
 * The default max number of entries.
 */
const DEFAULT_MAX_ENTRIES = 8192;

/**
 * The default TTL (time to live), in milliseconds.
 */
const DEFAULT_TTL: number = 240_000; // 240 seconds

/**
 * The default capacity, in bytes.
 */
const DEFAULT_CAPACITY: number = 536_870_912; // 512 MB

interface CacheConfiguration {
    /**
     * The default TTL (time to live) of entries, in milliseconds.
     * Can be overriden for each entry (see {@link CacheOptions}).
     * @defaultValue {@link DEFAULT_TTL}
     */
    ttl?: number;
    /**
     * The capacity, in bytes, of the cache.
     * @defaultValue {@link DEFAULT_CAPACITY}
     */
    byteCapacity?: number;
    /**
     * The capacity, in number of entries, of the cache.
     * @defaultValue {@link DEFAULT_MAX_ENTRIES}
     */
    maxNumberOfEntries?: number;
}

/**
 * The cache.
 *
 */
class Cache implements MemoryUsage {
    public readonly isMemoryUsage = true as const;
    private readonly _deleteHandlers: Map<string, (entry: object) => void>;
    private _lru: LRUCache<string, object>;
    private _enabled: boolean;

    /**
     * Constructs a cache.
     *
     * @param opts - The options.
     */
    public constructor(opts?: CacheConfiguration) {
        this._deleteHandlers = new Map();

        this._enabled = true;
        this._lru = this.createLRUCache(opts);
    }

    private createLRUCache(opts?: CacheConfiguration): LRUCache<string, object> {
        return new LRUCache<string, object>({
            ttl: opts?.ttl ?? DEFAULT_TTL,
            ttlResolution: 1000, // 1 second
            updateAgeOnGet: true,
            maxSize: opts?.byteCapacity ?? DEFAULT_CAPACITY,
            max: opts?.maxNumberOfEntries ?? DEFAULT_MAX_ENTRIES,
            allowStale: false,
            dispose: (value, key): void => {
                this.onDisposed(key, value);
            },
        });
    }

    /**
     * Configure the cache with the specified configuration. The cache must be
     * empty otherwise this method will throw an error.
     */
    public configure(config: CacheConfiguration): void {
        if (this.count > 0) {
            throw new Error('cannot configure the cache as it is not empty.');
        }
        this._lru = this.createLRUCache(config);
    }

    public getMemoryUsage(context: GetMemoryUsageContext): void {
        this._lru.forEach(e => {
            if (isMemoryUsage(e)) {
                e.getMemoryUsage(context);
            }
        });
    }

    /**
     * Enables or disables the cache.
     */
    public get enabled(): boolean {
        return this._enabled;
    }

    public set enabled(v: boolean) {
        this._enabled = v;
    }

    /**
     * Gets or sets the default TTL (time to live) of the cache.
     */
    public get defaultTtl(): number {
        return this._lru.ttl;
    }

    public set defaultTtl(v: number) {
        this._lru.ttl = v;
    }

    /**
     * Gets the maximum size of the cache, in bytes.
     */
    public get maxSize(): number {
        return this._lru.maxSize;
    }

    /**
     * Gets the maximum number of entries.
     */
    public get capacity(): number {
        return this._lru.max;
    }

    /**
     * Gets the number of entries.
     */
    public get count(): number {
        return this._lru.size;
    }

    /**
     * Gets the size of entries, in bytes
     */
    public get size(): number {
        return this._lru.calculatedSize;
    }

    /**
     * Returns an array of entries.
     */
    public entries(): Array<unknown> {
        return [...this._lru.entries()];
    }

    private onDisposed(key: string, value: object): void {
        const handler = this._deleteHandlers.get(key);
        if (handler) {
            this._deleteHandlers.delete(key);
            handler(value);
        }
    }

    /**
     * Removes stale entries.
     */
    public purge(): void {
        this._lru.purgeStale();
    }

    /**
     * Returns the entry with the specified key, or `undefined` if no entry matches this key.
     *
     * @param key - The entry key.
     * @returns The entry, or `undefined`.
     */
    public get(key: string): unknown | undefined {
        if (!this.enabled) {
            return undefined;
        }

        return this._lru.get(key);
    }

    /**
     * Stores an entry in the cache, or replaces an existing entry with the same key.
     *
     * @param key - The key.
     * @param value - The value.
     * @param options - The options.
     */
    public set<T extends object>(key: string, value: T, options: CacheOptions = {}): T {
        if (!this.enabled) {
            return value;
        }

        if (typeof key !== 'string') {
            throw new Error('the cache expects strings as keys.');
        }

        this._lru.set(key, value, {
            ttl: options.ttl ?? this.defaultTtl,
            size: options.size ?? 1024, // Use a default size if not provided
        });

        if (options.onDelete) {
            this._deleteHandlers.set(key, options.onDelete);
        }

        return value;
    }

    /**
     * Deletes an entry.
     *
     * @param key - The key.
     * @returns `true` if the entry was deleted, `false` otherwise.
     */
    public delete(key: string): boolean {
        return this._lru.delete(key);
    }

    /**
     * Clears the cache.
     *
     */
    public clear(): void {
        this._lru.clear();
    }
}

/**
 * A global singleton cache.
 */
const GlobalCache: Cache = new Cache();

export {
    Cache,
    CacheConfiguration,
    CacheOptions,
    DEFAULT_CAPACITY,
    DEFAULT_MAX_ENTRIES,
    DEFAULT_TTL,
    GlobalCache,
};
```

---

## Source: manuals/apidocs/core.features.md

Source Path: manuals/apidocs/core.features.md

# API Module: features

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/core.features.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/core.features.html`

## Исходный файл модуля
- core/FeatureTypes.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/core/FeatureTypes.ts#L1

## Состав модуля по TypeDoc

### Interfaces
- [BaseStyle](https://giro3d.org/latest/apidoc/interfaces/core.features.BaseStyle.html)
- [FeatureStyle](https://giro3d.org/latest/apidoc/interfaces/core.features.FeatureStyle.html)
- [FillStyle](https://giro3d.org/latest/apidoc/interfaces/core.features.FillStyle.html)
- [PointStyle](https://giro3d.org/latest/apidoc/interfaces/core.features.PointStyle.html)
- [StrokeStyle](https://giro3d.org/latest/apidoc/interfaces/core.features.StrokeStyle.html)

### Type Aliases
- [FeatureElevation](https://giro3d.org/latest/apidoc/types/core.features.FeatureElevation.html)
- [FeatureElevationCallback](https://giro3d.org/latest/apidoc/types/core.features.FeatureElevationCallback.html)
- [FeatureExtrusionOffset](https://giro3d.org/latest/apidoc/types/core.features.FeatureExtrusionOffset.html)
- [FeatureExtrusionOffsetCallback](https://giro3d.org/latest/apidoc/types/core.features.FeatureExtrusionOffsetCallback.html)
- [FeatureStyleCallback](https://giro3d.org/latest/apidoc/types/core.features.FeatureStyleCallback.html)
- [LineMaterialGenerator](https://giro3d.org/latest/apidoc/types/core.features.LineMaterialGenerator.html)
- [LineWidthUnit](https://giro3d.org/latest/apidoc/types/core.features.LineWidthUnit.html)
- [PointMaterialGenerator](https://giro3d.org/latest/apidoc/types/core.features.PointMaterialGenerator.html)
- [SurfaceMaterialGenerator](https://giro3d.org/latest/apidoc/types/core.features.SurfaceMaterialGenerator.html)

### Variables
- [DEFAULT_LINE_COLOR](https://giro3d.org/latest/apidoc/variables/core.features.DEFAULT_LINE_COLOR.html)
- [DEFAULT_LINE_WIDTH](https://giro3d.org/latest/apidoc/variables/core.features.DEFAULT_LINE_WIDTH.html)
- [DEFAULT_LINE_WIDTH_UNITS](https://giro3d.org/latest/apidoc/variables/core.features.DEFAULT_LINE_WIDTH_UNITS.html)
- [DEFAULT_POINT_COLOR](https://giro3d.org/latest/apidoc/variables/core.features.DEFAULT_POINT_COLOR.html)
- [DEFAULT_POINT_SIZE](https://giro3d.org/latest/apidoc/variables/core.features.DEFAULT_POINT_SIZE.html)
- [DEFAULT_SURFACE_COLOR](https://giro3d.org/latest/apidoc/variables/core.features.DEFAULT_SURFACE_COLOR.html)

### Functions
- [getFullFillStyle](https://giro3d.org/latest/apidoc/functions/core.features.getFullFillStyle.html)
- [getFullPointStyle](https://giro3d.org/latest/apidoc/functions/core.features.getFullPointStyle.html)
- [getFullStrokeStyle](https://giro3d.org/latest/apidoc/functions/core.features.getFullStrokeStyle.html)
- [hashStyle](https://giro3d.org/latest/apidoc/functions/core.features.hashStyle.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/core.features.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>features | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="core.html">core</a></li><li><a href="core.features.html">features</a></li></ul><h1>Namespace features</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/core/FeatureTypes.ts#L1">core/FeatureTypes.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/core.features.BaseStyle.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Base<wbr/>Style</span></a>
<a href="../interfaces/core.features.FeatureStyle.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Feature<wbr/>Style</span></a>
<a href="../interfaces/core.features.FillStyle.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Fill<wbr/>Style</span></a>
<a href="../interfaces/core.features.PointStyle.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Point<wbr/>Style</span></a>
<a href="../interfaces/core.features.StrokeStyle.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Stroke<wbr/>Style</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Type Aliases</h3><div class="tsd-index-list"><a href="../types/core.features.FeatureElevation.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Feature<wbr/>Elevation</span></a>
<a href="../types/core.features.FeatureElevationCallback.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Feature<wbr/>Elevation<wbr/>Callback</span></a>
<a href="../types/core.features.FeatureExtrusionOffset.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Feature<wbr/>Extrusion<wbr/>Offset</span></a>
<a href="../types/core.features.FeatureExtrusionOffsetCallback.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Feature<wbr/>Extrusion<wbr/>Offset<wbr/>Callback</span></a>
<a href="../types/core.features.FeatureStyleCallback.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Feature<wbr/>Style<wbr/>Callback</span></a>
<a href="../types/core.features.LineMaterialGenerator.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Line<wbr/>Material<wbr/>Generator</span></a>
<a href="../types/core.features.LineWidthUnit.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Line<wbr/>Width<wbr/>Unit</span></a>
<a href="../types/core.features.PointMaterialGenerator.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Point<wbr/>Material<wbr/>Generator</span></a>
<a href="../types/core.features.SurfaceMaterialGenerator.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Surface<wbr/>Material<wbr/>Generator</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Variables</h3><div class="tsd-index-list"><a href="../variables/core.features.DEFAULT_LINE_COLOR.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>LINE_<wbr/>COLOR</span></a>
<a href="../variables/core.features.DEFAULT_LINE_WIDTH.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>LINE_<wbr/>WIDTH</span></a>
<a href="../variables/core.features.DEFAULT_LINE_WIDTH_UNITS.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>LINE_<wbr/>WIDTH_<wbr/>UNITS</span></a>
<a href="../variables/core.features.DEFAULT_POINT_COLOR.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>POINT_<wbr/>COLOR</span></a>
<a href="../variables/core.features.DEFAULT_POINT_SIZE.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>POINT_<wbr/>SIZE</span></a>
<a href="../variables/core.features.DEFAULT_SURFACE_COLOR.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>SURFACE_<wbr/>COLOR</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Functions</h3><div class="tsd-index-list"><a href="../functions/core.features.getFullFillStyle.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>get<wbr/>Full<wbr/>Fill<wbr/>Style</span></a>
<a href="../functions/core.features.getFullPointStyle.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>get<wbr/>Full<wbr/>Point<wbr/>Style</span></a>
<a href="../functions/core.features.getFullStrokeStyle.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>get<wbr/>Full<wbr/>Stroke<wbr/>Style</span></a>
<a href="../functions/core.features.hashStyle.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>hash<wbr/>Style</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/core/FeatureTypes.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import type Feature from 'ol/Feature';
import type { Color, ColorRepresentation, Material, SpriteMaterial, Texture } from 'three';
import type { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

function isColor(o: unknown): o is Color {
    return (o as Color)?.isColor ?? false;
}

function hasUUID(obj: unknown): obj is { uuid: string } {
    if (obj == null) {
        return false;
    }
    if (typeof obj !== 'object') {
        return false;
    }
    return 'uuid' in obj && typeof obj.uuid === 'string';
}

/**
 * The units used to define line width. If `"pixels"`, the line has a constant width expressed in
 * pixels. If `"world"`, the line has a variable apparent width expressed in CRS units, depending on
 * the distance from the camera to the line.
 */
export type LineWidthUnit = 'pixels' | 'world';

export const DEFAULT_POINT_COLOR = 'white';
/**
 * The default point size, in pixels.
 */
export const DEFAULT_POINT_SIZE = 64;

export const DEFAULT_LINE_COLOR = '#4d69bf';
export const DEFAULT_LINE_WIDTH = 1;
export const DEFAULT_LINE_WIDTH_UNITS: LineWidthUnit = 'pixels';

export const DEFAULT_SURFACE_COLOR = '#87c6fa';

export interface BaseStyle {
    /**
     * The opacity of the style.
     * @defaultValue 1
     */
    opacity?: number;
    /**
     * Determine if [depth test](https://threejs.org/docs/#api/en/materials/Material.depthTest) is enabled.
     */
    depthTest?: boolean;
    /**
     * The [render order](https://threejs.org/docs/?q=objec#api/en/core/Object3D.renderOrder) of objects with this style.
     *
     * Note: this value is **relative** to the host entity's own render order. For example, if a feature
     * has a render order of 3, and the entity has a render order of 10, then the actual render order
     * of the displayed mesh will be 13.
     */
    renderOrder?: number;
}

/**
 * Fill style for vector features.
 */
export interface FillStyle extends BaseStyle {
    /**
     * The fill color.
     * @defaultValue {@link DEFAULT_SURFACE_COLOR}
     */
    color?: ColorRepresentation;
    /**
     * Whether to use shaded materials or flat materials.
     * @defaultValue false
     */
    shading?: boolean;
}

/**
 * Stroke style for vector features.
 */
export interface StrokeStyle extends BaseStyle {
    /**
     * The color of the line.
     * @defaultValue {@link DEFAULT_LINE_COLOR}
     */
    color?: ColorRepresentation;
    /**
     * The line width. If {@link lineWidthUnits} is `world`, the width is expressed in CRS units
     * (typically meters). Otherwise the line width is expressed in pixels.
     * @defaultValue {@link DEFAULT_LINE_WIDTH}
     */
    lineWidth?: number;
    /**
     * Specifies how the line width is interpreted.If `"pixels"`, the width is expressed in pixels,
     * and if `"world"`, the width is expressed in world units (typically meters).
     * @defaultValue {@link DEFAULT_LINE_WIDTH_UNITS}
     */
    lineWidthUnits?: LineWidthUnit;
}

/**
 * Point style for vector features.
 */
export interface PointStyle extends BaseStyle {
    /**
     * The color of the point.
     * @defaultValue {@link DEFAULT_POINT_COLOR}
     */
    color?: ColorRepresentation;
    /**
     * The image to use for the point. May be either a THREE.js texture
     * or a URL to a remote image file.
     * @defaultValue `undefined`
     */
    image?: Texture | string | null;
    /**
     * The size of points, in pixels.
     * @defaultValue {@link DEFAULT_POINT_SIZE}
     */
    pointSize?: number;
    /**
     * If enabled, point size decreases with distance.
     * See the THREE.js [documentation](https://threejs.org/docs/?q=sprite#api/en/materials/SpriteMaterial.sizeAttenuation) for more information.
     * @defaultValue `false`
     */
    sizeAttenuation?: boolean;
}

/**
 * Returns a fill style where every property is defined, if necessary with default values.
 * @param style - The partial style to process. If undefined, the default style is returned.
 */
export function getFullFillStyle(style?: Partial<FillStyle>): Required<FillStyle> {
    const opacity = style?.opacity ?? 1;
    const color = style?.color ?? DEFAULT_SURFACE_COLOR;
    const depthTest = style?.depthTest ?? true;
    const renderOrder = style?.renderOrder ?? 0;
    const shading = style?.shading ?? false;

    return { opacity, color, depthTest, renderOrder, shading };
}

/**
 * Returns a point style where every property is defined, if necessary with default values.
 * @param style - The partial style to process. If undefined, the default style is returned.
 */
export function getFullPointStyle(style?: Partial<PointStyle>): Required<PointStyle> {
    const opacity = style?.opacity ?? 1;
    const color = style?.color ?? DEFAULT_POINT_COLOR;
    const pointSize = style?.pointSize ?? DEFAULT_POINT_SIZE;
    const sizeAttenuation = style?.sizeAttenuation ?? false;
    // Contrary to lines and surface, it makes sense to disable depth test by
    // default for floating symbols.
    const depthTest = style?.depthTest ?? false;
    const image = style?.image ?? null;
    const renderOrder = style?.renderOrder ?? 0;

    return {
        opacity,
        color,
        sizeAttenuation,
        pointSize,
        depthTest,
        image,
        renderOrder,
    };
}

/**
 * Returns a stroke style where every property is defined, if necessary with default values.
 * @param style - The partial style to process. If undefined, then the default style is returned.
 */
export function getFullStrokeStyle(style?: Partial<StrokeStyle>): Required<StrokeStyle> {
    const color = style?.color ?? DEFAULT_LINE_COLOR;
    const lineWidth = style?.lineWidth ?? DEFAULT_LINE_WIDTH;
    const opacity = style?.opacity ?? 1;
    const lineWidthUnits = style?.lineWidthUnits ?? 'pixels';
    const depthTest = style?.depthTest ?? true;
    const renderOrder = style?.renderOrder ?? 0;

    return { color, lineWidth, opacity, lineWidthUnits, depthTest, renderOrder };
}

function hash(
    obj: boolean | string | number | Texture | Color | undefined | null,
): string | number {
    if (obj == null) {
        return 'undefined';
    }

    switch (typeof obj) {
        case 'string':
            return obj;
        case 'number':
            return obj;
        case 'boolean':
            return obj ? 'true' : 'false';
    }

    if (isColor(obj)) {
        return obj.getHexString();
    }
    if (hasUUID(obj)) {
        return obj.uuid;
    }

    throw new Error('unimplemented hashable type:' + typeof obj);
}

/**
 * Returns a string that uniquely identify this style.
 */
export function hashStyle(
    prefix: string,
    style: Required<PointStyle | StrokeStyle | FillStyle>,
): string {
    const items = [];
    for (const [k, v] of Object.entries(style)) {
        items.push(`${k}=${hash(v)}`);
    }

    return `${prefix}::${items.sort().join(',')}`;
}

export interface FeatureStyle {
    /**
     * The fill style to apply to `Polygon`s and `MultiPolygon`s geometries.
     */
    fill?: FillStyle;
    /**
     * The stroke style to apply to `LineString`s, `MultiLineString`s, `Polygon`s and `MultiPolygon`s.
     */
    stroke?: StrokeStyle;
    /**
     * The style to apply to `Point`s and `MultiPoint`s.
     */
    point?: PointStyle;
}

/**
 * This callback is called just after a source data has been converted to a THREE.js Mesh, to
 * style individual meshes from OpenLayers
 * [Feature](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html)s.
 *
 * @param feature - the feature to style
 * @returns The style of the current feature
 */
export type FeatureStyleCallback = (feature: Feature) => FeatureStyle;

/**
 * This callback can be used to generate elevation for a given OpenLayer
 * [Feature](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html) (typically from its properties).
 *
 * - If a single number is returned, it will be used for all vertices in the geometry.
 * - If an array is returned, each value will be used to determine the height of the corresponding vertex in the geometry.
 * Note that the cardinality of the array must be the same as the number of vertices in the geometry.
 */
export type FeatureElevationCallback = (feature: Feature) => Array<number> | number;

/**
 * Callback used to generate extrusion to [ol.Feature](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html).
 *
 * If one number is returned, it will be used for all vertices. If an array is returned, its
 * cardinality must match the number of vertices and each value will be used for each vertex in
 * order.
 */
export type FeatureExtrusionOffsetCallback = (feature: Feature) => number | number[];

/*
 * Feature elevation
 */
export type FeatureElevation = number | number[];

/*
 * Feature extrusion offset
 */
export type FeatureExtrusionOffset = number | number[];

/**
 * Generator function for surfaces.
 */
export type SurfaceMaterialGenerator<
    S extends FillStyle = FillStyle,
    M extends Material = Material,
> = (style: Required<S>) => M;

/**
 * Generator function for lines.
 */
export type LineMaterialGenerator<
    S extends StrokeStyle = StrokeStyle,
    M extends LineMaterial = LineMaterial,
> = (style: Required<S>) => M;

/**
 * Generator function for points.
 */
export type PointMaterialGenerator<
    S extends PointStyle = PointStyle,
    M extends SpriteMaterial = SpriteMaterial,
> = (style: Required<S>) => M;
```

---

## Source: manuals/apidocs/core.geographic.md

Source Path: manuals/apidocs/core.geographic.md

# API Module: geographic

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/core.geographic.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/core.geographic.html`

## Исходный файл модуля
- core/geographic/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/core/geographic/api.ts#L1

## Состав модуля по TypeDoc

### Classes
- [AngularUnit](https://giro3d.org/latest/apidoc/classes/core.geographic.AngularUnit.html)
- [Coordinates](https://giro3d.org/latest/apidoc/classes/core.geographic.Coordinates.html)
- [CoordinateSystem](https://giro3d.org/latest/apidoc/classes/core.geographic.CoordinateSystem.html)
- [Ellipsoid](https://giro3d.org/latest/apidoc/classes/core.geographic.Ellipsoid.html)
- [Extent](https://giro3d.org/latest/apidoc/classes/core.geographic.Extent.html)
- [LinearUnit](https://giro3d.org/latest/apidoc/classes/core.geographic.LinearUnit.html)
- [SRID](https://giro3d.org/latest/apidoc/classes/core.geographic.SRID.html)

### Interfaces
- [DMS](https://giro3d.org/latest/apidoc/interfaces/core.geographic.DMS.html)
- [Unit](https://giro3d.org/latest/apidoc/interfaces/core.geographic.Unit.html)

### Type Aliases
- [CoordinateParameters](https://giro3d.org/latest/apidoc/types/core.geographic.CoordinateParameters.html)
- [ExtentParameters](https://giro3d.org/latest/apidoc/types/core.geographic.ExtentParameters.html)

### Variables
- [Sun](https://giro3d.org/latest/apidoc/variables/core.geographic.Sun.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/core.geographic.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>geographic | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="core.html">core</a></li><li><a href="core.geographic.html">geographic</a></li></ul><h1>Namespace geographic</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/core/geographic/api.ts#L1">core/geographic/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/core.geographic.AngularUnit.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Angular<wbr/>Unit</span></a>
<a href="../classes/core.geographic.Coordinates.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Coordinates</span></a>
<a href="../classes/core.geographic.CoordinateSystem.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Coordinate<wbr/>System</span></a>
<a href="../classes/core.geographic.Ellipsoid.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Ellipsoid</span></a>
<a href="../classes/core.geographic.Extent.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Extent</span></a>
<a href="../classes/core.geographic.LinearUnit.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Linear<wbr/>Unit</span></a>
<a href="../classes/core.geographic.SRID.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>SRID</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/core.geographic.DMS.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>DMS</span></a>
<a href="../interfaces/core.geographic.Unit.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Unit</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Type Aliases</h3><div class="tsd-index-list"><a href="../types/core.geographic.CoordinateParameters.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Coordinate<wbr/>Parameters</span></a>
<a href="../types/core.geographic.ExtentParameters.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Extent<wbr/>Parameters</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Variables</h3><div class="tsd-index-list"><a href="../variables/core.geographic.Sun.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Sun</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/core/geographic/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import type Coordinates from './Coordinates';
import type { CoordinateParameters, DMS } from './Coordinates';
import type Ellipsoid from './Ellipsoid';
import type Extent from './Extent';
import type { ExtentParameters } from './Extent';
import type Sun from './Sun';

import CoordinateSystem from './CoordinateSystem';
import SRID from './SRID';
import { AngularUnit, LinearUnit, Unit, UnitType } from './Unit';

export {
    CoordinateParameters,
    Coordinates,
    UnitType,
    Unit,
    AngularUnit,
    LinearUnit,
    SRID,
    CoordinateSystem,
    DMS,
    Ellipsoid,
    Extent,
    ExtentParameters,
    Sun,
};
```

---

## Source: manuals/apidocs/core.layer.md

Source Path: manuals/apidocs/core.layer.md

# API Module: layer

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/core.layer.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/core.layer.html`

## Исходный файл модуля
- core/layer/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/core/layer/api.ts#L1

## Состав модуля по TypeDoc

### Enumerations
- [BlendingMode](https://giro3d.org/latest/apidoc/enums/core.layer.BlendingMode.html)
- [InterpretationMode](https://giro3d.org/latest/apidoc/enums/core.layer.InterpretationMode.html)
- [MaskMode](https://giro3d.org/latest/apidoc/enums/core.layer.MaskMode.html)

### Classes
- [ColorLayer](https://giro3d.org/latest/apidoc/classes/core.layer.ColorLayer.html)
- [ElevationLayer](https://giro3d.org/latest/apidoc/classes/core.layer.ElevationLayer.html)
- [Interpretation](https://giro3d.org/latest/apidoc/classes/core.layer.Interpretation.html)
- [Layer](https://giro3d.org/latest/apidoc/classes/core.layer.Layer.html)
- [MaskLayer](https://giro3d.org/latest/apidoc/classes/core.layer.MaskLayer.html)

### Interfaces
- [ColorLayerEvents](https://giro3d.org/latest/apidoc/interfaces/core.layer.ColorLayerEvents.html)
- [ColorLayerOptions](https://giro3d.org/latest/apidoc/interfaces/core.layer.ColorLayerOptions.html)
- [ElevationLayerOptions](https://giro3d.org/latest/apidoc/interfaces/core.layer.ElevationLayerOptions.html)
- [HasLayers](https://giro3d.org/latest/apidoc/interfaces/core.layer.HasLayers.html)
- [InterpretationOptions](https://giro3d.org/latest/apidoc/interfaces/core.layer.InterpretationOptions.html)
- [LayerEvents](https://giro3d.org/latest/apidoc/interfaces/core.layer.LayerEvents.html)
- [LayerNode](https://giro3d.org/latest/apidoc/interfaces/core.layer.LayerNode.html)
- [LayerNodeEventMap](https://giro3d.org/latest/apidoc/interfaces/core.layer.LayerNodeEventMap.html)
- [LayerNodeMaterial](https://giro3d.org/latest/apidoc/interfaces/core.layer.LayerNodeMaterial.html)
- [LayerOptions](https://giro3d.org/latest/apidoc/interfaces/core.layer.LayerOptions.html)
- [MaskLayerOptions](https://giro3d.org/latest/apidoc/interfaces/core.layer.MaskLayerOptions.html)
- [NoDataOptions](https://giro3d.org/latest/apidoc/interfaces/core.layer.NoDataOptions.html)

### Type Aliases
- [LayerUserData](https://giro3d.org/latest/apidoc/types/core.layer.LayerUserData.html)

### Functions
- [hasLayers](https://giro3d.org/latest/apidoc/functions/core.layer.hasLayers-1.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/core.layer.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>layer | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="core.html">core</a></li><li><a href="core.layer.html">layer</a></li></ul><h1>Namespace layer</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/core/layer/api.ts#L1">core/layer/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Enumerations</h3><div class="tsd-index-list"><a href="../enums/core.layer.BlendingMode.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-8"></use></svg><span>Blending<wbr/>Mode</span></a>
<a href="../enums/core.layer.InterpretationMode.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-8"></use></svg><span>Interpretation<wbr/>Mode</span></a>
<a href="../enums/core.layer.MaskMode.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-8"></use></svg><span>Mask<wbr/>Mode</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/core.layer.ColorLayer.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Color<wbr/>Layer</span></a>
<a href="../classes/core.layer.ElevationLayer.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Elevation<wbr/>Layer</span></a>
<a href="../classes/core.layer.Interpretation.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Interpretation</span></a>
<a href="../classes/core.layer.Layer.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Layer</span></a>
<a href="../classes/core.layer.MaskLayer.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mask<wbr/>Layer</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/core.layer.ColorLayerEvents.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Color<wbr/>Layer<wbr/>Events</span></a>
<a href="../interfaces/core.layer.ColorLayerOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Color<wbr/>Layer<wbr/>Options</span></a>
<a href="../interfaces/core.layer.ElevationLayerOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Elevation<wbr/>Layer<wbr/>Options</span></a>
<a href="../interfaces/core.layer.HasLayers.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Has<wbr/>Layers</span></a>
<a href="../interfaces/core.layer.InterpretationOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Interpretation<wbr/>Options</span></a>
<a href="../interfaces/core.layer.LayerEvents.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Layer<wbr/>Events</span></a>
<a href="../interfaces/core.layer.LayerNode.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Layer<wbr/>Node</span></a>
<a href="../interfaces/core.layer.LayerNodeEventMap.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Layer<wbr/>Node<wbr/>Event<wbr/>Map</span></a>
<a href="../interfaces/core.layer.LayerNodeMaterial.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Layer<wbr/>Node<wbr/>Material</span></a>
<a href="../interfaces/core.layer.LayerOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Layer<wbr/>Options</span></a>
<a href="../interfaces/core.layer.MaskLayerOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Mask<wbr/>Layer<wbr/>Options</span></a>
<a href="../interfaces/core.layer.NoDataOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>No<wbr/>Data<wbr/>Options</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Type Aliases</h3><div class="tsd-index-list"><a href="../types/core.layer.LayerUserData.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Layer<wbr/>User<wbr/>Data</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Functions</h3><div class="tsd-index-list"><a href="../functions/core.layer.hasLayers-1.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>has<wbr/>Layers</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/core/layer/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import type BlendingMode from './BlendingMode';
import type ColorLayer from './ColorLayer';
import type { ColorLayerEvents, ColorLayerOptions } from './ColorLayer';
import type ElevationLayer from './ElevationLayer';
import type { ElevationLayerOptions } from './ElevationLayer';
import type HasLayers from './HasLayers';
import type Interpretation from './Interpretation';
import type { Mode as InterpretationMode, InterpretationOptions } from './Interpretation';
import type Layer from './Layer';
import type {
    LayerEvents,
    LayerNode,
    LayerNodeEventMap,
    LayerNodeMaterial,
    LayerOptions,
    LayerUserData,
} from './Layer';
import type MaskLayer from './MaskLayer';
import type { MaskLayerOptions, MaskMode } from './MaskLayer';
import type NoDataOptions from './NoDataOptions';

import { hasLayers } from './HasLayers';

export {
    BlendingMode,
    ColorLayer,
    ColorLayerEvents,
    ColorLayerOptions,
    ElevationLayer,
    ElevationLayerOptions,
    hasLayers,
    HasLayers,
    Interpretation,
    InterpretationMode,
    InterpretationOptions,
    Layer,
    LayerEvents,
    LayerNode,
    LayerNodeEventMap,
    LayerNodeMaterial,
    LayerOptions,
    LayerUserData,
    MaskLayer,
    MaskLayerOptions,
    MaskMode,
    NoDataOptions,
};
```

---

## Source: manuals/apidocs/core.md

Source Path: manuals/apidocs/core.md

# API Module: core

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/core.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/core.html`

## Исходный файл модуля
- core/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/core/api.ts#L1

## Состав модуля по TypeDoc

### Namespaces
- [cache](https://giro3d.org/latest/apidoc/modules/core.cache.html)
- [features](https://giro3d.org/latest/apidoc/modules/core.features.html)
- [geographic](https://giro3d.org/latest/apidoc/modules/core.geographic.html)
- [layer](https://giro3d.org/latest/apidoc/modules/core.layer.html)
- [picking](https://giro3d.org/latest/apidoc/modules/core.picking.html)

### Enumerations
- [ColorMapMode](https://giro3d.org/latest/apidoc/enums/core.ColorMapMode.html)
- [RenderingState](https://giro3d.org/latest/apidoc/enums/core.RenderingState.html)

### Classes
- [ColorMap](https://giro3d.org/latest/apidoc/classes/core.ColorMap.html)
- [HeadingPitchRoll](https://giro3d.org/latest/apidoc/classes/core.HeadingPitchRoll.html)
- [Instance](https://giro3d.org/latest/apidoc/classes/core.Instance.html)
- [MainLoop](https://giro3d.org/latest/apidoc/classes/core.MainLoop.html)
- [OffsetScale](https://giro3d.org/latest/apidoc/classes/core.OffsetScale.html)
- [OperationCounter](https://giro3d.org/latest/apidoc/classes/core.OperationCounter.html)
- [Rect](https://giro3d.org/latest/apidoc/classes/core.Rect.html)
- [Vector2Array](https://giro3d.org/latest/apidoc/classes/core.Vector2Array.html)
- [Vector3Array](https://giro3d.org/latest/apidoc/classes/core.Vector3Array.html)
- [Vector4Array](https://giro3d.org/latest/apidoc/classes/core.Vector4Array.html)
- [VectorArray](https://giro3d.org/latest/apidoc/classes/core.VectorArray.html)

### Interfaces
- [ColorimetryOptions](https://giro3d.org/latest/apidoc/interfaces/core.ColorimetryOptions.html)
- [Context](https://giro3d.org/latest/apidoc/interfaces/core.Context.html)
- [ContourLineOptions](https://giro3d.org/latest/apidoc/interfaces/core.ContourLineOptions.html)
- [Disposable](https://giro3d.org/latest/apidoc/interfaces/core.Disposable.html)
- [ElevationProvider](https://giro3d.org/latest/apidoc/interfaces/core.ElevationProvider.html)
- [ElevationRange](https://giro3d.org/latest/apidoc/interfaces/core.ElevationRange.html)
- [ElevationSample](https://giro3d.org/latest/apidoc/interfaces/core.ElevationSample.html)
- [EntityEventPayload](https://giro3d.org/latest/apidoc/interfaces/core.EntityEventPayload.html)
- [FrameEventPayload](https://giro3d.org/latest/apidoc/interfaces/core.FrameEventPayload.html)
- [GetElevationOptions](https://giro3d.org/latest/apidoc/interfaces/core.GetElevationOptions.html)
- [GetElevationResult](https://giro3d.org/latest/apidoc/interfaces/core.GetElevationResult.html)
- [GetMemoryUsageContext](https://giro3d.org/latest/apidoc/interfaces/core.GetMemoryUsageContext.html)
- [GraticuleOptions](https://giro3d.org/latest/apidoc/interfaces/core.GraticuleOptions.html)
- [HeadingPitchRollLike](https://giro3d.org/latest/apidoc/interfaces/core.HeadingPitchRollLike.html)
- [InstanceEvents](https://giro3d.org/latest/apidoc/interfaces/core.InstanceEvents.html)
- [InstanceOptions](https://giro3d.org/latest/apidoc/interfaces/core.InstanceOptions.html)
- [MemoryUsage](https://giro3d.org/latest/apidoc/interfaces/core.MemoryUsage.html)
- [MemoryUsageReport](https://giro3d.org/latest/apidoc/interfaces/core.MemoryUsageReport.html)
- [OperationCounterEvents](https://giro3d.org/latest/apidoc/interfaces/core.OperationCounterEvents.html)
- [PickObjectsAtOptions](https://giro3d.org/latest/apidoc/interfaces/core.PickObjectsAtOptions.html)
- [Progress](https://giro3d.org/latest/apidoc/interfaces/core.Progress.html)
- [TerrainOptions](https://giro3d.org/latest/apidoc/interfaces/core.TerrainOptions.html)

### Variables
- [DEFAULT_ENABLE_STITCHING](https://giro3d.org/latest/apidoc/variables/core.DEFAULT_ENABLE_STITCHING.html)
- [DEFAULT_ENABLE_TERRAIN](https://giro3d.org/latest/apidoc/variables/core.DEFAULT_ENABLE_TERRAIN.html)
- [DEFAULT_MAP_SEGMENTS](https://giro3d.org/latest/apidoc/variables/core.DEFAULT_MAP_SEGMENTS.html)

### Functions
- [aggregateElevationProviders](https://giro3d.org/latest/apidoc/functions/core.aggregateElevationProviders.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/core.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>core | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="core.html">core</a></li></ul><h1>Namespace core</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/core/api.ts#L1">core/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Namespaces</h3><div class="tsd-index-list"><a href="core.cache.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>cache</span></a>
<a href="core.features.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>features</span></a>
<a href="core.geographic.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>geographic</span></a>
<a href="core.layer.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>layer</span></a>
<a href="core.picking.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>picking</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Enumerations</h3><div class="tsd-index-list"><a href="../enums/core.ColorMapMode.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-8"></use></svg><span>Color<wbr/>Map<wbr/>Mode</span></a>
<a href="../enums/core.RenderingState.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-8"></use></svg><span>Rendering<wbr/>State</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/core.ColorMap.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Color<wbr/>Map</span></a>
<a href="../classes/core.HeadingPitchRoll.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Heading<wbr/>Pitch<wbr/>Roll</span></a>
<a href="../classes/core.Instance.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Instance</span></a>
<a href="../classes/core.MainLoop.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Main<wbr/>Loop</span></a>
<a href="../classes/core.OffsetScale.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Offset<wbr/>Scale</span></a>
<a href="../classes/core.OperationCounter.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Operation<wbr/>Counter</span></a>
<a href="../classes/core.Rect.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Rect</span></a>
<a href="../classes/core.Vector2Array.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector2<wbr/>Array</span></a>
<a href="../classes/core.Vector3Array.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector3<wbr/>Array</span></a>
<a href="../classes/core.Vector4Array.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector4<wbr/>Array</span></a>
<a href="../classes/core.VectorArray.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector<wbr/>Array</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/core.ColorimetryOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Colorimetry<wbr/>Options</span></a>
<a href="../interfaces/core.Context.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Context</span></a>
<a href="../interfaces/core.ContourLineOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Contour<wbr/>Line<wbr/>Options</span></a>
<a href="../interfaces/core.Disposable.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Disposable</span></a>
<a href="../interfaces/core.ElevationProvider.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Elevation<wbr/>Provider</span></a>
<a href="../interfaces/core.ElevationRange.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Elevation<wbr/>Range</span></a>
<a href="../interfaces/core.ElevationSample.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Elevation<wbr/>Sample</span></a>
<a href="../interfaces/core.EntityEventPayload.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Entity<wbr/>Event<wbr/>Payload</span></a>
<a href="../interfaces/core.FrameEventPayload.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Frame<wbr/>Event<wbr/>Payload</span></a>
<a href="../interfaces/core.GetElevationOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Get<wbr/>Elevation<wbr/>Options</span></a>
<a href="../interfaces/core.GetElevationResult.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Get<wbr/>Elevation<wbr/>Result</span></a>
<a href="../interfaces/core.GetMemoryUsageContext.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Get<wbr/>Memory<wbr/>Usage<wbr/>Context</span></a>
<a href="../interfaces/core.GraticuleOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Graticule<wbr/>Options</span></a>
<a href="../interfaces/core.HeadingPitchRollLike.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Heading<wbr/>Pitch<wbr/>Roll<wbr/>Like</span></a>
<a href="../interfaces/core.InstanceEvents.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Instance<wbr/>Events</span></a>
<a href="../interfaces/core.InstanceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Instance<wbr/>Options</span></a>
<a href="../interfaces/core.MemoryUsage.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Memory<wbr/>Usage</span></a>
<a href="../interfaces/core.MemoryUsageReport.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Memory<wbr/>Usage<wbr/>Report</span></a>
<a href="../interfaces/core.OperationCounterEvents.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Operation<wbr/>Counter<wbr/>Events</span></a>
<a href="../interfaces/core.PickObjectsAtOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Pick<wbr/>Objects<wbr/>At<wbr/>Options</span></a>
<a href="../interfaces/core.Progress.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Progress</span></a>
<a href="../interfaces/core.TerrainOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Terrain<wbr/>Options</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Variables</h3><div class="tsd-index-list"><a href="../variables/core.DEFAULT_ENABLE_STITCHING.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>ENABLE_<wbr/>STITCHING</span></a>
<a href="../variables/core.DEFAULT_ENABLE_TERRAIN.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>ENABLE_<wbr/>TERRAIN</span></a>
<a href="../variables/core.DEFAULT_MAP_SEGMENTS.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>MAP_<wbr/>SEGMENTS</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Functions</h3><div class="tsd-index-list"><a href="../functions/core.aggregateElevationProviders.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>aggregate<wbr/>Elevation<wbr/>Providers</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/core/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import type * as cache from './Cache';
import type ColorimetryOptions from './ColorimetryOptions';
import type ColorMap from './ColorMap';
import type ColorMapMode from './ColorMapMode';
import type Context from './Context';
import type ContourLineOptions from './ContourLineOptions';
import type Disposable from './Disposable';
import type ElevationProvider from './ElevationProvider';
import type ElevationRange from './ElevationRange';
import type ElevationSample from './ElevationSample';
import type * as features from './FeatureTypes';
import type * as geographic from './geographic/api';
import type GraticuleOptions from './GraticuleOptions';
import type HasDefaultPointOfView from './HasDefaultPointOfView';
import type Instance from './Instance';
import type {
    EntityEventPayload,
    FrameEventPayload,
    InstanceEvents,
    InstanceOptions,
    PickObjectsAtOptions,
} from './Instance';
import type * as layer from './layer/api';
import type MainLoop from './MainLoop';
import type { RenderingState } from './MainLoop';
import type MemoryUsage from './MemoryUsage';
import type { GetMemoryUsageContext, MemoryUsageReport } from './MemoryUsage';
import type OffsetScale from './OffsetScale';
import type OperationCounter from './OperationCounter';
import type { OperationCounterEvents } from './OperationCounter';
import type * as picking from './picking/api';
import type PointOfView from './PointOfView';
import type Progress from './Progress';
import type Rect from './Rect';
import type TerrainOptions from './TerrainOptions';
import type { Vector2Array, Vector3Array, Vector4Array, VectorArray } from './VectorArray';

import { type aggregateElevationProviders } from './ElevationProvider';
import GetElevationOptions from './GetElevationOptions';
import GetElevationResult from './GetElevationResult';
import HeadingPitchRoll, { HeadingPitchRollLike } from './HeadingPitchRoll';
import {
    DEFAULT_ENABLE_STITCHING,
    DEFAULT_ENABLE_TERRAIN,
    DEFAULT_MAP_SEGMENTS,
} from './TerrainOptions';

export {
    aggregateElevationProviders,
    HeadingPitchRoll,
    HeadingPitchRollLike,
    cache,
    ColorimetryOptions,
    ColorMap,
    ColorMapMode,
    Context,
    ContourLineOptions,
    DEFAULT_ENABLE_STITCHING,
    DEFAULT_ENABLE_TERRAIN,
    DEFAULT_MAP_SEGMENTS,
    Disposable,
    ElevationProvider,
    ElevationRange,
    ElevationSample,
    EntityEventPayload,
    features,
    FrameEventPayload,
    geographic,
    GetElevationOptions,
    GetElevationResult,
    GetMemoryUsageContext,
    GraticuleOptions,
    HasDefaultPointOfView,
    Instance,
    InstanceEvents,
    InstanceOptions,
    layer,
    MainLoop,
    MemoryUsage,
    MemoryUsageReport,
    OffsetScale,
    OperationCounter,
    OperationCounterEvents,
    picking,
    PickObjectsAtOptions,
    PointOfView,
    Progress,
    Rect,
    RenderingState,
    TerrainOptions,
    Vector2Array,
    Vector3Array,
    Vector4Array,
    VectorArray,
};
```

---

## Source: manuals/apidocs/core.picking.md

Source Path: manuals/apidocs/core.picking.md

# API Module: picking

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/core.picking.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/core.picking.html`

## Исходный файл модуля
- core/picking/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/core/picking/api.ts#L1

## Состав модуля по TypeDoc

### Interfaces
- [MapPickResult](https://giro3d.org/latest/apidoc/interfaces/core.picking.MapPickResult.html)
- [Pickable](https://giro3d.org/latest/apidoc/interfaces/core.picking.Pickable.html)
- [PickableFeatures](https://giro3d.org/latest/apidoc/interfaces/core.picking.PickableFeatures.html)
- [PickOptions](https://giro3d.org/latest/apidoc/interfaces/core.picking.PickOptions.html)
- [PickResult](https://giro3d.org/latest/apidoc/interfaces/core.picking.PickResult.html)
- [PointsPickResult](https://giro3d.org/latest/apidoc/interfaces/core.picking.PointsPickResult.html)
- [VectorPickFeature](https://giro3d.org/latest/apidoc/interfaces/core.picking.VectorPickFeature.html)

### Type Aliases
- [PickFilterCallback](https://giro3d.org/latest/apidoc/types/core.picking.PickFilterCallback.html)

### Functions
- [isMapPickResult](https://giro3d.org/latest/apidoc/functions/core.picking.isMapPickResult.html)
- [isPickable](https://giro3d.org/latest/apidoc/functions/core.picking.isPickable.html)
- [isPickableFeatures](https://giro3d.org/latest/apidoc/functions/core.picking.isPickableFeatures.html)
- [isPointsPickResult](https://giro3d.org/latest/apidoc/functions/core.picking.isPointsPickResult.html)
- [isVectorPickFeature](https://giro3d.org/latest/apidoc/functions/core.picking.isVectorPickFeature.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/core.picking.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>picking | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="core.html">core</a></li><li><a href="core.picking.html">picking</a></li></ul><h1>Namespace picking</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/core/picking/api.ts#L1">core/picking/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/core.picking.MapPickResult.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Map<wbr/>Pick<wbr/>Result</span></a>
<a href="../interfaces/core.picking.Pickable.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Pickable</span></a>
<a href="../interfaces/core.picking.PickableFeatures.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Pickable<wbr/>Features</span></a>
<a href="../interfaces/core.picking.PickOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Pick<wbr/>Options</span></a>
<a href="../interfaces/core.picking.PickResult.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Pick<wbr/>Result</span></a>
<a href="../interfaces/core.picking.PointsPickResult.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Points<wbr/>Pick<wbr/>Result</span></a>
<a href="../interfaces/core.picking.VectorPickFeature.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Vector<wbr/>Pick<wbr/>Feature</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Type Aliases</h3><div class="tsd-index-list"><a href="../types/core.picking.PickFilterCallback.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Pick<wbr/>Filter<wbr/>Callback</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Functions</h3><div class="tsd-index-list"><a href="../functions/core.picking.isMapPickResult.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>is<wbr/>Map<wbr/>Pick<wbr/>Result</span></a>
<a href="../functions/core.picking.isPickable.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>is<wbr/>Pickable</span></a>
<a href="../functions/core.picking.isPickableFeatures.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>is<wbr/>Pickable<wbr/>Features</span></a>
<a href="../functions/core.picking.isPointsPickResult.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>is<wbr/>Points<wbr/>Pick<wbr/>Result</span></a>
<a href="../functions/core.picking.isVectorPickFeature.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>is<wbr/>Vector<wbr/>Pick<wbr/>Feature</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/core/picking/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import type Pickable from './Pickable';
import type PickableFeatures from './PickableFeatures';
import type PickOptions from './PickOptions';
import type { PickFilterCallback } from './PickOptions';
import type PickResult from './PickResult';

import { isPickable } from './Pickable';
import { isPickableFeatures } from './PickableFeatures';
import { isPointsPickResult, type PointsPickResult } from './PickPointsAt';
import { isVectorPickFeature, type VectorPickFeature } from './PickResult';
import { isMapPickResult, type MapPickResult } from './PickTilesAt';

export {
    isMapPickResult,
    isPickable,
    isPickableFeatures,
    isPointsPickResult,
    isVectorPickFeature,
    MapPickResult,
    Pickable,
    PickableFeatures,
    PickFilterCallback,
    PickOptions,
    PickResult,
    PointsPickResult,
    VectorPickFeature,
};
```

---

## Source: manuals/apidocs/entities.md

Source Path: manuals/apidocs/entities.md

# API Module: entities

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/entities.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/entities.html`

## Исходный файл модуля
- entities/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/entities/api.ts#L1

## Состав модуля по TypeDoc

### Enumerations
- [AxisGridOrigin](https://giro3d.org/latest/apidoc/enums/entities.AxisGridOrigin.html)
- [MapLightingMode](https://giro3d.org/latest/apidoc/enums/entities.MapLightingMode.html)

### Classes
- [Atmosphere](https://giro3d.org/latest/apidoc/classes/entities.Atmosphere.html)
- [AxisGrid](https://giro3d.org/latest/apidoc/classes/entities.AxisGrid.html)
- [Entity](https://giro3d.org/latest/apidoc/classes/entities.Entity.html)
- [Entity3D](https://giro3d.org/latest/apidoc/classes/entities.Entity3D.html)
- [FeatureCollection](https://giro3d.org/latest/apidoc/classes/entities.FeatureCollection.html)
- [Globe](https://giro3d.org/latest/apidoc/classes/entities.Globe.html)
- [Glow](https://giro3d.org/latest/apidoc/classes/entities.Glow.html)
- [Map](https://giro3d.org/latest/apidoc/classes/entities.Map.html)
- [OrientedImageCollection](https://giro3d.org/latest/apidoc/classes/entities.OrientedImageCollection.html)
- [PointCloud](https://giro3d.org/latest/apidoc/classes/entities.PointCloud.html)
- [Shape](https://giro3d.org/latest/apidoc/classes/entities.Shape.html)
- [SphericalPanorama](https://giro3d.org/latest/apidoc/classes/entities.SphericalPanorama.html)
- [Tiles3D](https://giro3d.org/latest/apidoc/classes/entities.Tiles3D.html)
- [UnsupportedAttributeError](https://giro3d.org/latest/apidoc/classes/entities.UnsupportedAttributeError.html)

### Interfaces
- [AtmosphereOptions](https://giro3d.org/latest/apidoc/interfaces/entities.AtmosphereOptions.html)
- [AxisGridOptions](https://giro3d.org/latest/apidoc/interfaces/entities.AxisGridOptions.html)
- [AxisGridStyle](https://giro3d.org/latest/apidoc/interfaces/entities.AxisGridStyle.html)
- [AxisGridTicks](https://giro3d.org/latest/apidoc/interfaces/entities.AxisGridTicks.html)
- [AxisGridVolume](https://giro3d.org/latest/apidoc/interfaces/entities.AxisGridVolume.html)
- [Entity3DEventMap](https://giro3d.org/latest/apidoc/interfaces/entities.Entity3DEventMap.html)
- [Entity3DOptions](https://giro3d.org/latest/apidoc/interfaces/entities.Entity3DOptions.html)
- [EntityEventMap](https://giro3d.org/latest/apidoc/interfaces/entities.EntityEventMap.html)
- [FeatureCollectionOptions](https://giro3d.org/latest/apidoc/interfaces/entities.FeatureCollectionOptions.html)
- [GlobeOptions](https://giro3d.org/latest/apidoc/interfaces/entities.GlobeOptions.html)
- [GlowOptions](https://giro3d.org/latest/apidoc/interfaces/entities.GlowOptions.html)
- [MapEventMap](https://giro3d.org/latest/apidoc/interfaces/entities.MapEventMap.html)
- [MapLightingOptions](https://giro3d.org/latest/apidoc/interfaces/entities.MapLightingOptions.html)
- [MapOptions](https://giro3d.org/latest/apidoc/interfaces/entities.MapOptions.html)
- [MeshUserData](https://giro3d.org/latest/apidoc/interfaces/entities.MeshUserData.html)
- [OrientedImageCollectionOptions](https://giro3d.org/latest/apidoc/interfaces/entities.OrientedImageCollectionOptions.html)
- [OrientedImageCollectionPickResult](https://giro3d.org/latest/apidoc/interfaces/entities.OrientedImageCollectionPickResult.html)
- [OrientedImageCollectionSource](https://giro3d.org/latest/apidoc/interfaces/entities.OrientedImageCollectionSource.html)
- [OrientedImageSource](https://giro3d.org/latest/apidoc/interfaces/entities.OrientedImageSource.html)
- [PointCloudOptions](https://giro3d.org/latest/apidoc/interfaces/entities.PointCloudOptions.html)
- [ShapeExportOptions](https://giro3d.org/latest/apidoc/interfaces/entities.ShapeExportOptions.html)
- [ShapeOptions](https://giro3d.org/latest/apidoc/interfaces/entities.ShapeOptions.html)
- [ShapePickResult](https://giro3d.org/latest/apidoc/interfaces/entities.ShapePickResult.html)
- [SphericalPanoramaOptions](https://giro3d.org/latest/apidoc/interfaces/entities.SphericalPanoramaOptions.html)
- [Tiles3DOptions](https://giro3d.org/latest/apidoc/interfaces/entities.Tiles3DOptions.html)

### Type Aliases
- [EntityUserData](https://giro3d.org/latest/apidoc/types/entities.EntityUserData.html)
- [GlobeTerrainOptions](https://giro3d.org/latest/apidoc/types/entities.GlobeTerrainOptions.html)
- [LayerCompareFn](https://giro3d.org/latest/apidoc/types/entities.LayerCompareFn.html)
- [MapSubdivisionStrategy](https://giro3d.org/latest/apidoc/types/entities.MapSubdivisionStrategy.html)
- [PointCloudBatchTableAttributeMapping](https://giro3d.org/latest/apidoc/types/entities.PointCloudBatchTableAttributeMapping.html)
- [ShapeFontWeight](https://giro3d.org/latest/apidoc/types/entities.ShapeFontWeight.html)
- [Tiles3DPickResult](https://giro3d.org/latest/apidoc/types/entities.Tiles3DPickResult.html)
- [WellKnown3DTilesPointCloudAttributes](https://giro3d.org/latest/apidoc/types/entities.WellKnown3DTilesPointCloudAttributes.html)

### Variables
- [DEFAULT_MAP_BACKGROUND_COLOR](https://giro3d.org/latest/apidoc/variables/entities.DEFAULT_MAP_BACKGROUND_COLOR.html)
- [DEFAULT_SUBDIVISION_THRESHOLD](https://giro3d.org/latest/apidoc/variables/entities.DEFAULT_SUBDIVISION_THRESHOLD.html)
- [DEFAULT_TILES3D_POINTCLOUD_ATTRIBUTE_MAPPING](https://giro3d.org/latest/apidoc/variables/entities.DEFAULT_TILES3D_POINTCLOUD_ATTRIBUTE_MAPPING.html)

### Functions
- [allLayersLoadedSubdivisionStrategy](https://giro3d.org/latest/apidoc/functions/entities.allLayersLoadedSubdivisionStrategy.html)
- [defaultGlobeSubdivisionStrategy](https://giro3d.org/latest/apidoc/functions/entities.defaultGlobeSubdivisionStrategy.html)
- [defaultMapSubdivisionStrategy](https://giro3d.org/latest/apidoc/functions/entities.defaultMapSubdivisionStrategy.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/entities.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>entities | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="entities.html">entities</a></li></ul><h1>Namespace entities</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/entities/api.ts#L1">entities/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Enumerations</h3><div class="tsd-index-list"><a href="../enums/entities.AxisGridOrigin.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-8"></use></svg><span>Axis<wbr/>Grid<wbr/>Origin</span></a>
<a href="../enums/entities.MapLightingMode.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-8"></use></svg><span>Map<wbr/>Lighting<wbr/>Mode</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/entities.Atmosphere.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Atmosphere</span></a>
<a href="../classes/entities.AxisGrid.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Axis<wbr/>Grid</span></a>
<a href="../classes/entities.Entity.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Entity</span></a>
<a href="../classes/entities.Entity3D.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Entity3D</span></a>
<a href="../classes/entities.FeatureCollection.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Feature<wbr/>Collection</span></a>
<a href="../classes/entities.Globe.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Globe</span></a>
<a href="../classes/entities.Glow.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Glow</span></a>
<a href="../classes/entities.Map.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Map</span></a>
<a href="../classes/entities.OrientedImageCollection.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Oriented<wbr/>Image<wbr/>Collection</span></a>
<a href="../classes/entities.PointCloud.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Point<wbr/>Cloud</span></a>
<a href="../classes/entities.Shape.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Shape</span></a>
<a href="../classes/entities.SphericalPanorama.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Spherical<wbr/>Panorama</span></a>
<a href="../classes/entities.Tiles3D.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Tiles3D</span></a>
<a href="../classes/entities.UnsupportedAttributeError.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Unsupported<wbr/>Attribute<wbr/>Error</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/entities.AtmosphereOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Atmosphere<wbr/>Options</span></a>
<a href="../interfaces/entities.AxisGridOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Axis<wbr/>Grid<wbr/>Options</span></a>
<a href="../interfaces/entities.AxisGridStyle.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Axis<wbr/>Grid<wbr/>Style</span></a>
<a href="../interfaces/entities.AxisGridTicks.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Axis<wbr/>Grid<wbr/>Ticks</span></a>
<a href="../interfaces/entities.AxisGridVolume.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Axis<wbr/>Grid<wbr/>Volume</span></a>
<a href="../interfaces/entities.Entity3DEventMap.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Entity3DEvent<wbr/>Map</span></a>
<a href="../interfaces/entities.Entity3DOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Entity3DOptions</span></a>
<a href="../interfaces/entities.EntityEventMap.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Entity<wbr/>Event<wbr/>Map</span></a>
<a href="../interfaces/entities.FeatureCollectionOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Feature<wbr/>Collection<wbr/>Options</span></a>
<a href="../interfaces/entities.GlobeOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Globe<wbr/>Options</span></a>
<a href="../interfaces/entities.GlowOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Glow<wbr/>Options</span></a>
<a href="../interfaces/entities.MapEventMap.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Map<wbr/>Event<wbr/>Map</span></a>
<a href="../interfaces/entities.MapLightingOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Map<wbr/>Lighting<wbr/>Options</span></a>
<a href="../interfaces/entities.MapOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Map<wbr/>Options</span></a>
<a href="../interfaces/entities.MeshUserData.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Mesh<wbr/>User<wbr/>Data</span></a>
<a href="../interfaces/entities.OrientedImageCollectionOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Oriented<wbr/>Image<wbr/>Collection<wbr/>Options</span></a>
<a href="../interfaces/entities.OrientedImageCollectionPickResult.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Oriented<wbr/>Image<wbr/>Collection<wbr/>Pick<wbr/>Result</span></a>
<a href="../interfaces/entities.OrientedImageCollectionSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Oriented<wbr/>Image<wbr/>Collection<wbr/>Source</span></a>
<a href="../interfaces/entities.OrientedImageSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Oriented<wbr/>Image<wbr/>Source</span></a>
<a href="../interfaces/entities.PointCloudOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Point<wbr/>Cloud<wbr/>Options</span></a>
<a href="../interfaces/entities.ShapeExportOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Shape<wbr/>Export<wbr/>Options</span></a>
<a href="../interfaces/entities.ShapeOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Shape<wbr/>Options</span></a>
<a href="../interfaces/entities.ShapePickResult.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Shape<wbr/>Pick<wbr/>Result</span></a>
<a href="../interfaces/entities.SphericalPanoramaOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Spherical<wbr/>Panorama<wbr/>Options</span></a>
<a href="../interfaces/entities.Tiles3DOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Tiles3DOptions</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Type Aliases</h3><div class="tsd-index-list"><a href="../types/entities.EntityUserData.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Entity<wbr/>User<wbr/>Data</span></a>
<a href="../types/entities.GlobeTerrainOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Globe<wbr/>Terrain<wbr/>Options</span></a>
<a href="../types/entities.LayerCompareFn.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Layer<wbr/>Compare<wbr/>Fn</span></a>
<a href="../types/entities.MapSubdivisionStrategy.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Map<wbr/>Subdivision<wbr/>Strategy</span></a>
<a href="../types/entities.PointCloudBatchTableAttributeMapping.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Point<wbr/>Cloud<wbr/>Batch<wbr/>Table<wbr/>Attribute<wbr/>Mapping</span></a>
<a href="../types/entities.ShapeFontWeight.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Shape<wbr/>Font<wbr/>Weight</span></a>
<a href="../types/entities.Tiles3DPickResult.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Tiles3DPick<wbr/>Result</span></a>
<a href="../types/entities.WellKnown3DTilesPointCloudAttributes.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Well<wbr/>Known3DTiles<wbr/>Point<wbr/>Cloud<wbr/>Attributes</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Variables</h3><div class="tsd-index-list"><a href="../variables/entities.DEFAULT_MAP_BACKGROUND_COLOR.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>MAP_<wbr/>BACKGROUND_<wbr/>COLOR</span></a>
<a href="../variables/entities.DEFAULT_SUBDIVISION_THRESHOLD.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>SUBDIVISION_<wbr/>THRESHOLD</span></a>
<a href="../variables/entities.DEFAULT_TILES3D_POINTCLOUD_ATTRIBUTE_MAPPING.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>TILES3<wbr/>D_<wbr/>POINTCLOUD_<wbr/>ATTRIBUTE_<wbr/>MAPPING</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Functions</h3><div class="tsd-index-list"><a href="../functions/entities.allLayersLoadedSubdivisionStrategy.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>all<wbr/>Layers<wbr/>Loaded<wbr/>Subdivision<wbr/>Strategy</span></a>
<a href="../functions/entities.defaultGlobeSubdivisionStrategy.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>default<wbr/>Globe<wbr/>Subdivision<wbr/>Strategy</span></a>
<a href="../functions/entities.defaultMapSubdivisionStrategy.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>default<wbr/>Map<wbr/>Subdivision<wbr/>Strategy</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/entities/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import type Atmosphere from './Atmosphere';
import type { AtmosphereOptions } from './Atmosphere';
import type Globe from './Globe';
import type { GlobeOptions, GlobeTerrainOptions, defaultGlobeSubdivisionStrategy } from './Globe';
import type Glow from './Glow';
import type { GlowOptions } from './Glow';
import type Map from './Map';

import AxisGrid, {
    type AxisGridOptions,
    type TickOrigin as AxisGridOrigin,
    type Style as AxisGridStyle,
    type Ticks as AxisGridTicks,
    type Volume as AxisGridVolume,
} from './AxisGrid';
import Entity, { type EntityEventMap, type EntityUserData } from './Entity';
import Entity3D, { type Entity3DEventMap, type Entity3DOptions } from './Entity3D';
import FeatureCollection, {
    type MeshUserData,
    type FeatureCollectionOptions,
} from './FeatureCollection';
import {
    DEFAULT_MAP_BACKGROUND_COLOR,
    DEFAULT_SUBDIVISION_THRESHOLD,
    allLayersLoadedSubdivisionStrategy,
    defaultMapSubdivisionStrategy,
    type LayerCompareFn,
    type MapOptions,
    type MapEventMap,
    type MapSubdivisionStrategy,
} from './Map';
import MapLightingOptions, { MapLightingMode } from './MapLightingOptions';
import OrientedImageCollection, {
    type OrientedImageCollectionOptions,
    type OrientedImageCollectionPickResult,
    type OrientedImageCollectionSource,
    type OrientedImageSource,
} from './OrientedImageCollection';
import PointCloud, {
    PointCloudOptions,
    UnsupportedAttributeError,
    ActiveAttribute,
    ActiveAttributeDefinition,
} from './PointCloud';
import Shape, { ShapeOptions, ShapeExportOptions, ShapeFontWeight, ShapePickResult } from './Shape';
import SphericalPanorama, { SphericalPanoramaOptions } from './SphericalPanorama';
import Tiles3D, {
    DEFAULT_TILES3D_POINTCLOUD_ATTRIBUTE_MAPPING,
    WellKnown3DTilesPointCloudAttributes,
    type PointCloudBatchTableAttributeMapping,
    type Tiles3DOptions,
    type Tiles3DPickResult,
} from './Tiles3D';

export {
    Atmosphere,
    AtmosphereOptions,
    AxisGrid,
    AxisGridOptions,
    ActiveAttribute,
    ActiveAttributeDefinition,
    AxisGridOrigin,
    AxisGridStyle,
    AxisGridTicks,
    AxisGridVolume,
    DEFAULT_MAP_BACKGROUND_COLOR,
    DEFAULT_SUBDIVISION_THRESHOLD,
    DEFAULT_TILES3D_POINTCLOUD_ATTRIBUTE_MAPPING,
    Entity,
    Entity3D,
    Entity3DOptions,
    Entity3DEventMap,
    EntityEventMap,
    EntityUserData,
    FeatureCollection,
    FeatureCollectionOptions,
    Globe,
    GlobeOptions,
    GlobeTerrainOptions,
    Glow,
    GlowOptions,
    LayerCompareFn,
    Map,
    MapOptions,
    MapEventMap,
    MapLightingMode,
    MapLightingOptions,
    MapSubdivisionStrategy,
    MeshUserData,
    OrientedImageCollection,
    OrientedImageCollectionOptions,
    OrientedImageCollectionPickResult,
    OrientedImageCollectionSource,
    OrientedImageSource,
    PointCloud,
    PointCloudBatchTableAttributeMapping,
    PointCloudOptions,
    Shape,
    ShapeOptions,
    ShapeExportOptions,
    ShapeFontWeight,
    ShapePickResult,
    SphericalPanorama,
    SphericalPanoramaOptions,
    Tiles3D,
    Tiles3DOptions,
    Tiles3DPickResult,
    UnsupportedAttributeError,
    WellKnown3DTilesPointCloudAttributes,
    allLayersLoadedSubdivisionStrategy,
    defaultGlobeSubdivisionStrategy,
    defaultMapSubdivisionStrategy,
};
```

---

## Source: manuals/apidocs/external.md

Source Path: manuals/apidocs/external.md

# API Module: external

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/external.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/external.html`

## Исходный файл модуля
- external.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/external.ts#L1

## Состав модуля по TypeDoc
- В этом модуле не найден индекс публичных сущностей.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/external.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>external | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="external.html">external</a></li></ul><h1>Namespace external</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/external.ts#L1">external.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Namespaces</h3><div class="tsd-index-list"><a href="external.ol.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>ol</span></a>
<a href="external.olgeom.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>olgeom</span></a>
<a href="external.olsource.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>olsource</span></a>
<a href="external.three.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>three</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

---

## Source: manuals/apidocs/external.ol.md

Source Path: manuals/apidocs/external.ol.md

# API Module: ol

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/external.ol.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/external.ol.html`

## Состав модуля по TypeDoc
- В этом модуле не найден индекс публичных сущностей.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/external.ol.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>ol | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="external.html">external</a></li><li><a href="external.ol.html">ol</a></li></ul><h1>Namespace ol</h1></div><aside class="tsd-sources"><ul><li>Defined in ../node_modules/ol/index.d.ts:1</li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><details class="tsd-index-content tsd-accordion" open><summary class="tsd-accordion-summary tsd-index-summary"><h5 class="tsd-index-heading uppercase" role="button" aria-expanded="false" tabIndex="0"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><use href="../assets/icons.svg#icon-chevronSmall"></use></svg> Index</h5></summary><div class="tsd-accordion-details"><section class="tsd-index-section"><h3 class="tsd-index-heading">References</h3><div class="tsd-index-list"><a href="external.ol.html#ImageWrapper" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4194304"></use></svg><span>Image<wbr/>Wrapper</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/external.ol.Collection.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Collection</span></a>
<a href="../classes/external.ol.Disposable.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Disposable</span></a>
<a href="../classes/external.ol.Feature.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Feature</span></a>
<a href="../classes/external.ol.Geolocation.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Geolocation</span></a>
<a href="../classes/external.ol.Graticule.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Graticule</span></a>
<a href="../classes/external.ol.Image.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image</span></a>
<a href="../classes/external.ol.ImageCanvas.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>Canvas</span></a>
<a href="../classes/external.ol.ImageTile.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>Tile</span></a>
<a href="../classes/external.ol.Kinetic.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Kinetic</span></a>
<a href="../classes/external.ol.Map.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Map</span></a>
<a href="../classes/external.ol.MapBrowserEvent.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Map<wbr/>Browser<wbr/>Event</span></a>
<a href="../classes/external.ol.MapBrowserEventHandler.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Map<wbr/>Browser<wbr/>Event<wbr/>Handler</span></a>
<a href="../classes/external.ol.MapEvent.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Map<wbr/>Event</span></a>
<a href="../classes/external.ol.Object.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Object</span></a>
<a href="../classes/external.ol.Observable.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Observable</span></a>
<a href="../classes/external.ol.Overlay.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Overlay</span></a>
<a href="../classes/external.ol.Tile.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Tile</span></a>
<a href="../classes/external.ol.TileQueue.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Tile<wbr/>Queue</span></a>
<a href="../classes/external.ol.TileRange.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Tile<wbr/>Range</span></a>
<a href="../classes/external.ol.VectorRenderTile.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector<wbr/>Render<wbr/>Tile</span></a>
<a href="../classes/external.ol.VectorTile.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector<wbr/>Tile</span></a>
<a href="../classes/external.ol.View.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>View</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Variables</h3><div class="tsd-index-list"><a href="../variables/external.ol.VERSION.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>VERSION</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Functions</h3><div class="tsd-index-list"><a href="../functions/external.ol.getUid.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>get<wbr/>Uid</span></a>
</div></section></div></details></section></section><details class="tsd-panel-group tsd-member-group tsd-accordion" open><summary class="tsd-accordion-summary" data-key="section-References"><h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg> References</h2></summary><section><section class="tsd-panel tsd-member tsd-is-external"><a id="ImageWrapper" class="tsd-anchor"></a><h3 class="tsd-anchor-link"><span>Image<wbr/>Wrapper</span><a href="#ImageWrapper" aria-label="Permalink" class="tsd-anchor-icon"><svg viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-anchor"></use></svg></a></h3>Renames and re-exports <a href="../classes/external.ol.Image.html">Image</a></section></section></details></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div><details open class="tsd-accordion tsd-page-navigation"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>On This Page</h3></summary><div class="tsd-accordion-details"><details open class="tsd-accordion tsd-page-navigation-section"><summary class="tsd-accordion-summary" data-key="tsd-otp-References"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>References</summary><div><a href="#ImageWrapper" class="tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4194304"></use></svg><span>Image<wbr/>Wrapper</span></a></div></details></div></details></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

---

## Source: manuals/apidocs/external.olgeom.md

Source Path: manuals/apidocs/external.olgeom.md

# API Module: olgeom

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/external.olgeom.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/external.olgeom.html`

## Состав модуля по TypeDoc
- В этом модуле не найден индекс публичных сущностей.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/external.olgeom.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>olgeom | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="external.html">external</a></li><li><a href="external.olgeom.html">olgeom</a></li></ul><h1>Namespace olgeom</h1></div><aside class="tsd-sources"><ul><li>Defined in ../node_modules/ol/geom.d.ts:1</li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/external.olgeom.Circle.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Circle</span></a>
<a href="../classes/external.olgeom.Geometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Geometry</span></a>
<a href="../classes/external.olgeom.GeometryCollection.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Geometry<wbr/>Collection</span></a>
<a href="../classes/external.olgeom.LinearRing.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Linear<wbr/>Ring</span></a>
<a href="../classes/external.olgeom.LineString.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Line<wbr/>String</span></a>
<a href="../classes/external.olgeom.MultiLineString.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Multi<wbr/>Line<wbr/>String</span></a>
<a href="../classes/external.olgeom.MultiPoint.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Multi<wbr/>Point</span></a>
<a href="../classes/external.olgeom.MultiPolygon.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Multi<wbr/>Polygon</span></a>
<a href="../classes/external.olgeom.Point.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Point</span></a>
<a href="../classes/external.olgeom.Polygon.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Polygon</span></a>
<a href="../classes/external.olgeom.SimpleGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Simple<wbr/>Geometry</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

---

## Source: manuals/apidocs/external.olsource.md

Source Path: manuals/apidocs/external.olsource.md

# API Module: olsource

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/external.olsource.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/external.olsource.html`

## Состав модуля по TypeDoc
- В этом модуле не найден индекс публичных сущностей.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/external.olsource.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>olsource | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="external.html">external</a></li><li><a href="external.olsource.html">olsource</a></li></ul><h1>Namespace olsource</h1></div><aside class="tsd-sources"><ul><li>Defined in ../node_modules/ol/source.d.ts:1</li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/external.olsource.BingMaps.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Bing<wbr/>Maps</span></a>
<a href="../classes/external.olsource.CartoDB.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>CartoDB</span></a>
<a href="../classes/external.olsource.Cluster.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Cluster</span></a>
<a href="../classes/external.olsource.DataTile.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Data<wbr/>Tile</span></a>
<a href="../classes/external.olsource.GeoTIFF.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>GeoTIFF</span></a>
<a href="../classes/external.olsource.Google.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Google</span></a>
<a href="../classes/external.olsource.IIIF.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>IIIF</span></a>
<a href="../classes/external.olsource.Image.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image</span></a>
<a href="../classes/external.olsource.ImageArcGISRest.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>ArcGISRest</span></a>
<a href="../classes/external.olsource.ImageCanvas.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>Canvas</span></a>
<a href="../classes/external.olsource.ImageMapGuide.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>Map<wbr/>Guide</span></a>
<a href="../classes/external.olsource.ImageStatic.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>Static</span></a>
<a href="../classes/external.olsource.ImageTile.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>Tile</span></a>
<a href="../classes/external.olsource.ImageWMS.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>ImageWMS</span></a>
<a href="../classes/external.olsource.OGCMapTile.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>OGCMap<wbr/>Tile</span></a>
<a href="../classes/external.olsource.OGCVectorTile.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>OGCVector<wbr/>Tile</span></a>
<a href="../classes/external.olsource.OSM.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>OSM</span></a>
<a href="../classes/external.olsource.Raster.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Raster</span></a>
<a href="../classes/external.olsource.Source.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Source</span></a>
<a href="../classes/external.olsource.StadiaMaps.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Stadia<wbr/>Maps</span></a>
<a href="../classes/external.olsource.Tile.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Tile</span></a>
<a href="../classes/external.olsource.TileArcGISRest.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Tile<wbr/>ArcGISRest</span></a>
<a href="../classes/external.olsource.TileDebug.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Tile<wbr/>Debug</span></a>
<a href="../classes/external.olsource.TileImage.html" class="tsd-index-link deprecated tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Tile<wbr/>Image</span></a>
<a href="../classes/external.olsource.TileJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>TileJSON</span></a>
<a href="../classes/external.olsource.TileWMS.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>TileWMS</span></a>
<a href="../classes/external.olsource.UrlTile.html" class="tsd-index-link deprecated tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Url<wbr/>Tile</span></a>
<a href="../classes/external.olsource.UTFGrid.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>UTFGrid</span></a>
<a href="../classes/external.olsource.Vector.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector</span></a>
<a href="../classes/external.olsource.VectorTile.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector<wbr/>Tile</span></a>
<a href="../classes/external.olsource.WMTS.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WMTS</span></a>
<a href="../classes/external.olsource.XYZ.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>XYZ</span></a>
<a href="../classes/external.olsource.Zoomify.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Zoomify</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Functions</h3><div class="tsd-index-list"><a href="../functions/external.olsource.createArcGISRestLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>create<wbr/>ArcGISRest<wbr/>Loader</span></a>
<a href="../functions/external.olsource.createMapGuideLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>create<wbr/>Map<wbr/>Guide<wbr/>Loader</span></a>
<a href="../functions/external.olsource.createStaticLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>create<wbr/>Static<wbr/>Loader</span></a>
<a href="../functions/external.olsource.createWMSLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>createWMSLoader</span></a>
<a href="../functions/external.olsource.sourcesFromTileGrid.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>sources<wbr/>From<wbr/>Tile<wbr/>Grid</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

---

## Source: manuals/apidocs/external.three.AudioContext.md

Source Path: manuals/apidocs/external.three.AudioContext.md

# API Module: AudioContext

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/external.three.AudioContext.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/external.three.AudioContext.html`

## Состав модуля по TypeDoc
- В этом модуле не найден индекс публичных сущностей.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/external.three.AudioContext.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>AudioContext | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="external.html">external</a></li><li><a href="external.three.html">three</a></li><li><a href="external.three.AudioContext.html">AudioContext</a></li></ul><h1>Namespace AudioContext</h1></div><section class="tsd-panel tsd-comment"><div class="tsd-comment tsd-typography"><p>This contains methods for setting up an <a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioContext">AudioContext</a>.
Used internally by the <a href="../classes/external.three.AudioListener.html" class="tsd-kind-class">AudioListener</a> and <a href="../classes/external.three.AudioLoader.html" class="tsd-kind-class">AudioLoader</a> classes.
This uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API">Web Audio API</a>.</p>
</div><div class="tsd-comment tsd-typography"><div class="tsd-tag-See"><h4 class="tsd-anchor-link"><a id="See" class="tsd-anchor"></a>See<a href="#See" aria-label="Permalink" class="tsd-anchor-icon"><svg viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-anchor"></use></svg></a></h4><ul>
<li><a href="https://threejs.org/docs/index.html#api/en/audio/AudioContext">Official Documentation</a></li>
<li><a href="https://github.com/mrdoob/three.js/blob/master/src/audio/AudioContext.js">Source</a></li>
</ul>
</div></div></section><aside class="tsd-sources"><ul><li>Defined in ../node_modules/@types/three/src/audio/AudioContext.d.ts:8</li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Functions</h3><div class="tsd-index-list"><a href="../functions/external.three.AudioContext.getContext.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>get<wbr/>Context</span></a>
<a href="../functions/external.three.AudioContext.setContext.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>set<wbr/>Context</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

---

## Source: manuals/apidocs/external.three.md

Source Path: manuals/apidocs/external.three.md

# API Module: three

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/external.three.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/external.three.html`

## Состав модуля по TypeDoc
- В этом модуле не найден индекс публичных сущностей.

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/external.three.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>three | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="external.html">external</a></li><li><a href="external.three.html">three</a></li></ul><h1>Namespace three</h1></div><aside class="tsd-sources"><ul><li>Defined in ../node_modules/@types/three/build/three.module.d.ts:1</li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Namespaces</h3><div class="tsd-index-list"><a href="external.three.AudioContext.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>Audio<wbr/>Context</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Enumerations</h3><div class="tsd-index-list"><a href="../enums/external.three.MOUSE.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-8"></use></svg><span>MOUSE</span></a>
<a href="../enums/external.three.TOUCH.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-8"></use></svg><span>TOUCH</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/external.three.AmbientLight.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Ambient<wbr/>Light</span></a>
<a href="../classes/external.three.AnimationAction.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Animation<wbr/>Action</span></a>
<a href="../classes/external.three.AnimationClip.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Animation<wbr/>Clip</span></a>
<a href="../classes/external.three.AnimationLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Animation<wbr/>Loader</span></a>
<a href="../classes/external.three.AnimationMixer.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Animation<wbr/>Mixer</span></a>
<a href="../classes/external.three.AnimationObjectGroup.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Animation<wbr/>Object<wbr/>Group</span></a>
<a href="../classes/external.three.ArcCurve.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Arc<wbr/>Curve</span></a>
<a href="../classes/external.three.ArrayCamera.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Array<wbr/>Camera</span></a>
<a href="../classes/external.three.ArrowHelper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Arrow<wbr/>Helper</span></a>
<a href="../classes/external.three.Audio.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Audio</span></a>
<a href="../classes/external.three.AudioAnalyser.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Audio<wbr/>Analyser</span></a>
<a href="../classes/external.three.AudioListener.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Audio<wbr/>Listener</span></a>
<a href="../classes/external.three.AudioLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Audio<wbr/>Loader</span></a>
<a href="../classes/external.three.AxesHelper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Axes<wbr/>Helper</span></a>
<a href="../classes/external.three.BatchedMesh.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Batched<wbr/>Mesh</span></a>
<a href="../classes/external.three.Bone.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Bone</span></a>
<a href="../classes/external.three.BooleanKeyframeTrack.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Boolean<wbr/>Keyframe<wbr/>Track</span></a>
<a href="../classes/external.three.Box2.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Box2</span></a>
<a href="../classes/external.three.Box3.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Box3</span></a>
<a href="../classes/external.three.Box3Helper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Box3<wbr/>Helper</span></a>
<a href="../classes/external.three.BoxGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Box<wbr/>Geometry</span></a>
<a href="../classes/external.three.BoxHelper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Box<wbr/>Helper</span></a>
<a href="../classes/external.three.BufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Buffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.BufferGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Buffer<wbr/>Geometry</span></a>
<a href="../classes/external.three.BufferGeometryLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Buffer<wbr/>Geometry<wbr/>Loader</span></a>
<a href="../classes/external.three.Camera.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Camera</span></a>
<a href="../classes/external.three.CameraHelper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Camera<wbr/>Helper</span></a>
<a href="../classes/external.three.CanvasTexture.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Canvas<wbr/>Texture</span></a>
<a href="../classes/external.three.CapsuleGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Capsule<wbr/>Geometry</span></a>
<a href="../classes/external.three.CatmullRomCurve3.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Catmull<wbr/>Rom<wbr/>Curve3</span></a>
<a href="../classes/external.three.CircleGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Circle<wbr/>Geometry</span></a>
<a href="../classes/external.three.Clock.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Clock</span></a>
<a href="../classes/external.three.Color.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Color</span></a>
<a href="../classes/external.three.ColorKeyframeTrack.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Color<wbr/>Keyframe<wbr/>Track</span></a>
<a href="../classes/external.three.CompressedArrayTexture.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Compressed<wbr/>Array<wbr/>Texture</span></a>
<a href="../classes/external.three.CompressedCubeTexture.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Compressed<wbr/>Cube<wbr/>Texture</span></a>
<a href="../classes/external.three.CompressedTexture.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Compressed<wbr/>Texture</span></a>
<a href="../classes/external.three.CompressedTextureLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Compressed<wbr/>Texture<wbr/>Loader</span></a>
<a href="../classes/external.three.ConeGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Cone<wbr/>Geometry</span></a>
<a href="../classes/external.three.Controls.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Controls</span></a>
<a href="../classes/external.three.CubeCamera.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Cube<wbr/>Camera</span></a>
<a href="../classes/external.three.CubeTexture.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Cube<wbr/>Texture</span></a>
<a href="../classes/external.three.CubeTextureLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Cube<wbr/>Texture<wbr/>Loader</span></a>
<a href="../classes/external.three.CubicBezierCurve.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Cubic<wbr/>Bezier<wbr/>Curve</span></a>
<a href="../classes/external.three.CubicBezierCurve3.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Cubic<wbr/>Bezier<wbr/>Curve3</span></a>
<a href="../classes/external.three.CubicInterpolant.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Cubic<wbr/>Interpolant</span></a>
<a href="../classes/external.three.Curve.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Curve</span></a>
<a href="../classes/external.three.CurvePath.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Curve<wbr/>Path</span></a>
<a href="../classes/external.three.CylinderGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Cylinder<wbr/>Geometry</span></a>
<a href="../classes/external.three.Cylindrical.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Cylindrical</span></a>
<a href="../classes/external.three.Data3DTexture.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Data3DTexture</span></a>
<a href="../classes/external.three.DataArrayTexture.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Data<wbr/>Array<wbr/>Texture</span></a>
<a href="../classes/external.three.DataTexture.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Data<wbr/>Texture</span></a>
<a href="../classes/external.three.DataTextureLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Data<wbr/>Texture<wbr/>Loader</span></a>
<a href="../classes/external.three.DepthTexture.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Depth<wbr/>Texture</span></a>
<a href="../classes/external.three.DirectionalLight.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Directional<wbr/>Light</span></a>
<a href="../classes/external.three.DirectionalLightHelper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Directional<wbr/>Light<wbr/>Helper</span></a>
<a href="../classes/external.three.DirectionalLightShadow.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Directional<wbr/>Light<wbr/>Shadow</span></a>
<a href="../classes/external.three.DiscreteInterpolant.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Discrete<wbr/>Interpolant</span></a>
<a href="../classes/external.three.DodecahedronGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Dodecahedron<wbr/>Geometry</span></a>
<a href="../classes/external.three.EdgesGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Edges<wbr/>Geometry</span></a>
<a href="../classes/external.three.EllipseCurve.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Ellipse<wbr/>Curve</span></a>
<a href="../classes/external.three.Euler.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Euler</span></a>
<a href="../classes/external.three.EventDispatcher.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Event<wbr/>Dispatcher</span></a>
<a href="../classes/external.three.ExtrudeGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Extrude<wbr/>Geometry</span></a>
<a href="../classes/external.three.FileLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>File<wbr/>Loader</span></a>
<a href="../classes/external.three.Float16BufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Float16<wbr/>Buffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.Float32BufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Float32<wbr/>Buffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.Fog.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Fog</span></a>
<a href="../classes/external.three.FogExp2.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Fog<wbr/>Exp2</span></a>
<a href="../classes/external.three.FramebufferTexture.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Framebuffer<wbr/>Texture</span></a>
<a href="../classes/external.three.Frustum.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Frustum</span></a>
<a href="../classes/external.three.GLBufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>GLBuffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.GridHelper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Grid<wbr/>Helper</span></a>
<a href="../classes/external.three.Group.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Group</span></a>
<a href="../classes/external.three.HemisphereLight.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Hemisphere<wbr/>Light</span></a>
<a href="../classes/external.three.HemisphereLightHelper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Hemisphere<wbr/>Light<wbr/>Helper</span></a>
<a href="../classes/external.three.IcosahedronGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Icosahedron<wbr/>Geometry</span></a>
<a href="../classes/external.three.ImageBitmapLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>Bitmap<wbr/>Loader</span></a>
<a href="../classes/external.three.ImageLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>Loader</span></a>
<a href="../classes/external.three.ImageUtils.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>Utils</span></a>
<a href="../classes/external.three.InstancedBufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Instanced<wbr/>Buffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.InstancedBufferGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Instanced<wbr/>Buffer<wbr/>Geometry</span></a>
<a href="../classes/external.three.InstancedInterleavedBuffer.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Instanced<wbr/>Interleaved<wbr/>Buffer</span></a>
<a href="../classes/external.three.InstancedMesh.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Instanced<wbr/>Mesh</span></a>
<a href="../classes/external.three.Int16BufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Int16<wbr/>Buffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.Int32BufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Int32<wbr/>Buffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.Int8BufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Int8<wbr/>Buffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.InterleavedBuffer.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Interleaved<wbr/>Buffer</span></a>
<a href="../classes/external.three.InterleavedBufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Interleaved<wbr/>Buffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.Interpolant.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Interpolant</span></a>
<a href="../classes/external.three.KeyframeTrack.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Keyframe<wbr/>Track</span></a>
<a href="../classes/external.three.LatheGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Lathe<wbr/>Geometry</span></a>
<a href="../classes/external.three.Layers.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Layers</span></a>
<a href="../classes/external.three.Light.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Light</span></a>
<a href="../classes/external.three.LightProbe.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Light<wbr/>Probe</span></a>
<a href="../classes/external.three.LightShadow.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Light<wbr/>Shadow</span></a>
<a href="../classes/external.three.Line.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Line</span></a>
<a href="../classes/external.three.Line3.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Line3</span></a>
<a href="../classes/external.three.LinearInterpolant.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Linear<wbr/>Interpolant</span></a>
<a href="../classes/external.three.LineBasicMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Line<wbr/>Basic<wbr/>Material</span></a>
<a href="../classes/external.three.LineCurve.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Line<wbr/>Curve</span></a>
<a href="../classes/external.three.LineCurve3.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Line<wbr/>Curve3</span></a>
<a href="../classes/external.three.LineDashedMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Line<wbr/>Dashed<wbr/>Material</span></a>
<a href="../classes/external.three.LineLoop.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Line<wbr/>Loop</span></a>
<a href="../classes/external.three.LineSegments.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Line<wbr/>Segments</span></a>
<a href="../classes/external.three.Loader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Loader</span></a>
<a href="../classes/external.three.LoaderUtils.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Loader<wbr/>Utils</span></a>
<a href="../classes/external.three.LoadingManager.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Loading<wbr/>Manager</span></a>
<a href="../classes/external.three.LOD.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>LOD</span></a>
<a href="../classes/external.three.Material.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Material</span></a>
<a href="../classes/external.three.MaterialLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Material<wbr/>Loader</span></a>
<a href="../classes/external.three.Matrix2.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Matrix2</span></a>
<a href="../classes/external.three.Matrix3.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Matrix3</span></a>
<a href="../classes/external.three.Matrix4.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Matrix4</span></a>
<a href="../classes/external.three.Mesh.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mesh</span></a>
<a href="../classes/external.three.MeshBasicMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mesh<wbr/>Basic<wbr/>Material</span></a>
<a href="../classes/external.three.MeshDepthMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mesh<wbr/>Depth<wbr/>Material</span></a>
<a href="../classes/external.three.MeshDistanceMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mesh<wbr/>Distance<wbr/>Material</span></a>
<a href="../classes/external.three.MeshLambertMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mesh<wbr/>Lambert<wbr/>Material</span></a>
<a href="../classes/external.three.MeshMatcapMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mesh<wbr/>Matcap<wbr/>Material</span></a>
<a href="../classes/external.three.MeshNormalMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mesh<wbr/>Normal<wbr/>Material</span></a>
<a href="../classes/external.three.MeshPhongMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mesh<wbr/>Phong<wbr/>Material</span></a>
<a href="../classes/external.three.MeshPhysicalMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mesh<wbr/>Physical<wbr/>Material</span></a>
<a href="../classes/external.three.MeshStandardMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mesh<wbr/>Standard<wbr/>Material</span></a>
<a href="../classes/external.three.MeshToonMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mesh<wbr/>Toon<wbr/>Material</span></a>
<a href="../classes/external.three.NumberKeyframeTrack.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Number<wbr/>Keyframe<wbr/>Track</span></a>
<a href="../classes/external.three.Object3D.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Object3D</span></a>
<a href="../classes/external.three.ObjectLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Object<wbr/>Loader</span></a>
<a href="../classes/external.three.OctahedronGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Octahedron<wbr/>Geometry</span></a>
<a href="../classes/external.three.OrthographicCamera.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Orthographic<wbr/>Camera</span></a>
<a href="../classes/external.three.Path.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Path</span></a>
<a href="../classes/external.three.PerspectiveCamera.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Perspective<wbr/>Camera</span></a>
<a href="../classes/external.three.Plane.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Plane</span></a>
<a href="../classes/external.three.PlaneGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Plane<wbr/>Geometry</span></a>
<a href="../classes/external.three.PlaneHelper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Plane<wbr/>Helper</span></a>
<a href="../classes/external.three.PMREMGenerator.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>PMREMGenerator</span></a>
<a href="../classes/external.three.PointLight.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Point<wbr/>Light</span></a>
<a href="../classes/external.three.PointLightHelper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Point<wbr/>Light<wbr/>Helper</span></a>
<a href="../classes/external.three.PointLightShadow.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Point<wbr/>Light<wbr/>Shadow</span></a>
<a href="../classes/external.three.Points.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Points</span></a>
<a href="../classes/external.three.PointsMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Points<wbr/>Material</span></a>
<a href="../classes/external.three.PolarGridHelper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Polar<wbr/>Grid<wbr/>Helper</span></a>
<a href="../classes/external.three.PolyhedronGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Polyhedron<wbr/>Geometry</span></a>
<a href="../classes/external.three.PositionalAudio.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Positional<wbr/>Audio</span></a>
<a href="../classes/external.three.PropertyBinding.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Property<wbr/>Binding</span></a>
<a href="../classes/external.three.PropertyMixer.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Property<wbr/>Mixer</span></a>
<a href="../classes/external.three.QuadraticBezierCurve.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Quadratic<wbr/>Bezier<wbr/>Curve</span></a>
<a href="../classes/external.three.QuadraticBezierCurve3.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Quadratic<wbr/>Bezier<wbr/>Curve3</span></a>
<a href="../classes/external.three.Quaternion.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Quaternion</span></a>
<a href="../classes/external.three.QuaternionKeyframeTrack.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Quaternion<wbr/>Keyframe<wbr/>Track</span></a>
<a href="../classes/external.three.QuaternionLinearInterpolant.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Quaternion<wbr/>Linear<wbr/>Interpolant</span></a>
<a href="../classes/external.three.RawShaderMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Raw<wbr/>Shader<wbr/>Material</span></a>
<a href="../classes/external.three.Ray.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Ray</span></a>
<a href="../classes/external.three.Raycaster.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Raycaster</span></a>
<a href="../classes/external.three.RectAreaLight.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Rect<wbr/>Area<wbr/>Light</span></a>
<a href="../classes/external.three.RenderTarget.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Render<wbr/>Target</span></a>
<a href="../classes/external.three.RingGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Ring<wbr/>Geometry</span></a>
<a href="../classes/external.three.Scene.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Scene</span></a>
<a href="../classes/external.three.ShaderMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Shader<wbr/>Material</span></a>
<a href="../classes/external.three.ShadowMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Shadow<wbr/>Material</span></a>
<a href="../classes/external.three.Shape.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Shape</span></a>
<a href="../classes/external.three.ShapeGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Shape<wbr/>Geometry</span></a>
<a href="../classes/external.three.ShapePath.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Shape<wbr/>Path</span></a>
<a href="../classes/external.three.ShapeUtils.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Shape<wbr/>Utils</span></a>
<a href="../classes/external.three.Skeleton.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Skeleton</span></a>
<a href="../classes/external.three.SkeletonHelper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Skeleton<wbr/>Helper</span></a>
<a href="../classes/external.three.SkinnedMesh.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Skinned<wbr/>Mesh</span></a>
<a href="../classes/external.three.Source.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Source</span></a>
<a href="../classes/external.three.SourceJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>SourceJSON</span></a>
<a href="../classes/external.three.Sphere.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Sphere</span></a>
<a href="../classes/external.three.SphereGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Sphere<wbr/>Geometry</span></a>
<a href="../classes/external.three.Spherical.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Spherical</span></a>
<a href="../classes/external.three.SphericalHarmonics3.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Spherical<wbr/>Harmonics3</span></a>
<a href="../classes/external.three.SplineCurve.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Spline<wbr/>Curve</span></a>
<a href="../classes/external.three.SpotLight.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Spot<wbr/>Light</span></a>
<a href="../classes/external.three.SpotLightHelper.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Spot<wbr/>Light<wbr/>Helper</span></a>
<a href="../classes/external.three.SpotLightShadow.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Spot<wbr/>Light<wbr/>Shadow</span></a>
<a href="../classes/external.three.Sprite.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Sprite</span></a>
<a href="../classes/external.three.SpriteMaterial.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Sprite<wbr/>Material</span></a>
<a href="../classes/external.three.StereoCamera.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Stereo<wbr/>Camera</span></a>
<a href="../classes/external.three.StringKeyframeTrack.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>String<wbr/>Keyframe<wbr/>Track</span></a>
<a href="../classes/external.three.TetrahedronGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Tetrahedron<wbr/>Geometry</span></a>
<a href="../classes/external.three.Texture.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Texture</span></a>
<a href="../classes/external.three.TextureLoader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Texture<wbr/>Loader</span></a>
<a href="../classes/external.three.TorusGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Torus<wbr/>Geometry</span></a>
<a href="../classes/external.three.TorusKnotGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Torus<wbr/>Knot<wbr/>Geometry</span></a>
<a href="../classes/external.three.Triangle.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Triangle</span></a>
<a href="../classes/external.three.TubeGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Tube<wbr/>Geometry</span></a>
<a href="../classes/external.three.Uint16BufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Uint16<wbr/>Buffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.Uint32BufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Uint32<wbr/>Buffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.Uint8BufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Uint8<wbr/>Buffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.Uint8ClampedBufferAttribute.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Uint8<wbr/>Clamped<wbr/>Buffer<wbr/>Attribute</span></a>
<a href="../classes/external.three.Uniform.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Uniform</span></a>
<a href="../classes/external.three.UniformsGroup.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Uniforms<wbr/>Group</span></a>
<a href="../classes/external.three.Vector2.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector2</span></a>
<a href="../classes/external.three.Vector3.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector3</span></a>
<a href="../classes/external.three.Vector4.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector4</span></a>
<a href="../classes/external.three.VectorKeyframeTrack.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector<wbr/>Keyframe<wbr/>Track</span></a>
<a href="../classes/external.three.VideoTexture.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Video<wbr/>Texture</span></a>
<a href="../classes/external.three.WebGL3DRenderTarget.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGL3DRender<wbr/>Target</span></a>
<a href="../classes/external.three.WebGLArrayRenderTarget.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLArray<wbr/>Render<wbr/>Target</span></a>
<a href="../classes/external.three.WebGLAttributes.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLAttributes</span></a>
<a href="../classes/external.three.WebGLBindingStates.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLBinding<wbr/>States</span></a>
<a href="../classes/external.three.WebGLBufferRenderer.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLBuffer<wbr/>Renderer</span></a>
<a href="../classes/external.three.WebGLCapabilities.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLCapabilities</span></a>
<a href="../classes/external.three.WebGLClipping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLClipping</span></a>
<a href="../classes/external.three.WebGLCubeMaps.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLCube<wbr/>Maps</span></a>
<a href="../classes/external.three.WebGLCubeRenderTarget.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLCube<wbr/>Render<wbr/>Target</span></a>
<a href="../classes/external.three.WebGLCubeUVMaps.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLCubeUVMaps</span></a>
<a href="../classes/external.three.WebGLExtensions.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLExtensions</span></a>
<a href="../classes/external.three.WebGLGeometries.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLGeometries</span></a>
<a href="../classes/external.three.WebGLIndexedBufferRenderer.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLIndexed<wbr/>Buffer<wbr/>Renderer</span></a>
<a href="../classes/external.three.WebGLInfo.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLInfo</span></a>
<a href="../classes/external.three.WebGLLights.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLLights</span></a>
<a href="../classes/external.three.WebGLMultipleRenderTargets.html" class="tsd-index-link deprecated tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLMultiple<wbr/>Render<wbr/>Targets</span></a>
<a href="../classes/external.three.WebGLObjects.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLObjects</span></a>
<a href="../classes/external.three.WebGLProgram.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLProgram</span></a>
<a href="../classes/external.three.WebGLPrograms.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLPrograms</span></a>
<a href="../classes/external.three.WebGLProperties.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLProperties</span></a>
<a href="../classes/external.three.WebGLRenderer.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLRenderer</span></a>
<a href="../classes/external.three.WebGLRenderList.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLRender<wbr/>List</span></a>
<a href="../classes/external.three.WebGLRenderLists.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLRender<wbr/>Lists</span></a>
<a href="../classes/external.three.WebGLRenderTarget.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLRender<wbr/>Target</span></a>
<a href="../classes/external.three.WebGLShadowMap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLShadow<wbr/>Map</span></a>
<a href="../classes/external.three.WebGLState.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLState</span></a>
<a href="../classes/external.three.WebGLTextures.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLTextures</span></a>
<a href="../classes/external.three.WebGLUniforms.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLUniforms</span></a>
<a href="../classes/external.three.WebGLUtils.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebGLUtils</span></a>
<a href="../classes/external.three.WebXRController.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebXRController</span></a>
<a href="../classes/external.three.WebXRDepthSensing.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebXRDepth<wbr/>Sensing</span></a>
<a href="../classes/external.three.WebXRManager.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>WebXRManager</span></a>
<a href="../classes/external.three.WireframeGeometry.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Wireframe<wbr/>Geometry</span></a>
<a href="../classes/external.three.XRGripSpace.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>XRGrip<wbr/>Space</span></a>
<a href="../classes/external.three.XRHandSpace.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>XRHand<wbr/>Space</span></a>
<a href="../classes/external.three.XRJointSpace.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>XRJoint<wbr/>Space</span></a>
<a href="../classes/external.three.XRTargetRaySpace.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>XRTarget<wbr/>Ray<wbr/>Space</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/external.three.AnimationClipJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Animation<wbr/>ClipJSON</span></a>
<a href="../interfaces/external.three.AnimationMixerEventMap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Animation<wbr/>Mixer<wbr/>Event<wbr/>Map</span></a>
<a href="../interfaces/external.three.BaseEvent.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Base<wbr/>Event</span></a>
<a href="../interfaces/external.three.BatchedMeshGeometryRange.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Batched<wbr/>Mesh<wbr/>Geometry<wbr/>Range</span></a>
<a href="../interfaces/external.three.BufferAttributeJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Buffer<wbr/>AttributeJSON</span></a>
<a href="../interfaces/external.three.BufferGeometryJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Buffer<wbr/>GeometryJSON</span></a>
<a href="../interfaces/external.three.ColorManagement.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Color<wbr/>Management</span></a>
<a href="../interfaces/external.three.ColorSpaceDefinition.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Color<wbr/>Space<wbr/>Definition</span></a>
<a href="../interfaces/external.three.CompressedTextureMipmap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Compressed<wbr/>Texture<wbr/>Mipmap</span></a>
<a href="../interfaces/external.three.CurveJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>CurveJSON</span></a>
<a href="../interfaces/external.three.CurvePathJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Curve<wbr/>PathJSON</span></a>
<a href="../interfaces/external.three.Event.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Event</span></a>
<a href="../interfaces/external.three.ExtrudeGeometryOptions.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Extrude<wbr/>Geometry<wbr/>Options</span></a>
<a href="../interfaces/external.three.Face.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Face</span></a>
<a href="../interfaces/external.three.FogExp2JSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Fog<wbr/>Exp2JSON</span></a>
<a href="../interfaces/external.three.FogJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>FogJSON</span></a>
<a href="../interfaces/external.three.GeometryGroup.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Geometry<wbr/>Group</span></a>
<a href="../interfaces/external.three.HSL.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>HSL</span></a>
<a href="../interfaces/external.three.InstancedMeshEventMap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Instanced<wbr/>Mesh<wbr/>Event<wbr/>Map</span></a>
<a href="../interfaces/external.three.InstancedMeshJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Instanced<wbr/>MeshJSON</span></a>
<a href="../interfaces/external.three.InstancedMeshJSONObject.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Instanced<wbr/>MeshJSONObject</span></a>
<a href="../interfaces/external.three.Intersection.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Intersection</span></a>
<a href="../interfaces/external.three.IUniform.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>IUniform</span></a>
<a href="../interfaces/external.three.JSONMeta.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>JSONMeta</span></a>
<a href="../interfaces/external.three.KeyframeTrackJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Keyframe<wbr/>TrackJSON</span></a>
<a href="../interfaces/external.three.LightJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>LightJSON</span></a>
<a href="../interfaces/external.three.LightShadowJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Light<wbr/>ShadowJSON</span></a>
<a href="../interfaces/external.three.LineBasicMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Line<wbr/>Basic<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.LineDashedMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Line<wbr/>Dashed<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.LODJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>LODJSON</span></a>
<a href="../interfaces/external.three.LODJSONObject.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>LODJSONObject</span></a>
<a href="../interfaces/external.three.MaterialJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>MaterialJSON</span></a>
<a href="../interfaces/external.three.MaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.MeshBasicMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Mesh<wbr/>Basic<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.MeshDepthMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Mesh<wbr/>Depth<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.MeshDistanceMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Mesh<wbr/>Distance<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.MeshJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>MeshJSON</span></a>
<a href="../interfaces/external.three.MeshJSONObject.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>MeshJSONObject</span></a>
<a href="../interfaces/external.three.MeshLambertMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Mesh<wbr/>Lambert<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.MeshMatcapMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Mesh<wbr/>Matcap<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.MeshNormalMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Mesh<wbr/>Normal<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.MeshPhongMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Mesh<wbr/>Phong<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.MeshPhysicalMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Mesh<wbr/>Physical<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.MeshStandardMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Mesh<wbr/>Standard<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.MeshToonMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Mesh<wbr/>Toon<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.MorphTarget.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Morph<wbr/>Target</span></a>
<a href="../interfaces/external.three.Object3DEventMap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Object3DEvent<wbr/>Map</span></a>
<a href="../interfaces/external.three.Object3DJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Object3DJSON</span></a>
<a href="../interfaces/external.three.Object3DJSONObject.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Object3DJSONObject</span></a>
<a href="../interfaces/external.three.OffscreenCanvas.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Offscreen<wbr/>Canvas</span></a>
<a href="../interfaces/external.three.OrthographicCameraJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Orthographic<wbr/>CameraJSON</span></a>
<a href="../interfaces/external.three.OrthographicCameraJSONObject.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Orthographic<wbr/>CameraJSONObject</span></a>
<a href="../interfaces/external.three.ParseTrackNameResults.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Parse<wbr/>Track<wbr/>Name<wbr/>Results</span></a>
<a href="../interfaces/external.three.PathJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>PathJSON</span></a>
<a href="../interfaces/external.three.PerspectiveCameraJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Perspective<wbr/>CameraJSON</span></a>
<a href="../interfaces/external.three.PerspectiveCameraJSONObject.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Perspective<wbr/>CameraJSONObject</span></a>
<a href="../interfaces/external.three.PointsMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Points<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.QuaternionLike.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Quaternion<wbr/>Like</span></a>
<a href="../interfaces/external.three.RaycasterParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Raycaster<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.Renderer.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Renderer</span></a>
<a href="../interfaces/external.three.RenderItem.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Render<wbr/>Item</span></a>
<a href="../interfaces/external.three.RenderTargetOptions.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Render<wbr/>Target<wbr/>Options</span></a>
<a href="../interfaces/external.three.RGB.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>RGB</span></a>
<a href="../interfaces/external.three.SceneJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>SceneJSON</span></a>
<a href="../interfaces/external.three.SceneJSONObject.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>SceneJSONObject</span></a>
<a href="../interfaces/external.three.ShaderLibShader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Shader<wbr/>Lib<wbr/>Shader</span></a>
<a href="../interfaces/external.three.ShaderMaterialJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Shader<wbr/>MaterialJSON</span></a>
<a href="../interfaces/external.three.ShaderMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Shader<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.ShadowMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Shadow<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.ShapeJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>ShapeJSON</span></a>
<a href="../interfaces/external.three.SkeletonJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>SkeletonJSON</span></a>
<a href="../interfaces/external.three.SkinnedMeshJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Skinned<wbr/>MeshJSON</span></a>
<a href="../interfaces/external.three.SkinnedMeshJSONObject.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Skinned<wbr/>MeshJSONObject</span></a>
<a href="../interfaces/external.three.SpriteMaterialParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Sprite<wbr/>Material<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.TextureJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>TextureJSON</span></a>
<a href="../interfaces/external.three.UVGenerator.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>UVGenerator</span></a>
<a href="../interfaces/external.three.Vector2Like.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Vector2<wbr/>Like</span></a>
<a href="../interfaces/external.three.Vector3Like.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Vector3<wbr/>Like</span></a>
<a href="../interfaces/external.three.Vector4Like.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Vector4<wbr/>Like</span></a>
<a href="../interfaces/external.three.WebGLCapabilitiesParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>WebGLCapabilities<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.WebGLDebug.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>WebGLDebug</span></a>
<a href="../interfaces/external.three.WebGLLightsState.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>WebGLLights<wbr/>State</span></a>
<a href="../interfaces/external.three.WebGLProgramParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>WebGLProgram<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.WebGLProgramParametersWithUniforms.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>WebGLProgram<wbr/>Parameters<wbr/>With<wbr/>Uniforms</span></a>
<a href="../interfaces/external.three.WebGLRendererParameters.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>WebGLRenderer<wbr/>Parameters</span></a>
<a href="../interfaces/external.three.WebXRManagerEventMap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>WebXRManager<wbr/>Event<wbr/>Map</span></a>
<a href="../interfaces/external.three.WebXRSpaceEventMap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>WebXRSpace<wbr/>Event<wbr/>Map</span></a>
<a href="../interfaces/external.three.XRHandInputState.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>XRHand<wbr/>Input<wbr/>State</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Type Aliases</h3><div class="tsd-index-list"><a href="../types/external.three.AnimationActionLoopStyles.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Animation<wbr/>Action<wbr/>Loop<wbr/>Styles</span></a>
<a href="../types/external.three.AnimationBlendMode.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Animation<wbr/>Blend<wbr/>Mode</span></a>
<a href="../types/external.three.AnyMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Any<wbr/>Mapping</span></a>
<a href="../types/external.three.AnyPixelFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Any<wbr/>Pixel<wbr/>Format</span></a>
<a href="../types/external.three.AttributeGPUType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>AttributeGPUType</span></a>
<a href="../types/external.three.BindMode.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Bind<wbr/>Mode</span></a>
<a href="../types/external.three.Blending.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Blending</span></a>
<a href="../types/external.three.BlendingDstFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Blending<wbr/>Dst<wbr/>Factor</span></a>
<a href="../types/external.three.BlendingEquation.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Blending<wbr/>Equation</span></a>
<a href="../types/external.three.BlendingSrcFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Blending<wbr/>Src<wbr/>Factor</span></a>
<a href="../types/external.three.ColorRepresentation.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Color<wbr/>Representation</span></a>
<a href="../types/external.three.ColorSpace.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Color<wbr/>Space</span></a>
<a href="../types/external.three.ColorSpaceTransfer.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Color<wbr/>Space<wbr/>Transfer</span></a>
<a href="../types/external.three.Combine.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Combine</span></a>
<a href="../types/external.three.CompressedPixelFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Compressed<wbr/>Pixel<wbr/>Format</span></a>
<a href="../types/external.three.CoordinateSystem.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Coordinate<wbr/>System</span></a>
<a href="../types/external.three.CubeTextureMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Cube<wbr/>Texture<wbr/>Mapping</span></a>
<a href="../types/external.three.CullFace.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Cull<wbr/>Face</span></a>
<a href="../types/external.three.CurveType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Curve<wbr/>Type</span></a>
<a href="../types/external.three.DepthModes.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Depth<wbr/>Modes</span></a>
<a href="../types/external.three.DepthPackingStrategies.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Depth<wbr/>Packing<wbr/>Strategies</span></a>
<a href="../types/external.three.DepthTexturePixelFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Depth<wbr/>Texture<wbr/>Pixel<wbr/>Format</span></a>
<a href="../types/external.three.EulerOrder.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Euler<wbr/>Order</span></a>
<a href="../types/external.three.EulerTuple.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Euler<wbr/>Tuple</span></a>
<a href="../types/external.three.EventListener.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Event<wbr/>Listener</span></a>
<a href="../types/external.three.GLSLVersion.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>GLSLVersion</span></a>
<a href="../types/external.three.InterpolationEndingModes.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Interpolation<wbr/>Ending<wbr/>Modes</span></a>
<a href="../types/external.three.InterpolationModes.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Interpolation<wbr/>Modes</span></a>
<a href="../types/external.three.MagnificationTextureFilter.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Magnification<wbr/>Texture<wbr/>Filter</span></a>
<a href="../types/external.three.Mapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Mapping</span></a>
<a href="../types/external.three.Matrix2Tuple.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Matrix2<wbr/>Tuple</span></a>
<a href="../types/external.three.Matrix3Tuple.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Matrix3<wbr/>Tuple</span></a>
<a href="../types/external.three.Matrix4Tuple.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Matrix4<wbr/>Tuple</span></a>
<a href="../types/external.three.MinificationTextureFilter.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Minification<wbr/>Texture<wbr/>Filter</span></a>
<a href="../types/external.three.NormalBufferAttributes.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Normal<wbr/>Buffer<wbr/>Attributes</span></a>
<a href="../types/external.three.NormalMapTypes.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Normal<wbr/>Map<wbr/>Types</span></a>
<a href="../types/external.three.NormalOrGLBufferAttributes.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Normal<wbr/>OrGLBuffer<wbr/>Attributes</span></a>
<a href="../types/external.three.PixelFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Pixel<wbr/>Format</span></a>
<a href="../types/external.three.PixelFormatGPU.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Pixel<wbr/>FormatGPU</span></a>
<a href="../types/external.three.QuaternionTuple.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Quaternion<wbr/>Tuple</span></a>
<a href="../types/external.three.SerializedImage.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Serialized<wbr/>Image</span></a>
<a href="../types/external.three.ShaderMaterialUniformJSON.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Shader<wbr/>Material<wbr/>UniformJSON</span></a>
<a href="../types/external.three.ShadowMapType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Shadow<wbr/>Map<wbr/>Type</span></a>
<a href="../types/external.three.Side.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Side</span></a>
<a href="../types/external.three.StencilFunc.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Stencil<wbr/>Func</span></a>
<a href="../types/external.three.StencilOp.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Stencil<wbr/>Op</span></a>
<a href="../types/external.three.TextureComparisonFunction.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Texture<wbr/>Comparison<wbr/>Function</span></a>
<a href="../types/external.three.TextureDataType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Texture<wbr/>Data<wbr/>Type</span></a>
<a href="../types/external.three.TextureFilter.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Texture<wbr/>Filter</span></a>
<a href="../types/external.three.ToneMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Tone<wbr/>Mapping</span></a>
<a href="../types/external.three.TrianglesDrawModes.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Triangles<wbr/>Draw<wbr/>Modes</span></a>
<a href="../types/external.three.TypedArray.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Typed<wbr/>Array</span></a>
<a href="../types/external.three.Usage.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Usage</span></a>
<a href="../types/external.three.Vector2Tuple.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Vector2<wbr/>Tuple</span></a>
<a href="../types/external.three.Vector3Tuple.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Vector3<wbr/>Tuple</span></a>
<a href="../types/external.three.Vector4Tuple.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Vector4<wbr/>Tuple</span></a>
<a href="../types/external.three.WebXRArrayCamera.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>WebXRArray<wbr/>Camera</span></a>
<a href="../types/external.three.WebXRCamera.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>WebXRCamera</span></a>
<a href="../types/external.three.Wrapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Wrapping</span></a>
<a href="../types/external.three.XRControllerEventType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>XRController<wbr/>Event<wbr/>Type</span></a>
<a href="../types/external.three.XRHandJoints.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>XRHand<wbr/>Joints</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Variables</h3><div class="tsd-index-list"><a href="../variables/external.three.ACESFilmicToneMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>ACESFilmic<wbr/>Tone<wbr/>Mapping</span></a>
<a href="../variables/external.three.AddEquation.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Add<wbr/>Equation</span></a>
<a href="../variables/external.three.AdditiveAnimationBlendMode.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Additive<wbr/>Animation<wbr/>Blend<wbr/>Mode</span></a>
<a href="../variables/external.three.AdditiveBlending.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Additive<wbr/>Blending</span></a>
<a href="../variables/external.three.AddOperation.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Add<wbr/>Operation</span></a>
<a href="../variables/external.three.AgXToneMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>AgXTone<wbr/>Mapping</span></a>
<a href="../variables/external.three.AlphaFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Alpha<wbr/>Format</span></a>
<a href="../variables/external.three.AlwaysCompare.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Always<wbr/>Compare</span></a>
<a href="../variables/external.three.AlwaysDepth.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Always<wbr/>Depth</span></a>
<a href="../variables/external.three.AlwaysStencilFunc.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Always<wbr/>Stencil<wbr/>Func</span></a>
<a href="../variables/external.three.AnimationUtils.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Animation<wbr/>Utils</span></a>
<a href="../variables/external.three.AttachedBindMode.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Attached<wbr/>Bind<wbr/>Mode</span></a>
<a href="../variables/external.three.BackSide.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Back<wbr/>Side</span></a>
<a href="../variables/external.three.BasicDepthPacking.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Basic<wbr/>Depth<wbr/>Packing</span></a>
<a href="../variables/external.three.BasicShadowMap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Basic<wbr/>Shadow<wbr/>Map</span></a>
<a href="../variables/external.three.ByteType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Byte<wbr/>Type</span></a>
<a href="../variables/external.three.Cache.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Cache</span></a>
<a href="../variables/external.three.CineonToneMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Cineon<wbr/>Tone<wbr/>Mapping</span></a>
<a href="../variables/external.three.ClampToEdgeWrapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Clamp<wbr/>To<wbr/>Edge<wbr/>Wrapping</span></a>
<a href="../variables/external.three.ColorManagement-1.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Color<wbr/>Management</span></a>
<a href="../variables/external.three.ConstantAlphaFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Constant<wbr/>Alpha<wbr/>Factor</span></a>
<a href="../variables/external.three.ConstantColorFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Constant<wbr/>Color<wbr/>Factor</span></a>
<a href="../variables/external.three.CubeReflectionMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Cube<wbr/>Reflection<wbr/>Mapping</span></a>
<a href="../variables/external.three.CubeRefractionMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Cube<wbr/>Refraction<wbr/>Mapping</span></a>
<a href="../variables/external.three.CubeUVReflectionMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>CubeUVReflection<wbr/>Mapping</span></a>
<a href="../variables/external.three.CullFaceBack.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Cull<wbr/>Face<wbr/>Back</span></a>
<a href="../variables/external.three.CullFaceFront.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Cull<wbr/>Face<wbr/>Front</span></a>
<a href="../variables/external.three.CullFaceFrontBack.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Cull<wbr/>Face<wbr/>Front<wbr/>Back</span></a>
<a href="../variables/external.three.CullFaceNone.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Cull<wbr/>Face<wbr/>None</span></a>
<a href="../variables/external.three.CustomBlending.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Custom<wbr/>Blending</span></a>
<a href="../variables/external.three.CustomToneMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Custom<wbr/>Tone<wbr/>Mapping</span></a>
<a href="../variables/external.three.DataUtils.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Data<wbr/>Utils</span></a>
<a href="../variables/external.three.DecrementStencilOp.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Decrement<wbr/>Stencil<wbr/>Op</span></a>
<a href="../variables/external.three.DecrementWrapStencilOp.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Decrement<wbr/>Wrap<wbr/>Stencil<wbr/>Op</span></a>
<a href="../variables/external.three.DefaultLoadingManager.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Default<wbr/>Loading<wbr/>Manager</span></a>
<a href="../variables/external.three.DepthFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Depth<wbr/>Format</span></a>
<a href="../variables/external.three.DepthStencilFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Depth<wbr/>Stencil<wbr/>Format</span></a>
<a href="../variables/external.three.DetachedBindMode.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Detached<wbr/>Bind<wbr/>Mode</span></a>
<a href="../variables/external.three.DoubleSide.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Double<wbr/>Side</span></a>
<a href="../variables/external.three.DstAlphaFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Dst<wbr/>Alpha<wbr/>Factor</span></a>
<a href="../variables/external.three.DstColorFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Dst<wbr/>Color<wbr/>Factor</span></a>
<a href="../variables/external.three.DynamicCopyUsage.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Dynamic<wbr/>Copy<wbr/>Usage</span></a>
<a href="../variables/external.three.DynamicDrawUsage.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Dynamic<wbr/>Draw<wbr/>Usage</span></a>
<a href="../variables/external.three.DynamicReadUsage.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Dynamic<wbr/>Read<wbr/>Usage</span></a>
<a href="../variables/external.three.EqualCompare.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Equal<wbr/>Compare</span></a>
<a href="../variables/external.three.EqualDepth.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Equal<wbr/>Depth</span></a>
<a href="../variables/external.three.EqualStencilFunc.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Equal<wbr/>Stencil<wbr/>Func</span></a>
<a href="../variables/external.three.EquirectangularReflectionMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Equirectangular<wbr/>Reflection<wbr/>Mapping</span></a>
<a href="../variables/external.three.EquirectangularRefractionMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Equirectangular<wbr/>Refraction<wbr/>Mapping</span></a>
<a href="../variables/external.three.FloatType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Float<wbr/>Type</span></a>
<a href="../variables/external.three.FrontSide.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Front<wbr/>Side</span></a>
<a href="../variables/external.three.GLSL1.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>GLSL1</span></a>
<a href="../variables/external.three.GLSL3.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>GLSL3</span></a>
<a href="../variables/external.three.GreaterCompare.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Greater<wbr/>Compare</span></a>
<a href="../variables/external.three.GreaterDepth.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Greater<wbr/>Depth</span></a>
<a href="../variables/external.three.GreaterEqualCompare.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Greater<wbr/>Equal<wbr/>Compare</span></a>
<a href="../variables/external.three.GreaterEqualDepth.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Greater<wbr/>Equal<wbr/>Depth</span></a>
<a href="../variables/external.three.GreaterEqualStencilFunc.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Greater<wbr/>Equal<wbr/>Stencil<wbr/>Func</span></a>
<a href="../variables/external.three.GreaterStencilFunc.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Greater<wbr/>Stencil<wbr/>Func</span></a>
<a href="../variables/external.three.HalfFloatType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Half<wbr/>Float<wbr/>Type</span></a>
<a href="../variables/external.three.IncrementStencilOp.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Increment<wbr/>Stencil<wbr/>Op</span></a>
<a href="../variables/external.three.IncrementWrapStencilOp.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Increment<wbr/>Wrap<wbr/>Stencil<wbr/>Op</span></a>
<a href="../variables/external.three.InterpolateDiscrete.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Interpolate<wbr/>Discrete</span></a>
<a href="../variables/external.three.InterpolateLinear.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Interpolate<wbr/>Linear</span></a>
<a href="../variables/external.three.InterpolateSmooth.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Interpolate<wbr/>Smooth</span></a>
<a href="../variables/external.three.IntType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Int<wbr/>Type</span></a>
<a href="../variables/external.three.InvertStencilOp.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Invert<wbr/>Stencil<wbr/>Op</span></a>
<a href="../variables/external.three.KeepStencilOp.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Keep<wbr/>Stencil<wbr/>Op</span></a>
<a href="../variables/external.three.LessCompare.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Less<wbr/>Compare</span></a>
<a href="../variables/external.three.LessDepth.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Less<wbr/>Depth</span></a>
<a href="../variables/external.three.LessEqualCompare.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Less<wbr/>Equal<wbr/>Compare</span></a>
<a href="../variables/external.three.LessEqualDepth.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Less<wbr/>Equal<wbr/>Depth</span></a>
<a href="../variables/external.three.LessEqualStencilFunc.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Less<wbr/>Equal<wbr/>Stencil<wbr/>Func</span></a>
<a href="../variables/external.three.LessStencilFunc.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Less<wbr/>Stencil<wbr/>Func</span></a>
<a href="../variables/external.three.LinearFilter.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Linear<wbr/>Filter</span></a>
<a href="../variables/external.three.LinearMipmapLinearFilter.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Linear<wbr/>Mipmap<wbr/>Linear<wbr/>Filter</span></a>
<a href="../variables/external.three.LinearMipMapLinearFilter-1.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Linear<wbr/>Mip<wbr/>Map<wbr/>Linear<wbr/>Filter</span></a>
<a href="../variables/external.three.LinearMipmapNearestFilter.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Linear<wbr/>Mipmap<wbr/>Nearest<wbr/>Filter</span></a>
<a href="../variables/external.three.LinearMipMapNearestFilter-1.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Linear<wbr/>Mip<wbr/>Map<wbr/>Nearest<wbr/>Filter</span></a>
<a href="../variables/external.three.LinearSRGBColorSpace.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>LinearSRGBColor<wbr/>Space</span></a>
<a href="../variables/external.three.LinearToneMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Linear<wbr/>Tone<wbr/>Mapping</span></a>
<a href="../variables/external.three.LinearTransfer.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Linear<wbr/>Transfer</span></a>
<a href="../variables/external.three.LoopOnce.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Loop<wbr/>Once</span></a>
<a href="../variables/external.three.LoopPingPong.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Loop<wbr/>Ping<wbr/>Pong</span></a>
<a href="../variables/external.three.LoopRepeat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Loop<wbr/>Repeat</span></a>
<a href="../variables/external.three.LuminanceAlphaFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Luminance<wbr/>Alpha<wbr/>Format</span></a>
<a href="../variables/external.three.LuminanceFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Luminance<wbr/>Format</span></a>
<a href="../variables/external.three.MathUtils.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Math<wbr/>Utils</span></a>
<a href="../variables/external.three.MaxEquation.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Max<wbr/>Equation</span></a>
<a href="../variables/external.three.MinEquation.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Min<wbr/>Equation</span></a>
<a href="../variables/external.three.MirroredRepeatWrapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Mirrored<wbr/>Repeat<wbr/>Wrapping</span></a>
<a href="../variables/external.three.MixOperation.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Mix<wbr/>Operation</span></a>
<a href="../variables/external.three.MultiplyBlending.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Multiply<wbr/>Blending</span></a>
<a href="../variables/external.three.MultiplyOperation.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Multiply<wbr/>Operation</span></a>
<a href="../variables/external.three.NearestFilter.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Nearest<wbr/>Filter</span></a>
<a href="../variables/external.three.NearestMipmapLinearFilter.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Nearest<wbr/>Mipmap<wbr/>Linear<wbr/>Filter</span></a>
<a href="../variables/external.three.NearestMipMapLinearFilter-1.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Nearest<wbr/>Mip<wbr/>Map<wbr/>Linear<wbr/>Filter</span></a>
<a href="../variables/external.three.NearestMipmapNearestFilter.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Nearest<wbr/>Mipmap<wbr/>Nearest<wbr/>Filter</span></a>
<a href="../variables/external.three.NearestMipMapNearestFilter-1.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Nearest<wbr/>Mip<wbr/>Map<wbr/>Nearest<wbr/>Filter</span></a>
<a href="../variables/external.three.NeutralToneMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Neutral<wbr/>Tone<wbr/>Mapping</span></a>
<a href="../variables/external.three.NeverCompare.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Never<wbr/>Compare</span></a>
<a href="../variables/external.three.NeverDepth.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Never<wbr/>Depth</span></a>
<a href="../variables/external.three.NeverStencilFunc.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Never<wbr/>Stencil<wbr/>Func</span></a>
<a href="../variables/external.three.NoBlending.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>No<wbr/>Blending</span></a>
<a href="../variables/external.three.NoColorSpace.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>No<wbr/>Color<wbr/>Space</span></a>
<a href="../variables/external.three.NormalAnimationBlendMode.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Normal<wbr/>Animation<wbr/>Blend<wbr/>Mode</span></a>
<a href="../variables/external.three.NormalBlending.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Normal<wbr/>Blending</span></a>
<a href="../variables/external.three.NotEqualCompare.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Not<wbr/>Equal<wbr/>Compare</span></a>
<a href="../variables/external.three.NotEqualDepth.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Not<wbr/>Equal<wbr/>Depth</span></a>
<a href="../variables/external.three.NotEqualStencilFunc.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Not<wbr/>Equal<wbr/>Stencil<wbr/>Func</span></a>
<a href="../variables/external.three.NoToneMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>No<wbr/>Tone<wbr/>Mapping</span></a>
<a href="../variables/external.three.ObjectSpaceNormalMap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Object<wbr/>Space<wbr/>Normal<wbr/>Map</span></a>
<a href="../variables/external.three.OneFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>One<wbr/>Factor</span></a>
<a href="../variables/external.three.OneMinusConstantAlphaFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>One<wbr/>Minus<wbr/>Constant<wbr/>Alpha<wbr/>Factor</span></a>
<a href="../variables/external.three.OneMinusConstantColorFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>One<wbr/>Minus<wbr/>Constant<wbr/>Color<wbr/>Factor</span></a>
<a href="../variables/external.three.OneMinusDstAlphaFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>One<wbr/>Minus<wbr/>Dst<wbr/>Alpha<wbr/>Factor</span></a>
<a href="../variables/external.three.OneMinusDstColorFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>One<wbr/>Minus<wbr/>Dst<wbr/>Color<wbr/>Factor</span></a>
<a href="../variables/external.three.OneMinusSrcAlphaFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>One<wbr/>Minus<wbr/>Src<wbr/>Alpha<wbr/>Factor</span></a>
<a href="../variables/external.three.OneMinusSrcColorFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>One<wbr/>Minus<wbr/>Src<wbr/>Color<wbr/>Factor</span></a>
<a href="../variables/external.three.PCFShadowMap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>PCFShadow<wbr/>Map</span></a>
<a href="../variables/external.three.PCFSoftShadowMap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>PCFSoft<wbr/>Shadow<wbr/>Map</span></a>
<a href="../variables/external.three.RED_GREEN_RGTC2_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RED_<wbr/>GREEN_<wbr/>RGTC2_<wbr/>Format</span></a>
<a href="../variables/external.three.RED_RGTC1_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RED_<wbr/>RGTC1_<wbr/>Format</span></a>
<a href="../variables/external.three.RedFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Red<wbr/>Format</span></a>
<a href="../variables/external.three.RedIntegerFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Red<wbr/>Integer<wbr/>Format</span></a>
<a href="../variables/external.three.ReinhardToneMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Reinhard<wbr/>Tone<wbr/>Mapping</span></a>
<a href="../variables/external.three.RepeatWrapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Repeat<wbr/>Wrapping</span></a>
<a href="../variables/external.three.ReplaceStencilOp.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Replace<wbr/>Stencil<wbr/>Op</span></a>
<a href="../variables/external.three.ReverseSubtractEquation.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Reverse<wbr/>Subtract<wbr/>Equation</span></a>
<a href="../variables/external.three.REVISION.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>REVISION</span></a>
<a href="../variables/external.three.RGB_BPTC_SIGNED_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGB_<wbr/>BPTC_<wbr/>SIGNED_<wbr/>Format</span></a>
<a href="../variables/external.three.RGB_BPTC_UNSIGNED_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGB_<wbr/>BPTC_<wbr/>UNSIGNED_<wbr/>Format</span></a>
<a href="../variables/external.three.RGB_ETC1_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGB_<wbr/>ETC1_<wbr/>Format</span></a>
<a href="../variables/external.three.RGB_ETC2_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGB_<wbr/>ETC2_<wbr/>Format</span></a>
<a href="../variables/external.three.RGB_PVRTC_2BPPV1_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGB_<wbr/>PVRTC_<wbr/>2BPPV1_<wbr/>Format</span></a>
<a href="../variables/external.three.RGB_PVRTC_4BPPV1_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGB_<wbr/>PVRTC_<wbr/>4BPPV1_<wbr/>Format</span></a>
<a href="../variables/external.three.RGB_S3TC_DXT1_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGB_<wbr/>S3TC_<wbr/>DXT1_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_10x10_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>10x10_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_10x5_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>10x5_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_10x6_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>10x6_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_10x8_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>10x8_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_12x10_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>12x10_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_12x12_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>12x12_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_4x4_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>4x4_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_5x4_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>5x4_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_5x5_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>5x5_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_6x5_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>6x5_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_6x6_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>6x6_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_8x5_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>8x5_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_8x6_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>8x6_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ASTC_8x8_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ASTC_<wbr/>8x8_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_BPTC_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>BPTC_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_ETC2_EAC_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>ETC2_<wbr/>EAC_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_PVRTC_2BPPV1_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>PVRTC_<wbr/>2BPPV1_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_PVRTC_4BPPV1_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>PVRTC_<wbr/>4BPPV1_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_S3TC_DXT1_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>S3TC_<wbr/>DXT1_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_S3TC_DXT3_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>S3TC_<wbr/>DXT3_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBA_S3TC_DXT5_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBA_<wbr/>S3TC_<wbr/>DXT5_<wbr/>Format</span></a>
<a href="../variables/external.three.RGBADepthPacking.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBADepth<wbr/>Packing</span></a>
<a href="../variables/external.three.RGBAFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBAFormat</span></a>
<a href="../variables/external.three.RGBAIntegerFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBAInteger<wbr/>Format</span></a>
<a href="../variables/external.three.RGBDepthPacking.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBDepth<wbr/>Packing</span></a>
<a href="../variables/external.three.RGBFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBFormat</span></a>
<a href="../variables/external.three.RGBIntegerFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGBInteger<wbr/>Format</span></a>
<a href="../variables/external.three.RGDepthPacking.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGDepth<wbr/>Packing</span></a>
<a href="../variables/external.three.RGFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGFormat</span></a>
<a href="../variables/external.three.RGIntegerFormat.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>RGInteger<wbr/>Format</span></a>
<a href="../variables/external.three.ShaderChunk.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Shader<wbr/>Chunk</span></a>
<a href="../variables/external.three.ShaderLib.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Shader<wbr/>Lib</span></a>
<a href="../variables/external.three.ShortType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Short<wbr/>Type</span></a>
<a href="../variables/external.three.SIGNED_RED_GREEN_RGTC2_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>SIGNED_<wbr/>RED_<wbr/>GREEN_<wbr/>RGTC2_<wbr/>Format</span></a>
<a href="../variables/external.three.SIGNED_RED_RGTC1_Format.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>SIGNED_<wbr/>RED_<wbr/>RGTC1_<wbr/>Format</span></a>
<a href="../variables/external.three.SrcAlphaFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Src<wbr/>Alpha<wbr/>Factor</span></a>
<a href="../variables/external.three.SrcAlphaSaturateFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Src<wbr/>Alpha<wbr/>Saturate<wbr/>Factor</span></a>
<a href="../variables/external.three.SrcColorFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Src<wbr/>Color<wbr/>Factor</span></a>
<a href="../variables/external.three.SRGBColorSpace.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>SRGBColor<wbr/>Space</span></a>
<a href="../variables/external.three.SRGBTransfer.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>SRGBTransfer</span></a>
<a href="../variables/external.three.StaticCopyUsage.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Static<wbr/>Copy<wbr/>Usage</span></a>
<a href="../variables/external.three.StaticDrawUsage.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Static<wbr/>Draw<wbr/>Usage</span></a>
<a href="../variables/external.three.StaticReadUsage.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Static<wbr/>Read<wbr/>Usage</span></a>
<a href="../variables/external.three.StreamCopyUsage.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Stream<wbr/>Copy<wbr/>Usage</span></a>
<a href="../variables/external.three.StreamDrawUsage.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Stream<wbr/>Draw<wbr/>Usage</span></a>
<a href="../variables/external.three.StreamReadUsage.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Stream<wbr/>Read<wbr/>Usage</span></a>
<a href="../variables/external.three.SubtractEquation.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Subtract<wbr/>Equation</span></a>
<a href="../variables/external.three.SubtractiveBlending.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Subtractive<wbr/>Blending</span></a>
<a href="../variables/external.three.TangentSpaceNormalMap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Tangent<wbr/>Space<wbr/>Normal<wbr/>Map</span></a>
<a href="../variables/external.three.TextureUtils.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Texture<wbr/>Utils</span></a>
<a href="../variables/external.three.TriangleFanDrawMode.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Triangle<wbr/>Fan<wbr/>Draw<wbr/>Mode</span></a>
<a href="../variables/external.three.TrianglesDrawMode.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Triangles<wbr/>Draw<wbr/>Mode</span></a>
<a href="../variables/external.three.TriangleStripDrawMode.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Triangle<wbr/>Strip<wbr/>Draw<wbr/>Mode</span></a>
<a href="../variables/external.three.UniformsLib.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Uniforms<wbr/>Lib</span></a>
<a href="../variables/external.three.UniformsUtils.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Uniforms<wbr/>Utils</span></a>
<a href="../variables/external.three.UnsignedByteType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Unsigned<wbr/>Byte<wbr/>Type</span></a>
<a href="../variables/external.three.UnsignedInt248Type.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Unsigned<wbr/>Int248<wbr/>Type</span></a>
<a href="../variables/external.three.UnsignedInt5999Type.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Unsigned<wbr/>Int5999<wbr/>Type</span></a>
<a href="../variables/external.three.UnsignedIntType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Unsigned<wbr/>Int<wbr/>Type</span></a>
<a href="../variables/external.three.UnsignedShort4444Type.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Unsigned<wbr/>Short4444<wbr/>Type</span></a>
<a href="../variables/external.three.UnsignedShort5551Type.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Unsigned<wbr/>Short5551<wbr/>Type</span></a>
<a href="../variables/external.three.UnsignedShortType.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Unsigned<wbr/>Short<wbr/>Type</span></a>
<a href="../variables/external.three.UVMapping.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>UVMapping</span></a>
<a href="../variables/external.three.VSMShadowMap.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>VSMShadow<wbr/>Map</span></a>
<a href="../variables/external.three.WebGLCoordinateSystem.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>WebGLCoordinate<wbr/>System</span></a>
<a href="../variables/external.three.WebGPUCoordinateSystem.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>WebGPUCoordinate<wbr/>System</span></a>
<a href="../variables/external.three.WrapAroundEnding.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Wrap<wbr/>Around<wbr/>Ending</span></a>
<a href="../variables/external.three.ZeroCurvatureEnding.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Zero<wbr/>Curvature<wbr/>Ending</span></a>
<a href="../variables/external.three.ZeroFactor.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Zero<wbr/>Factor</span></a>
<a href="../variables/external.three.ZeroSlopeEnding.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Zero<wbr/>Slope<wbr/>Ending</span></a>
<a href="../variables/external.three.ZeroStencilOp.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Zero<wbr/>Stencil<wbr/>Op</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Functions</h3><div class="tsd-index-list"><a href="../functions/external.three.createCanvasElement.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>create<wbr/>Canvas<wbr/>Element</span></a>
<a href="../functions/external.three.SRGBToLinear.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>SRGBTo<wbr/>Linear</span></a>
<a href="../functions/external.three.WebGLShader.html" class="tsd-index-link tsd-is-external"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>WebGLShader</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

---

## Source: manuals/apidocs/formats.md

Source Path: manuals/apidocs/formats.md

# API Module: formats

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/formats.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/formats.html`

## Исходный файл модуля
- formats/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/formats/api.ts#L1

## Состав модуля по TypeDoc

### Classes
- [BilFormat](https://giro3d.org/latest/apidoc/classes/formats.BilFormat.html)
- [GeoTIFFFormat](https://giro3d.org/latest/apidoc/classes/formats.GeoTIFFFormat.html)
- [ImageFormat](https://giro3d.org/latest/apidoc/classes/formats.ImageFormat.html)
- [MapboxTerrainFormat](https://giro3d.org/latest/apidoc/classes/formats.MapboxTerrainFormat.html)

### Interfaces
- [DecodeOptions](https://giro3d.org/latest/apidoc/interfaces/formats.DecodeOptions.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/formats.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>formats | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="formats.html">formats</a></li></ul><h1>Namespace formats</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/formats/api.ts#L1">formats/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/formats.BilFormat.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Bil<wbr/>Format</span></a>
<a href="../classes/formats.GeoTIFFFormat.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>GeoTIFFFormat</span></a>
<a href="../classes/formats.ImageFormat.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>Format</span></a>
<a href="../classes/formats.MapboxTerrainFormat.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Mapbox<wbr/>Terrain<wbr/>Format</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/formats.DecodeOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Decode<wbr/>Options</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/formats/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import BilFormat from './BilFormat';
import GeoTIFFFormat from './GeoTIFFFormat';
import ImageFormat, { type DecodeOptions } from './ImageFormat';
import MapboxTerrainFormat from './MapboxTerrainFormat';

/**
 * Data decoders, such as image formats.
 */
export { BilFormat, DecodeOptions, GeoTIFFFormat, ImageFormat, MapboxTerrainFormat };
```

---

## Source: manuals/apidocs/helpers.md

Source Path: manuals/apidocs/helpers.md

# API Module: helpers

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/helpers.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/helpers.html`

## Исходный файл модуля
- helpers/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/helpers/api.ts#L1

## Состав модуля по TypeDoc

### Classes
- [EllipsoidHelper](https://giro3d.org/latest/apidoc/classes/helpers.EllipsoidHelper.html)
- [Helpers](https://giro3d.org/latest/apidoc/classes/helpers.Helpers.html)
- [OBBHelper](https://giro3d.org/latest/apidoc/classes/helpers.OBBHelper.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/helpers.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>helpers | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="helpers.html">helpers</a></li></ul><h1>Namespace helpers</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/helpers/api.ts#L1">helpers/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/helpers.EllipsoidHelper.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Ellipsoid<wbr/>Helper</span></a>
<a href="../classes/helpers.Helpers.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Helpers</span></a>
<a href="../classes/helpers.OBBHelper.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>OBBHelper</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/helpers/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import EllipsoidHelper from './EllipsoidHelper';
import Helpers from './Helpers';
import OBBHelper from './OBBHelper';

export { EllipsoidHelper, Helpers, OBBHelper };
```

---

## Source: manuals/apidocs/interactions.md

Source Path: manuals/apidocs/interactions.md

# API Module: interactions

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/interactions.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/interactions.html`

## Исходный файл модуля
- interactions/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/interactions/api.ts#L1

## Состав модуля по TypeDoc

### Classes
- [DrawTool](https://giro3d.org/latest/apidoc/classes/interactions.DrawTool.html)

### Interfaces
- [CommonCreationOptions](https://giro3d.org/latest/apidoc/interfaces/interactions.CommonCreationOptions.html)
- [CreateShapeOptions](https://giro3d.org/latest/apidoc/interfaces/interactions.CreateShapeOptions.html)
- [CreationOptions](https://giro3d.org/latest/apidoc/interfaces/interactions.CreationOptions.html)
- [DrawToolEventMap](https://giro3d.org/latest/apidoc/interfaces/interactions.DrawToolEventMap.html)

### Type Aliases
- [MouseCallback](https://giro3d.org/latest/apidoc/types/interactions.MouseCallback.html)
- [PickCallback](https://giro3d.org/latest/apidoc/types/interactions.PickCallback.html)
- [PointInsertedCallback](https://giro3d.org/latest/apidoc/types/interactions.PointInsertedCallback.html)
- [PointRemovedCallback](https://giro3d.org/latest/apidoc/types/interactions.PointRemovedCallback.html)
- [PointUpdatedCallback](https://giro3d.org/latest/apidoc/types/interactions.PointUpdatedCallback.html)
- [ShapeModifiedCallback](https://giro3d.org/latest/apidoc/types/interactions.ShapeModifiedCallback.html)

### Functions
- [afterRemovePointOfRing](https://giro3d.org/latest/apidoc/functions/interactions.afterRemovePointOfRing.html)
- [afterUpdatePointOfRing](https://giro3d.org/latest/apidoc/functions/interactions.afterUpdatePointOfRing.html)
- [inhibitHook](https://giro3d.org/latest/apidoc/functions/interactions.inhibitHook.html)
- [limitRemovePointHook](https://giro3d.org/latest/apidoc/functions/interactions.limitRemovePointHook.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/interactions.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>interactions | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="interactions.html">interactions</a></li></ul><h1>Namespace interactions</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/interactions/api.ts#L1">interactions/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/interactions.DrawTool.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Draw<wbr/>Tool</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/interactions.CommonCreationOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Common<wbr/>Creation<wbr/>Options</span></a>
<a href="../interfaces/interactions.CreateShapeOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Create<wbr/>Shape<wbr/>Options</span></a>
<a href="../interfaces/interactions.CreationOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Creation<wbr/>Options</span></a>
<a href="../interfaces/interactions.DrawToolEventMap.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Draw<wbr/>Tool<wbr/>Event<wbr/>Map</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Type Aliases</h3><div class="tsd-index-list"><a href="../types/interactions.MouseCallback.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Mouse<wbr/>Callback</span></a>
<a href="../types/interactions.PickCallback.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Pick<wbr/>Callback</span></a>
<a href="../types/interactions.PointInsertedCallback.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Point<wbr/>Inserted<wbr/>Callback</span></a>
<a href="../types/interactions.PointRemovedCallback.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Point<wbr/>Removed<wbr/>Callback</span></a>
<a href="../types/interactions.PointUpdatedCallback.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Point<wbr/>Updated<wbr/>Callback</span></a>
<a href="../types/interactions.ShapeModifiedCallback.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Shape<wbr/>Modified<wbr/>Callback</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Functions</h3><div class="tsd-index-list"><a href="../functions/interactions.afterRemovePointOfRing.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>after<wbr/>Remove<wbr/>Point<wbr/>Of<wbr/>Ring</span></a>
<a href="../functions/interactions.afterUpdatePointOfRing.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>after<wbr/>Update<wbr/>Point<wbr/>Of<wbr/>Ring</span></a>
<a href="../functions/interactions.inhibitHook.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>inhibit<wbr/>Hook</span></a>
<a href="../functions/interactions.limitRemovePointHook.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>limit<wbr/>Remove<wbr/>Point<wbr/>Hook</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/interactions/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

export * as DrawTool from './DrawTool';
export * as SunExposure from './SunExposure';
```

---

## Source: manuals/apidocs/renderer.SimpleGeometry.md

Source Path: manuals/apidocs/renderer.SimpleGeometry.md

# API Module: SimpleGeometry

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/renderer.SimpleGeometry.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/renderer.SimpleGeometry.html`

## Исходный файл модуля
- renderer/geometries/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/renderer/geometries/api.ts#L1

## Состав модуля по TypeDoc

### Interfaces
- [SimpleGeometryMesh](https://giro3d.org/latest/apidoc/interfaces/renderer.SimpleGeometry.SimpleGeometryMesh.html)
- [SimpleGeometryMeshEventMap](https://giro3d.org/latest/apidoc/interfaces/renderer.SimpleGeometry.SimpleGeometryMeshEventMap.html)

### Type Aliases
- [DefaultUserData](https://giro3d.org/latest/apidoc/types/renderer.SimpleGeometry.DefaultUserData.html)
- [SimpleGeometryMeshTypes](https://giro3d.org/latest/apidoc/types/renderer.SimpleGeometry.SimpleGeometryMeshTypes.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/renderer.SimpleGeometry.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>SimpleGeometry | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="renderer.html">renderer</a></li><li><a href="renderer.SimpleGeometry.html">SimpleGeometry</a></li></ul><h1>Namespace SimpleGeometry</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/renderer/geometries/api.ts#L1">renderer/geometries/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/renderer.SimpleGeometry.SimpleGeometryMesh.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Simple<wbr/>Geometry<wbr/>Mesh</span></a>
<a href="../interfaces/renderer.SimpleGeometry.SimpleGeometryMeshEventMap.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Simple<wbr/>Geometry<wbr/>Mesh<wbr/>Event<wbr/>Map</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Type Aliases</h3><div class="tsd-index-list"><a href="../types/renderer.SimpleGeometry.DefaultUserData.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Default<wbr/>User<wbr/>Data</span></a>
<a href="../types/renderer.SimpleGeometry.SimpleGeometryMeshTypes.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Simple<wbr/>Geometry<wbr/>Mesh<wbr/>Types</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/renderer/geometries/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import type SimpleGeometryMesh from './SimpleGeometryMesh';
import type {
    DefaultUserData,
    SimpleGeometryMeshEventMap,
    SimpleGeometryMeshTypes,
} from './SimpleGeometryMesh';

export { DefaultUserData, SimpleGeometryMesh, SimpleGeometryMeshEventMap, SimpleGeometryMeshTypes };
```

---

## Source: manuals/apidocs/renderer.md

Source Path: manuals/apidocs/renderer.md

# API Module: renderer

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/renderer.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/renderer.html`

## Исходный файл модуля
- renderer/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/renderer/api.ts#L1

## Состав модуля по TypeDoc

### Namespaces
- [SimpleGeometry](https://giro3d.org/latest/apidoc/modules/renderer.SimpleGeometry.html)

### Enumerations
- [PointCloudModes](https://giro3d.org/latest/apidoc/enums/renderer.PointCloudModes.html)

### Classes
- [Classification](https://giro3d.org/latest/apidoc/classes/renderer.Classification.html)
- [ConstantSizeSphere](https://giro3d.org/latest/apidoc/classes/renderer.ConstantSizeSphere.html)
- [MemoryTracker](https://giro3d.org/latest/apidoc/classes/renderer.MemoryTracker.html)
- [PointCloudMaterial](https://giro3d.org/latest/apidoc/classes/renderer.PointCloudMaterial.html)
- [RenderingOptions](https://giro3d.org/latest/apidoc/classes/renderer.RenderingOptions.html)
- [View](https://giro3d.org/latest/apidoc/classes/renderer.View.html)

### Interfaces
- [ExternalControls](https://giro3d.org/latest/apidoc/interfaces/renderer.ExternalControls.html)
- [IntersectingVolume](https://giro3d.org/latest/apidoc/interfaces/renderer.IntersectingVolume.html)
- [IntersectingVolumesUniform](https://giro3d.org/latest/apidoc/interfaces/renderer.IntersectingVolumesUniform.html)
- [IntersectingVolumeUniform](https://giro3d.org/latest/apidoc/interfaces/renderer.IntersectingVolumeUniform.html)
- [PointCloudMaterialOptions](https://giro3d.org/latest/apidoc/interfaces/renderer.PointCloudMaterialOptions.html)
- [RenderingContextHandler](https://giro3d.org/latest/apidoc/interfaces/renderer.RenderingContextHandler.html)

### Type Aliases
- [PointCloudMode](https://giro3d.org/latest/apidoc/types/renderer.PointCloudMode.html)

### Variables
- [ASPRS_CLASSIFICATIONS](https://giro3d.org/latest/apidoc/variables/renderer.ASPRS_CLASSIFICATIONS.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/renderer.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>renderer | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="renderer.html">renderer</a></li></ul><h1>Namespace renderer</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/renderer/api.ts#L1">renderer/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Namespaces</h3><div class="tsd-index-list"><a href="renderer.SimpleGeometry.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>Simple<wbr/>Geometry</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Enumerations</h3><div class="tsd-index-list"><a href="../enums/renderer.PointCloudModes.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-8"></use></svg><span>Point<wbr/>Cloud<wbr/>Modes</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/renderer.Classification.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Classification</span></a>
<a href="../classes/renderer.ConstantSizeSphere.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Constant<wbr/>Size<wbr/>Sphere</span></a>
<a href="../classes/renderer.MemoryTracker.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Memory<wbr/>Tracker</span></a>
<a href="../classes/renderer.PointCloudMaterial.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Point<wbr/>Cloud<wbr/>Material</span></a>
<a href="../classes/renderer.RenderingOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Rendering<wbr/>Options</span></a>
<a href="../classes/renderer.View.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>View</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/renderer.ExternalControls.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>External<wbr/>Controls</span></a>
<a href="../interfaces/renderer.IntersectingVolume.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Intersecting<wbr/>Volume</span></a>
<a href="../interfaces/renderer.IntersectingVolumesUniform.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Intersecting<wbr/>Volumes<wbr/>Uniform</span></a>
<a href="../interfaces/renderer.IntersectingVolumeUniform.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Intersecting<wbr/>Volume<wbr/>Uniform</span></a>
<a href="../interfaces/renderer.PointCloudMaterialOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Point<wbr/>Cloud<wbr/>Material<wbr/>Options</span></a>
<a href="../interfaces/renderer.RenderingContextHandler.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Rendering<wbr/>Context<wbr/>Handler</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Type Aliases</h3><div class="tsd-index-list"><a href="../types/renderer.PointCloudMode.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Point<wbr/>Cloud<wbr/>Mode</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Variables</h3><div class="tsd-index-list"><a href="../variables/renderer.ASPRS_CLASSIFICATIONS.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>ASPRS_<wbr/>CLASSIFICATIONS</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/renderer/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import type * as SimpleGeometry from './geometries/api';
import type {
    IntersectingVolume,
    IntersectingVolumeUniform,
    IntersectingVolumesUniform,
} from './IntersectingVolume';
import type PointCloudMaterial from './PointCloudMaterial';
import type { Mode as PointCloudMode, MODE as PointCloudModes } from './PointCloudMaterial';
import type RenderingContextHandler from './RenderingContextHandler';
import type RenderingOptions from './RenderingOptions';
import type View from './View';
import type { ExternalControls } from './View';

import C3DEngine from './c3DEngine';
import ConstantSizeSphere from './ConstantSizeSphere';
import MemoryTracker from './MemoryTracker';
import {
    ASPRS_CLASSIFICATIONS,
    type Classification,
    type PointCloudMaterialOptions,
} from './PointCloudMaterial';

export {
    ASPRS_CLASSIFICATIONS,
    Classification,
    C3DEngine,
    ConstantSizeSphere,
    ExternalControls,
    IntersectingVolume,
    IntersectingVolumeUniform,
    IntersectingVolumesUniform,
    MemoryTracker,
    PointCloudMaterial,
    PointCloudMaterialOptions,
    PointCloudMode,
    PointCloudModes,
    RenderingContextHandler,
    RenderingOptions,
    SimpleGeometry,
    View,
};
```

---

## Source: manuals/apidocs/sources.las.config.md

Source Path: manuals/apidocs/sources.las.config.md

# API Module: config

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/sources.las.config.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/sources.las.config.html`

## Исходный файл модуля
- sources/las/config.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/sources/las/config.ts#L1

## Состав модуля по TypeDoc

### Variables
- [DEFAULT_LAZPERF_PATH](https://giro3d.org/latest/apidoc/variables/sources.las.config.DEFAULT_LAZPERF_PATH.html)

### Functions
- [loadWasmBinary](https://giro3d.org/latest/apidoc/functions/sources.las.config.loadWasmBinary.html)
- [setLazPerfPath](https://giro3d.org/latest/apidoc/functions/sources.las.config.setLazPerfPath.html)
- [setLazPerfWasmBinary](https://giro3d.org/latest/apidoc/functions/sources.las.config.setLazPerfWasmBinary.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/sources.las.config.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>config | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="sources.html">sources</a></li><li><a href="sources.las.html">las</a></li><li><a href="sources.las.config.html">config</a></li></ul><h1>Namespace config</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/sources/las/config.ts#L1">sources/las/config.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Variables</h3><div class="tsd-index-list"><a href="../variables/sources.las.config.DEFAULT_LAZPERF_PATH.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>LAZPERF_<wbr/>PATH</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Functions</h3><div class="tsd-index-list"><a href="../functions/sources.las.config.loadWasmBinary.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>load<wbr/>Wasm<wbr/>Binary</span></a>
<a href="../functions/sources.las.config.setLazPerfPath.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>set<wbr/>Laz<wbr/>Perf<wbr/>Path</span></a>
<a href="../functions/sources.las.config.setLazPerfWasmBinary.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-64"></use></svg><span>set<wbr/>Laz<wbr/>Perf<wbr/>Wasm<wbr/>Binary</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/sources/las/config.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import { LazPerf } from 'laz-perf';

import Fetcher from '../../utils/Fetcher';

export const DEFAULT_LAZPERF_PATH = 'https://cdn.jsdelivr.net/npm/laz-perf@0.0.7/lib';

let lazPerfPath = DEFAULT_LAZPERF_PATH;
let lazPerfWasmBinary: ArrayBuffer | null = null;

/**
 * Sets the path to the directory that contains the laz-perf library files.
 *
 * This must be set before instantiating any class that makes use of this library.
 *
 * For example, if the `laz-perf.wasm` file is served from
 * `<website>/public/wasm/laz-perf.wasm`, the path to configure is the following:
 * ```ts
 * setLazPerfPath('/public/wasm/');
 * ```
 *
 * Note: the default path to the laz-perf library is {@link DEFAULT_LAZPERF_PATH}.
 */
export function setLazPerfPath(path: string): void {
    lazPerfPath = path;
}

export function setLazPerfWasmBinary(wasmBinary: ArrayBuffer): void {
    lazPerfWasmBinary = wasmBinary;
}

/**
 * @internal
 */
export function getLazPerfPath(): string {
    return lazPerfPath;
}

let lazPerf: Promise<LazPerf> | undefined = undefined;

export function loadWasmBinary(): Promise<ArrayBuffer> {
    return Fetcher.arrayBuffer(lazPerfPath + '/laz-perf.wasm');
}

async function loadLazPerfFromWasmBinary(binary: ArrayBuffer): Promise<LazPerf> {
    return LazPerf.create({
        wasmBinary: binary,
    });
}

/**
 * Loads one instance of the LazPerf library.
 */
async function loadLazPerf(wasmPath: string): Promise<LazPerf> {
    // console.log('initializing laz-perf with path: ' + wasmPath);
    return LazPerf.create({
        locateFile: (file: string) => `${wasmPath}/${file}`,
    });
}

/**
 * @internal
 */
export function getLazPerf(): Promise<LazPerf> {
    if (!lazPerf) {
        if (lazPerfWasmBinary != null) {
            lazPerf = loadLazPerfFromWasmBinary(lazPerfWasmBinary);
        } else {
            lazPerf = loadLazPerf(lazPerfPath);
        }
    }

    return lazPerf;
}
```

---

## Source: manuals/apidocs/sources.las.md

Source Path: manuals/apidocs/sources.las.md

# API Module: las

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/sources.las.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/sources.las.html`

## Исходный файл модуля
- sources/las/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/sources/las/api.ts#L1

## Состав модуля по TypeDoc

### Namespaces
- [config](https://giro3d.org/latest/apidoc/modules/sources.las.config.html)

### Interfaces
- [CommonOptions](https://giro3d.org/latest/apidoc/interfaces/sources.las.CommonOptions.html)

### Type Aliases
- [DimensionFilter](https://giro3d.org/latest/apidoc/types/sources.las.DimensionFilter.html)
- [DimensionName](https://giro3d.org/latest/apidoc/types/sources.las.DimensionName.html)

### Variables
- [DEFAULT_VALUE_RANGES](https://giro3d.org/latest/apidoc/variables/sources.las.DEFAULT_VALUE_RANGES.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/sources.las.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>las | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="sources.html">sources</a></li><li><a href="sources.las.html">las</a></li></ul><h1>Namespace las</h1></div><section class="tsd-panel tsd-comment"><div class="tsd-comment tsd-typography"><p>Data sources.</p>
</div><div class="tsd-comment tsd-typography"></div></section><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/sources/las/api.ts#L1">sources/las/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Namespaces</h3><div class="tsd-index-list"><a href="sources.las.config.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>config</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/sources.las.CommonOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Common<wbr/>Options</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Type Aliases</h3><div class="tsd-index-list"><a href="../types/sources.las.DimensionFilter.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Dimension<wbr/>Filter</span></a>
<a href="../types/sources.las.DimensionName.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Dimension<wbr/>Name</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Variables</h3><div class="tsd-index-list"><a href="../variables/sources.las.DEFAULT_VALUE_RANGES.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>DEFAULT_<wbr/>VALUE_<wbr/>RANGES</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/sources/las/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import type { CommonOptions } from './CommonOptions';
import type { DimensionName } from './dimension';
import type { DimensionFilter } from './filter';

import * as config from './config';
import { DEFAULT_VALUE_RANGES } from './dimension';

export { CommonOptions, config, DEFAULT_VALUE_RANGES, DimensionFilter, DimensionName };
```

---

## Source: manuals/apidocs/sources.md

Source Path: manuals/apidocs/sources.md

# API Module: sources

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/sources.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/sources.html`

## Исходный файл модуля
- sources/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/sources/api.ts#L1

## Состав модуля по TypeDoc

### Namespaces
- [las](https://giro3d.org/latest/apidoc/modules/sources.las.html)

### Classes
- [AggregateImageSource](https://giro3d.org/latest/apidoc/classes/sources.AggregateImageSource.html)
- [AggregatePointCloudSource](https://giro3d.org/latest/apidoc/classes/sources.AggregatePointCloudSource.html)
- [COPCSource](https://giro3d.org/latest/apidoc/classes/sources.COPCSource.html)
- [GeoTIFFSource](https://giro3d.org/latest/apidoc/classes/sources.GeoTIFFSource.html)
- [ImageResult](https://giro3d.org/latest/apidoc/classes/sources.ImageResult.html)
- [ImageSource](https://giro3d.org/latest/apidoc/classes/sources.ImageSource.html)
- [LASSource](https://giro3d.org/latest/apidoc/classes/sources.LASSource.html)
- [PointCloudSourceBase](https://giro3d.org/latest/apidoc/classes/sources.PointCloudSourceBase.html)
- [PotreeSource](https://giro3d.org/latest/apidoc/classes/sources.PotreeSource.html)
- [StaticImageSource](https://giro3d.org/latest/apidoc/classes/sources.StaticImageSource.html)
- [TiledImageSource](https://giro3d.org/latest/apidoc/classes/sources.TiledImageSource.html)
- [VectorSource](https://giro3d.org/latest/apidoc/classes/sources.VectorSource.html)
- [VectorTileSource](https://giro3d.org/latest/apidoc/classes/sources.VectorTileSource.html)
- [VideoSource](https://giro3d.org/latest/apidoc/classes/sources.VideoSource.html)
- [WmsSource](https://giro3d.org/latest/apidoc/classes/sources.WmsSource.html)
- [WmtsSource](https://giro3d.org/latest/apidoc/classes/sources.WmtsSource.html)

### Interfaces
- [AggregatePointCloudSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.AggregatePointCloudSourceOptions.html)
- [COPCSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.COPCSourceOptions.html)
- [GeoTIFFCacheOptions](https://giro3d.org/latest/apidoc/interfaces/sources.GeoTIFFCacheOptions.html)
- [GeoTIFFSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.GeoTIFFSourceOptions.html)
- [GetImageOptions](https://giro3d.org/latest/apidoc/interfaces/sources.GetImageOptions.html)
- [GetNodeDataOptions](https://giro3d.org/latest/apidoc/interfaces/sources.GetNodeDataOptions.html)
- [ImageResponse](https://giro3d.org/latest/apidoc/interfaces/sources.ImageResponse.html)
- [ImageSourceEvents](https://giro3d.org/latest/apidoc/interfaces/sources.ImageSourceEvents.html)
- [ImageSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.ImageSourceOptions.html)
- [LASSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.LASSourceOptions.html)
- [PointCloudAttribute](https://giro3d.org/latest/apidoc/interfaces/sources.PointCloudAttribute.html)
- [PointCloudMetadata](https://giro3d.org/latest/apidoc/interfaces/sources.PointCloudMetadata.html)
- [PointCloudNode](https://giro3d.org/latest/apidoc/interfaces/sources.PointCloudNode.html)
- [PointCloudNodeData](https://giro3d.org/latest/apidoc/interfaces/sources.PointCloudNodeData.html)
- [PointCloudSource](https://giro3d.org/latest/apidoc/interfaces/sources.PointCloudSource.html)
- [PointCloudSourceEventMap](https://giro3d.org/latest/apidoc/interfaces/sources.PointCloudSourceEventMap.html)
- [PotreeSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.PotreeSourceOptions.html)
- [StaticImageSourceEvents](https://giro3d.org/latest/apidoc/interfaces/sources.StaticImageSourceEvents.html)
- [StaticImageSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.StaticImageSourceOptions.html)
- [TiledImageSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.TiledImageSourceOptions.html)
- [VectorSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.VectorSourceOptions.html)
- [VectorTileSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.VectorTileSourceOptions.html)
- [VideoSourceEvents](https://giro3d.org/latest/apidoc/interfaces/sources.VideoSourceEvents.html)
- [VideoSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.VideoSourceOptions.html)
- [WmsSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.WmsSourceOptions.html)
- [WmtsFromCapabilitiesOptions](https://giro3d.org/latest/apidoc/interfaces/sources.WmtsFromCapabilitiesOptions.html)
- [WmtsSourceOptions](https://giro3d.org/latest/apidoc/interfaces/sources.WmtsSourceOptions.html)

### Type Aliases
- [ChannelMapping](https://giro3d.org/latest/apidoc/types/sources.ChannelMapping.html)
- [CustomContainsFn](https://giro3d.org/latest/apidoc/types/sources.CustomContainsFn.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/sources.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>sources | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="sources.html">sources</a></li></ul><h1>Namespace sources</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/sources/api.ts#L1">sources/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Namespaces</h3><div class="tsd-index-list"><a href="sources.las.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-4"></use></svg><span>las</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/sources.AggregateImageSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Aggregate<wbr/>Image<wbr/>Source</span></a>
<a href="../classes/sources.AggregatePointCloudSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Aggregate<wbr/>Point<wbr/>Cloud<wbr/>Source</span></a>
<a href="../classes/sources.COPCSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>COPCSource</span></a>
<a href="../classes/sources.GeoTIFFSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>GeoTIFFSource</span></a>
<a href="../classes/sources.ImageResult.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>Result</span></a>
<a href="../classes/sources.ImageSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Image<wbr/>Source</span></a>
<a href="../classes/sources.LASSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>LASSource</span></a>
<a href="../classes/sources.PointCloudSourceBase.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Point<wbr/>Cloud<wbr/>Source<wbr/>Base</span></a>
<a href="../classes/sources.PotreeSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Potree<wbr/>Source</span></a>
<a href="../classes/sources.StaticImageSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Static<wbr/>Image<wbr/>Source</span></a>
<a href="../classes/sources.TiledImageSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Tiled<wbr/>Image<wbr/>Source</span></a>
<a href="../classes/sources.VectorSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector<wbr/>Source</span></a>
<a href="../classes/sources.VectorTileSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Vector<wbr/>Tile<wbr/>Source</span></a>
<a href="../classes/sources.VideoSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Video<wbr/>Source</span></a>
<a href="../classes/sources.WmsSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Wms<wbr/>Source</span></a>
<a href="../classes/sources.WmtsSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Wmts<wbr/>Source</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/sources.AggregatePointCloudSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Aggregate<wbr/>Point<wbr/>Cloud<wbr/>Source<wbr/>Options</span></a>
<a href="../interfaces/sources.COPCSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>COPCSource<wbr/>Options</span></a>
<a href="../interfaces/sources.GeoTIFFCacheOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>GeoTIFFCache<wbr/>Options</span></a>
<a href="../interfaces/sources.GeoTIFFSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>GeoTIFFSource<wbr/>Options</span></a>
<a href="../interfaces/sources.GetImageOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Get<wbr/>Image<wbr/>Options</span></a>
<a href="../interfaces/sources.GetNodeDataOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Get<wbr/>Node<wbr/>Data<wbr/>Options</span></a>
<a href="../interfaces/sources.ImageResponse.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Image<wbr/>Response</span></a>
<a href="../interfaces/sources.ImageSourceEvents.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Image<wbr/>Source<wbr/>Events</span></a>
<a href="../interfaces/sources.ImageSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Image<wbr/>Source<wbr/>Options</span></a>
<a href="../interfaces/sources.LASSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>LASSource<wbr/>Options</span></a>
<a href="../interfaces/sources.PointCloudAttribute.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Point<wbr/>Cloud<wbr/>Attribute</span></a>
<a href="../interfaces/sources.PointCloudMetadata.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Point<wbr/>Cloud<wbr/>Metadata</span></a>
<a href="../interfaces/sources.PointCloudNode.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Point<wbr/>Cloud<wbr/>Node</span></a>
<a href="../interfaces/sources.PointCloudNodeData.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Point<wbr/>Cloud<wbr/>Node<wbr/>Data</span></a>
<a href="../interfaces/sources.PointCloudSource.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Point<wbr/>Cloud<wbr/>Source</span></a>
<a href="../interfaces/sources.PointCloudSourceEventMap.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Point<wbr/>Cloud<wbr/>Source<wbr/>Event<wbr/>Map</span></a>
<a href="../interfaces/sources.PotreeSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Potree<wbr/>Source<wbr/>Options</span></a>
<a href="../interfaces/sources.StaticImageSourceEvents.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Static<wbr/>Image<wbr/>Source<wbr/>Events</span></a>
<a href="../interfaces/sources.StaticImageSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Static<wbr/>Image<wbr/>Source<wbr/>Options</span></a>
<a href="../interfaces/sources.TiledImageSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Tiled<wbr/>Image<wbr/>Source<wbr/>Options</span></a>
<a href="../interfaces/sources.VectorSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Vector<wbr/>Source<wbr/>Options</span></a>
<a href="../interfaces/sources.VectorTileSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Vector<wbr/>Tile<wbr/>Source<wbr/>Options</span></a>
<a href="../interfaces/sources.VideoSourceEvents.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Video<wbr/>Source<wbr/>Events</span></a>
<a href="../interfaces/sources.VideoSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Video<wbr/>Source<wbr/>Options</span></a>
<a href="../interfaces/sources.WmsSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Wms<wbr/>Source<wbr/>Options</span></a>
<a href="../interfaces/sources.WmtsFromCapabilitiesOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Wmts<wbr/>From<wbr/>Capabilities<wbr/>Options</span></a>
<a href="../interfaces/sources.WmtsSourceOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Wmts<wbr/>Source<wbr/>Options</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Type Aliases</h3><div class="tsd-index-list"><a href="../types/sources.ChannelMapping.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Channel<wbr/>Mapping</span></a>
<a href="../types/sources.CustomContainsFn.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-2097152"></use></svg><span>Custom<wbr/>Contains<wbr/>Fn</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/sources/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

// import CoordinateSystem from '../core/geographic/CoordinateSystem';
import AggregateImageSource from './AggregateImageSource';
import AggregatePointCloudSource, {
    AggregatePointCloudSourceOptions,
} from './AggregatePointCloudSource';
import COPCSource, { COPCSourceOptions } from './COPCSource';
import GeoTIFFSource, {
    type ChannelMapping,
    type GeoTIFFCacheOptions,
    type GeoTIFFSourceOptions,
} from './GeoTIFFSource';
import ImageSource, {
    type CustomContainsFn,
    type GetImageOptions,
    type ImageResponse,
    type ImageResult,
    type ImageSourceEvents,
    type ImageSourceOptions,
} from './ImageSource';
import * as las from './las/api';
import LASSource, { LASSourceOptions } from './LASSource';
import {
    GetNodeDataOptions,
    PointCloudAttribute,
    PointCloudMetadata,
    PointCloudNode,
    PointCloudNodeData,
    PointCloudSource,
    PointCloudSourceBase,
    PointCloudSourceEventMap,
} from './PointCloudSource';
import PotreeSource, { PotreeSourceOptions } from './PotreeSource';
import StaticImageSource, {
    type StaticImageSourceEvents,
    type StaticImageSourceOptions,
} from './StaticImageSource';
import TiledImageSource, { type TiledImageSourceOptions } from './TiledImageSource';
import VectorSource, { type VectorSourceOptions } from './VectorSource';
import VectorTileSource, { type VectorTileSourceOptions } from './VectorTileSource';
import VideoSource, { type VideoSourceEvents, type VideoSourceOptions } from './VideoSource';
import WmsSource, { type WmsSourceOptions } from './WmsSource';
import WmtsSource, { type WmtsFromCapabilitiesOptions, type WmtsSourceOptions } from './WmtsSource';

/**
 * Data sources.
 */
export {
    AggregateImageSource,
    AggregatePointCloudSource,
    AggregatePointCloudSourceOptions,
    ChannelMapping,
    // CoordinateSystem,
    COPCSource,
    COPCSourceOptions,
    CustomContainsFn,
    GeoTIFFCacheOptions,
    GeoTIFFSource,
    GeoTIFFSourceOptions,
    GetImageOptions,
    GetNodeDataOptions,
    ImageResponse,
    ImageResult,
    ImageSource,
    ImageSourceEvents,
    ImageSourceOptions,
    las,
    LASSource,
    LASSourceOptions,
    PointCloudAttribute,
    PointCloudMetadata,
    PointCloudNode,
    PointCloudNodeData,
    PointCloudSource,
    PointCloudSourceBase,
    PointCloudSourceEventMap,
    PotreeSource,
    PotreeSourceOptions,
    StaticImageSource,
    StaticImageSourceEvents,
    StaticImageSourceOptions,
    TiledImageSource,
    TiledImageSourceOptions,
    VectorSource,
    VectorSourceOptions,
    VectorTileSource,
    VectorTileSourceOptions,
    VideoSource,
    VideoSourceEvents,
    VideoSourceOptions,
    WmsSource,
    WmsSourceOptions,
    WmtsFromCapabilitiesOptions,
    WmtsSource,
    WmtsSourceOptions,
};
```

---

## Source: manuals/apidocs/utils.md

Source Path: manuals/apidocs/utils.md

# API Module: utils

## Официальная страница
- https://giro3d.org/latest/apidoc/modules/utils.html
- Локальный клон: `manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/utils.html`

## Исходный файл модуля
- utils/api.ts:1
- https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/utils/api.ts#L1

## Состав модуля по TypeDoc

### Enumerations
- [PromiseStatus](https://giro3d.org/latest/apidoc/enums/utils.PromiseStatus.html)

### Classes
- [FetcherEventDispatcher](https://giro3d.org/latest/apidoc/classes/utils.FetcherEventDispatcher.html)
- [HttpError](https://giro3d.org/latest/apidoc/classes/utils.HttpError.html)

### Interfaces
- [FetcherEventMap](https://giro3d.org/latest/apidoc/interfaces/utils.FetcherEventMap.html)
- [FetchOptions](https://giro3d.org/latest/apidoc/interfaces/utils.FetchOptions.html)

### Variables
- [Fetcher](https://giro3d.org/latest/apidoc/variables/utils.Fetcher.html)
- [GeoJSONUtils](https://giro3d.org/latest/apidoc/variables/utils.GeoJSONUtils.html)
- [HttpConfiguration](https://giro3d.org/latest/apidoc/variables/utils.HttpConfiguration.html)
- [OpenLayersUtils](https://giro3d.org/latest/apidoc/variables/utils.OpenLayersUtils.html)
- [PromiseUtils](https://giro3d.org/latest/apidoc/variables/utils.PromiseUtils.html)

### Inlined Referenced Files

#### Inlined: manuals/reference_info/giro3d-website/dist/latest/apidoc/modules/utils.html
```html
<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>utils | API (v1.0.0) - Giro3D</title><meta name="description" content="Documentation for API (v1.0.0) - Giro3D"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="../assets/style.css"/><link rel="stylesheet" href="../assets/highlight.css"/><link rel="stylesheet" href="../assets/custom.css"/><script defer src="../assets/main.js"></script><script async src="../assets/icons.js" id="tsd-icons-script"></script><script async src="../assets/search.js" id="tsd-search-script"></script><script async src="../assets/navigation.js" id="tsd-nav-script"></script>
<link rel="icon" href="/images/favicon.svg" />
<link rel="stylesheet" href="/assets/bootstrap-custom.css" />
</head><body><script>document.documentElement.dataset.theme = "light";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script>

<header class="header bg-light" data-bs-theme="">
    <div class="container-fluid">
        <a href="/" class="navbar-brand mx-0">
            <img
                src="/images/favicon.svg"
                class="brand"
                width="32"
                height="32"
            />
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-nav-left">
                
                <li class="nav-item">
    <a
        class="nav-link  "
        href="/"
    >
        Home
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/giro3d.html"
    >
        Giro3D framework
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-success "
        href="/piero.html"
    >
        Piero application
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/tutorials/getting-started.html"
    >
        Getting started with Giro3D
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary "
        href="/latest/examples/index.html"
    >
        Giro3D examples
    </a>
</li>

                <li class="nav-item">
    <a
        class="nav-link nav-link-primary active"
        href="/latest/apidoc/index.html"
    >
        API documentation
    </a>
</li>


                <li class="nav-item">
                    <span
                        class="navbar-text badge text-bg-info"
                        >Version
                        v1.0.0</span
                    >
                </li>
            </ul>

            

            
            <form class="form-inline" id="tsd-search" role="search" data-base="..">
    <input
        name="q"
        type="text"
        id="tsd-search-field"
        aria-label="Search"
        class="form-control search-query"
        placeholder="Search"
        autocomplete="off"
        autofocus
    />
    <div class="results"></div>
</form>

            

            <ul class="navbar-nav ms-2">
                <li class="nav-item">
                    <a class="nav-link" href="https://gitlab.com/giro3d/giro3D" target="_blank"
                        >GitLab <i class="bi bi-box-arrow-up-right"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="container-fluid container-main"><div class="col-content"><div class="tsd-page-title"><ul class="tsd-breadcrumb"><li><a href="../modules.html">API (v1.0.0) - Giro3D</a></li><li><a href="utils.html">utils</a></li></ul><h1>Namespace utils</h1></div><aside class="tsd-sources"><ul><li>Defined in <a href="https://gitlab.com/giro3d/giro3d/-/blob/bc2899c6c82026efad1ac80f4cbcc26217c99efa/src/utils/api.ts#L1">utils/api.ts:1</a></li></ul></aside><section class="tsd-panel-group tsd-index-group"><section class="tsd-panel tsd-index-panel"><h3 class="tsd-index-heading uppercase">Index</h3><section class="tsd-index-section"><h3 class="tsd-index-heading">Enumerations</h3><div class="tsd-index-list"><a href="../enums/utils.PromiseStatus.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-8"></use></svg><span>Promise<wbr/>Status</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Classes</h3><div class="tsd-index-list"><a href="../classes/utils.FetcherEventDispatcher.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Fetcher<wbr/>Event<wbr/>Dispatcher</span></a>
<a href="../classes/utils.HttpError.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-128"></use></svg><span>Http<wbr/>Error</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Interfaces</h3><div class="tsd-index-list"><a href="../interfaces/utils.FetcherEventMap.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Fetcher<wbr/>Event<wbr/>Map</span></a>
<a href="../interfaces/utils.FetchOptions.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-256"></use></svg><span>Fetch<wbr/>Options</span></a>
</div></section><section class="tsd-index-section"><h3 class="tsd-index-heading">Variables</h3><div class="tsd-index-list"><a href="../variables/utils.Fetcher.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Fetcher</span></a>
<a href="../variables/utils.GeoJSONUtils.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>GeoJSONUtils</span></a>
<a href="../variables/utils.HttpConfiguration.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Http<wbr/>Configuration</span></a>
<a href="../variables/utils.OpenLayersUtils.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Open<wbr/>Layers<wbr/>Utils</span></a>
<a href="../variables/utils.PromiseUtils.html" class="tsd-index-link"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-32"></use></svg><span>Promise<wbr/>Utils</span></a>
</div></section></section></section></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="../assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-protected" name="protected"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Protected</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-external" name="external"/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>External</span></label></li></ul></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="../modules.html"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="../assets/icons.svg#icon-1"></use></svg><span>API (v1.0.0) - Giro3D</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base=".."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p><p>Copyright <strong>Giro3D</strong> 2018-2025, licensed under <a target="blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</href></p></footer><div class="overlay"></div><script>
if (document.location.pathname === "/apidoc/" || document.location.pathname === "/" || document.location.pathname.endsWith("/apidoc/index.html") || document.location.pathname.endsWith("/apidoc/")) {
    document.querySelector(".col-content .tsd-page-title").style.display = "none";
}
</script></body></html>
```

#### Inlined: manuals/reference_info/giro3d/src/utils/api.ts
```ts
/*
 * Copyright (c) 2015-2018, IGN France.
 * Copyright (c) 2018-2026, Giro3D team.
 * SPDX-License-Identifier: MIT
 */

import type Fetcher from './Fetcher';
import type { FetcherEventDispatcher, FetcherEventMap, FetchOptions, HttpError } from './Fetcher';
import type GeoJSONUtils from './GeoJSONUtils';
import type HttpConfiguration from './HttpConfiguration';
import type OpenLayersUtils from './OpenLayersUtils';
import type PromiseUtils from './PromiseUtils';
import type { PromiseStatus } from './PromiseUtils';

export {
    Fetcher,
    FetcherEventDispatcher,
    FetcherEventMap,
    FetchOptions,
    GeoJSONUtils,
    HttpConfiguration,
    HttpError,
    OpenLayersUtils,
    PromiseStatus,
    PromiseUtils,
};
```
