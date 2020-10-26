import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import {listPlaces} from "../../services/api.service"
import "./map.css";
// import places from "./sources/placesMadridWhizTest_codeNeighbourhood.geojson"

// import { Marker } from "react-map-gl";
// import {GeolocateControl} from 'react-map-gl';

mapboxgl.accessToken =  'pk.eyJ1IjoiY2xhcmE5MnIiLCJhIjoiYjI4MjBhOTMzOWFlNWI5YTNmZjk0ODM4Y2NjYzk2MTYifQ.A2pArieN8zLVdKxHdQFAsg'



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


function errorPos(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

const options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0
};





class Map extends Component {
  
    
    state = {
      
      map:{
      latitude: 40.4045439,
      longitude: -3.6829248,
      zoom: 17,
      bearing: 0,
      pitch: 60,
    },
    places:[],
    
    };
    map = undefined

    componentDidMount() {

     
       console.log(this.state.places)


      this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/clara92r/ckgdeck3q07xt19lecaxpc9tv',
      center: [this.state.map.longitude, this.state.map.latitude],
      zoom: this.state.map.zoom,
      bearing: this.state.map.bearing,
      pitch: this.state.map.pitch
      });

   

       let currentMarkers=[]
      let currentPosition = {}
      let placesMarkers =[]

       function success(position) {

          
  // console.log(this.map)
        currentPosition = new mapboxgl.Marker({color: "red"})
       .setLngLat([position.coords.longitude,position.coords.latitude])
       .addTo(this.map);
   
  
      const lngLat = currentPosition.getLngLat()
      currentMarkers.forEach(prevMarker => {

    
        prevMarker.remove()
        

      })
      currentMarkers=[]
      currentMarkers.push(currentPosition);

      // console.log(places)







      //    const staticMarker = new mapboxgl.Marker(
        
      // )
      //   .setLngLat([-3.6829448, 40.4045251])
      //   .addTo(this.map);

    
       

      //  let radius = (distance(lngLat.lat,lngLat.lng,lngLatStatic.lat,lngLatStatic.lng,'K')*1000)
      //  if(radius<=30){
      //    console.log("change team")
      //  }

      //  console.log(radius)

   
      listPlaces()
      .then((response) =>{
        // console.log(response)
        this.setState({places: response})
              response.forEach(e =>{
                // console.log(e)
      if(e.owner === null){
      const place = new mapboxgl.Marker({color:"grey"}) 
    
      .setLngLat([e.location.coordinates[0],e.location.coordinates[1]])
      .addTo(this.map);

    }else if
      (e.owner === "yellow"){
        const place = new mapboxgl.Marker({color:"yellow"}) 
      
        .setLngLat([e.location.coordinates[0],e.location.coordinates[1]])
        .addTo(this.map);
    }else{ const place = new mapboxgl.Marker({color:"purple"}) 
      
    .setLngLat([e.location.coordinates[0],e.location.coordinates[1]])
    .addTo(this.map);

    }

      //  console.log(radius)

})
      })
      .catch(error => {
        console.log(error);
      });
  

     }




      // setInterval(
        navigator.geolocation.watchPosition(success.bind(this),errorPos,options)
      // ,3000)
  
    


      


      }

      




render() {
  return (
    <div>
          <div ref={el => this.mapContainer = el } className="mapContainer" />

  
         
          
    </div>
  );
}
}

export default Map;
