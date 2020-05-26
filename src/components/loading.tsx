import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export const CmlSpinner = (props: any) =>
    <Spinner
        {...props}
        color='#00b7d9'
    />

