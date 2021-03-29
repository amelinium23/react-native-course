import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ColorBox = props => {
  const boxColor = {
    backgroundColor: props.hexCode,
  };
  const textStyle = {
    color:
      parseInt(props.hexCode.replace('#', ''), 16) > 0xffffff / 1.1
        ? 'black'
        : 'white',
  };

  return (
    <View style={[styles.box, boxColor]}>
      <Text style={[styles.text, textStyle]}>
        {props.colorName}: {props.hexCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  box: {
    padding: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
export default ColorBox;
