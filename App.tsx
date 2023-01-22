import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator, StackNavigator } from './navigator/Navigator';
import SplashScreen from 'react-native-splash-screen'


type Props = {}

const App = (props: Props) => {
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
    <NavigationContainer>
        <StackNavigator/>
    </NavigationContainer>
  )
}

export default App