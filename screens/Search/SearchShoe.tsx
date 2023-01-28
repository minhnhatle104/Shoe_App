import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from './components/SearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/configStore'
import { getAllProductApi } from '../../redux/thunk/productThunk'
import ListShoe from './components/ListShoe'
import AppLoader from '../../common/components/AppLoader'

type Props = {}

const SearchShoe = (props: Props) => {
  const shoeList = useSelector((state: RootState) => state.productSlice.shoeList);
  const isLoading = useSelector((state: RootState) => state.loadingSlice.isLoading);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAllProductApi())
  }, [])

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SearchBar />
        <ListShoe shoeList={shoeList} />
      </SafeAreaView>
      {isLoading ? <AppLoader /> : null}
    </>
  )
}

export default SearchShoe

const styles = StyleSheet.create({})