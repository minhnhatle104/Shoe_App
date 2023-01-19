import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator, StackNavigator } from './navigator/Navigator';


type Props = {}

const App = (props: Props) => {
  return (
    <NavigationContainer>
        <StackNavigator/>
    </NavigationContainer>
  )
}

export default App