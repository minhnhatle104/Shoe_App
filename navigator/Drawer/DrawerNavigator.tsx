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
import SCREENS from '../../common/Screens';
import ICONS from '../../common/Icons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const DrawerStack = createDrawerNavigator<RootStackParamList>();

type drawerItem = {
    label:string;
    icon:string
}

function CustomDrawerContent(props: any) {
    const [labelFocused, setLabelFocused] = useState("Home")

    const drawerArr:drawerItem[] = [
        { label: SCREENS.HOME, icon: ICONS.HOME },
        { label: SCREENS.FAVOURITE, icon: ICONS.FAVOURITE },
        { label: SCREENS.CART, icon: ICONS.CART },
        { label: SCREENS.ACCOUNT, icon: ICONS.ACCOUNT },
    ]

    const renderIcon = (item:drawerItem) => {
        if (item.label === SCREENS.ACCOUNT) {
            return <MaterialCommunityIcons
                color={labelFocused === item.label ? Colors.white : Colors.red}
                name={item.icon} size={CONSTANST.iconSize} />
        }
        return <FontAwesome5 color={labelFocused === item.label ? Colors.white : Colors.red}
            name={item.icon} size={CONSTANST.iconSize} />
    }

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
                    {drawerArr.map((item, index) => {
                        return <TouchableOpacity key={index} onPress={() => {
                            setLabelFocused(item.label)
                            props.navigation.navigate(item.label)
                        }} style={{ marginBottom: 10 }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: labelFocused === item.label ? Colors.red : Colors.white,
                                padding: 10,
                                borderRadius: 20,
                            }}>
                                {renderIcon(item)}
                                <Text
                                    style={{
                                        color: labelFocused === item.label ? Colors.white : Colors.red,
                                        fontSize: 15,
                                        fontFamily: 'Roboto-Medium',
                                        marginLeft: 5,
                                    }}>
                                    {item.label}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    })}
                </View>
            </DrawerContentScrollView>

            {/* FOOTER of DRAWER */}
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ marginBottom: 10 }}>
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
                <TouchableOpacity onPress={() => { }} style={{ marginBottom: 10 }}>
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
            screenOptions={({ route, navigation }) => ({
                headerStyle: {
                    backgroundColor: Colors.red,
                },
                headerTintColor: Colors.white,
                headerTitleAlign: "center",
                title: "ARSENAL SHOP",
                headerRight: () => {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.CART)}>
                                <FontAwesome5 color={Colors.white} name={ICONS.CART} size={CONSTANST.iconSize} />
                                <Text style={{ position: "absolute", left: 12 }}>0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 20, marginRight: 20 }} onPress={() => navigation.navigate(SCREENS.ACCOUNT)}>
                                <MaterialCommunityIcons color={Colors.white} name={ICONS.ACCOUNT} size={CONSTANST.iconSize} />
                            </TouchableOpacity>
                        </View>

                    )
                },
            })}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <DrawerStack.Screen name="Overview" component={BottomTabNavigator} />
        </DrawerStack.Navigator>
    )
}