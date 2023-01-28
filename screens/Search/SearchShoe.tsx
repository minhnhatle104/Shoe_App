import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from './components/SearchBar'

type Props = {}

const SearchShoe = (props: Props) => {
  return (
    <SafeAreaView>
      <SearchBar/>
    </SafeAreaView>
  )
}

export default SearchShoe

const styles = StyleSheet.create({})