import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState, useRef } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from '@react-navigation/native'
import { useFormik } from "formik";
import * as Yup from "yup";

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

    const [isSecuredPass, setIsSecuredPass] = useState(true)
    const [isSecuredConPass,setIsSecuredConPass] = useState(true)

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    interface formRegisterModel {
        email: string,
        password: string,
        confirm_password?: string,
        name: string,
        gender: string,
        phone: string
    }

    const formValuesRegister: formRegisterModel = {
        email: "",
        password: "",
        confirm_password: "",
        name: "",
        gender: "Male",
        phone: "",
    }

    const formik = useFormik({
        initialValues: formValuesRegister,
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Required!"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")], "Password's not match")
                .required("Required!"),
            name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        }),
        onSubmit: (values) => {
            console.log(values)
        }
    });

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container_register}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex:1}}>
                    <View style={styles.container_image_logo}>
                        <Image source={require("../../assets/images/arsenal_logo_login.png")}
                            style={{ height: 50 }}
                            resizeMode={"contain"} />
                        <Text style={styles.text_welcomLogin}>SIGN UP</Text>
                    </View>

                    <View style={styles.container_wrapInput}>
                        <View style={styles.container_textInput}>
                            <MaterialCommunityIcons name='email' size={CONSTANST.iconSize} color={Colors.black} />
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
                            <MaterialCommunityIcons name='key-variant'
                                size={CONSTANST.iconSize} color={Colors.black} />
                            <TextInput
                                style={styles.container_inputField}
                                value={formik.values.password}
                                secureTextEntry={isSecuredPass}
                                onBlur={formik.handleBlur('password')}
                                onChangeText={formik.handleChange("password")}
                                placeholder='Enter password' />
                            <TouchableOpacity onPress={()=>{
                                setIsSecuredPass((prev)=>!prev)
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
                        <View style={styles.container_textInput}>
                            <MaterialCommunityIcons name='briefcase-check-outline'
                                size={CONSTANST.iconSize} color={Colors.black} />
                            <TextInput
                                style={styles.container_inputField}
                                value={formik.values.confirm_password}
                                secureTextEntry={isSecuredConPass}
                                onBlur={formik.handleBlur('confirm_password')}
                                onChangeText={formik.handleChange("confirm_password")}
                                placeholder='Enter confirm password' />
                            <TouchableOpacity onPress={()=>{
                                setIsSecuredConPass((prev)=>!prev)
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
                        <View style={styles.container_textInput}>
                            <MaterialCommunityIcons name='account-circle'
                                size={CONSTANST.iconSize} color={Colors.black} />
                            <TextInput
                                style={styles.container_inputField}
                                value={formik.values.name}
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
                                formik.setFieldValue("gender", selectedItem)
                            }}
                            buttonStyle={styles.container_textInput}
                            renderCustomizedButtonChild={(selectedItem, index) => {
                                return (
                                    <View style={styles.dropdown3BtnChildStyle}>
                                        <MaterialCommunityIcons name="gender-male-female"
                                            size={CONSTANST.iconSize} color={Colors.black} />
                                        <Text style={styles.dropdown3BtnTxt}>{"Male"}</Text>
                                        <MaterialCommunityIcons name="chevron-down"
                                            size={CONSTANST.iconSize} color={Colors.black} />
                                    </View>
                                );
                            }}
                            onChangeSearchInputText={() => { }}
                        />
                    </View>


                    <View style={styles.container_wrapInput}>
                        <View style={styles.container_textInput}>
                            <MaterialCommunityIcons name='cellphone'
                                size={CONSTANST.iconSize} color={Colors.black} />
                            <TextInput
                                style={styles.container_inputField}
                                onBlur={formik.handleBlur('phone')}
                                value={formik.values.phone}
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

                    <TouchableOpacity style={styles.btn_Signup} onPress={formik.handleSubmit}>
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
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
    text_error: {
        fontWeight: "800",
        fontSize: CONSTANST.text16,
        color: Colors.red,
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
    },
    dropdown3BtnTxt: {
        color: Colors.black,
        fontSize: 16,
        marginHorizontal: 12,
    },
})