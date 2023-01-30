import { StyleSheet, TextInput, View ,TouchableOpacity, Alert} from 'react-native'
import React,{useRef} from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { CONSTANST } from '../../../common/contanst'
import Colors from '../../../common/Colors'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/configStore'
import { searchShoe } from '../../../redux/slice/productSlice'
import { getAllProductApi } from '../../../redux/thunk/productThunk'

type Props = {}

const SearchBar = (props: Props) => {
    const [text, setChangeText] = React.useState('');
    const dispatch = useDispatch<AppDispatch>()

    const handleSearchSubmit = () => {
        if(text === ""){
            dispatch(getAllProductApi())
        }else{
            dispatch(searchShoe(text))
        }
    }
  
    const searchRef = useRef(-1)

    return (
        <View style={styles.container}>
            <View style={styles.container_input}>
                <TextInput
                    style={styles.input_field}
                    onChangeText={(text)=>{
                        setChangeText(text)
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
                    <FontAwesome5 name='search'  size={CONSTANST.iconSize} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>Alert.alert("Development","Filter is in development")}>
                    <FontAwesome5 name='filter' color={Colors.white} size={CONSTANST.iconSize} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-around",
        backgroundColor:Colors.red
    },
    container_input: {
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        height: 40,
        width:"80%",
        margin: 12,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor:Colors.white
    },
    input_field:{
        width:"70%",
        height:"100%",
    }
})