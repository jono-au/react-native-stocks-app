import React from 'react';
import {  View, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'


export default function Home() {
   const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Wall Street App</Text>
        <Text style={styles.txt}>
                The app allows you to keep a watchlist of your favorite company stocks and analyse market performance.
                </Text>
        <TouchableOpacity style={styles.button} title="Start Search" onPress={() => navigation.navigate('Search')}>
            <Text style={{color: 'white'}}>Start Search</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logout} title="Log out" onPress={() => navigation.navigate('Login')}>
            <Text style={styles.logouttxt}>Log out</Text>
          </TouchableOpacity>
      </View>
    );
  }
  

  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#303337',
      padding: 10 
    },

    welcome: {
      color: 'white', 
      fontSize: 22
    },

    txt: {
      color: 'white', 
      paddingTop: 20,
      paddingBottom:20, 
      textAlign: 'center'
    },

    button: {
      backgroundColor: 'green', 
      padding:10
    },

    logout: {
      padding:10
    },

    logouttxt: {
      color: 'white'
    },

  })