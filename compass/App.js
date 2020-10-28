
import RNDeviceRotation from 'react-native-device-rotation';
import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeEventEmitter, Image } from 'react-native';


export default class App extends Component {
  state = {azimuth : 0}
  componentDidMount() {
    const orientationEvent = new NativeEventEmitter(RNDeviceRotation)
    this.subscription = orientationEvent.addListener('DeviceRotation', event => {
        //console.log('DeviceRotation', event)              //prints azimuth, roll and pitch to console
        //console.log('DeviceRotation', event.azimuth)      //prints azimuth to console
        this.setState({
            //roll: event.roll,
            //pitch: event.pitch,
            azimuth: event.azimuth,
        })
    })
    RNDeviceRotation.start()
  }

  componentWillUnmount() {
    if (this.subscription) {
        this.subscription.remove()
    }
    RNDeviceRotation.stop()
  }

  render() {
    const degrees = parseInt(360-this.state.azimuth)+'deg';
    //console.log(degrees); prints const degrees to console
    return (

      <View style={styles.container}>
        <View style={styles.upperCont}><Text style={styles.text}>Compass</Text></View>
        <View style={styles.arrowCont}>
          <Image source={require('./assets/arrow_up_small.png')}style={styles.image}/>
        </View>
        <View style={styles.imageCont}>
          <Image  source={require("./assets/compass.png")}
                  resizeMode="contain"
                  style={{transform: [{rotate: degrees}], width: '100%' }}/>
        </View>
        <View style={styles.textCont}>
          <Text style={styles.azimText}>{parseInt(this.state.azimuth)}</Text>
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  azimText: {
    fontSize:30,
    fontWeight: 'bold',
    color: '#000000',
  },
  upperCont: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: '#9F743C',
  },
  arrowCont: {
    justifyContent: 'flex-end',
    alignContent: 'center',
    flex:1,
  },
  imageCont: {
    flex: 10,
    width: '99%',
    //backgroundColor: '#C0BEBB', //check the container size
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
   width:30,
   height: 30,
   backgroundColor: '#fff',
  },
  textCont: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//TODO dokoncit additional tasks