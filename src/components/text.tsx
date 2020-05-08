import React from 'react';
import { StyleSheet, Text  } from 'react-native';

export const CmlText = props => <Text style={[props.style, styles.text]}>{props.children}</Text>

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins',
  }
});