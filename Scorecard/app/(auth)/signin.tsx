import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { Link, router } from "expo-router";
import { ThemedText } from '@/components/ThemedText';


const SignIn = () => {
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={() => router.push("/explore")}>
      <ThemedText style={styles.buttonText} type="title">Sign In</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
    padding: 10,
    margin: 12,
  },
  buttonText:{
    color: 'white'
  }
});

export default SignIn