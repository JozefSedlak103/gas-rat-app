import React, { Component } from 'react';
import {I18nManager, Text, View, TextInput, NativeEventEmitter } from 'react-native';
import styles from '../assets/styles';
import * as RNLocalize from "react-native-localize";
import { TouchableOpacity } from 'react-native-gesture-handler';
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

export var textName = "";

export default class LoginScreen extends Component{
    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {
            value:"",
            text:""
        }
    }

    getName() {
        return this.state.text;
    }

    toMenu = () => {
        textName = this.state.text;
        this.props.navigation.navigate('Menu');
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
                <Text>
                    {translate("Login")}
                </Text>
                <TextInput
                    style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder={translate("name")}
                />
                <TouchableOpacity style={styles.buttonProp}
                onPress={this.toMenu}>
                    <Text style={styles.buttonText}>{translate("Continue")}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

