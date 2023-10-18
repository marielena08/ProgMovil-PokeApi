import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppNavigator from './src/AppNavigator' ;
import Home from './src/Home';
import Lista from './src/Lista';
import InfoPokemon from './src/InfoPokemon';



export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
      {/* <Home /> */}
      {/* <Lista /> */}
      {/* <InfoPokemon /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
