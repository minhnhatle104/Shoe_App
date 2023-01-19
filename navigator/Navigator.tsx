import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    createDrawerNavigator, DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import { DrawerStackParamList, RootStackParamList, TabStackParamList } from './typeCheckNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';;
import HomePage from '../screens/HomePage';
import ShoeFavourite from '../screens/ShoeFavourite';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';


const BottomTabStack = createBottomTabNavigator<TabStackParamList>();
export const BottomTabNavigator = () => {
    return <BottomTabStack.Navigator screenOptions={{ headerShown: false }}>
        <BottomTabStack.Screen name="TabHome" component={HomePage} />
        <BottomTabStack.Screen name="TabFavourite" component={ShoeFavourite} />
        <BottomTabStack.Screen name='TabCart' component={Cart} />
        <BottomTabStack.Screen name='TabProfile' component={Profile} />
    </BottomTabStack.Navigator>
}

const DrawerStack = createDrawerNavigator<DrawerStackParamList>();
function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>
             <DrawerItem
                label="Home"
                icon={({focused,color,size})=> <Icon name="address-card" size={30} color="#900" />}
                onPress={() => props.navigation.navigate('TabHome')}
            />
             <DrawerItem
                label="Favourite"
                onPress={() => props.navigation.navigate('TabFavourite')}
            />
            <DrawerItem
                label="Cart"
                onPress={() => props.navigation.navigate('TabCart')}
            />
            <DrawerItem
                label="Profile"
                onPress={() => props.navigation.navigate('TabProfile')}
            />
        </DrawerContentScrollView>
    );
}
export const DrawerNavigator = () => {
    return <DrawerStack.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <DrawerStack.Screen name="DrawerHome" component={BottomTabNavigator} />
    </DrawerStack.Navigator>
}

const RootStack = createNativeStackNavigator<RootStackParamList>();
export const StackNavigator = () => {
    return <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name='TabHome' component={DrawerNavigator} />
    </RootStack.Navigator>
}