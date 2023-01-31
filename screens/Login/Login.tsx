import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform,
     TouchableWithoutFeedback, Keyboard ,Alert} from 'react-native'
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
import { getLoginApi } from '../../redux/thunk/accountThunk';
import { AccountLoginModel, closeNotificationLogin, closeStatusLogin } from '../../redux/slice/accountSlice';
import AppLoader from '../../common/components/AppLoader';

type Props = {}

const Login = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch: AppDispatch = useDispatch()
    const isLoading = useSelector((state: RootState) => state.loadingSlice.isLoading)
    const {isLogin,popUpNotification} = useSelector((state: RootState) => state.accountSlice)

    const [isSecuredPass, setIsSecuredPass] = useState(true)

    const formValuesLogin: AccountLoginModel = {
        email: "",
        password: "",
    }

    const formik = useFormik({
        initialValues: formValuesLogin,
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Required!"),
        }),
        onSubmit: (values) => {
            console.log(values)
            dispatch(getLoginApi(values))
        }
    });

    useEffect(()=>{
        // Trường hợp đăng nhập sai và cần hiển thị thông báo
        if(isLogin === false && popUpNotification === true){
            dispatch(closeNotificationLogin())
            Alert.alert("ERROR","Wrong Information Login");
        }
        // Trường hợp đăng nhập đúng
        if(isLogin){
            navigation.navigate("HomeStack")
            dispatch(closeNotificationLogin())
        }
    },[isLogin,popUpNotification])

    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container_login}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                        <View style={styles.container_image_logo}>
                            <Image
                                source={require("../../assets/images/arsenal_logo_login.png")}
                                style={{ height: 100 }}
                                resizeMode={"contain"} />
                            <Text style={styles.text_welcomLogin}>Login</Text>
                        </View>

                        <View style={styles.container_wrapInput}>
                            <View style={styles.container_textInput}>
                                <MaterialCommunityIcons
                                    name='email'
                                    size={CONSTANST.iconSize}
                                    color={Colors.black} />
                                <TextInput
                                    style={styles.container_inputField}
                                    onBlur={formik.handleBlur('email')}
                                    onChangeText={formik.handleChange("email")}
                                    value={formik.values.email}
                                    placeholder='Enter email' />
                            </View>
                            {
                                formik.errors.email && formik.touched.email && (
                                    <Text style={styles.text_error}>{formik.errors.email}</Text>
                                )
                            }
                        </View>

                        <View style={styles.container_wrapInput}>
                            <View style={styles.container_textInput}>
                                <MaterialCommunityIcons
                                    name='key-variant'
                                    size={CONSTANST.iconSize}
                                    color={Colors.black} />
                                <TextInput
                                    style={styles.container_inputField}
                                    value={formik.values.password}
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

                        <TouchableOpacity style={styles.btn_Login} onPress={formik.handleSubmit}>
                            <Text style={styles.text_Login}>Login</Text>
                        </TouchableOpacity>
                        <View style={styles.container_suggest}>
                            <Text style={styles.text_suggest}>Don't have an account ? </Text>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("Signup")
                            }}>
                                <Text style={styles.text_register}>Register now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            {isLoading ? <AppLoader/> :null}
        </>
    )
}

export default Login

const styles = StyleSheet.create({
    container_login: {
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
    btn_Login: {
        backgroundColor: Colors.red,
        width: 300,
        height: 50,
        borderRadius: 50,
        justifyContent: "center"
    },
    text_Login: {
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
    text_register: {
        color: Colors.primaryDark,
        fontSize: CONSTANST.text16,
    },
    text_error: {
        fontWeight: "800",
        fontSize: CONSTANST.text16,
        color: Colors.red,
    },
})