# NGX-Leaflet-Sidebar

This is a wrapper for the [leaflet-sidebar-v2](https://github.com/nickpeihl/leaflet-sidebar-v2) - itself a fork of [Sidebar-V2](https://github.com/Turbo87/sidebar-v2) from Turbo87 - to make it easy to use in Angular 8+.

This wrapper is tested against the [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet) library but it has no dependency on that library so *should* work without it. It does, obviously, have a dependency that leaflet is loaded.

for an example of this working - see [trackbash](https://trackbash.co.uk).

# Install

Install using npm:

```
npm install @runette/ngx-leaflet-sidebar
```

# Usage

This library needs to be imported into the application module:

```
import { NgxSidebarControlModule } from '@runette/ngx-leaflet-sidebar';

imports: [
    ...
    NgxSidebarControlModule,
  ],
```

Then, the control is inserted using the following directive:

```
<leaflet-sidebar-control
    [map]="..."
    [options]="..."
></leaflet-sidebar-control>
```

Where `map` is an instance of a leaflet map and `options` is an object with valid options for the control.

# Usage with NGX-Leaflet

This library integrates very easily with ngx-leaflet using the onMapReady event:

```
<div id='map' class="map-container" leaflet
     [leafletOptions]="options"
     (leafletMapReady)="onMapReady($event)"
     ></div>
<leaflet-sidebar-control
    [map]="map"
    [options]="sidebarOptions"
></leaflet-sidebar-control>

<div id="sidebar" class="leaflet-sidebar collapsed">
    <!-- Nav tabs -->
    <div class="leaflet-sidebar-tabs">
        ...
    </div>

    <!-- Tab panes -->
    <div class="leaflet-sidebar-content">
        ...
    </div>
</div>

```
by adding the following to your map component (options are just an example):

```
...
import { Map } from 'leaflet';


export class OsmMapComponent implements OnInit, OnDestroy {
  public map: Map;
  public sidebarOptions = {
    position: 'right',
    autopan: false,
    closeButton: false,
    container: 'sidebar',
}
  
  ...
  
  onMapReady(map: Map) {
    this.map = map;
  }
```

# Usage - CSS

Unfortunately - I think because the leaflet map is run outside of Angular by ngx-leaflet - the normal css encapsulation does not work and you have to load the css globally.

Add the following to the angular.json 

```
"styles": [
              ...
              "./node_modules/leaflet-sidebar-v2/css/leaflet-sidebar.min.css",
            ],
```

# Build Config

For some reason yet to be found - this library does not like being built with `"buildOptimizer": true,` in the build environment - which is usually the default for the production environment in `angular.json`.

Always build with `"buildOptimizer": false,`.
