import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import React from 'react'

type Props = {}

const AppLoader = (props: Props) => {
  return (
    <View style={[StyleSheet.absoluteFillObject,styles.container]}>
      <LottieView source={require("../../assets/images/loading.json")} autoPlay loop/>
    </View>
  )
}

export default AppLoader

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"rgba(0,0,0,0.3)",
        zIndex:1,
    }
})