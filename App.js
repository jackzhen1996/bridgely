import React, {useEffect, useState,} from 'react';
import {Dimensions,Input,Button,TextInput, StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function App() {
  const [showMap,setMap] = useState(false);
  const [longDelta,setLongDelta] = useState(0);
  const [latDelta,setLatDelta] = useState(0);
  const [search,setSearch] = useState(null);
 
  let mapRef = null;
  
  var data = require('./data/new_data_latlong_JSON.json');

  //Test routes
  var post_route = "http:192.168.86.61:5000/search";
  var get_route = "http:192.168.86.61:5000/time"

  var post_search = function(url,search) {
    const requestOptions = {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'location': search})
    }
    fetch(url, requestOptions)
    //response is in json string or Python object string
        .then(response => response.json())
        .then(data => console.log(data));
  }


  //useEffect(() => {
    //On PC, replace IP with address with IPv4
    //Format :'IP'/'MY_API'
  //  fetch('http:192.168.86.61:5000/time').then(res => res.json()).then(data => {
  //    setSearch(data.time)
  //  });
  //  console.log(search)
  //}, []);

  return (
    <View style = {styles.container}>
       <MapView
          ref = {(ref) => {mapRef = ref}}
          style = {styles.map}
          initialRegion={{
          //Location of Golden Gate Bridge
          latitude: 37.8197222,
          longitude: -122.4788889,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}

          //onPress = {e=>console.log("Pressed:" , e.nativeEvent)}
          onRegionChange = {e=>{
            setLongDelta(e.longitudeDelta);
            setLatDelta(e.latitudeDelta);
          }}
          //onRegionChangeComplete = {e=>console.log('Region changed', e.nativeEvent)}

          onLayout = {()=>mapRef.fitToCoordinates(
            //Headers should be latitude and longitude
            [{'latitude':37.757379,'longitude': -122.455776},
            {'latitude':37.780936,'longitude': -122.445030}
            ],
            {
              edgePadding: {top: 200, right:50, bottom:200,left:50}
            }
          )}
        
        >
        {data.map((point,index)=>(
          <Marker 
            coordinate = {{latitude:point.lat_deg, longitude:point.long_deg}}
            title = {'' + index}
          />
        ))}
        </MapView>
        <Text style = {{fontSize: 20,position:"absolute", bottom:50}}>
          LongDelta: {longDelta.toFixed(4)}  , LatDelta: {latDelta.toFixed(4)} {'\n'}
          X-miles : {longDelta.toFixed(4)*69}
        </Text>
        <View style = {{position:'absolute',top:50, display: 'flex', flexDirection: 'row', justifyContent:'space-evenly'}}>
          <TextInput clearButtonMode = 'always' onChangeText = {text=>setSearch(text)} style = {{fontSize: 22,height:40,borderWidth:1,backgroundColor:'white',width:'60%'}}/>
          <Button title = 'Submit' style = {{height : 50, width: 100, backgroundColor:'white'}} onPress = {()=>post_search(post_route,search)}/>
        </View>
      </View>
  )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
