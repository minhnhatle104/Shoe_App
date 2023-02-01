import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { ReactElement } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { RootStackParamList } from '../../../navigator/typeCheckNavigator'
import Colors from '../../../common/Colors';
import { CONSTANST } from '../../../common/contanst';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/configStore';
import { addToCart, deleteFromCart, deleteOneItemCart } from '../../../redux/slice/productSlice';
import { SwipeListView } from 'react-native-swipe-list-view';

type Props = {}

const ListShoeCart = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { defaultShoeList, shoeCart } = useSelector((state: RootState) => state.productSlice)
    const dispatch: AppDispatch = useDispatch()

    return (
        <>
            <SwipeListView
                data={defaultShoeList}
                renderItem={(data, rowMap): ReactElement => {
                    const itemCart = shoeCart?.find(shoeItem => shoeItem.productId === data.item.id)
                    if (itemCart) {
                        return <TouchableOpacity
                            style={styles.container_card}
                            onPress={() => navigation.navigate("Detail", { id: data.item.id })}
                        >
                            <Image source={{ uri: data.item.image }} style={styles.image_card} />
                            <View style={styles.container_text}>
                                <Text style={styles.text_name}>{data.item.name}</Text>
                                <Text style={styles.text_price}>${data.item.price}</Text>
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
                                                    { text: 'OK', onPress: () => dispatch(deleteFromCart(data.item.id)) },
                                                ]
                                            )
                                        } else {
                                            dispatch(deleteFromCart(data.item.id))
                                        }
                                    }}
                                >
                                    <FontAwesome5 name='minus' color={Colors.black} size={CONSTANST.iconSize} />
                                </TouchableOpacity>
                                <Text style={styles.text_quantity}>{itemCart.quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(addToCart(data.item.id))
                                    }}
                                >
                                    <FontAwesome5 name='plus' color={Colors.black} size={CONSTANST.iconSize} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    } else {
                        return <></>
                    }
                }}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.hiddenItem}>
                        <TouchableOpacity
                            style={{ alignSelf: "flex-end" }}
                            onPress={() => {
                                dispatch(deleteOneItemCart(data.item.id))
                            }}
                        >
                            <MaterialCommunityIcons name='delete' size={CONSTANST.icon40} color={Colors.red} />
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-50}
                disableRightSwipe />
        </>
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
    },
    hiddenItem: {
        backgroundColor: Colors.black,
        borderRadius: 20,
        height: 80,
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})