import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigator/typeCheckNavigator'
import Colors from '../../common/Colors'
import { CONSTANST } from '../../common/contanst'
import SelectDropdown from 'react-native-select-dropdown'

type Props = {}

const Register = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const genders = [
        "Male", "Female"
    ]

    return (
        <SafeAreaView style={styles.container_register}>
            <View style={styles.container_image_logo}>
                <Image source={require("../../assets/images/arsenal_logo_login.png")} style={{ height: 50 }} resizeMode={"contain"} />
                <Text style={styles.text_welcomLogin}>SIGN UP</Text>
            </View>
            <View style={styles.container_textInput}>
                <MaterialCommunityIcons name='email' size={CONSTANST.iconSize} color={Colors.black} />
                <TextInput placeholder='Enter email' />
            </View>
            <View style={styles.container_textInput}>
                <MaterialCommunityIcons name='key-variant' size={CONSTANST.iconSize} color={Colors.black} />
                <TextInput placeholder='Enter password' />
            </View>
            <View style={styles.container_textInput}>
                <MaterialCommunityIcons name='briefcase-check-outline' size={CONSTANST.iconSize} color={Colors.black} />
                <TextInput placeholder='Enter confirm password' />
            </View>
            <View style={styles.container_textInput}>
                <MaterialCommunityIcons name='account-circle' size={CONSTANST.iconSize} color={Colors.black} />
                <TextInput placeholder='Enter name' />
            </View>
            <SelectDropdown
                data={genders}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                }}
                buttonStyle={styles.container_textInput}
                renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                        <View style={styles.dropdown3BtnChildStyle}>
                            <MaterialCommunityIcons name="gender-male-female" size={CONSTANST.iconSize} color={Colors.black} />
                            <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem : 'Select gender'}</Text>
                            <MaterialCommunityIcons name="chevron-down" size={CONSTANST.iconSize} color={Colors.black} />
                        </View>
                    );
                }}
                onChangeSearchInputText={() => { }}
            />
            <View style={styles.container_textInput}>
                <MaterialCommunityIcons name='cellphone' size={CONSTANST.iconSize} color={Colors.black} />
                <TextInput placeholder='Enter phone' keyboardType='numeric' />
            </View>
            <TouchableOpacity style={styles.btn_Signup} onPress={() => {
                navigation.navigate("Signup")
            }}>
                <Text style={styles.text_Signup}>Register</Text>
            </TouchableOpacity>
            <View style={styles.container_suggest}>
                <Text style={styles.text_suggest}>Already have an account ? </Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Login")
                }}>
                    <Text style={styles.text_login}>Login now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    container_register: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.baLogin,
    },
    container_image_logo: {
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    text_welcomLogin: {
        fontWeight: "bold",
        fontSize: CONSTANST.text24,
    },
    container_textInput: {
        backgroundColor: Colors.white,
        flexDirection: "row",
        alignItems: "center",
        width: 300,
        height: 40,
        justifyContent: "flex-start",
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 50,
    },
    btn_Signup: {
        backgroundColor: Colors.red,
        width: 300,
        height: 50,
        borderRadius: 50,
        justifyContent: "center"
    },
    text_Signup: {
        color: Colors.white,
        fontSize: CONSTANST.text24,
        alignSelf: "center"
    },
    container_suggest: {
        margin: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    text_suggest: {
        color: Colors.black,
        fontSize: CONSTANST.text16
    },
    text_login: {
        color: Colors.primaryDark,
        fontSize: CONSTANST.text16,
    },
    dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    dropdown3BtnTxt: {
        color: Colors.black,
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 12,
    },
})