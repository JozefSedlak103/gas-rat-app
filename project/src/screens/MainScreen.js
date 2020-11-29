import React, { Component, Suspense } from 'react';
import {I18nManager, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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



export default class MainScreen extends Component {
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
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonProp}
                onPress={() => this.props.navigation.navigate('ForceMeter')}>
                    <Text style={styles.buttonText}>{translate("Force meter")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonProp}
                onPress={() => this.props.navigation.navigate('Stopwatch')}>
                    <Text style={styles.buttonText}>{translate("Stopwatch")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonProp}
                onPress={() => this.props.navigation.navigate('Map')}>
                    <Text style={styles.buttonText}>{translate("Map")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonProp}
                onPress={() => this.props.navigation.navigate('RepairTable')}>
                    <Text style={styles.buttonText}>{translate("Table of repairs")}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}



