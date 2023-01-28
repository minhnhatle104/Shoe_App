import { StyleSheet, Text, View, ListRenderItem } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../../../common/Colors'
import { CONSTANST } from '../../../common/contanst'

type Props = {
    sizeList: string[] | undefined | null
}

const ShoeSize = (props: Props) => {
    const { sizeList } = props

    const [activeIndex, setActiveIndex] = useState(-1)

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {sizeList?.map((item, index) => {
                return <TouchableOpacity
                    style={[styles.container_size, {
                        backgroundColor: activeIndex === index ? Colors.red : Colors.black,
                    }]}
                    key={index} onPress={() => {
                        setActiveIndex(index)
                    }}>
                    <Text style={styles.text_size}>{item}</Text>
                </TouchableOpacity>
            })}
        </ScrollView>
    )
}

export default ShoeSize

const styles = StyleSheet.create({
    container_size: {
        margin:10,
        borderRadius: 30,
        padding: 5,
    },
    text_size: {
        color: Colors.white,
        fontSize: CONSTANST.text16,
        fontWeight: "bold"
    }
})