import { ThemedText } from '@/components/ThemedText';
import React, { useState } from 'react'
import { TouchableOpacity, TextInput, Alert, View, Text } from 'react-native';
import { router } from 'expo-router';
import { addPost } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verifyInstallation } from 'nativewind';

export default function newpost() {
  verifyInstallation();
  const { user } = useGlobalContext();
  
  const [form, setForm] = useState({
    coursename: "",
    caption: "",
  });
  const [holes, setHoles] = useState({
    hole1: "",
    hole2: "",
    hole3: "",
    hole4: "",
    hole5: "",
    hole6: "",
    hole7: "",
    hole8: "",
    hole9: "",
    hole10: "",
    hole11: "",
    hole12: "",
    hole13: "",
    hole14: "",
    hole15: "",
    hole16: "",
    hole17: "",
    hole18: "",
  });

  const onClick = async () => {
    if (form.coursename === "") {
      Alert.alert("Error", "Please enter course name");
    }
    else {
      try {
        var scores = ""
        Object.entries(holes).map(([key, value]) => (
          scores = scores + value
        ))
        await addPost(form.coursename, form.caption, scores, user.accountid)
        router.replace("/home");

      } catch (error) {
        if (error instanceof Error) Alert.alert("Error", error.message);
      }
    }
  }
  
  return (
    <SafeAreaView>
    <Text className='text-3xl'>Course:</Text>
    <TextInput
        //style={styles.largeinput}
        keyboardType="default"
        value = {form.coursename}
        onChangeText={(value) => setForm({ ...form, coursename: value })}
      />
    <SafeAreaView className=''>
      {Object.entries(holes).map(([key, val]) => <TextInput className="text-xl border"
        //style={styles.input}
        keyboardType="numeric"
        value = {val}
        placeholder = {key}
        onChangeText={(value) => setHoles({ ...holes, [key]: value })}
        maxLength={1}
    /> )}
    </SafeAreaView>
    
    <Text className="text-3xl">Caption:</Text>
    <TextInput className='border'
        //style={styles.largeinput}
        keyboardType="default"
        value = {form.caption}
        onChangeText={(value) => setForm({ ...form, caption: value })}
      />
    <TouchableOpacity onPress={() => {onClick();}}>
    <ThemedText type="title">Create Post</ThemedText>
    </TouchableOpacity>
    </SafeAreaView>
  )
}

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 5,
//     borderWidth: 1,
//     padding: 10,
//     width: '10%'
//   },
//   largeinput: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     width: '80%'
//   },
//   button:{
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: 'green',
//     margin: 12,
//     color: 'white'
//   },
//   buttonText:{
//     color: 'white'
//   }
// });