import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import { RootRouteProps } from '../../navigator/typeCheckNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import { getProductByIdApi } from '../../redux/thunk/productThunk';

type Props = {}

const Detail = (props: Props) => {
    const route = useRoute<RootRouteProps<"Detail">>();
    const { id } = route.params

    const productDetail: any = useSelector((state: RootState) => state.productSlice.productDetail)
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductByIdApi(id))
    }, [])



    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container_image}>
                <Image
                    source={{ uri: productDetail?.image ? productDetail.image : "https://i.pravatar.cc?u=1" }}
                    style={styles.image}
                    resizeMode={"cover"}
                />
            </View>

        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    container_image:{
        margin:12,
        height:"30%"
    },
    image:{
        height:"100%"
    }
})