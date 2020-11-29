import RNDeviceRotation from 'react-native-device-rotation';
import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeEventEmitter, Image, Button } from 'react-native';
//import { transform } from '@babel/core';






export default class App extends Component {
  state = {azimuth : 0,
           roll: 0,
           pitch: 0,
           isPicture : false,
           isGame : true}

  componentDidMount() { //connects sensors
    const orientationEvent = new NativeEventEmitter(RNDeviceRotation)
    this.subscription = orientationEvent.addListener('DeviceRotation', event => {
        //console.log('DeviceRotation', event)              //prints azimuth, roll and pitch to console
        //console.log('DeviceRotation', event.azimuth)      //prints azimuth to console
        //console.log('roll', event.roll)
        //console.log('pitch', event.pitch)
        this.setState({
            roll: event.roll,
            pitch: event.pitch,
            azimuth: event.azimuth,
        })
    })
    RNDeviceRotation.start()
  }

  componentWillUnmount() { //disconnects sensors
    if (this.subscription) {
        this.subscription.remove()
    }
    RNDeviceRotation.stop()
  }

  setPicture() {
    const { isPicture } = this.state;
    this.setState({ isPicture: !isPicture });
  }

  setGame() {
    const { isGame } = this.state;
    this.setState({isGame: !isGame});
  }

  
  
  /*

  checkY() {
    var Y = 0;
    if (this.state.pitch<=45 && this.state.pitch>=0) {
      Y = this.state.pitch;
    } else if (this.state.pitch>=315 && this.state.pitch<360) {
      Y = 360 - this.state.pitch;
    } else {
      Y = 0;
    }
    return Y;
  }

  checkX() {
    var X = 0;
    if (this.state.roll>=0 && this.state.roll<=45) {
      X = this.state.roll;
    } else if (this.state.roll>=315 && this.state.roll<360) {
      X = 360 - this.state.roll;
    } else {
      X = 0;
    }
    return X;
  }
*/
 /* moveBall() {
    var X = this.checkX();
    var Y = this.checkY();
  }
  */


  render() {


    //var X = this.checkX();
    //var Y = this.checkY();

    //X = X+(X/5);
    //Y = Y+(Y/5);

    const degrees = parseInt(360-this.state.azimuth)+'deg';
    //console.log(degrees); prints const degrees to console

    var form;
    if (this.state.isGame) {
      if (this.state.isPicture) {
        form = (
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
              <View style={styles.buttonCont}>
                <Button title={this.state.isPicture? 'azimuth': 'compass'}
                  onPress={this.setPicture.bind(this)}
                  style={styles.button}
                  color='#9F743C'
                  raised='true'/>
              </View>
            </View>
        );
      } else if (!this.state.isPicture) {
        form = (
            <View style={styles.container}>
              <View style={styles.upperCont}><Text style={styles.text}>Compass</Text></View>
              <View style={styles.textCont}>
                <Text style={styles.azimText}>{parseInt(this.state.azimuth)}</Text>
              </View>
              <View style={styles.buttonCont}>
                <Button title={this.state.isPicture? 'azimuth': 'compass'}
                  onPress={this.setPicture.bind(this)}
                  style={styles.button}
                  color='#9F743C'
                  raised='true'/>
              </View>
          </View>
        );
      }
    } else if (!this.state.isGame) {
      form = (
        <View style={styles.container}>
          <View style={styles.upperCont}><Text style={styles.text}>Game of sensors</Text></View>
            <View style={styles.gameField}>
              <View style={{width: 20,
                    height: 20,
                    borderRadius: 20/2,
                    backgroundColor: 'red',
                    alignSelf: 'center',
                    
                  }}/>
              </View>

        </View>
      )
    }


    return (
      <View style={styles.container}>
        <View style={styles.changeCont}>
          {form}
        </View>
        <View style={styles.navCont}>
          <Button title={this.state.isGame? 'Game =>' : 'Compass =>'}
                  onPress={this.setGame.bind(this)}
                  style={styles.button}
                  color='#000'
                  raised='true'/>
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
  changeCont: {
    flex:10,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  imageCont: {
    flex: 10,
    width: '99%',
    //backgroundColor: '#C0BEBB', //to check the container size
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
   width:30,
   height: 30,
   backgroundColor: '#fff',
  },
  textCont: {
    flex: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCont: {
    paddingBottom: 20,
    marginBottom: 20,
  },
  button: {
    color: '#9F743C',
    backgroundColor: '#9F743C',
  },
  gameField: {
    flex: 11,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#C0BEBB',
  },
  navCont: {
    flex: 1,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
  },
});