import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ProductModel } from '../../../redux/slice/productSlice'
import StaggeredList from '@mindinventory/react-native-stagger-view'
import { Image } from 'react-native'
import { useWindowDimensions } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import { CONSTANST } from '../../../common/contanst'
import Colors from '../../../common/Colors'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../navigator/typeCheckNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/configStore'
import { postProductLikeApi, postProductUnlikeApi } from '../../../redux/thunk/productThunk'

type Props = {
    shoeList: ProductModel[] | undefined | null
}

const ListShoe = (props: Props) => {
    const { height, width, scale, fontScale } = useWindowDimensions();

    const { shoeList } = props

    const shoeFavourite = useSelector((state:RootState)=>state.productSlice.shoeFavourite)
    const dispatch:AppDispatch = useDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const renderChildren = (item: ProductModel) => {
        const itemFavourite = shoeFavourite?.find(itemShoe => itemShoe.id === item.id)
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("Detail", { id: item.id})
            }} style={getChildrenStyle()} key={item.id}>
                <View>
                    <TouchableOpacity onPress={() => {
                        if(itemFavourite){
                            dispatch(postProductUnlikeApi(item.id))
                        }else{
                            dispatch(postProductLikeApi(item.id))
                        }
                    }} style={styles.container_like}>
                    <Ionicons name='heart' color={itemFavourite ? Colors.red : Colors.black} size={CONSTANST.iconSize} />
                    </TouchableOpacity>
                    <View style={styles.container_image}>
                        <Image
                            source={{
                                uri: item.image,
                            }}
                            style={styles.image}
                            resizeMode={'cover'}
                        />
                    </View>
                    <View style={styles.container_text}>
                        <Text style={styles.text_name}>{item.name}</Text>
                        <Text style={styles.text_price}>${item.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const getChildrenStyle = () => {
        return {
            width: (width - 18) / 2,
            height:300,
            backgroundColor: Colors.white,
            margin: 4,
            borderRadius: 18,
            borderColor: "red",
            borderWidth: 4,
        };
    };

    return (
        <StaggeredList
            data={shoeList}
            animationType={'NONE'}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderChildren(item)}
        />
    )
}

export default ListShoe

const styles = StyleSheet.create({
    container_like: {
        width: CONSTANST.iconSize,
        height: CONSTANST.iconSize,
        position: "absolute",
        zIndex: 10,
        right: 20,
        top: 10,
    },
    container_image: {
        height: "65%",
    },
    image: {
        height: "100%"
    },
    container_text: {
        height: "35%",
        padding: 10,
        justifyContent: "center",
    },
    text_name: {
        color: Colors.black,
        fontSize: CONSTANST.text24,
        fontWeight: "bold"
    },
    text_price: {
        color: Colors.black,
        fontSize: CONSTANST.text16,
    }
})