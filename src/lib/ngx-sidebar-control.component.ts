import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Map, control, Control} from 'leaflet';
import * as L from 'leaflet';
import '../../../../node_modules/leaflet-sidebar-v2/js/leaflet-sidebar.min.js';

declare module 'leaflet' {
  namespace control {
      function sidebar(v: any): Control;
    }
}

@Component({
  selector: 'leaflet-sidebar-control',
  template: '',
})
export class NgxSidebarControlComponent implements OnInit, OnDestroy {
  private _map: Map;
  private sidebar: Control;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._map.removeControl(this.sidebar);
  }

  @Input() options: {[name:string]:any} = {};

  @Input() set map(map: Map){
    if (map){
      this._map = map;
      this.sidebar = control.sidebar( this.options).addTo(map);
    }
  }
  get map(): Map {
    return this._map
  }
}

