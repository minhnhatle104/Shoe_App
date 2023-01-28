import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/typeCheckNavigator';
import { CONSTANST } from '../../common/contanst';
import Colors from '../../common/Colors';

type Props = {}

const Login = (props: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container_login}>
      <View style={styles.container_image_logo}>
        <Image source={require("../../assets/images/arsenal_logo_login.png")} style={{ height: 100 }} resizeMode={"contain"} />
        <Text style={styles.text_welcomLogin}>Login</Text>
      </View>
      <View style={styles.container_textInput}>
        <MaterialCommunityIcons name='email' size={CONSTANST.iconSize} color={Colors.black} />
        <TextInput placeholder='Enter email' />
      </View>
      <View style={styles.container_textInput}>
        <MaterialCommunityIcons name='key-variant' size={CONSTANST.iconSize} color={Colors.black} />
        <TextInput placeholder='Enter password' />
      </View>
      <TouchableOpacity style={styles.btn_Login} onPress={() => {
        navigation.navigate("Signup")
      }}>
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
    </SafeAreaView>
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
  container_textInput: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    justifyContent: "flex-start",
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 50,
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
  }
})