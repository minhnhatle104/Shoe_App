import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SCREENS from '../../common/Screens';
import Cart from '../../screens/Cart/Cart';
import Login from '../../screens/Login/Login';
import Profile from '../../screens/Profile/Profile';
import Register from '../../screens/Register/Register';
import ShoeFavourite from '../../screens/ShoeFavourite/ShoeFavourite';
import { BottomTabNavigator } from '../BottomTab/BottomTabNavigator';
import { RootStackParamList } from '../typeCheckNavigator';
import HomeStack from './HomeStack';

const RootStack = createNativeStackNavigator<RootStackParamList>();
export const StackNavigator = () => {
    return <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={SCREENS.LOGIN}>
        <RootStack.Screen name={SCREENS.LOGIN} component={Login} />
        <RootStack.Screen name={SCREENS.SIGNUP} component={Register}/>
        <RootStack.Screen name={SCREENS.HOMESTACK} component={BottomTabNavigator} />
    </RootStack.Navigator>
}