import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { RootRouteProps } from '../../navigator/typeCheckNavigator';
import SCREENS from '../../common/Screens';

type Props = {}

const Detail = (props: Props) => {
    const route = useRoute<RootRouteProps<"Detail">>();
    const {id} = route.params

    return (
        <View>
            <Text>Detail</Text>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({})