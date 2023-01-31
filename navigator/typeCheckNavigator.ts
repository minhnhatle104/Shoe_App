import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    HomeStack:undefined;
    HomeScreen:undefined;
    Login:undefined;
    Signup:undefined;
    Home: undefined;
    Search:undefined;
    Cart:undefined;
    AccountStack:undefined;
    Account:undefined;
    Profile:undefined;
    Favourite: undefined;
    Detail:{id:number};
    Overview:undefined;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;