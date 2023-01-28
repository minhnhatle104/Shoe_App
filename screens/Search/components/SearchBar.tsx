import { StyleSheet, TextInput, View } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { CONSTANST } from '../../../common/contanst'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../../../common/Colors'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/configStore'
import { searchShoe } from '../../../redux/slice/productSlice'
import { getAllProductApi } from '../../../redux/thunk/productThunk'

type Props = {}

const SearchBar = (props: Props) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch<AppDispatch>()

    const handleSearchSubmit = () => {
        if (text === "") {
            dispatch(getAllProductApi())
        } else {
            dispatch(searchShoe(text))
        }
    }

    const searchRef = useRef(-1)

    return (
        <View style={styles.container}>
            <View style={styles.container_input}>
                <TextInput
                    style={styles.input_field}
                    onChangeText={(text) => {
                        setText(text)
                        if (searchRef.current) {
                            clearTimeout(searchRef.current)
                        }
                        searchRef.current = setTimeout(() => {
                            dispatch(searchShoe(text))
                        }, 300)
                    }}
                    placeholder="Enter product"
                />
                <TouchableOpacity onPress={handleSearchSubmit}>
                    <FontAwesome5 name='search' size={CONSTANST.iconSize} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <FontAwesome5 name='filter' color={Colors.white} size={CONSTANST.iconSize} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: Colors.red
    },
    container_input: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 40,
        width: "80%",
        margin: 12,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: Colors.white
    },
    input_field: {
        width: "70%",
        height: "100%",
    }
})