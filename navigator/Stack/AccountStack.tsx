import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import SCREENS from '../../common/Screens';
import AccountScreen from '../../screens/Account/AccountScreen';
import Profile from '../../screens/Profile/Profile';
import { RootStackParamList } from '../typeCheckNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AccountStack = () => {
  return (
      <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={SCREENS.ACCOUNT}>
        <RootStack.Screen name={SCREENS.ACCOUNT} component={AccountScreen} />
        <RootStack.Screen name={SCREENS.PROFILE} component={Profile}/>
      </RootStack.Navigator>
  )
}

export default AccountStack