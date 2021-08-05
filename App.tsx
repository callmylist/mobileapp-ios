/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AppNav from './src';
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://d080afac856a46c1b638dc70d377a0cf@o938677.ingest.sentry.io/5888483",
});
  

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <AppNav/>
    </>
  );
};

export default App;
