import React, {Component} from 'react';
import {I18nManager, StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import ForceMeter from "./screens/ForceMeter";
import Stopwatch from './screens/Stopwatch';
import RepairTable from './screens/RepairTable';
import MainScreen from './screens/MainScreen';
import MapScreen from './screens/MapScreen';
import LoginScreen from './screens/LoginScreen';
import * as RNLocalize from "react-native-localize";
import memoize from "lodash.memoize";
import i18n from 'i18n-js';

const translationGetters = {
  sk: () => require("./translations/sk.json"),
  en: () => require("./translations/en.json")
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  const fallback = { languageTag: "en", isRTL: false };
  const { languageTag, isRTL } =
  RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
  fallback;

translate.cache.clear();
I18nManager.forceRTL(isRTL);
i18n.translations = { [languageTag]: translationGetters[languageTag]() };
i18n.locale = languageTag;
};



const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    setI18nConfig();
  }

  componentDidMount() {
      RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }

  componentWillUnmount() {
      RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
      setI18nConfig();
      this.forceUpdate();
  };

  render() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options= {{title: translate('Login')}}/>
        <Stack.Screen name="Menu" component={MainScreen} options= {{title: "Menu"}} />
        <Stack.Screen name="Map" component={MapScreen} options= {{title: translate('Map')}} />
        <Stack.Screen name="ForceMeter" component={ForceMeter} options= {{title: translate('Force meter')}} />
        <Stack.Screen name="Stopwatch" component={Stopwatch} options={{title: translate('Stopwatch')}}/>
        <Stack.Screen name="RepairTable" component={RepairTable} options={{title: translate('Table of repairs')}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  textContainer: {
    position: 'absolute',
    top: 40,
  }
});

export default App;