import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/typeCheckNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {}

const HomePage = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View>
            <Text>HomePage</Text>
            <Button
                title="Cart"
                onPress={() => {
                    navigation.navigate("TabCart");
                }}
            />
        </View>
    )
}

export default HomePage

const styles = StyleSheet.create({})