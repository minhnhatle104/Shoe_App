import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import SCREENS from '../../common/Screens';
import Detail from '../../screens/Detail/Detail';
import HomePage from '../../screens/HomePage/HomePage';
import { RootStackParamList } from '../typeCheckNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = () => {
  return (
      <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={SCREENS.HOME}>
        <RootStack.Screen name={SCREENS.HOME} component={HomePage} />
        <RootStack.Screen name={SCREENS.DETAIL} component={Detail} />
      </RootStack.Navigator>
  )
}

export default HomeStack