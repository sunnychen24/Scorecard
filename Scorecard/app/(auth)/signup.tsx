import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import { Link, router } from "expo-router";
import { ThemedText } from '@/components/ThemedText';
import {createUser} from '../../lib/appwrite';
import { useState } from "react";


const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onClick = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    else {
      try {
        createUser(form.email, form.password, form.username);
        router.replace("/home");

      } catch (error) {
        if (error instanceof Error) Alert.alert("Error", error.message);
      }
    }
  }
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Username"
        keyboardType="numeric"
        value = {form.username}
        onChangeText={(value) => setForm({ ...form, username: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="numeric"
        value = {form.email}
        onChangeText={(value) => setForm({ ...form, email: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        keyboardType="numeric"
        value = {form.password}
        onChangeText={(value) => setForm({ ...form, password: value })}
      />
      <TouchableOpacity style={styles.button} onPress={() => {onClick();}}>
        <ThemedText style={styles.buttonText} type="title">Sign Up</ThemedText>
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

export default SignUp