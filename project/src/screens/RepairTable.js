import React, { Component } from 'react';
import {I18nManager, View, Dimensions, TextInput, Button} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import styles from '../assets/styles';
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

screenwidth = Dimensions.get('window').width;
screenheight = Dimensions.get('window').height;
export default class RepairTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: [translate("Date"), "KM", translate("Component"),translate("Price"), translate("Note") ],
            tableData: [],
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: "",
        }
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

    addData = () => {
       var newData = [this.state.value1,this.state.value2,this.state.value3,this.state.value4,this.state.value5];
        var newTableData = this.state.tableData.slice();
        newTableData.push(newData);
        this.setState({tableData: newTableData,
                    value1: "",
                    value2: "",
                    value3: "",
                    value4: "",
                    value5: "", });
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.tableinput}>
                    <TextInput style={styles.textInput}
                                placeholder={translate("Date")}
                                value={this.state.value1}
                                onChangeText={(value1)=> this.setState({value1})} />

                    <TextInput style={styles.textInput}
                                placeholder="KM"
                                value={this.state.value2}
                                onChangeText={(value2) => this.setState({value2})} />

                    <TextInput style={styles.textInput}
                                placeholder={translate("Part")}
                                value={this.state.value3}
                                onChangeText={(value3) => this.setState({value3})} />

                    <TextInput style={styles.textInput}
                                placeholder={translate("Price")}
                                value={this.state.value4}
                                onChangeText={(value4) => this.setState({value4})} />
                    
                    <TextInput style={styles.textInput}
                                placeholder={translate("Note")}
                                value={this.state.value5}
                                onChangeText={(value5) => this.setState({value5})} />

                </View>
                <View>
                    <Button onPress={this.addData}
                            title={translate("ADD")}></Button>
                </View>
                <Table style={{width: this.screenWidth}} borderStyle={{borderWidth: 2, borderColor: 'black'}}>
                    <Row data={this.state.tableHead}
                      widthArr={[screenwidth/8,screenwidth/7,screenwidth/3,screenwidth/6,screenwidth/5]}
                      style={styles.tableHead} textStyle={styles.textTableHead}/>
                    <Rows data={this.state.tableData} textStyle={styles.text} style={styles.tableRows}
                     widthArr={[screenwidth/8,screenwidth/7,screenwidth/3,screenwidth/6,screenwidth/5]}/>
                </Table>
            </View>
        );
    }
}