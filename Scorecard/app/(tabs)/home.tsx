import { Image, StyleSheet, Platform, TouchableOpacity, View, FlatList, RefreshControl, SafeAreaView, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import useAppwrite from '@/lib/useAppwrite';
import { getHomePosts } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getHomePosts(user.accountid));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  type ItemProps = {title: string, scores: string, caption: string, date: string};

  const Item = ({title, scores, caption, date}: ItemProps) => (
    <View style={styles.item}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.scores}>{scores}</ThemedText>
      <ThemedText style={styles.caption}>{caption}</ThemedText>
      <ThemedText style={styles.caption}>{date}</ThemedText>
    </View>
  )

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className='flex flex-row justify-center pt-3 pb-4 border-b-[5px] border-stone-400'>
        <TouchableOpacity className='pr-[94]'>
          <Ionicons size={28} name='search'></Ionicons>
        </TouchableOpacity>
        <Text className='text-3xl pl-7'>Home</Text>
        <TouchableOpacity className='pl-[82]'>
          <Ionicons size={28} name='notifications-outline'></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity className='pl-3'>
          <Ionicons size={28} name='chatbubble-outline'></Ionicons>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {router.push('/(posts)/newpost')}}>
        <ThemedText style={styles.buttonText} type="title">New Post</ThemedText>
      </TouchableOpacity>
      <FlatList
        data={posts}
        renderItem={({item}) => <Item title={item.course} scores={item.scores} caption={item.caption} date={item.$updatedAt}/>}
        keyExtractor={item => item.postid}>
      </FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
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
  item: {
    backgroundColor: '#19f29f',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  scores: {
    fontSize: 22,
  },
  caption: {
    fontSize: 22,
  },
});