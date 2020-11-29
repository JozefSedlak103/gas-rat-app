import React, { Component } from 'react';
import {I18nManager, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../assets/styles.js';
import * as RNLocalize from "react-native-localize";
import memoize from "lodash.memoize";
import i18n from 'i18n-js';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';

const ANDROID = Platform.OS === 'android';

const translationGetters = {
    sk: () => require("../translations/sk.json"),
    en: () => require("../translations/en.json")
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

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Component: null,
            useGoogleMaps: ANDROID,
          };
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
        return(
            <View style={styles.container}>
                <MapView
                provider={PROVIDER_GOOGLE}
                 style={{width:'100%', height:'90%',position: 'absolute',
                 top: 20,
                 left: 0,
                 right: 0,
                 bottom: 0,}}
                 region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                            }}/>
            </View>
        );
    }
}