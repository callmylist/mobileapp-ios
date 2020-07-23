import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

export const CmlTextInput = (props: any) => (
    <TextInput {...props} style={[styles.text, props.style]} />
);

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins',
        color: 'black',
    },
});
