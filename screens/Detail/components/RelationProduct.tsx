import { StyleSheet, FlatList, Text, View } from 'react-native'
import React from 'react'
import { RelatedProductModel } from '../../../redux/slice/productSlice'
import { TouchableOpacity, Image } from 'react-native'
import Colors from '../../../common/Colors'
import { CONSTANST } from '../../../common/contanst'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigator/typeCheckNavigator'

type Props = {
    relatedProducts: RelatedProductModel[] | null
}

const RelationProduct = (props: Props) => {
    const { relatedProducts } = props
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <>
        <Text style={styles.text_relatedTitle}>Related Products</Text>
        {relatedProducts?.map((item,index)=>{
            return <TouchableOpacity key={index} onPress={() => {
                navigation.push("Detail", { id: item.id })
            }} style={styles.container_related}>
                <View style={styles.container_imageShoe}>
                    <Image style={styles.image_shoe}
                        source={{ uri: item?.image ? item?.image : "https://picsum.photos.cc?u=1" }}
                        resizeMode={"cover"} />
                </View>
                <View style={styles.container_description}>
                    <Text style={styles.text_title}>{item?.name ? item?.name : ""}</Text>
                    <Text style={styles.text_price}>{item?.price ? `$${item?.price}` : ""}</Text>
                </View>
            </TouchableOpacity>
        })}
        </>
    )
}

export default RelationProduct

const styles = StyleSheet.create({
    text_relatedTitle:{
        marginTop:20,
        fontSize:CONSTANST.text24,
        fontWeight:"bold",
    },
    container_related: {
        flexDirection: "row",
        backgroundColor: Colors.white,
        marginTop: 20,
        borderWidth: 5,
        borderColor: Colors.black,
    },
    container_imageShoe: {
        borderRightWidth: 5,
        borderRightColor: Colors.black
    },
    image_shoe: {
        width: 100,
        height: 80,
    },
    container_description: {
        flex: 3,
        padding: 10,
    },
    text_title: {
        fontSize: CONSTANST.text16,
        fontWeight: "bold",
        color: Colors.black
    },
    text_description: {
        fontSize: CONSTANST.text16,
        color: Colors.gray,
    },
    text_price: {
        fontSize: CONSTANST.text16,
        fontWeight: "bold",
    }
})