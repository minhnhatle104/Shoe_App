import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import HeaderFavourite from './components/HeaderFavourite'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/configStore'
import ListShoeFavourite from './components/ListShoeFavourite'

type Props = {}

const ShoeFavourite = (props: Props) => {
    const shoeFavourite = useSelector((state: RootState) => state.productSlice.shoeFavourite);

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <HeaderFavourite />
                    <ListShoeFavourite shoeFavourite={shoeFavourite} />
                </SafeAreaView>
            </ScrollView>
        </>
    )
}

export default ShoeFavourite

const styles = StyleSheet.create({})