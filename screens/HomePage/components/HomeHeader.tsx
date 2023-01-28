import { StyleSheet, Text, View, Image } from 'react-native'
import React,{memo} from 'react'
import Colors from '../../../common/Colors'
import { CONSTANST } from '../../../common/contanst'

type Props = {}

const HomeHeader = (props: Props) => {
    return (
        <View style={styles.container_header}>
            <View style={{ width: 280}}>
                <Text style={styles.text_header}>Arsenal Shoes Collection</Text>
            </View>
            <Image source={require("../../../assets/images/arsenal_logo.png")}
                style={{
                    width: 100,
                    height: 80
                }}
                resizeMode={"contain"} />
        </View>
    )
}

export default memo(HomeHeader)

const styles = StyleSheet.create({
    container_header: {
        flexDirection: "row",
        backgroundColor: Colors.red,
        padding: 20,
    },
    text_header: {
        color: Colors.white,
        fontSize: CONSTANST.text32,
        fontWeight: "bold",
    }
})