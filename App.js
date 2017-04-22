import React, { Component } from 'react';
import {
  AppRegistry, Image, StyleSheet, Text, View, ScrollView, Dimensions, Animated
} from 'react-native';

import Moment from "./src/Moment";

const { width, height } = Dimensions.get("window");

const Images = [
  { image: require("./images/creaturebox1.jpg"), title: "Bot 1" },
  { image: require("./images/creaturebox2.jpg"), title: "Bot 2" },
  { image: require("./images/creaturebox1.jpg"), title: "Bot 3" },
  { image: require("./images/creaturebox2.jpg"), title: "Bot 4" },
];

const getInterpolate = ( animatedScroll, i, imageLenth) => {
  const inputRange = [
    (i - 1) * width,
    i * width,
    (i + 1) * width,
  ]
  const outputRange = i === 0 ? [ 0, 0, 150 ] : [ -300, 0, 150 ];
  return animatedScroll.interpolate({
    inputRange,
    outputRange,
    extrapolate: "clamp"
  })
}

const getSeparator = (i) => {
  return
    <View
      key={i}
      style={[styles.separate, {left: (i - 1) * width - 2.5}]}
    />
}

export default class RNanimations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedScroll: new Animated.Value(0)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled
          horizontal
          scrollEventThrottle={16}
          onScroll={
            Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.state.animatedScroll
                  }
                }
              }
            ])
          }
        >
          {Images.map((image, i) => {
            return (
              <Moment
                key={i}
                {...image}
                translateX={getInterpolate(this.state.animatedScroll, i, Images.length)}
              />
            )
          })}
          {Array.apply( null, { length: Images.length + 1}).map((_, i) => getSeparator(i))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  separate: {
    backgroundColor: "#000",
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 5
  }
});

AppRegistry.registerComponent('RNanimations', () => RNanimations);
