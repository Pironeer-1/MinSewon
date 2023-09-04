import React from 'react'
import { Platform, Dimensions, StyleSheet, SafeAreaView, Text } from 'react-native'
import { MD2Colors } from 'react-native-paper'

const {width, height} = Dimensions.get('window')

export default function App() {
  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <Text style={[styles.text]}>os: {Platform.OS}</Text>
      <Text style={[styles.text]}>width: {width} px</Text>
      <Text style={[styles.text]}>height: {height} px</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  SafeAreaView: {backgroundColor: MD2Colors.blue500},
  text: {fontSize: 20, color: MD2Colors.blue200}
})
