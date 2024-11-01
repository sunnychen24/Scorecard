import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import { Link, router } from "expo-router";
import { ThemedText } from '@/components/ThemedText';
import {usernameExists, createUser} from '../../lib/appwrite';
import { useState } from "react";
import { useGlobalContext } from '@/context/GlobalProvider';


const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const {user, setUser, setIsLoggedIn} = useGlobalContext();

  const onClick = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    else if (!form.username.match(/^[0-9a-z]+$/)) Alert.alert("Error", "Username must contain only numbers and letters");
    else if (form.password.length < 8) Alert.alert("Error", "Password must be at least 8 characters long");
    else if (await usernameExists(form.username)) Alert.alert("Error", "This username is already taken");
    else {
      try {
        const result = await createUser(form.email, form.password, form.username);
        setUser(result);
        setIsLoggedIn(true);
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
        keyboardType="default"
        value = {form.username}
        onChangeText={(value) => setForm({ ...form, username: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value = {form.email}
        onChangeText={(value) => setForm({ ...form, email: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        keyboardType="default"
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