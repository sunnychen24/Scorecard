import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useGlobalContext } from '@/context/GlobalProvider'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, Image, View } from 'react-native'
import { router } from 'expo-router'
export default function editprofile() {
    const {user, setUser, setIsLoggedIn} = useGlobalContext();
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
        <Image style={styles.avatar} source={{uri: user?.avatar}} />
        <ThemedText type="title">{user?.username}</ThemedText>
        </ThemedView>

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