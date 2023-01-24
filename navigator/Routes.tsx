import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { DrawerNavigator } from './Drawer/DrawerNavigator'

type Props = {}

const Routes = (props: Props) => {
  return (
    <NavigationContainer>
        <DrawerNavigator/>
    </NavigationContainer>
  )
}

export default Routes

const styles = StyleSheet.create({})