/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var formatTime = require('minutes-seconds-milliseconds');

class stopwatch extends Component {
  constructor(props) {
  super(props);
  this.state = {
    timeElapsed: 0,
    running: false,
    startTime: null
  };
  }

  startStopButton() {
    var style = this.state.running ? styles.stopButton : styles.startButton;

    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleStartPress.bind(this)}
        style={[styles.button, style]}>
        <Text>
          {this.state.running ? 'Stop' : 'Starttt'}
        </Text>
      </TouchableHighlight>
    )
  }

  lapButton() {
    return (
      <View style={styles.button}>
        <Text>
          Lap
        </Text>
      </View>
    )
  }

  handleStartPress() {
    if(this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      console.log (this.state);
      return
    }
    this.setState({startTime: new Date()});


    this.interval = setInterval(() => {
      const { timeElapsed } = this.state; // grab current timeElapsed from the state.
      this.setState({
        timeElapsed: timeElapsed + (new Date() - this.state.startTime),
        running: true
      });
    }, 30);

  }
  handleResetPress() {
    clearInterval(this.interval);
    this.setState({
      running: false,
      timeElapsed: 0
    });
  }

  border(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerWrapper}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>
        <View style={styles.footer}>
            <Text>
                I am List of Laps
            </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  }
});

AppRegistry.registerComponent('stopwatch', () => stopwatch);
