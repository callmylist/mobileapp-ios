import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { CmlText } from './text'

const styles = StyleSheet.create({
    container: {
      height: 32,
      width: 140,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16
    },
    buttonText: {        
        color: 'white',
        fontSize: 14,
        fontWeight: '600'
    }
});

export const CmlButton = props => 
<TouchableOpacity onPress={() => props.onPress && props.onPress()}>
    <View style={[styles.container, {backgroundColor: props.backgroundColor}, props.style]}>
        <CmlText style={styles.buttonText}>
            {props.title}
        </CmlText>
    </View>
</TouchableOpacity>

