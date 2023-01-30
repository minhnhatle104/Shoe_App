import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { ProductLikeModel } from '../../../redux/slice/productSlice'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigator/typeCheckNavigator'
import Colors from '../../../common/Colors';
import { CONSTANST } from '../../../common/contanst';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/configStore';
import { postProductUnlikeApi } from '../../../redux/thunk/productThunk'

type Props = {
    shoeFavourite: ProductLikeModel[] | undefined | null
}

const ListShoeFavourite = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { shoeFavourite } = props
    const shoeList = useSelector((state: RootState) => state.productSlice.shoeList)
    const dispatch:AppDispatch = useDispatch()


    return (
        <View>
            {shoeList?.map((item, index) => {
                const itemFavor = shoeFavourite?.find(shoeItem => shoeItem.id === item.id)
                if (itemFavor) {
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
                            onPress={()=>dispatch(postProductUnlikeApi(item.id))}
                            >
                                <Ionicons name='heart' color={Colors.red} size={CONSTANST.icon36} />
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

export default ListShoeFavourite

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
        justifyContent:"center",
        alignItems:"flex-start",
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
    container_remainButton:{
        justifyContent:"center",
        alignItems:"center",
        marginRight:10
    }
})