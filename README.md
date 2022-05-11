# NGX-Leaflet-Sidebar

This is a wrapper for the [leaflet-sidebar-v2](https://github.com/nickpeihl/leaflet-sidebar-v2) control - itself a fork of [Sidebar-V2](https://github.com/Turbo87/sidebar-v2) from Turbo87 - to make it easy to use in Angular 8+.

This wrapper is tested against the [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet) library but it has no dependency on that library so *should* work without it. It does, obviously, have a dependency that leaflet is loaded.

For more detailed descriptions of how this wrapper was created : [Documentation](https://runette.gitbook.io/alcm/).

For detailed descriptions of how to use and worked examples : [Article](https://medium.com/runic-software/quick-guide-to-leaflet-controls-in-angular-io-1b35d0807bdb), [Article](https://medium.com/runic-software/advanced-interactive-maps-in-angular-with-leaflet-68baafa03f72)

For an example of this working in a real site - see [trackbash](https://trackbash.co.uk).

# Install

Install using npm:

```sh
npm install @runette/ngx-leaflet-sidebar
```

Note that from version 1.0.4, this library is built using a partial Ivy compilation and should work with any version of Angular.io after version 12.0.0

# Usage

This library needs to be imported into the application module:

```typescript
import { NgxSidebarControlModule } from '@runette/ngx-leaflet-sidebar';

imports: [
    ...
    NgxSidebarControlModule,
  ],
```

Then, the control is inserted using the following directive:

```html
<leaflet-sidebar-control
    [map]="..."
    [options]="..."
></leaflet-sidebar-control>
```

Where `map` is an instance of a leaflet map and `options` is an object with valid options for the control.

# Usage with NGX-Leaflet

This library integrates very easily with ngx-leaflet using the onMapReady event:

```html
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

NOTE : the script must include the `///<reference types` directive AND it must be either the first line in the script or part of a block of `///<reference types` directives that are at the top of the script.

```typescript
/// <reference types='leaflet-sidebar-v2' />
import { Map, SidebarOptions } from 'leaflet';


export class OsmMapComponent implements OnInit, OnDestroy {
  public map: Map;
  public sidebarOptions: SidebarOptions = {
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

Add the following to the top of styles.css

```css
@import "leaflet-sidebar-v2/css/leaflet-sidebar.min.css";
```

# Build Config

For some reason yet to be found - this library does not like being built with `"buildOptimizer": true,` in the build environment - which is usually the default for the production environment in `angular.json`.

Always build with `"buildOptimizer": false,`.

# Events
> New in v1.0.1

The directive emits the events created by leaflet-sidebar-v2 - 'opening', 'closing', and 'content' (see the orignal documentation for details).

The events are emitted as:

```typescript
interface SidebarEvent extends LeafletEvent {
    id: string;
  }
 ```
 
Typical usage would be as follows : 
 ```html
<leaflet-sidebar-control 
    [map]="map"
    [options]="sidebarOptions"
    (change$)="onSidebarChange($event)"
></leaflet-sidebar-control>
```
and
```typescript
onSidebarChange(e: SidebarEvent) {
  if (e.type === 'content') {
    let id = e.id;
    if (id === 'routes') {
      this.mapService.maps['way'].invalidateSize()
    }
    else if (id === "trains") {
      this.mapService.maps['service'].invalidateSize()
    }
  } 
}
```
# API Access to the Control

If you want access the control's methods directly from your typescript code - this can be done with `@ViewChild`

Use `ViewChild` to access the component, for instance 

```ts
@ViewChild(NgxSidebarControlComponent,{static: false}) sidebarComponent: NgxSidebarControlComponent;
```

The actual instance of the control can then be accessed directly as `this.sidebarComponent.control`

For more details and worked examples, see : [Article](https://medium.com/runic-software/advanced-interactive-maps-in-angular-with-leaflet-68baafa03f72)
