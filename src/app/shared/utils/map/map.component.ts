import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as Leaflet from 'leaflet';
import { MapOptions } from '../../../core/app/models/MapOptions';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Output() coordinates = new EventEmitter<number[]>();
  @Input() mapOption!: MapOptions;

  public map!: Leaflet.Map;

  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 8,
    center: { lat: 45.199398, lng: 5.667857 },
  };

  public initMarkers(): void {
    const initialMarkers = [
      {
        position: { lat: this.mapOption.lat, lng: this.mapOption.lat },
        draggable: this.mapOption.draggable,
      },
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker: Leaflet.Marker = this.generateMarker(data, index);
      marker
        .addTo(this.map)
        .bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker);
    }
  }
  private generateMarker(data: any, index: number): Leaflet.Marker {
    return Leaflet.marker(data.position, {
      draggable: data.draggable,
    })
      .on('click', event => this.markerClicked(event, index))
      .on('dragend', event => this.markerDragEnd(event, index));
  }
  public onMapReady($event: Leaflet.Map): void {
    this.map = $event;
    this.initMarkers();
    console.log('ready');
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    this.coordinates.emit([
      $event.target.getLatLng().lat,
      $event.target.getLatLng().lng,
    ]);
  }
}
