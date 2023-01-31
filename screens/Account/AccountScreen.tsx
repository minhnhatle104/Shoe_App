import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/typeCheckNavigator';
import Colors from '../../common/Colors';
import { CONSTANST } from '../../common/contanst';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import localStorage from '../../local_storage/localStorage';

type Props = {}

const AccountScreen = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container_image}>
                <View style={{ position: "relative" }}>
                    <Image style={styles.image_profile} source={require("../../assets/images/user-profile.jpg")} />
                    <TouchableOpacity style={styles.container_buttonPencil}>
                        <FontAwesome5 name='pencil-alt' color={Colors.black} size={CONSTANST.icon28} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container_welcomeText}>
                    <Text style={styles.text_welcome}>Welcome back, Minh</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity 
                style={styles.container_cardSetting}
                onPress={()=>navigation.navigate("Profile")}
                >
                    <MaterialCommunityIcons name='account-circle-outline' color={Colors.black} size={CONSTANST.icon28} />
                    <View style={styles.container_inCardText}>
                        <Text style={styles.text_inCard}>My Profile</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container_cardSetting}>
                    <MaterialCommunityIcons name='onepassword' color={Colors.black} size={CONSTANST.icon28} />
                    <View style={styles.container_inCardText}>
                        <Text style={styles.text_inCard}>Change Password</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container_cardSetting}>
                    <Ionicons name='location-outline' color={Colors.black} size={CONSTANST.icon28} />
                    <View style={styles.container_inCardText}>
                        <Text style={styles.text_inCard}>Location</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container_cardSetting}>
                    <Ionicons name='settings-outline' color={Colors.black} size={CONSTANST.icon28} />
                    <View style={styles.container_inCardText}>
                        <Text style={styles.text_inCard}>Settings</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.container_cardSetting}
                onPress={()=>{
                    localStorage.removeStorage("login-token")
                    navigation.navigate("Login")
                }}
                >
                    <MaterialCommunityIcons name='logout' color={Colors.black} size={CONSTANST.icon28} />
                    <View style={styles.container_inCardText}>
                        <Text style={styles.text_inCard}>Log Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    container_image: {
        height: 200,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        backgroundColor: Colors.red,
        justifyContent: "center",
        alignItems: "center",
    },
    image_profile: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    container_buttonPencil: {
        position: "absolute",
        bottom: 4,
        right: -5,
    },
    container_welcomeText: {
        marginTop: 10,
    },
    text_welcome: {
        fontSize: CONSTANST.text24,
        fontWeight: "bold",
        color: Colors.white,
    },
    container_cardSetting: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        height: 30,
        backgroundColor: Colors.white,
        margin: 20,
        marginBottom: 10,
        elevation: 10,
        paddingLeft:30,
    },
    container_inCardText:{
        marginLeft:30,
    },
    text_inCard:{
        fontSize:CONSTANST.text20,
        fontWeight:"bold",
    }
})