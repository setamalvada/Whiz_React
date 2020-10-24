import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import "./map.css";
import places from "./sources/placesMadridWhizTest_codeNeighbourhood.geojson"

// import { Marker } from "react-map-gl";
// import {GeolocateControl} from 'react-map-gl';

mapboxgl.accessToken =  'pk.eyJ1IjoiY2xhcmE5MnIiLCJhIjoiYjI4MjBhOTMzOWFlNWI5YTNmZjk0ODM4Y2NjYzk2MTYifQ.A2pArieN8zLVdKxHdQFAsg'

function errorPos(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

const options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 40.4045439,
      longitude: -3.6829248,
      zoom: 17,
      bearing: 0,
      pitch: 60,
    
    };
    }

    componentDidMount() {


      // navigator.geolocation.getCurrentPosition(function(position) {
      const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/clara92r/ckgdeck3q07xt19lecaxpc9tv',
      center: [this.state.longitude, this.state.latitude],
      zoom: this.state.zoom,
      bearing: this.state.bearing,
      pitch: this.state.pitch
      });

      // map.on('load', function() {

      //   map.addSource('points', {
      //     type: 'geojson',
      //     data: places
      //   })

      //   map.addLayer({
      //     id: 'trees-point',
      //     type: 'circle',
      //     source: 'points',
      //     minzoom: 14,
      //     paint: {
            // increase the radius of the circle as the zoom level and dbh value increases
            // 'circle-radius': {
            //   property: 'dbh',
            //   type: 'exponential',
            //   stops: [
            //     [{ zoom: 15, value: 1 }, 5],
            //     [{ zoom: 15, value: 62 }, 10],
            //     [{ zoom: 22, value: 1 }, 20],
            //     [{ zoom: 22, value: 62 }, 50],
            //   ]
            // },
      //       'circle-color': {
      //         property: 'dbh',
      //         type: 'exponential',
      //         stops: [
      //           [0, 'rgba(236,222,239,0)'],
      //           [10, 'rgb(236,222,239)'],
      //           [20, 'rgb(208,209,230)'],
      //           [30, 'rgb(166,189,219)'],
      //           [40, 'rgb(103,169,207)'],
      //           [50, 'rgb(28,144,153)'],
      //           [60, 'rgb(1,108,89)']
      //         ]
      //       },
      //       'circle-stroke-color': 'white',
      //       'circle-stroke-width': 1,
      //       'circle-opacity': {
      //         stops: [
      //           [14, 0],
      //           [15, 1]
      //         ]
      //       }
      //     }
      //   }, 'waterway-label');


      // })

    // },errorPos,options)



    //GOOD STUFF
       const currentMarkers=[]
      navigator.geolocation.watchPosition(function(position) {
  
       const oneMarker = new mapboxgl.Marker()
      .setLngLat([position.coords.longitude,position.coords.latitude])
      .addTo(map);
      currentMarkers.push(oneMarker);
      // console.log(oneMarker._lngLat)

      for(let i=currentMarkers.length; i<0; i--){
       if(currentMarkers[i]._lngLat === currentMarkers[i-1]._lngLat){
        currentMarkers[i].remove()
      }else{
        currentMarkers[i].remove()
      }
      }
//END OF GOOD STUFF

    

      // if(currentMarkers.length = 1){
      //   currentMarkers[1].remove();
      // }

    //   if (currentMarkers!==null) {
    //     for (var i = currentMarkers.length+1 ; i > 0; i++) {
          
    //     }
    // }
   
      // arrMarkers.push(oneMarker)

      // console.log(currentMarkers)
      // console.log(oneMarker._lngLat)

      // if(arrMarkers.length>0){
      //   arrMarkers.pop()
      // }

      },errorPos,options)


      const staticMarker = new mapboxgl.Marker()
        .setLngLat([-3.68, 40.40])
        .addTo(map);

     
      var dragabble = new mapboxgl.Marker({
        draggable: true
        })
        .setLngLat([-3.68, 40.40])
        .addTo(map);

        function onDragEnd() {
          var lngLat = dragabble.getLngLat();
          var lngLatStatic = staticMarker.getLngLat();
          // coordinates.style.display = 'block';
         
          function distance(lat1, lon1, lat2, lon2, unit) {
            var radlat1 = Math.PI * lat1/180
            var radlat2 = Math.PI * lat2/180
            var radlon1 = Math.PI * lon1/180
            var radlon2 = Math.PI * lon2/180
            var theta = lon1-lon2
            var radtheta = Math.PI * theta/180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist)
            dist = dist * 180/Math.PI
            dist = dist * 60 * 1.1515
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist
    }
    
  //  console.log( distance(51.5112139, -0.119824, 48.8567, 2.3508, 'K'))
   console.log(distance(lngLat.lat,lngLat.lng,lngLatStatic.lat,lngLatStatic.lng,'K')*1000)


          // rad = function(x) {return x*Math.PI/180;}

          // var R = 6378.137; //Radio de la tierra en km

          // const difLat = (lngLatStatic.lat-lngLat.lat)*Math.PI/180
         
          // const difLong = (lngLatStatic.lng-lngLat.lng)*Math.PI/180

          // var a = Math.sin(difLat/2) * Math.sin(difLat/2) + Math.cos((lngLatStatic.lat)*Math.PI/180) * Math.cos((lngLat.lat)*Math.PI/180) * Math.sin(difLong/2) * Math.sin(difLong/2);
          // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          // var d = R * c;
          // console.log(d/1000)

          // const a = Math.pow(Math.sin(difLat/2),2)+Math.cos(lngLat.lat)* Math.cos(lngLatStatic.lat)*Math.pow(Math.sin(difLong/2),2)
          // const c = 2*Math.atan2(Math.sqrt(a),Math.sqrt((1-a)))
          // const d =R*c

          // console.log(d)

          // if(){
          //   console.log("dragabble is less 10 from point!")
          // }



          // console.log(lngLat.lng,lngLat.lat)   ;
          }

          dragabble.on('dragend', onDragEnd);
        // console.log(dragabble._lngLat)

          console.log(dragabble._lngLat)



      }

      




render() {
  return (
    <div>
          <div ref={el => this.mapContainer = el } className="mapContainer" />
          {/* <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        /> */}
          
    </div>
  );
}
}

export default Map;
