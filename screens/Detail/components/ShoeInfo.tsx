import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../common/Colors'
import { CONSTANST } from '../../../common/contanst'
import { Rating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from "react-native-vector-icons/Ionicons"
import ShoeSize from './ShoeSize'

type Props = {
    productDetail: any
}

const ShoeInfo = (props: Props) => {
    const { productDetail } = props

    return (
        <View style={styles.container_detail}>
            <Text style={styles.text_name}>{productDetail?.name ? productDetail.name : ""}</Text>
            <View style={styles.container_rating}>
                <Text>{productDetail?.alias ? productDetail.alias : ""}</Text>
                <Rating
                    type='star'
                    ratingCount={5}
                    imageSize={CONSTANST.iconSize}
                    ratingColor='#3498db'
                    ratingBackgroundColor={Colors.gray}
                    onFinishRating={() => { }}
                />
            </View>
            <Text style={styles.text_price}>${productDetail?.price ? productDetail.price : ""}</Text>
            <Text style={styles.text_selectSize}>Select a size</Text>
            <ShoeSize sizeList={productDetail?.size ? productDetail.size : []}/>
            <View style={styles.container_description}>
                <Text style={styles.text_description}>
                    {productDetail?.description ? productDetail.description.replace(/\n|\r/g, "") : ""}
                </Text>
            </View>
            <View style={styles.container_shortDescription}>
                <Text style={styles.text_shortDescription}>
                    {productDetail?.shortDescription ? productDetail.shortDescription.replace(/\n|\r/g, "") : ""}
                </Text>
            </View>
            <TouchableOpacity style={styles.button_cart}>
                <Ionicons name='cart' size={CONSTANST.iconSize} color={Colors.white} />
                <Text style={styles.text_cart}>Add To Cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ShoeInfo

const styles = StyleSheet.create({
    container_detail: {
        flex: 1,
        backgroundColor: Colors.gray,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 20,
    },
    text_name: {
        fontSize: CONSTANST.text32,
        fontWeight: "bold",
        color: Colors.black,
    },
    container_rating: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
    },
    text_price: {
        fontSize: CONSTANST.text24,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 15,
    },
    text_selectSize: {
        fontSize: CONSTANST.text16,
        fontWeight: "600",
        color: Colors.black,
    },
    container_description: {
        borderTopColor: Colors.green,
        borderTopWidth: 3,
        paddingTop: 20
    },
    text_description: {
        fontSize: CONSTANST.text24,
        fontWeight: "bold",
        color: Colors.black,
        marginBottom: 0,
    },
    container_shortDescription: {
        marginTop: 20,
    },
    text_shortDescription: {
        fontSize: CONSTANST.text16,
        fontWeight: "300",
        color: Colors.black,
        marginBottom: 0,
    },
    button_cart: {
        marginTop: 10,
        backgroundColor: Colors.red,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    text_cart: {
        color: Colors.white
    }
})