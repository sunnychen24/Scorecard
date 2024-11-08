import { ThemedText } from '@/components/ThemedText';
import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function newpost() {
  const [form, setForm] = useState({
    coursename: "",
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
  
  return (
    <div>
    <ThemedText type="subtitle">Course:</ThemedText>
      <TextInput
        style={styles.input}
        keyboardType="default"
        value = {form.coursename}
        onChangeText={(value) => setForm({ ...form, coursename: value })}
      />
    <div>
      {Object.entries(form).map(([key, val]) => <TextInput
        style={styles.input}
        keyboardType="numeric"
        value = {val}
        placeholder = {key}
        onChangeText={(value) => setForm({ ...form, hole1: value })}
    /> )}
    </div>
    <TouchableOpacity style={styles.button} onPress={() => {}}>
    <ThemedText style={styles.buttonText} type="title">Create Post</ThemedText>
    </TouchableOpacity>
    </div>
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
    margin: 12,
    color: 'white'
  },
  buttonText:{
    color: 'white'
  }
});