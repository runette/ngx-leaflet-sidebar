/// <reference types='leaflet-sidebar-v2' />
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import {Map, control, Control, LeafletEvent, SidebarOptions, SidebarEventHandlerFnMap} from 'leaflet';
import '../../../../node_modules/leaflet-sidebar-v2/js/leaflet-sidebar.min.js';

declare module 'leaflet' {
  interface LeafletEvent{
    id: string
  }
};

export type SidebarEvent = LeafletEvent;

@Component({
  selector: 'leaflet-sidebar-control',
  template: '',
})
export class NgxSidebarControlComponent implements OnInit, OnDestroy {
  private _map: Map;
  public sidebar: Control.Sidebar;
  @Output() change$: EventEmitter<SidebarEvent> = new EventEmitter;
  public eventMap: SidebarEventHandlerFnMap = {
    'opening':  e => {this.change$.emit(e)},
    'closing':  e => {this.change$.emit(e)},
    'content':  e => {this.change$.emit(e)},
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._map.removeControl(this.sidebar);
  }

  @Input() options: SidebarOptions = {};

  @Input() set map(map: Map){
    if (map){
      this._map = map;
      this.sidebar = control.sidebar(this.options).addTo(map);
      this.sidebar.on(this.eventMap)
    }
  }

  get map(): Map {
    return this._map
  }
}

