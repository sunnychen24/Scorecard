import { Image, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Redirect, router, Stack } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function HomeScreen() {
  <Stack.Screen options={{ headerShown: false }} />
  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href='/home' />

  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <View className='h-2/3 justify-center mt-28'><Text className='flex self-center text-white text-8xl font-semibold tracking-tighter'>birdie.</Text></View>
      <TouchableOpacity className="bg-white mx-16 mb-5 rounded-xl"onPress={() => router.push("/signup")}>
        <Text className='flex self-center text-3xl font-[350] text-primary py-3'>Join for free</Text>
      </TouchableOpacity>
      <TouchableOpacity className='mx-16 border border-white rounded-xl'onPress={() => router.push("/signin")}>
        <Text className='flex self-center text-3xl font-[330] text-white py-3'>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>

    
  );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
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
