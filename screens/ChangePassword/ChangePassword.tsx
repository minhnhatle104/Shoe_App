import {
    StyleSheet, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform,
    TouchableWithoutFeedback, Keyboard, Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/typeCheckNavigator';
import { CONSTANST } from '../../common/contanst';
import Colors from '../../common/Colors';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { AppDispatch, RootState } from '../../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotificationLogin } from '../../redux/slice/accountSlice';
import AppLoader from '../../common/components/AppLoader';

type Props = {}

const ChangePassword = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch: AppDispatch = useDispatch()
    const isLoading = useSelector((state: RootState) => state.loadingSlice.isLoading)
    const { isLogin, popUpNotification } = useSelector((state: RootState) => state.accountSlice)

    const [isSecuredPass, setIsSecuredPass] = useState(true)
    const [isSecuredConPass,setIsSecuredConPass] = useState(true)

    interface ChangePasswordModel {
        newPassword: string
        confirm_password?: string
    }

    const formValuesChangePass: ChangePasswordModel = {
        newPassword: "",
        confirm_password: "",
    }

    const formik = useFormik({
        initialValues: formValuesChangePass,
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Required!"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("newPassword")], "Password's not match")
                .required("Required!"),
        }),
        onSubmit: (values) => {
            console.log(values)
            delete values["confirm_password"]
            console.log(values)
        }
    });

    useEffect(() => {
        // Trường hợp đăng nhập sai và cần hiển thị thông báo
        // if (isLogin === false && popUpNotification === true) {
        //     dispatch(closeNotificationLogin())
        //     Alert.alert("ERROR", "Wrong Information Login");
        // }
        // // Trường hợp đăng nhập đúng
        // if (isLogin) {
        //     dispatch(closeNotificationLogin())
        //     navigation.navigate("HomeStack")
        // }
    }, [isLogin, popUpNotification])

    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container_changePass}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                        <View style={styles.container_image_logo}>
                            <Image
                                source={require("../../assets/images/arsenal_logo_login.png")}
                                style={{ height: 100 }}
                                resizeMode={"contain"} />
                            <Text style={styles.text_welcomLogin}>CHANGE PASSWORD</Text>
                        </View>

                        <View style={styles.container_wrapInput}>
                            <View style={styles.container_textInput}>
                                <MaterialCommunityIcons name='key-variant'
                                    size={CONSTANST.iconSize} color={Colors.black} />
                                <TextInput
                                    style={styles.container_inputField}
                                    value={formik.values.newPassword}
                                    secureTextEntry={isSecuredPass}
                                    onBlur={formik.handleBlur('newPassword')}
                                    onChangeText={formik.handleChange("newPassword")}
                                    placeholder='Enter new password' />
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
                                formik.errors.newPassword && formik.touched.newPassword && (
                                    <Text style={styles.text_error}>{formik.errors.newPassword}</Text>
                                )
                            }
                        </View>

                        <View style={styles.container_wrapInput}>
                            <View style={styles.container_textInput}>
                                <MaterialCommunityIcons
                                    name='account-check'
                                    size={CONSTANST.iconSize}
                                    color={Colors.black} />
                                <TextInput
                                    style={styles.container_inputField}
                                    value={formik.values.confirm_password}
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

                        <TouchableOpacity style={styles.btn_ChangePass} onPress={formik.handleSubmit}>
                            <Text style={styles.text_ChangePass}>CHANGE</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            {isLoading ? <AppLoader /> : null}
        </>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container_changePass: {
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
    container_wrapInput: {
        marginBottom: 20,
    },
    container_textInput: {
        backgroundColor: Colors.white,
        flexDirection: "row",
        alignItems: "center",
        width: 300,
        height: 40,
        justifyContent: "flex-start",
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 50,
    },
    container_inputField: {
        flex: 1,
    },
    btn_ChangePass: {
        backgroundColor: Colors.red,
        width: 300,
        height: 50,
        borderRadius: 50,
        justifyContent: "center"
    },
    text_ChangePass: {
        color: Colors.white,
        fontSize: CONSTANST.text24,
        alignSelf: "center"
    },
    text_error: {
        fontWeight: "800",
        fontSize: CONSTANST.text16,
        color: Colors.red,
    },
})