import { Image, StyleSheet, Platform, TouchableOpacity, FlatList, View, SafeAreaView, Text, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Account } from 'react-native-appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import {router} from 'expo-router';
import { follow, getFollowerCount, getFollowingCount, getIdByUsername, getPostCount, getUsernameById, getUsersPosts, signOut } from '@/lib/appwrite';
import { useLocalSearchParams } from "expo-router";
import useAppwrite from '@/lib/useAppwrite';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '@/components/Post';

export default function ViewProfile() {
const userid = useLocalSearchParams();
const { data: posts, refetch } = useAppwrite(() => getUsersPosts(userid.userid));
const {data: postcount} = useAppwrite(() => getPostCount(userid.userid));
const {data: followercount} = useAppwrite(() => getFollowerCount(userid.userid));
const {data: followingcount} = useAppwrite(() => getFollowingCount(userid.userid));
const {data: username} = useAppwrite(() => getUsernameById(userid.userid));

//console.log(userid)

type ItemProps = {title: string, scores: string, caption: string};

const Item = ({title, scores, caption}: ItemProps) => (
  <View style={styles.item}>
    <ThemedText style={styles.title}>{title}</ThemedText>
    <ThemedText style={styles.scores}>{scores}</ThemedText>
    <ThemedText style={styles.caption}>{caption}</ThemedText>
  </View>
);

  const onClick = async () => {
    await follow(username);
  }

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className='flex flex-row justify-center pt-3 pb-4 border-b-[5px] border-stone-400'>
        <TouchableOpacity>
          <Ionicons size={28} name='search'></Ionicons>
        </TouchableOpacity>
        <Text className='text-3xl px-[108]'>Account</Text>
        <TouchableOpacity>
          <Ionicons size={28} name='settings-outline'></Ionicons>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Image className="w-full h-[300px] -top-24" resizeMode="contain" source={require('@/assets/images/background.jpg')}/>
        <View className='bg-white -top-48'>
          <View className='flex flex-row'>
            <Image className='w-[115px] h-[115px] border border-black border-[5px] rounded-full ml-6 -top-6' resizeMode="contain" source={require('@/assets/images/background.jpg')} />
            <View className='flex flex-col'>
              <View className='flex flex-row m-3 w-64 h-12'>
                <TouchableOpacity className='flex flex-col w-1/3'>
                  <Text className='text-3xl self-center'>{postcount}</Text>
                  <Text className='text-sm self-center'>Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex flex-col w-1/3'>
                  <Text className='text-3xl self-center'>{followercount}</Text>
                  <Text className='text-sm self-center'>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex flex-col w-1/3'>
                  <Text className='text-3xl self-center'>{followingcount}</Text>
                  <Text className='text-sm self-center'>Following</Text>
                </TouchableOpacity>
              </View>
              <View className='flex flex-row self-center w-60'>
                <TouchableOpacity className='bg-slate-200 w-1/2 rounded-lg mr-2' onPress={() => {router.push('/(profile)/editprofile')}}>
                    <Text className='self-center py-2 font-medium'>Edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className='bg-slate-200 w-1/2 rounded-lg'>
                    <Text className='self-center py-2 font-medium'>Share profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text className='text-4xl ml-8 mb-6'>{username}</Text>
          <View className='border-b-[5px] border-stone-200'></View>
          <FlatList
            data={posts}
            renderItem={({item}) => <Post prop={item}/>}
            keyExtractor={item => item.postid}
            scrollEnabled={false}>
          </FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 38,
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
  title: {
    fontSize: 32,
  },
  scores: {
    fontSize: 22,
  },
  caption: {
    fontSize: 22,
  },
  item: {
    backgroundColor: '#19f29f',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  avatar: {
    width: 100,
    height: 100,
  },
});