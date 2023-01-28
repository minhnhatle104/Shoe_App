import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigator } from './Stack/Navigator'

type Props = {}

const Routes = (props: Props) => {
  return (
    <NavigationContainer>
        <StackNavigator/>
    </NavigationContainer>
  )
}

export default Routes

const styles = StyleSheet.create({})