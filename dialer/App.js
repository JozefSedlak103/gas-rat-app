import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, StatusBar, Linking, Alert } from "react-native";
//import call from 'react-native-phone-call'
//import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title, titleSmall }) => (
  <TouchableOpacity onPress={onPress}
  style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
    <Text style={styles.appButtonTextSmall}>{titleSmall}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [number, wholeNumber] = useState('');
  const [callNow, callingNow] = useState('false');

  var image = callNow
      ? require("./assets/phone3.png")
      : require("./assets/phonehang1.jpg");
      

  const changeCallState = function () {
    if (!callNow)
    callingNow(!callNow);

    //Linking.openURL('tel:${number}');
    if (callNow && number!='') {
      callingNow(!callNow);
      Linking.openURL('tel:$' + number);
      
      //Alert.alert(number);
      //RNImmediatePhoneCall.immediatePhoneCall(number);


  }
  };

  //automaticke prisposobovanie displeja by malo byt nastavene

  // treba nastavit volanie
  return (
    <View style={styles.screenContainer}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Text style={{color: '#ffffff', fontSize: 20}}>Phone</Text>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.numbersContainer}>
          <Text style={{fontSize:50, textAlign: 'center',
           alignSelf: 'stretch'}}>{number}</Text>
        </View>
        <View style={styles.deleteButtonCont}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => wholeNumber(number.slice(0,-1))}
            onLongPress={()=> wholeNumber(number.replace(number,''))}>
            <Text style={{fontSize: 40, color: 'grey'}}>X</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.numberButtons}>
        <View style={styles.buttonThree}>
          <AppButton title="1"
            titleSmall="O_O"
            onPress={() => wholeNumber(number + '1')}
            backgroundColor="#000000" />
          <AppButton title="2"
            titleSmall="ABC"
            onPress={() => wholeNumber(number + '2')}
            backgroundColor="#007bff" />
          <AppButton title="3"
            titleSmall="DEF"
            onPress={() => wholeNumber(number + '3')}
            backgroundColor="#007bff" />
        </View>

        <View style={styles.buttonThree}>
          <AppButton title="4" size="sm"
            titleSmall="GHI"
            onPress={() => wholeNumber(number + '4')}
            backgroundColor="#007bff" />
          <AppButton title="5" size="sm"
            titleSmall="JKL"
            onPress={() => wholeNumber(number + '5')}
            backgroundColor="#007bff" />
          <AppButton title="6" size="sm"
            titleSmall="MNO"
            onPress={() => wholeNumber(number + '6')}
            backgroundColor="#007bff" />
        </View>
        

        <View style={styles.buttonThree}>
          <AppButton title="7" size="sm"
            titleSmall="PQRS"
            onPress={() => wholeNumber(number + '7')}
            backgroundColor="#007bff" />
          <AppButton title="8" size="sm"
            titleSmall="TUV"
            onPress={() => wholeNumber(number + '8')}
            backgroundColor="#007bff" />
          <AppButton title="9" size="sm"
            titleSmall="WXYZ"
            onPress={() => wholeNumber(number + '9')}
            backgroundColor="#007bff" />
        </View>

        <View style={styles.buttonThree}>
          <AppButton title="*" size="sm"
            //titleSmall="O_O"
            onPress={() => wholeNumber(number + '*')}
            backgroundColor="#007bff" />
          <AppButton title="0" size="sm"
            titleSmall="+"
            onPress={() => wholeNumber(number + '0')}
            backgroundColor="#007bff" />
          <AppButton title="#" size="sm"
            //titleSmall="DEF"
            onPress={() => wholeNumber(number + '#')}
            backgroundColor="#007bff" />
        </View>
      </View>

      <View style={styles.phoneButton}>
        <TouchableOpacity style={styles.phoneButton} 
          onPress={changeCallState}
        >
          <Image style={styles.imagePhone}
            source={image}

            //nedobre, treba dokoncit
            //onPress={callToNumber=()=>{
            //  const callNum= ('tel://' + number)
            //  Linking.openURL(callNum)
            //}}
            />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    //alignContent: "center",
    alignItems: "center",
    //justifyContent: 'flex-end',
    //justifyContent: "center",
    //padding: 16
  },
  topContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 10,
    width: '100%',
    backgroundColor: '#35D335',
  },
  textContainer: {
    flex: 4,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  numberButtons: {
    flex: 6,
    justifyContent: 'flex-end',
    //marginTop: '15%',
    maxHeight: '50%',
  },
  phoneButton: {
    flex: 1.5,
    //backgroundColor: '#26E52B'
  },
  numbersContainer: {
    flex: 3,
  },
  deleteButtonCont: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  imagePhone: {
    marginTop: 20,
    width: 80,
    height: 70,
    //backgroundColor: '#ffffff',
  },
  deleteButton: {
    fontSize: 20,
  },
  
  appButtonContainer: {
    backgroundColor: "#ffffff",
    borderColor: '#000000',
    borderWidth: 1,
    paddingVertical: 2,
    width: '33.35%',
  },
  buttonThree: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  appButtonText: {
    fontSize: 30,
    color: "#000000",
    alignSelf: "center",
    //textTransform: "uppercase"
  },
  appButtonTextSmall: {
    fontSize: 10,
    color: "#5D5F5D",
    //fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
});
