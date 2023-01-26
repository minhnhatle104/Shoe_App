import { Button, StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/typeCheckNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import ListCategory from './components/ListCategory';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import { getAllCategoryApi } from '../../redux/thunk/categoryThunk';
import SearchBar from './components/SearchBar';

type Props = {}

const HomePage = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const categoryList = useSelector((state:RootState)=> state.categorySlice.categoryList)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        dispatch(getAllCategoryApi())
    },[])


    return (
        <SafeAreaView style={{flex:1}}>
            <SearchBar/>
           <ListCategory categoryList={categoryList}/>
        </SafeAreaView>
    )
}

export default HomePage

const styles = StyleSheet.create({})