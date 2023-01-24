import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';

import { RootStackParamList } from "../typeCheckNavigator";
import { BottomTabNavigator } from "../BottomTab/BottomTabNavigator";
import { CONSTANST } from '../../common/contanst';
import Colors from '../../common/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DrawerStack = createDrawerNavigator<RootStackParamList>();
function CustomDrawerContent(props: any) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#8200d6' }}>
                <ImageBackground
                    source={require('../../assets/images/background_ars.jpg')}
                    style={{ padding: 20 }}>
                    <Image
                        source={require('../../assets/images/user-profile.jpg')}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 18,
                            fontFamily: 'Roboto-Medium',
                            marginBottom: 5,
                        }}>
                        John Doe
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                color: '#fff',
                                fontFamily: 'Roboto-Regular',
                                marginRight: 5,
                            }}>
                            280 Coins
                        </Text>
                        <FontAwesome5 name="coins" size={14} color="#fff" />
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItem
                        label="Home"
                        icon={({ focused, color, size }) => <FontAwesome5 name="home" size={CONSTANST.iconSize} />}
                        onPress={() => props.navigation.navigate('Home')}
                    />
                    <DrawerItem
                        label="Favourite"
                        onPress={() => props.navigation.navigate('Favourite')}
                    />
                    <DrawerItem
                        label="Cart"
                        onPress={() => props.navigation.navigate('Cart')}
                    />
                    <DrawerItem
                        label="Profile"
                        onPress={() => props.navigation.navigate('Profile')}
                    />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'Roboto-Medium',
                                marginLeft: 5,
                            }}>
                            Tell a Friend
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'Roboto-Medium',
                                marginLeft: 5,
                            }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export const DrawerNavigator = () => {
    return (
        <DrawerStack.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
            }}>
            <DrawerStack.Screen name="Overview" component={BottomTabNavigator} />
        </DrawerStack.Navigator>
    )
}