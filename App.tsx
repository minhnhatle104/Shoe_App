import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { View } from "react-native";
import { Provider } from 'react-redux'
import Routes from './navigator/Routes';
import { store } from './redux/configStore';


type Props = {}

const App = (props: Props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Routes />
      </View>
    </Provider>
  )
}

export default App