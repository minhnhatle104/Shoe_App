import {
    Alert, Image, Keyboard, KeyboardAvoidingView, Platform,
    StyleSheet, Text, TextInput,
    TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from '@react-navigation/native'
import { useFormik } from "formik";
import * as Yup from "yup";

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigator/typeCheckNavigator'
import Colors from '../../common/Colors'
import { CONSTANST } from '../../common/contanst'
import SelectDropdown from 'react-native-select-dropdown'
import { AccountRegisterModel, closeNotificationRegister } from '../../redux/slice/accountSlice';
import { AppDispatch, RootState } from '../../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import AppLoader from '../../common/components/AppLoader';
import { getProfileApi } from '../../redux/thunk/accountThunk';

type Props = {}

const Profile = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch: AppDispatch = useDispatch()
    const { infoProfile, statusRegister, popUpNotification } = useSelector((state: RootState) => state.accountSlice)
    const { isLoading } = useSelector((state: RootState) => state.loadingSlice)

    useEffect(() => {
        dispatch(getProfileApi())
    }, [])

    const genders = [
        { label: "Male", value: true },
        { label: "Female", value: false },
    ]

    const [isSecuredPass, setIsSecuredPass] = useState(true)
    const [isSecuredConPass, setIsSecuredConPass] = useState(true)
    const [isSaveProfile, setIsSaveProfile] = useState(false)

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    interface formProfileModel {
        email: string,
        password: string,
        confirm_password?: string,
        name: string,
        gender: boolean,
        phone: string
    }

    const formValuesProfile: formProfileModel = {
        email: infoProfile?.email,
        password: infoProfile?.password,
        confirm_password: "",
        name: infoProfile?.name,
        gender: infoProfile?.gender,
        phone: infoProfile?.phone,
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formValuesProfile,
        // validationSchema: Yup.object({
        //     email: Yup.string()
        //         .email("Invalid email format")
        //         .required("Required!"),
        //     password: Yup.string()
        //         .min(6, "Minimum 6 characters")
        //         .required("Required!"),
        //     confirm_password: Yup.string()
        //         .oneOf([Yup.ref("password")], "Password's not match")
        //         .required("Required!"),
        //     name: Yup.string()
        //         .min(2, "Mininum 2 characters")
        //         .max(15, "Maximum 15 characters")
        //         .required("Required!"),
        //     phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        // }),
        onSubmit: (values) => {
            console.log(values)
            delete values["confirm_password"]
            const infoRegister: AccountRegisterModel = values
            console.log(infoRegister)
            setIsSaveProfile(false)
        }
    });

    useEffect(() => {
        // Đăng ký thành công
        if (statusRegister) {
            Alert.alert("SUCCESS", "Register successfully")
            navigation.navigate("Login")
        }
        // Đăng ký thất bại
        if (statusRegister === false && popUpNotification === true) {
            Alert.alert("ERROR", "Can't create new account")
            dispatch(closeNotificationRegister())
        }
    }, [statusRegister, popUpNotification])

    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container_profile}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.container_image_logo}>
                            <Image
                                source={{uri:infoProfile.avatar || "https://i.pravatar.cc?u=3"}}
                                style={{ height: 50, width: 50 }}
                                resizeMode={"contain"} />
                            <Text style={styles.text_welcomeProfile}>PROFILE</Text>
                        </View>

                        <View style={styles.container_wrapInput}>
                            <View style={
                                [
                                    styles.container_textInput,
                                    { backgroundColor: isSaveProfile ? Colors.white : Colors.gray }
                                ]
                            }>
                                <MaterialCommunityIcons
                                    name='email'
                                    size={CONSTANST.iconSize}
                                    color={Colors.black}
                                />
                                <TextInput
                                    editable={isSaveProfile}
                                    style={styles.container_inputField}
                                    onBlur={formik.handleBlur('email')}
                                    onChangeText={formik.handleChange("email")}
                                    value={formik.values.email || ""}
                                    placeholder='Enter email' />
                            </View>
                            {
                                formik.errors.email && formik.touched.email && (
                                    <Text style={styles.text_error}>{formik.errors.email}</Text>
                                )
                            }
                        </View>

                        <View style={styles.container_wrapInput}>
                            <View style={
                                [
                                    styles.container_textInput,
                                    { backgroundColor: isSaveProfile ? Colors.white : Colors.gray }
                                ]
                            }>
                                <MaterialCommunityIcons name='key-variant'
                                    size={CONSTANST.iconSize} color={Colors.black} />
                                <TextInput
                                    editable={isSaveProfile}
                                    style={styles.container_inputField}
                                    value={formik.values.password || ""}
                                    secureTextEntry={isSecuredPass}
                                    onBlur={formik.handleBlur('password')}
                                    onChangeText={formik.handleChange("password")}
                                    placeholder='Enter password' />
                                <TouchableOpacity onPress={() => {
                                    setIsSecuredPass((prev) => !prev)
                                }}>
                                    {isSecuredPass ?
                                        <MaterialCommunityIcons name='eye-outline'
                                            size={CONSTANST.iconSize} color={Colors.black} />
                                        :
                                        <MaterialCommunityIcons name='eye-off'
                                            size={CONSTANST.iconSize} color={Colors.black} />
                                    }
                                </TouchableOpacity>
                            </View>
                            {
                                formik.errors.password && formik.touched.password && (
                                    <Text style={styles.text_error}>{formik.errors.password}</Text>
                                )
                            }
                        </View>

                        <View style={styles.container_wrapInput}>
                            <View style={
                                [
                                    styles.container_textInput,
                                    { backgroundColor: isSaveProfile ? Colors.white : Colors.gray }
                                ]
                            }>
                                <MaterialCommunityIcons name='briefcase-check-outline'
                                    size={CONSTANST.iconSize} color={Colors.black} />
                                <TextInput
                                    editable={isSaveProfile}
                                    style={styles.container_inputField}
                                    value={formik.values.confirm_password || ""}
                                    secureTextEntry={isSecuredConPass}
                                    onBlur={formik.handleBlur('confirm_password')}
                                    onChangeText={formik.handleChange("confirm_password")}
                                    placeholder='Enter confirm password' />
                                <TouchableOpacity onPress={() => {
                                    setIsSecuredConPass((prev) => !prev)
                                }}>
                                    {isSecuredConPass ?
                                        <MaterialCommunityIcons name='eye-outline'
                                            size={CONSTANST.iconSize} color={Colors.black} />
                                        :
                                        <MaterialCommunityIcons name='eye-off'
                                            size={CONSTANST.iconSize} color={Colors.black} />
                                    }
                                </TouchableOpacity>
                            </View>
                            {
                                formik.errors.confirm_password && formik.touched.confirm_password && (
                                    <Text style={styles.text_error}>{formik.errors.confirm_password}</Text>
                                )
                            }
                        </View>

                        <View style={styles.container_wrapInput}>
                            <View style={
                                [
                                    styles.container_textInput,
                                    { backgroundColor: isSaveProfile ? Colors.white : Colors.gray }
                                ]
                            }>
                                <MaterialCommunityIcons name='account-circle'
                                    size={CONSTANST.iconSize} color={Colors.black} />
                                <TextInput
                                    editable={isSaveProfile}
                                    style={styles.container_inputField}
                                    value={formik.values.name || ""}
                                    onBlur={formik.handleBlur('name')}
                                    onChangeText={formik.handleChange("name")}
                                    placeholder='Enter name' />
                            </View>
                            {
                                formik.errors.name && formik.touched.name && (
                                    <Text style={styles.text_error}>{formik.errors.name}</Text>
                                )
                            }
                        </View>

                        <View style={styles.container_wrapInput}>
                            <SelectDropdown
                                data={genders}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    formik.setFieldValue("gender", selectedItem.value)
                                }}
                                buttonStyle={styles.container_textInput}
                                renderCustomizedButtonChild={(selectedItem, index) => {
                                    return (
                                        <View style={styles.dropdown3BtnChildStyle}>
                                            <MaterialCommunityIcons name="gender-male-female"
                                                size={CONSTANST.iconSize} color={Colors.black} />
                                            <Text style={styles.dropdown3BtnTxt}>
                                                {selectedItem ?
                                                    selectedItem.label :
                                                    (formik.values.gender ? "Male" : "Female")
                                                }
                                            </Text>
                                            <MaterialCommunityIcons name="chevron-down"
                                                size={CONSTANST.iconSize} color={Colors.black} />
                                        </View>
                                    );
                                }}
                                renderCustomizedRowChild={(item, index) => {
                                    return (
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <Text>{item.label}</Text>
                                        </View>
                                    );
                                }}
                                onChangeSearchInputText={() => { }}
                            />
                        </View>


                        <View style={styles.container_wrapInput}>
                            <View style={
                                [
                                    styles.container_textInput,
                                    { backgroundColor: isSaveProfile ? Colors.white : Colors.gray }
                                ]
                            }>
                                <MaterialCommunityIcons name='cellphone'
                                    size={CONSTANST.iconSize} color={Colors.black} />
                                <TextInput
                                    editable={isSaveProfile}
                                    style={styles.container_inputField}
                                    onBlur={formik.handleBlur('phone')}
                                    value={formik.values.phone || ""}
                                    onChangeText={formik.handleChange("phone")}
                                    placeholder='Enter phone'
                                    keyboardType='numeric' />
                            </View>
                            {
                                formik.errors.phone && formik.touched.phone && (
                                    <Text style={styles.text_error}>{formik.errors.phone}</Text>
                                )
                            }
                        </View>

                        <TouchableOpacity
                            style={
                                [
                                    styles.btn_changeProfile,
                                    {
                                        backgroundColor: isSaveProfile ? Colors.red : Colors.black
                                    }
                                ]
                            }
                            onPress={
                                isSaveProfile ? formik.handleSubmit : () => { setIsSaveProfile(true) }
                            }>
                            <Text style={styles.text_changeProfile}>
                                {isSaveProfile ? "SAVE" : "CHANGE"}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            {isLoading ? <AppLoader /> : null}
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    container_profile: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container_image_logo: {
        marginBottom: 20,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    text_welcomeProfile: {
        fontWeight: "bold",
        fontSize: CONSTANST.text24,
    },
    container_wrapInput: {
        marginBottom: 20,
    },
    container_textInput: {
        flexDirection: "row",
        alignItems: "center",
        width: 300,
        height: 40,
        justifyContent: "flex-start",
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 50,
        borderColor: Colors.black,
        borderWidth: 2,
    },
    container_inputField: {
        flex: 1,
    },
    text_error: {
        fontWeight: "800",
        fontSize: CONSTANST.text16,
        color: Colors.red,
    },
    btn_changeProfile: {
        width: 300,
        height: 50,
        borderRadius: 50,
        justifyContent: "center"
    },
    text_changeProfile: {
        color: Colors.white,
        fontSize: CONSTANST.text24,
        alignSelf: "center"
    },
    dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdown3BtnTxt: {
        color: Colors.black,
        fontSize: 16,
        marginHorizontal: 12,
    },
})