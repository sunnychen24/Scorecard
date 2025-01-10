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
    <SafeAreaView className="bg-white h-full w-full">
      <Text className='flex mt-20 mb-4 mx-12 text-6xl font-[310] text-primary py-3'>Login to your account</Text>
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
      <View className='absolute inset-x-0 bottom-10'>
        <TouchableOpacity className='bg-primary mx-12 rounded-xl' onPress={() => {onClick();}}>
          <Text className='p-4 text-3xl flex self-center text-white'>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className='m-10 text-3xl flex self-center text-primary'>Back</Text>
        </TouchableOpacity>
      </View>
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

export default SignIn