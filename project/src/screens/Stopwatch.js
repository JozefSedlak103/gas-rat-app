import React, { Component } from 'react';
import {I18nManager, Text, View, NativeEventEmitter } from 'react-native';
import styles from '../assets/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNLocation from 'react-native-location';
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


let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      sec: 0,
      msec: 0,
      wait: 300,
      location: null,
      location: {speed: 0},
      speed: 0,
    }
    setI18nConfig();
    this.interval = null;
    this.waitInterval = null;

    RNLocation.configure({
      distanceFilter: 0,
      interval: 100,
    });

    RNLocation.requestPermission({
      android: {
        detail: "fine",
        rationale: {
          title: translate("Location permission"),
          message: translate("We use your location to get the speed of your car"),
          buttonPositive: translate("OK"),
          buttonNegative: translate("Cancel")
        }
      }
    }).then(granted => {
      if (granted) {
        this._startUpdatingLocation();
      }
    });
  }

  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
}

  componentWillUnmount() {
    this._stopUpdatingLocation();
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
};

  _startUpdatingLocation = () => {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        this.setState({ location: locations[0],});
      }
    );
  };

  _stopUpdatingLocation = () => {
    this.locationSubscription && this.locationSubscription();
    this.setState({ location: null });
  };

  _openRepoUrl = () => {
    Linking.openURL(repoUrl).catch(err =>
      console.error("An error occurred", err)
    );
  };

//metody na casomieru
handleToggle = () => {
  this.waitInterval = setInterval(() => {
  if (this.state.wait>0) {
    this.setState({wait: this.state.wait - 1});
  };
  if (this.state.wait == 0) {
    clearInterval(this.waitInterval);
    this.setState(
        {
            start: !this.state.start
        },
        () => this.handleStart()
    );
  };
  }, 1);
};

//tu doplnit potom vlozenie hodnoty do servera
handleStop = () => {
    this.setState({
      start: !this.state.start,
    });
    clearInterval(this.interval);
};

handleStart = () => {
  if (this.state.start) {
      this.interval = setInterval(() => {
          if (this.state.msec !== 99) {
              this.setState({
                  msec: this.state.msec + 1
              });
          } else if (this.state.sec !== 59) {
              this.setState({
                  msec: 0,
                  sec: ++this.state.sec
              });
          } else {
              this.setState({
                  msec: 0,
                  sec: 0,
                  min: ++this.state.min
              });
          }
          //zastavi casomieru ak vozidlo dosiahne 100km/h
          //(v tomto pripade je GPS rychlost 100, co nemusi byt realna "zatial")
          if (this.state.location.speed >= 100) {
            this.handleStop();
          }
        }, 1);
/*toto asi vymazat potom ked uz nebudem pouzivat stop ale 100kmh na zastavenie
  } else {
    this.setState({
      wait: 300,
    });
      clearInterval(this.interval);
      */
  }
};



handleReset = () => {
  this.setState({
      min: 0,
      sec: 0,
      msec: 0,
      wait: 300,

      start: false
  });

  clearInterval(this.interval);

};

  render() {
    const { location } = this.state;
    const speed = this.state.location.speed;
    //this.setState({speed: this.location.speed});

    //pridal som polozku view flex:1 a zobrazovanie rychlosti, cize ked to nepojde
    // ta na seba nadavaj ze si si to neskontroloval
      return (
        <View style={styles.container}>
          <View style={styles.numberView}><Text style={{fontSize: 150}}>{Math.round(this.state.wait/100+0.49)}</Text></View>
          <View style={styles.parentView}>
           <View style={styles.parent}>
               <Text style={styles.child}>{padToTwo(this.state.min) + ' : '}</Text>
               <Text style={styles.child}>{padToTwo(this.state.sec) + ' : '}</Text>
               <Text style={styles.child}>{padToTwo(this.state.msec)}</Text>
           </View>
           <View>
             <Text>
               Speed: {speed}
             </Text>
           </View>
           </View>
           <View style={styles.buttonParent}>
              <TouchableOpacity style={styles.button} onPress={this.handleReset}>
      <Text style={styles.buttonText}>{translate("Reset")}</Text>
              </TouchableOpacity>
              {!this.state.start ? <TouchableOpacity style={styles.button} onPress={this.handleToggle}>
                <Text style={styles.buttonText}> {translate("Start")}</Text>
              </TouchableOpacity>: null}
            </View>
        </View>
      );
  }
}