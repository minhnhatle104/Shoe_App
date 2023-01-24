import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../../screens/Cart/Cart';
import HomePage from '../../screens/HomePage/HomePage';
import Profile from '../../screens/Profile/Profile';
import ShoeFavourite from '../../screens/ShoeFavourite/ShoeFavourite';
import {RootStackParamList } from '../typeCheckNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();
export const StackNavigator = () => {
    return <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name='Home' component={HomePage} />
        <RootStack.Screen name='Favourite' component={ShoeFavourite} />
        <RootStack.Screen name='Cart' component={Cart} />
        <RootStack.Screen name='Profile' component={Profile} />
    </RootStack.Navigator>
}