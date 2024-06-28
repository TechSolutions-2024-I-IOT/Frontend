import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from "../../../../../../../../Desktop/Frontend/src/environments/environment";
import Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  private mapbox!: Mapboxgl.Map;
  private markers: Mapboxgl.Marker[] = [];
  private coordinates: [number, number][] = [];

  ngOnInit() {
    Mapboxgl.accessToken = environment.mapBoxKey;
  }

  ngAfterViewInit() {
    this.mapbox = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-77.0525224, -12.0874459],
      zoom: 14
    });

    const nav = new Mapboxgl.NavigationControl();
    this.mapbox.addControl(nav, 'top-left');
  }

  addMarker(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({ draggable: true })
      .setLngLat([lng, lat])
      .addTo(this.mapbox);
    this.markers.push(marker);
    this.coordinates.push([lng, lat]);
    this.updateRoute();

    marker.on('dragend', () => {
      const updatedLngLat = marker.getLngLat();
      const index = this.markers.indexOf(marker);
      this.coordinates[index] = [updatedLngLat.lng, updatedLngLat.lat];
      this.updateRoute();
    });
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
    this.coordinates = [];
    this.removeRoute();

    if (this.mapbox.getSource('route')) {
      this.mapbox.removeLayer('route');
      this.mapbox.removeSource('route');
    }
  }

  updateRoute() {
    if (this.coordinates.length < 2) {
      return;
    }

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.coordinates.map(coord => coord.join(',')).join(';')}?geometries=geojson&access_token=${Mapboxgl.accessToken}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry;

          if (this.mapbox.getSource('route')) {
            (this.mapbox.getSource('route') as Mapboxgl.GeoJSONSource).setData(route);
          } else {
            this.mapbox.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: route
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#888',
                'line-width': 6
              }
            });
          }
        }
      })
      .catch(error => console.error('Error fetching the route:', error));
  }

  private getRoute(coordinates: [number, number][]) {
    let coordsString = coordinates.map(coord => coord.join(',')).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordsString}?geometries=geojson&access_token=${environment.mapBoxKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.routes && data.routes.length > 0 ) {
          this.drawRoute(data.routes[0].geometry.coordinates);
          console.log(data);
        } else {
          console.error('Could not fetch route');
        }
      })
      .catch(error => {
        console.error('Error fetching route:', error);
      });
  }


  private drawRoute(coordinates: [number, number][]) {
    this.removeRoute();

    this.mapbox.addSource('route', {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': coordinates
        }
      }
    });

    this.mapbox.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#007bff',
        'line-width': 8
      }
    });
  }

  private removeRoute() {
    if(this.mapbox.getSource('route')) {
      this.mapbox.removeLayer('route');
      this.mapbox.removeSource('route');
    }
  }
}
