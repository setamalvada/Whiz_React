import React, { Component } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import { conquer, listPlaces } from "../../services/api.service";
import "./map.css";
// import places from "./sources/placesMadridWhizTest_codeNeighbourhood.geojson"

// import { Marker } from "react-map-gl";
// import {GeolocateControl} from 'react-map-gl';

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2xhcmE5MnIiLCJhIjoiYjI4MjBhOTMzOWFlNWI5YTNmZjk0ODM4Y2NjYzk2MTYifQ.A2pArieN8zLVdKxHdQFAsg";

function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}

function errorPos(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
}

const options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0,
};

class Map extends Component {
  state = {
    map: {
      latitude: 40.4045439,
      longitude: -3.6829248,
      zoom: 17,
      bearing: 0,
      pitch: 60,
    },
    places: [],
    markers: [],
  };
  map = undefined;

  componentDidMount() {
    console.log(this.state.places);

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/clara92r/ckgy5z1rk61nj1an2jvrcwhyx",
      center: [this.state.map.longitude, this.state.map.latitude],
      zoom: this.state.map.zoom,
      bearing: this.state.map.bearing,
      pitch: this.state.map.pitch,
    });

    let currentMarkers = [];
    let currentPosition = {};
    let placesMarkers = [];

    function success(position) {
      // console.log(this.map)
      currentPosition = new mapboxgl.Marker({ color: "red" })
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(this.map);

      currentMarkers.forEach((prevMarker) => {
        prevMarker.remove();
      });
      currentMarkers = [];
      currentMarkers.push(currentPosition);

      console.log(currentPosition);

      this.checkMarkers(currentPosition._lngLat);

      let currentPlaces = [];
    }

    // setInterval(
    navigator.geolocation.watchPosition(success.bind(this), errorPos, options);
    // ,3000)

    console.log(this.props.user);

    listPlaces()
      .then((response) => {
        const responseMarkers = [];
        response.forEach((e) => {
          let color =
            e.owner === "yellow"
              ? "yellow"
              : e.owner === "purple"
              ? "purple"
              : "grey";

          const place = new mapboxgl.Marker({ color: color })
            .setLngLat([e.location.coordinates[0], e.location.coordinates[1]])
            .addTo(this.map);

          responseMarkers.push(place);
          const lngLat = currentPosition.getLngLat();
          let radius =
            distance(
              lngLat.lat,
              lngLat.lng,
              place.getLngLat().lat,
              place.getLngLat().lng,
              "K"
            ) * 1000;
        });
        console.log(responseMarkers);
        this.setState({ places: response, markers: responseMarkers });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  checkMarkers = (currentPosition) => {
    const distMin = 20;

    if (this.state.places.length && this.state.markers.length) {
      const placesToUPdate = [];
      this.state.places.forEach((place) => {
        let currentDistance =
          distance(
            place.location.coordinates[1],
            place.location.coordinates[0],
            currentPosition.lat,
            currentPosition.lng,
            "K"
          ) * 1000;

        console.log(currentDistance);
        if (currentDistance < distMin && place.owner !== this.props.user.team) {
          placesToUPdate.push(conquer(place.id));
        }
      });

      Promise.all(placesToUPdate).then((ids) => {
        let newArrayState = [...this.state.markers];
        let newArrayPlaces = [...this.state.places];
        ids.forEach((id) => {
          const updatedPlace = this.state.places.find((p) => {
            return p.id === id;
          });

          const updatedPlaces = newArrayPlaces.filter((p) => {
            return p.id === id;
          });

          updatedPlace.owner = this.props.user.team;

          const updatedMarker = this.state.markers.find((m) => {
            return (
              m._lngLat.lng === updatedPlace.location.coordinates[0] &&
              m._lngLat.lat === updatedPlace.location.coordinates[1]
            );
          });

          if (updatedMarker) {
            updatedMarker.remove();
            let color = this.props.user.team === "yellow" ? "yellow" : "purple";

            const newMarker = new mapboxgl.Marker({ color: color })
              .setLngLat([
                updatedPlace.location.coordinates[0],
                updatedPlace.location.coordinates[1],
              ])
              .addTo(this.map);

            const updatedMarkers = newArrayState.filter((marker) => {
              return (
                marker._lngLat.lng !== updatedPlace.location.coordinates[0] ||
                marker._lngLat.lat !== updatedPlace.location.coordinates[1]
              );
            });

            this.setState({ markers: [...updatedMarkers, newMarker] });

            newArrayState = [...updatedMarkers, newMarker];

            newArrayPlaces = [...updatedPlaces, updatedPlace];
          }
        });
        this.setState({ markers: newArrayState, places: newArrayPlaces });
      });
    }
  };

  render() {
    return (
      <div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default Map;
