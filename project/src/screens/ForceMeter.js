import React, {Component} from 'react';
import {I18nManager, Text, View, Dimensions, Button, ImageBackground } from 'react-native';
import { Accelerometer, Constants } from 'expo-sensors';
import styles from '../assets/styles.js';
import * as RNLocalize from "react-native-localize";
import memoize from "lodash.memoize";
import i18n from 'i18n-js';


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

const screenwidth = Dimensions.get('window').width;
//const { t, i18n } = useTranslation();
export default class ForceMeter extends Component {
    constructor(props) {
        super(props);
        setI18nConfig();
    }
    state = {
    accelerometerData: { x: 0, y: 0, z: 0 },
    }

    componentWillUnmount() {
        this._unsubscribeFromAccelerometer();
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);

    }

    componentDidMount() {
        this._subscribeToAccelerometer();
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        setI18nConfig();
        this.forceUpdate();
    };

    _subscribeToAccelerometer = () => {
        this._accelerometerSubscription = Accelerometer.addListener(accelerometerData => this.setState({ accelerometerData })
        );
    };

    _unsubscribeFromAccelerometer = () => {
        //this._accelerometerSubscription && this._acceleroMeterSubscription.remove();
        this._accelerometerSubscription = Accelerometer.removeAllListeners();
        this._acceleroMeterSubscription = null;
    };

    render() {
        
    //var a = this.state.accelerometerData.x;
    //var b = this.state.accelerometerData.y;
    //var c = this.state.accelerometerData.z;
    //if (a<0) a=-a;
    //if (b<0) b=-b;
    //if (c<0) c=-c;
    //const max = b;
    //if (maxVal < 100) {
    //  maxVal += max;
    // }
    //if (maxVal<max) {
    //    maxVal= max;
    //}
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.paragraph}>
                x = {this.state.accelerometerData.x.toFixed(2)}{', '}
                y = {this.state.accelerometerData.y.toFixed(2)}{', \n'}
                </Text>
            </View>
            <View style={styles.mainContainer}>
                <ImageBackground source={require('./../assets/gforcetarget.png')} style={styles.imgbackground}>
                    <View style={{backgroundColor: 'red',
                          borderColor: 'red',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          position: "absolute",
                          marginTop: (screenwidth/2 -10) + (this.state.accelerometerData.y*170),
                          marginLeft: (screenwidth/2-10) - (this.state.accelerometerData.x*170),
                    }}/>
                </ImageBackground>
            </View>
        </View>
    );
    }
}

