import { SafeAreaView, ScrollView, StyleSheet, 
    Text, TouchableOpacity, View,Alert } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/configStore'
import HeaderCart from './components/HeaderCart'
import ListShoeCart from './components/ListShoeCart'
import PriceTotalCart from './components/PriceTotalCart'
import { CONSTANST } from '../../common/contanst'
import Colors from '../../common/Colors'
import { deleteAllCart } from '../../redux/slice/productSlice'
import ButtonBuyShoe from './components/ButtonBuyShoe'
import AppLoader from '../../common/components/AppLoader'

type Props = {}

const Cart = (props: Props) => {
    const { isLoading } = useSelector((state: RootState) => state.loadingSlice)
    const dispatch:AppDispatch = useDispatch()

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <SafeAreaView style={{ flex:1 }}>
                    <HeaderCart />
                    <View style={styles.container_delete}>
                        <TouchableOpacity onPress={()=>{
                             Alert.alert(
                                "Cart will be empty",
                                "Do you want to delete all item from your cart",
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    { text: 'OK', onPress: () =>dispatch(deleteAllCart()) },
                                ]
                            )
                        }}>
                            <Text style={styles.text_deleteAll}>Delete all</Text>
                        </TouchableOpacity>
                    </View>
                    <ListShoeCart />
                    <PriceTotalCart />
                    <ButtonBuyShoe/>
                </SafeAreaView>
            </ScrollView>
            {isLoading ? <AppLoader/> : null}
        </>
    )
}

export default Cart

const styles = StyleSheet.create({
    container_delete:{
        alignItems:"flex-end",
        padding:20,
        paddingBottom:10
    },
    text_deleteAll:{
        fontSize:CONSTANST.text20,
        color:Colors.red,
        fontWeight:"bold",
    }
})