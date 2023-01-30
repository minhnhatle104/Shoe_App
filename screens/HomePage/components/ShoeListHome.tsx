import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { ProductLikeModel, ProductModel } from '../../../redux/slice/productSlice'
import Colors from '../../../common/Colors'
import { CONSTANST } from '../../../common/contanst'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigator/typeCheckNavigator'
import { AppDispatch } from '../../../redux/configStore'
import { useDispatch } from 'react-redux'
import { postProductLikeApi, postProductUnlikeApi } from '../../../redux/thunk/productThunk'

type Props = {
    shoeList: ProductModel[] | undefined | null
    shoeFavourite: ProductLikeModel[] | undefined | null
}

const ShoeListHome = (props: Props) => {
    const { shoeList,shoeFavourite } = props
    const dispatch:AppDispatch = useDispatch()

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const _renderHorizontalItem = (item: ProductModel) => {
        const itemFavourite =shoeFavourite?.find(item2 => item2.id === item.id)
        return <TouchableOpacity onPress={() => {
            navigation.navigate("Detail", { id: item.id })
        }} style={styles.container_card}>
            <TouchableOpacity style={styles.btn_cardLike} onPress={() => {
                if(itemFavourite){
                    dispatch(postProductUnlikeApi(item.id))
                }else{
                    dispatch(postProductLikeApi(item.id))
                }
            }}>
                <Ionicons name='heart' color={itemFavourite ? Colors.red : Colors.black} size={CONSTANST.iconSize} />
            </TouchableOpacity>
            <Image style={styles.image_card} source={{ uri: item.image }} resizeMode={"contain"} />
            <View style={{ paddingLeft: 20 }}>
                <Text style={styles.text_cardName}>{item.name}</Text>
                <Text style={styles.text_cardAlias}>{item.alias}</Text>
                <Text style={styles.text_cardPrice}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    }

    return (
        <FlatList
            data={shoeList}
            renderItem={({ item }) => _renderHorizontalItem(item)}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
        />
    )
}

export default ShoeListHome

const styles = StyleSheet.create({
    container_card: {
        height: 350,
        width: 300,
        backgroundColor: Colors.white,
        margin: 20,
        padding: 10,
        borderRadius: 20,
        elevation: 10,
    },
    btn_cardLike: {
        position: "absolute",
        right: 20,
        zIndex: 10,
    },
    image_card: {
        height: 200,
    },
    text_cardName: {
        fontSize: CONSTANST.text24,
        fontWeight: "bold",
        color: Colors.black,
    },
    text_cardAlias: {
        fontSize: CONSTANST.text20,
        fontWeight: "500",
        color: Colors.gray,
    },
    text_cardPrice: {
        fontSize: CONSTANST.text20,
        fontWeight: "600",
        color: Colors.black,
    },
})