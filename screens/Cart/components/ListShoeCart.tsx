import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import { RootStackParamList } from '../../../navigator/typeCheckNavigator'
import Colors from '../../../common/Colors';
import { CONSTANST } from '../../../common/contanst';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/configStore';
import { addToCart, deleteFromCart } from '../../../redux/slice/productSlice';

type Props = {}

const ListShoeCart = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { defaultShoeList, shoeCart } = useSelector((state: RootState) => state.productSlice)
    const dispatch: AppDispatch = useDispatch()

    return (
        <View>
            {defaultShoeList?.map((item, index) => {
                const itemCart = shoeCart?.find(shoeItem => shoeItem.productId === item.id)
                if (itemCart) {
                    return <TouchableOpacity
                        key={index}
                        style={styles.container_card}
                        onPress={() => navigation.navigate("Detail", { id: item.id })}
                    >
                        <Image source={{ uri: item.image }} style={styles.image_card} />
                        <View style={styles.container_text}>
                            <Text style={styles.text_name}>{item.name}</Text>
                            <Text style={styles.text_price}>${item.price}</Text>
                        </View>
                        <View style={styles.container_remainButton}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (itemCart.quantity - 1 === 0) {
                                        Alert.alert(
                                            "Item will be zero",
                                            "Do you want to delete this item from your cart",
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel',
                                                },
                                                { text: 'OK', onPress: () => dispatch(deleteFromCart(item.id)) },
                                            ]
                                        )
                                    }else{
                                        dispatch(deleteFromCart(item.id))
                                    }
                                }}
                            >
                                <FontAwesome5 name='minus' color={Colors.black} size={CONSTANST.iconSize} />
                            </TouchableOpacity>
                            <Text style={styles.text_quantity}>{itemCart.quantity}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(addToCart(item.id))
                                }}
                            >
                                <FontAwesome5 name='plus' color={Colors.black} size={CONSTANST.iconSize} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                } else {
                    ""
                }
            })}
        </View>
    )
}

export default ListShoeCart

const styles = StyleSheet.create({
    container_card: {
        flexDirection: "row",
        backgroundColor: Colors.white,
        borderRadius: 20,
        height: 80,
        margin: 10,
        elevation: 10,
    },
    image_card: {
        width: 100,
        height: 80,
    },
    container_text: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    text_name: {
        fontSize: CONSTANST.text16,
        fontWeight: "bold",
        color: Colors.black,
    },
    text_price: {
        fontSize: CONSTANST.text16,
        fontWeight: "bold",
    },
    container_remainButton: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },
    text_quantity: {
        fontSize: CONSTANST.text20
    }
})