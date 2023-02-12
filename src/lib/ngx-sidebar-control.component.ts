/// <reference types='leaflet-sidebar-v2' />
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import {Map, Control, LeafletEvent, SidebarEventHandlerFnMap} from 'leaflet';
import 'node_modules/leaflet-sidebar-v2/js/leaflet-sidebar.min.js';

declare module 'leaflet' {
  interface LeafletEvent{
    id: string
  }
}

export type SidebarEvent = LeafletEvent;

@Component({
  selector: 'leaflet-sidebar-control',
  template: '',
})
export class NgxSidebarControlComponent implements OnInit, OnDestroy {
  @Input() options!: Control.SidebarOptions;
  @Input() map!: Map;

  @Output() change$: EventEmitter<SidebarEvent> = new EventEmitter();
  public eventMap: SidebarEventHandlerFnMap = {
    opening: e => {
      this.change$.emit(e);
    },
    closing: e => {
      this.change$.emit(e);
    },
    content: e => {
      this.change$.emit(e);
    }
  };

  public sidebar: Control.Sidebar | undefined;

  constructor() {}

  ngOnInit() {
    if (this.map && this.options) {
      this.sidebar = new Control.Sidebar(this.options);
      this.sidebar.addTo(this.map);
      this.sidebar.on(this.eventMap);
    }
  }
  ngOnDestroy() {
    this.sidebar?.remove();
  }
}
