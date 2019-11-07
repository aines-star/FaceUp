import React, { Component } from 'react'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import { Text, View ,ScrollView, Image} from 'react-native';

class GalerieScreen extends React.Component {
  
    state = {
      myPHOTO : []
    }
    componentDidMount(){
      fetch("http://10.2.5.219:3000/").then(response => {
          return response.json();
        }).then(data=>{
          this.setState({
            myPHOTO : data.data
          })
        })
    }
      render() {
        console.log(this.state);
        var galerie = this.state.myPHOTO.map((data,i)=>{
          return (
              <Image     source={{uri:data.pictureUrl}}  style={{height:200,width:'100%'}}       key={i}/>
          )
        })
          return (

    
            <ScrollView style={{ flex: 1 }}>

          {galerie}
    
           </ScrollView>
       
          );
        }
      }
    

export default GalerieScreen;




  