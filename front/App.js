import React from 'react';
import { Platform } from 'react-native';
import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from './components/HomeScreen'
import CameraScreen from './components/CameraScreen'
import GalerieScreen from './components/Galerie'
import Ionicons from 'react-native-vector-icons/FontAwesome';


import id from './user.reducer';

import {Provider} from 'react-redux';

import {createStore, combineReducers}  from 'redux';




const store = createStore(combineReducers({id}));

BottomNavigator = createBottomTabNavigator({  
  Home: HomeScreen,  Camera: CameraScreen, Galerie: GalerieScreen  },
  {
    // The lastest version of react navigation requires us to use defaultNavigationOptions instead of navigationOptions
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        var iconName;
        var outline = (focused)
          ? ''
          // : '-outline'; // this -outline is actually leading to a visual error. Another icon library could solve the problem.
          : '';
        if (navigation.state.routeName == 'Camera') {
          Platform.OS === 'ios'
            ? iconName = 'camera'
            : iconName = 'camera'
        } else if (navigation.state.routeName == 'Home') {
          Platform.OS === 'ios'
            ? iconName = 'home'
            : iconName = 'home'
        } else if (navigation.state.routeName == 'Galerie') {
          Platform.OS === 'ios'
            ? iconName = 'image'
            : iconName = 'image'
        }
      
  
        return <Ionicons name={iconName + outline} size={25} color={tintColor}/>;
      }
    }),
    tabBarOptions: {

      activeTintColor: '#FFFFFF',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#022F40',
      }
    }
  });  

  var Navigation = createAppContainer(BottomNavigator) 


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }
}




