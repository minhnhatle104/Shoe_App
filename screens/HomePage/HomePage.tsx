import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/typeCheckNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import ListCategory from './components/ListCategory';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import { getAllCategoryApi } from '../../redux/thunk/categoryThunk';
import { getAllProductApi, getProductLikeApi } from '../../redux/thunk/productThunk';
import AppLoader from '../../common/components/AppLoader';
import HomeHeader from './components/HomeHeader';
import Colors from '../../common/Colors';
import ShoeListHome from './components/ShoeListHome';
import { ScrollView } from 'react-native-gesture-handler';
import LatestShoeHome from './components/LatestShoeHome';

type Props = {}

const HomePage = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const categoryList = useSelector((state: RootState) => state.categorySlice.categoryList);
    const shoeList = useSelector((state: RootState) => state.productSlice.shoeList);
    const isLoading = useSelector((state: RootState) => state.loadingSlice.isLoading);
    const shoeFavourite = useSelector((state:RootState)=>state.productSlice.shoeFavourite);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getAllCategoryApi())
        dispatch(getAllProductApi())
        dispatch(getProductLikeApi())
    }, [])

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                <View style={{
                    height: 250, width: '100%',
                    backgroundColor: Colors.red, 
                    position: 'absolute',
                    borderBottomLeftRadius: 120,
                }}></View>
                <SafeAreaView style={{flex:1}}>
                    <HomeHeader />
                    <View>
                        <ListCategory categoryList={categoryList} />
                    </View>
                    <ShoeListHome shoeList={shoeList} shoeFavourite={shoeFavourite}/>
                    <LatestShoeHome shoeList={shoeList}/>
                </SafeAreaView>
            </ScrollView>
            {isLoading ? <AppLoader /> : null}
        </>
    )
}

export default HomePage

const styles = StyleSheet.create({})