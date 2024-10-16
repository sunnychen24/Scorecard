import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { Link, router } from "expo-router";
import { ThemedText } from '@/components/ThemedText';
import { getCurrentUser, signIn } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';


const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const {user, setUser, setIsLoggedIn} = useGlobalContext();

  const onClick = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    else {
      try {
        await signIn(form.email, form.password);
        const result = await getCurrentUser();
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