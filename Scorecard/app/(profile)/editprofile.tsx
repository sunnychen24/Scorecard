import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useGlobalContext } from '@/context/GlobalProvider'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, Image, View, Alert } from 'react-native'
import { router } from 'expo-router'
import * as DocumentPicker from "expo-document-picker";


export default function editprofile() {
    const {user, setUser, setIsLoggedIn} = useGlobalContext();
    const [form, setForm] = useState({
      title: "",
      video: null,
      thumbnail: null,
      prompt: "",
    });

    console.log(user?.avatar)
    console.log(form.thumbnail)

    const openPicker = async (selectType: string) => {
      const result = await DocumentPicker.getDocumentAsync({
        type:
          selectType === "image"
            ? ["image/png", "image/jpg"]
            : ["video/mp4", "video/gif"],
      });
  
      if (!result.canceled) {
        if (selectType === "image") {
          setForm({
            ...form,
            thumbnail: result.assets[0],
          });
        }
      } else {
        setTimeout(() => {
          Alert.alert("Document picked", JSON.stringify(result, null, 2));
        }, 100);
      }
    };
    
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        { form.thumbnail!==null ? <Image style={styles.avatar} source={{uri: form.thumbnail.uri}} /> : <Image style={styles.avatar} source={{uri: user?.avatar}} /> }
        
        <ThemedText type="title">{user?.username}</ThemedText>
        </ThemedView>

        <TouchableOpacity onPress={() => openPicker("image")}>
              <View>
                <ThemedText>
                  Choose a file
                </ThemedText>
              </View>
          </TouchableOpacity>

        <ThemedView style={styles.titleContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {router.push('/(tabs)/profile')}}>
            <ThemedText style={styles.buttonText} type="title">Back</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {router.push('/(tabs)/profile')}}>
            <ThemedText style={styles.buttonText} type="title">Save</ThemedText>
        </TouchableOpacity>
        </ThemedView>
        
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 38,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  avatar: {
    width: 100,
    height: 100,
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
  },
});