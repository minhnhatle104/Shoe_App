import { FlatList, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Category } from '../../../redux/slice/categorySlice'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../../../common/Colors'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/configStore'
import { getAllProductApi, getProductByCategoryIdApi } from '../../../redux/thunk/productThunk'

type Props = {
    categoryList: Category[] | null
}

const ListCategory = (props: Props) => {
    const { categoryList } = props
    const [idActive, setIdActive] = useState("")

    const dispatch = useDispatch<AppDispatch>();

    const _renderItem = (item: Category) => {
        return <TouchableOpacity
            style={[styles.container_item, {
                borderBottomWidth: 5,
                borderBottomColor: idActive === item.id ? Colors.red : Colors.black,
            }]}
            onPress={() => {
                setIdActive(item.id)
                if(item.id === "ALL"){
                    dispatch(getAllProductApi())
                }else{
                    dispatch(getProductByCategoryIdApi(item.id))
                }
            }}>
            <Text style={[styles.container_text, 
                { 
                    color: idActive === item.id ? Colors.red : Colors.white ,
                    fontWeight:idActive === item.id ? "bold" : "400",
                }]}>
                {item.category}
            </Text>
        </TouchableOpacity >
    }


    return (
        <SafeAreaView style={{backgroundColor:Colors.black}}>
            <FlatList
                data={categoryList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => _renderItem(item)}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default ListCategory

const styles = StyleSheet.create({
    container_item: {
        margin: 20,
    },
    container_text: {
        fontSize: 16,
        fontWeight:"300"
    }
})