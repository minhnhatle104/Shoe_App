import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    HomeStack:undefined;
    Home: undefined;
    Search:undefined,
    Cart:undefined;
    Account:undefined;
    Favourite: undefined;
    Detail:{id:number};
    Overview:undefined;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;