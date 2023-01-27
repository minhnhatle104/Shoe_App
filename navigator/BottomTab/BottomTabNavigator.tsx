import React,{MutableRefObject, useEffect,useRef} from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomePage from '../../screens/HomePage/HomePage';
import ShoeFavourite from '../../screens/ShoeFavourite/ShoeFavourite';
import Cart from '../../screens/Cart/Cart';
import Profile from '../../screens/Profile/Profile';
import { RootStackParamList } from '../typeCheckNavigator';
import { StyleSheet } from "react-native";
import Colors from "../../common/Colors";
import { CONSTANST } from "../../common/contanst";
import HomeStack from "../Stack/HomeStack";


type TabScreen = {
    route: keyof RootStackParamList;
    label:string;
    activeIcon: string;
    component:React.FC;
}

const TabArr:TabScreen[] = [
    { route: "HomeStack", label: 'Home',  activeIcon: 'home', component: HomeStack },
    { route: "Favourite", label: 'Like',activeIcon: 'heart', component: ShoeFavourite },
    { route: 'Cart', label: 'Cart', activeIcon: 'cart', component: Cart },
    { route: 'Account', label: 'Account', activeIcon: 'account', component: Profile },
];


const BottomTabStack = createBottomTabNavigator<RootStackParamList>();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -5 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props:any) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = React.useRef<any>(null);
    const circleRef = React.useRef<any>(null);
    const textRef =  React.useRef<any>(null);
  
    useEffect(() => {
      if (focused) {
        viewRef.current.animate(animate1);
        circleRef.current.animate(circle1);
        textRef.current.transitionTo({ scale: 1 });
      } else {
        viewRef.current.animate(animate2);
        circleRef.current.animate(circle2);
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
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon name={item.activeIcon} size={CONSTANST.iconSize} color={focused ? Colors.white : Colors.gray} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
    )
  }

export const BottomTabNavigator = () => {
    return <BottomTabStack.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          borderRadius: 16,
          margin:5,
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


export default function AnimTab1() {
  return (
    <BottomTabStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}>
      {TabArr.map((item, index) => {
        return (
          <BottomTabStack.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </BottomTabStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.red,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.red,
  }
})