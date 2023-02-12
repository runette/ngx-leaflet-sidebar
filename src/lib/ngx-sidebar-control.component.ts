/// <reference types='leaflet-sidebar-v2' />
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import {Map, Control, LeafletEvent } from 'leaflet';
import 'node_modules/leaflet-sidebar-v2/js/leaflet-sidebar.min.js';

@Component({
  selector: 'leaflet-sidebar-control',
  template: '',
})
export class NgxSidebarControlComponent implements OnInit, OnDestroy {
  @Input() options!: Control.SidebarOptions;
  @Input() map!: Map;

  @Output() opening = new EventEmitter<LeafletEvent>();
  @Output() closing = new EventEmitter<LeafletEvent>();
  @Output() content = new EventEmitter<LeafletEvent & {id: string}>();

  public sidebar: Control.Sidebar | undefined;

  constructor() {}

  ngOnInit() {
    if (this.map && this.options) {
      this.sidebar = new Control.Sidebar(this.options);
      this.sidebar.addTo(this.map);

      this.sidebar?.on("opening", e => this.opening.emit(e));
      this.sidebar?.on("closing", e => this.closing.emit(e));
      this.sidebar?.on("content", (e:any) => this.content.emit(e));
    }
  }
  ngOnDestroy() {
    this.sidebar?.remove();
  }
}
