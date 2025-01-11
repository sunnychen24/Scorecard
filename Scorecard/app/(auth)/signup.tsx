import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native'
import React from 'react'
import { Link, router } from "expo-router";
import { ThemedText } from '@/components/ThemedText';
import {usernameExists, createUser} from '../../lib/appwrite';
import { useState } from "react";
import { useGlobalContext } from '@/context/GlobalProvider';
import { StatusBar } from 'expo-status-bar';


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
    <SafeAreaView className="bg-white h-full w-full">
      <ScrollView className='h-full w-full'>
        <StatusBar backgroundColor="white"/>
        <Text className='flex mt-20 mb-4 mx-12 text-6xl font-[310] text-primary py-3'>Create an account</Text>
        <TextInput className='mx-12 my-2.5 p-4 border border-primary rounded-xl text-3xl text-primary'
          placeholder="Username"
          placeholderTextColor="#007900"
          keyboardType="default"
          value = {form.username}
          onChangeText={(value) => setForm({ ...form, username: value })}
        />
        <TextInput className='mx-12 my-2.5 p-4 border border-primary rounded-xl text-3xl text-primary'
          placeholder="Email"
          placeholderTextColor="#007900"
          keyboardType="email-address"
          value = {form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <TextInput className='mx-12 my-2.5 p-4 border border-primary rounded-xl text-3xl text-primary'
          placeholder="Password"
          placeholderTextColor="#007900"
          keyboardType="default"
          value = {form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <TextInput className='mx-12 my-2.5 p-4 border border-primary rounded-xl text-3xl text-primary'
          placeholder="Confirm Password"
          placeholderTextColor="#007900"
          keyboardType="default"
          value = {form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <Text className='mx-12 mt-32 mb-3'>By continuing, you are agreeing to our 
          <TouchableOpacity><Text className='underline'>Terms of Service</Text></TouchableOpacity>
          </Text>
        <TouchableOpacity className='bg-primary mx-12 rounded-xl' onPress={() => {onClick();}}>
          <Text className='p-4 text-3xl flex self-center text-white'>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className='m-7 text-3xl flex self-center text-primary'>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   button:{
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: 'green',
//     padding: 10,
//     margin: 12,
//   },
//   buttonText:{
//     color: 'white'
//   }
// });

export default SignUp