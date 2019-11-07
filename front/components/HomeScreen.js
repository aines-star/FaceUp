import { View, ImageBackground, Text,TouchableOpacity} from 'react-native';

import React, { Component } from 'react';
import {connect} from 'react-redux';


class HomeScreen extends React.Component {
    render() {
  
      return (
  
        <ImageBackground source={require('../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
  
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              
              <View style={{
                alignItems: 'center',
                justifyContent: 'center', 
                width: '60%',
                height: '10%',
                backgroundColor:'#022F40',
                border: 'solid',
                borderColor:'white',
                borderWidth: 3,
                borderRadius: 30,
                }}>
                <TouchableOpacity
                onPress={()=>this.props.navigation.navigate("Camera")}>
                  <Text style={{
                    color:'#FFFFFF',
                    fontStyle:'italic',
                    fontWeight:'bold',
                    fontSize:30,

                  }}>Face Up !</Text>
                </TouchableOpacity>
              </View>
  
            </View>
  
        </ImageBackground>
        
      );
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      signin: function(name) {
          dispatch( {type: 'signin', name} );
      }
    }
  }
  function mapStateToProps(state) {

    console.log('je recois de mon reducer lid suivant : ',state)

    return { user: state.id.firstname }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);