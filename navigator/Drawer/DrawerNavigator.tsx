import React, { useState } from 'react';
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
} from '@react-navigation/drawer';

import { RootStackParamList } from "../typeCheckNavigator";
import { BottomTabNavigator } from "../BottomTab/BottomTabNavigator";
import { CONSTANST } from '../../common/contanst';
import Colors from '../../common/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const DrawerStack = createDrawerNavigator<RootStackParamList>();

function CustomDrawerContent(props: any) {
    const [labelFocused, setLabelFocused] = useState("Home")

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: 'red' }}>
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

                {/* NAVIGATION BODY */}
                <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
                    <TouchableOpacity onPress={() => {
                        setLabelFocused("Home")
                        props.navigation.navigate('Home')
                    }} style={{marginBottom:10}}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: labelFocused === "Home" ? Colors.red : Colors.white,
                            padding: 10,
                            borderRadius: 20,
                        }}>
                            <FontAwesome5 color={labelFocused === "Home" ? Colors.white : Colors.red}
                                name="home" size={CONSTANST.iconSize} />
                            <Text
                                style={{
                                    color: labelFocused === "Home" ? Colors.white : Colors.red,
                                    fontSize: 15,
                                    fontFamily: 'Roboto-Medium',
                                    marginLeft: 5,
                                }}>
                                Home
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setLabelFocused("Favourite")
                        props.navigation.navigate('Favourite')
                    }}  style={{marginBottom:10}}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: labelFocused === "Favourite" ? Colors.red : Colors.white,
                            padding: 10,
                            borderRadius: 20,
                        }}>
                            <FontAwesome5 color={labelFocused === "Favourite" ? Colors.white : Colors.red}
                                name="heart" size={CONSTANST.iconSize} />
                            <Text
                                style={{
                                    color: labelFocused === "Favourite" ? Colors.white : Colors.red,
                                    fontSize: 15,
                                    fontFamily: 'Roboto-Medium',
                                    marginLeft: 5,
                                }}>
                                Favourite
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setLabelFocused("Cart")
                        props.navigation.navigate('Cart')
                    }}  style={{marginBottom:10}}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: labelFocused === "Cart" ? Colors.red : Colors.white,
                            padding: 10,
                            borderRadius: 20,
                        }}>
                            <FontAwesome5 color={labelFocused === "Cart" ? Colors.white : Colors.red}
                                name="shopping-cart" size={CONSTANST.iconSize} />
                            <Text
                                style={{
                                    color: labelFocused === "Cart" ? Colors.white : Colors.red,
                                    fontSize: 15,
                                    fontFamily: 'Roboto-Medium',
                                    marginLeft: 5,
                                }}>
                                Cart
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setLabelFocused("Profile")
                        props.navigation.navigate('Profile')
                    }}  style={{marginBottom:10}}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: labelFocused === "Profile" ? Colors.red : Colors.white,
                            padding: 10,
                            borderRadius: 20,
                        }}>
                            <MaterialCommunityIcons color={labelFocused === "Profile" ? Colors.white : Colors.red}
                                name="account" size={CONSTANST.iconSize} />
                            <Text
                                style={{
                                    color: labelFocused === "Profile" ? Colors.white : Colors.red,
                                    fontSize: 15,
                                    fontFamily: 'Roboto-Medium',
                                    marginLeft: 5,
                                }}>
                                Account
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>

            {/* FOOTER of DRAWER */}
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                <TouchableOpacity onPress={() => { }}  style={{marginBottom:10}}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                    }}>
                        <Ionicons name="share-social-outline" size={CONSTANST.iconSize} />
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
                <TouchableOpacity onPress={() => { }}  style={{marginBottom:10}}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                    }}>
                        <Ionicons name="exit-outline" size={CONSTANST.iconSize} />
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
            initialRouteName='Home'
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <DrawerStack.Screen name="Overview" component={BottomTabNavigator} />
        </DrawerStack.Navigator>
    )
}