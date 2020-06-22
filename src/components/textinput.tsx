import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

export const CmlTextInput = (props) => (
    <TextInput {...props} style={[props.style, styles.text]} />
);

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins',
    },
});
