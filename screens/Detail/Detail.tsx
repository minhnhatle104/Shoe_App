import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootRouteProps, RootStackParamList } from '../../navigator/typeCheckNavigator';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons"
import { AppDispatch, RootState } from '../../redux/configStore';
import { getProductByIdApi, postProductLikeApi, postProductUnlikeApi } from '../../redux/thunk/productThunk';
import AppLoader from '../../common/components/AppLoader';
import Colors from '../../common/Colors';
import { CONSTANST } from '../../common/contanst';
import ShoeInfo from './components/ShoeInfo';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';

type Props = {}

const Detail = (props: Props) => {
    const route = useRoute<RootRouteProps<"Detail">>();
    const { id } = route.params

    const productDetail: any = useSelector((state: RootState) => state.productSlice.productDetail)
    const isLoading: boolean = useSelector((state: RootState) => state.loadingSlice.isLoading)
    const shoeFavourite = useSelector((state: RootState) => state.productSlice.shoeFavourite)
    const dispatch: AppDispatch = useDispatch();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        dispatch(getProductByIdApi(id))
    }, [id])

    const carousels = [];

    for (let i = 0; i < 3; i++) {
        carousels.push(
            <Image
                key={i}
                source={{ uri: productDetail?.image ? productDetail.image : "https://picsum.photos.cc?u=1" }}
                style={styles.image}
                resizeMode={"contain"}
            />
        )
    }

    const itemFavourite = shoeFavourite?.find(item => item.id === id)

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container_image}>
                    <Swiper>
                        {carousels}
                    </Swiper>
                    <TouchableOpacity style={styles.button_back} onPress={() => {
                        navigation.goBack()
                    }}>
                        <Ionicons name='arrow-back' color={Colors.black} size={CONSTANST.icon36} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button_like} onPress={() => {
                        if(itemFavourite){
                            dispatch(postProductUnlikeApi(id))
                        }else{
                            dispatch(postProductLikeApi(id))
                        }
                    }}>
                        {itemFavourite ? <Ionicons name='heart' color={Colors.red} size={CONSTANST.icon36} /> 
                            :
                            <Ionicons name='heart' color={Colors.black} size={CONSTANST.icon36} />
                        }
                    </TouchableOpacity>

                </View>
                <ShoeInfo productDetail={productDetail} />
            </ScrollView>
            {isLoading ? <AppLoader /> : null}
        </>
    )
}

export default Detail

const styles = StyleSheet.create({
    container_image: {
        margin: 12,
        height: 300,
    },
    image: {
        width: "100%",
        height: 300,
    },
    button_back: {
        position: "absolute"
    },
    button_like: {
        position: "absolute",
        right: 10,
    }
})