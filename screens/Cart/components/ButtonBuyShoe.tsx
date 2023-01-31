import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../../common/Colors'
import { AppDispatch, RootState } from '../../../redux/configStore'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileApi } from '../../../redux/thunk/accountThunk'
import { closeNotificationOrder, closeStatusOrder } from '../../../redux/slice/productSlice'
import { orderProductApi } from '../../../redux/thunk/productThunk'

type Props = {}

const ButtonBuyShoe = (props: Props) => {
    const dispatch: AppDispatch = useDispatch()
    const { infoProfile} = useSelector((state: RootState) => state.accountSlice)
    const { shoeCart,popUpNotificationOrder,statusOrder } = useSelector((state: RootState) => state.productSlice)

    useEffect(() => {
        dispatch(getProfileApi())
    }, [])

    useEffect(()=>{
        if(statusOrder === false && popUpNotificationOrder === true){
            Alert.alert("ERROR","Can't not buy items")
            dispatch(closeNotificationOrder())
        }
        if(statusOrder){
            Alert.alert("SUCCESS","Buying items succesfully!")
            dispatch(closeNotificationOrder())
            dispatch(closeStatusOrder())
        }
    },[statusOrder,popUpNotificationOrder])

    return (
        <TouchableOpacity
            style={styles.button_buy}
            onPress={() => {
                const valueBuy:any = {
                    orderDetail: shoeCart,
                    email: infoProfile?.email
                }
                dispatch(orderProductApi(valueBuy))
            }}
        >
            <Text style={styles.text_buy}>BUY NOW</Text>
        </TouchableOpacity>
    )
}

export default ButtonBuyShoe

const styles = StyleSheet.create({
    button_buy: {
        margin: 10,
        backgroundColor: Colors.red,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    text_buy: {
        color: Colors.white,
        fontWeight: "bold",
    }
})