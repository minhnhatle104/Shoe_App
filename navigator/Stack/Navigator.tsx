import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SCREENS from '../../common/Screens';
import Cart from '../../screens/Cart/Cart';
import Detail from '../../screens/Detail/Detail';
import HomePage from '../../screens/HomePage/HomePage';
import Profile from '../../screens/Profile/Profile';
import ShoeFavourite from '../../screens/ShoeFavourite/ShoeFavourite';
import {RootStackParamList } from '../typeCheckNavigator';
import HomeStack from './HomeStack';

const RootStack = createNativeStackNavigator<RootStackParamList>();
export const StackNavigator = () => {
    return <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={SCREENS.HOMESTACK}>
        <RootStack.Screen name={SCREENS.HOMESTACK} component={HomeStack} />
        <RootStack.Screen name={SCREENS.FAVOURITE} component={ShoeFavourite} />
        <RootStack.Screen name={SCREENS.CART} component={Cart} />
        <RootStack.Screen name={SCREENS.ACCOUNT} component={Profile} />
    </RootStack.Navigator>
}