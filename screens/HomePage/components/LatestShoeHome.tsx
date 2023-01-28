import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import { ProductModel } from '../../../redux/slice/productSlice'
import { Image } from 'react-native-animatable'
import Colors from '../../../common/Colors'
import { CONSTANST } from '../../../common/contanst'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigator/typeCheckNavigator'

type Props = {
    shoeList: ProductModel[] | undefined | null
}

const LatestShoeHome = (props: Props) => {
    const { shoeList } = props

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const _renderLatestShoe = (item: ProductModel) => {
        return <TouchableOpacity onPress={()=>{
            navigation.navigate("Detail",{id:item.id})
        }} style={styles.container_cardSmall}>
            <Image style={styles.image_cardSmall} source={{ uri: item.image }} resizeMode={"contain"} />
        </TouchableOpacity>
    }

    return (
        <View style={{padding:20}}>
            <View style={styles.container_textLatest}>
                <Text style={styles.text_latest}>Latest Shoes</Text>
                <View style={styles.container_textShow}>
                    <Text style={styles.text_show}>Show all</Text>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate("Search")
                    }}>
                        <AntDesign name='caretright' color={Colors.black} size={CONSTANST.iconSize} />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={shoeList}
                renderItem={({ item }) => _renderLatestShoe(item)}
                showsHorizontalScrollIndicator={false}
                horizontal={true} />
        </View>

    )
}

export default LatestShoeHome

const styles = StyleSheet.create({
    container_cardSmall: {
        backgroundColor: Colors.white,
        height: 100,
        width: 100,
        marginRight: 20,
        marginBottom:10,
        borderRadius: 20,
        elevation:10,
    },
    image_cardSmall: {
        height: 100
    },
    container_textLatest:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:10,
    },
    text_latest:{
        fontSize:CONSTANST.text20,
        fontWeight:"bold",
        color:Colors.black,
    },
    container_textShow:{
        flexDirection:"row",
    },
    text_show:{
        fontSize:CONSTANST.text16,
        color:Colors.black,
    }
})