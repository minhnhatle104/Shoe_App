import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../common/Colors'
import { CONSTANST } from '../../../common/contanst'

type Props = {}

const HomeHeader = (props: Props) => {
    return (
        <View style={styles.container_header}>
            <View style={{width:300}}>
                <Text style={styles.text_header}>Arsenal Shoes Collection</Text>
            </View>
            <View></View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container_header: {
        flexDirection: "row",
        backgroundColor: Colors.red,
        padding:20,
    },
    text_header: {
        color: Colors.white,
        fontSize: CONSTANST.text32,
        fontWeight: "bold",
    }
})