import MapView, {Marker} from 'react-native-maps';
import {Dimensions,Input,Button,TextInput, StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState,} from 'react';

const Map = function ({receivedData}) {
    const dataArray = 
    receivedData === null? [{'latitude':37.725170,'longitude':-122.438336}] : [{'latitude':receivedData.latitude,'longitude': receivedData.longitude}]
    let mapRef = null;

    useEffect(()=>{
        mapRef.fitToCoordinates(
            dataArray
            ,
            {
              edgePadding: {top: 200, right:50, bottom:200,left:50}
            }
        )
    })
    
    return (
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
        //  onRegionChange = {e=>{
        //    setLongDelta(e.longitudeDelta);
        //    setLatDelta(e.latitudeDelta);
        //  }}
          //onRegionChangeComplete = {e=>console.log('Region changed', e.nativeEvent)}

        //  onLayout = {()=>mapRef.fitToCoordinates(
        //    //Headers should be latitude and longitude
        //        dataArray
        //    ,
        //    {
        //      edgePadding: {top: 200, right:50, bottom:200,left:50}
        //    }
        //  )}
        
        >
        {/*{data.map((point,index)=>(
          <Marker 
            coordinate = {{latitude:point.lat_deg, longitude:point.long_deg}}
            title = {'' + index}
            key = {index}
          />
        ))}*/}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    }
  });

export default Map;