import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import localStorage from '../../local_storage/localStorage'

type Props = {}

const Profile = (props: Props) => {
  const accessToken = localStorage.getStorage("login-token")
  console.log("accessToken: ",accessToken)

  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})