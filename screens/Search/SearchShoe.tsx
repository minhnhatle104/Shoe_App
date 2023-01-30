import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from './components/SearchBar'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/configStore'
import ListShoe from './components/ListShoe'
import AppLoader from '../../common/components/AppLoader'

type Props = {}

const SearchShoe = (props: Props) => {
  const shoeList = useSelector((state: RootState) => state.productSlice.shoeList);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SearchBar />
        <ListShoe shoeList={shoeList} />
      </SafeAreaView>
    </>
  )
}

export default SearchShoe

const styles = StyleSheet.create({})