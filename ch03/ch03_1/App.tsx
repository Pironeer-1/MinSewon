import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

export default function App() {
  return (
    <SafeAreaView style={[styles.SafeAreaView, {backgroundColor: 'blue'}]}>
      <Text style={[styles.text, {color: 'white'}]}>
        Hello Stylesheet world!
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  SafeAreaView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 20}
})