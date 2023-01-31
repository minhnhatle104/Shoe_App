import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CONSTANST } from '../../../common/contanst'
import Colors from '../../../common/Colors'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/configStore'

type Props = {}

const PriceTotalCart = (props: Props) => {
    const {defaultShoeList,shoeCart} = useSelector((state:RootState)=>state.productSlice)

    const generateQuantity = ()=>{
        let totalQuantity = 0
        defaultShoeList?.map((item,index)=>{
            const itemCart = shoeCart.find(cartItem => cartItem.productId === item.id)
            if(itemCart){
                totalQuantity +=itemCart.quantity
            }
        })
        return totalQuantity
    }

    const generatePrice = ()=>{
        let totalPrice = 0
        defaultShoeList?.map((item,index)=>{
            const itemCart = shoeCart.find(cartItem => cartItem.productId === item.id)
            if(itemCart){
                totalPrice +=itemCart.quantity * item.price
            }
        })
        return totalPrice
    }

    return (
        <View style={styles.container_total}>
            <View style={{marginBottom:10}}>
                <Text style={styles.text_TotalQuantity}>Total Quantity: {generateQuantity()}</Text>
            </View>
            <View>
                <Text style={styles.text_TotalPrice}>Total Price: ${generatePrice()}</Text>
            </View>
        </View>
    )
}

export default PriceTotalCart

const styles = StyleSheet.create({
    container_total: {
        flex: 1,
        alignSelf: "flex-end",
        padding: 20
    },
    text_TotalPrice:{
        fontSize:CONSTANST.text24,
        fontWeight:"bold",
        color:Colors.black,
    },
    text_TotalQuantity:{
        fontSize:CONSTANST.text20,
        fontWeight:"bold",
    }
})