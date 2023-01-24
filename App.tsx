import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigator/Stack/Navigator';
import SplashScreen from 'react-native-splash-screen'
import {View} from "react-native";
import Routes from './navigator/Routes';


type Props = {}

const App = (props: Props) => {
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
    <View style={{flex:1}}>
      <Routes/>
    </View>
  )
}

export default App