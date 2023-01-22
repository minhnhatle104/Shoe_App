import React,{MutableRefObject, useEffect,useRef} from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomePage from '../../screens/HomePage/HomePage';
import ShoeFavourite from '../../screens/ShoeFavourite/ShoeFavourite';
import Cart from '../../screens/Cart/Cart';
import Profile from '../../screens/Profile/Profile';
import { TabStackParamList } from '../typeCheckNavigator';
import { StyleSheet } from "react-native";
import Colors from "../../common/Colors";
import { CONSTANST } from "../../common/contanst";


type TabScreen = {
    route: keyof TabStackParamList;
    label:string;
    activeIcon: string;
    component:React.FC;
}

const TabArr:TabScreen[] = [
    { route: "TabHome", label: 'Home',  activeIcon: 'home', component: HomePage },
    { route: "TabFavourite", label: 'Like',activeIcon: 'heart', component: ShoeFavourite },
    { route: 'TabCart', label: 'Cart', activeIcon: 'cart', component: Cart },
    { route: 'TabProfile', label: 'Account', activeIcon: 'account', component: Profile },
];


const BottomTabStack = createBottomTabNavigator<TabStackParamList>();

const TabButton = (props:any) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = React.useRef<any>(null);
    const textRef =  React.useRef<any>(null);
  
    useEffect(() => {
      if (focused) {
        viewRef.current.animate({0: {scale: 1}, 1: {scale: 1.5}});
        textRef.current.transitionTo({ scale: 1.5 });
      } else {
        viewRef.current.animate({0: {scale: 1.5}, 1: {scale: 1}});
        textRef.current.transitionTo({ scale: 0 });
      }
    }, [focused])
  
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={styles.container}>
        <Animatable.View
          ref={viewRef}
          duration={1000}
          style={styles.container}>
          <Icon name={item.activeIcon} size={CONSTANST.iconSize} color={focused ? Colors.red : Colors.primaryLite} />
        </Animatable.View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Animatable.Text>
      </TouchableOpacity>
    )
  }

export const BottomTabNavigator = () => {
    return <BottomTabStack.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16
        }
      }}>
        {TabArr.map((item,index)=>{
            return  <BottomTabStack.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        })}
    </BottomTabStack.Navigator>
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
        fontSize: 10,
        textAlign: 'center',
        color: Colors.red,
    }
})