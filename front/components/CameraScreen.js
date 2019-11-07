import React, { Component } from 'react'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import { Text, View ,Button, Image} from 'react-native';


class CameraScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          hasCameraPermission: null,
          type: Camera.Constants.Type.back,
          maphotocloudy : ''
        
        };
        this.onPictureSaved = this.onPictureSaved.bind(this)
      }
    
      state = {
        permision: null,
        type: Camera.Constants.Type.back 
      };
    
      async componentDidMount() {
        var { status } = await Permissions.askAsync(Permissions.CAMERA);
        var permision = (status === 'granted')? true : false;
        this.setState({ permision });
      }
    
     
      onPictureSaved = async photo => {
        
        console.log(photo.uri);   
    
        var data =  new FormData();

       await data.append('photo', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'mypic',
        });

        fetch("http://10.2.5.219:3000/photo/", {
          method: 'post',
          body: data
        }).then(response => {
          return response.json();
        }).then(data=>{
          this.setState({
            maphotocloudy : data.result.secure_url
          })
        })
      
       
      }
    
      render() {
        console.log(this.state.maphotocloudy)
        if (this.state.permision === null) {
          return <View />;
        } 
        else if (this.state.permision === false) {
          return <Text>No access to camera</Text>;
        } 
    
        else {
          return (
    
            <View style={{ flex: 1 }}>
             
              <Camera 
                ref={ref => { this.camera = ref }}
                style={{ flex: 1,alignItems: 'center',
                justifyContent: 'center',  }} type={this.state.type}>
              </Camera>

              
              <Button title="snapshot"
                             color="red"
                             onPress={() => {
                          if (this.camera) {
                                this.camera.takePictureAsync({ 
                              onPictureSaved: this.onPictureSaved,
                              quality : 0.7,
                              base64: true,
                              exif: true
                          });
                        }
                      }} 
               />
               <Button title="baack"
               color="red"
               onPress={() => {
                    this.setState({
                      type : 
                      this.state.type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            :Camera.Constants.Type.back
                    })
        }} 
 />
        
    
           </View>
       
          );
        }
      }
    }
   

export default CameraScreen;




  