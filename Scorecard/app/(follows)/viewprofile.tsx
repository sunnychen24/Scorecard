import { Image, StyleSheet, Platform, TouchableOpacity, FlatList, View, SafeAreaView, Text, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Account } from 'react-native-appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import {router} from 'expo-router';
import { follow, getAvatar, getFollowerCount, getFollowingCount, getIdByUsername, getPostCount, getUsernameById, getUsersPosts, signOut, isFollowing, unfollow } from '@/lib/appwrite';
import { useLocalSearchParams } from "expo-router";
import useAppwrite from '@/lib/useAppwrite';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '@/components/Post';
import { useState } from 'react';

export default function ViewProfile() {
const userid = useLocalSearchParams();


const { data: posts, refetch } = useAppwrite(() => getUsersPosts(userid.userid));
const {data: postcount} = useAppwrite(() => getPostCount(userid.userid));
const {data: followercount} = useAppwrite(() => getFollowerCount(userid.userid));
const {data: followingcount} = useAppwrite(() => getFollowingCount(userid.userid));
const {data: username} = useAppwrite(() => getUsernameById(userid.userid));
const {data: avatar} = useAppwrite(() => getAvatar(userid.userid));
const {data: fol} = useAppwrite(() => isFollowing(userid.userid));

//states to keep track of live follow button and follower counts because rendering occurs before they are initialized
//button and number are initialized with data and once follow/unfollow button is clicked, state variables take over
const [follows, setFollows] = useState(null);
const [followCountState, setfollowCountState] = useState(null);
//console.log(followCountState,followercount)

let followbutton = <TouchableOpacity className='bg-white w-1/2 rounded-lg mr-2'></TouchableOpacity>
let followcountnumber = <Text className='text-3xl self-center'>{followercount}</Text>

//checks if state has been initialized yet, if not then use api data
if (follows===null) {
  if (fol===true) {
    followbutton = <TouchableOpacity className='bg-slate-200 w-1/2 rounded-lg mr-2' onPress={() => {unfollowClick()}}>
                      <Text className='self-center py-2 font-medium'>Following</Text>
                      </TouchableOpacity>
  }
  
  else if (fol===false) {
    followbutton = <TouchableOpacity className='bg-primary w-1/2 rounded-lg mr-2' onPress={() => {followClick()}}>
                      <Text className='self-center py-2 font-medium text-white'>Follow</Text>
                  </TouchableOpacity>
  }
} else {
  if (follows===true) {
    followbutton = <TouchableOpacity className='bg-slate-200 w-1/2 rounded-lg mr-2' onPress={() => {unfollowClick()}}>
                      <Text className='self-center py-2 font-medium'>Following</Text>
                      </TouchableOpacity>
    followcountnumber = <Text className='text-3xl self-center'>{followCountState}</Text>
  }
  else if (follows===false) {
    followbutton = <TouchableOpacity className='bg-primary w-1/2 rounded-lg mr-2' onPress={() => {followClick()}}>
                      <Text className='self-center py-2 font-medium text-white'>Follow</Text>
                  </TouchableOpacity>
    followcountnumber = <Text className='text-3xl self-center'>{followCountState}</Text>
  }
}

  const followClick = async () => {
    setFollows(true);
    setfollowCountState(followercount+1)
    await follow(username);
  }

  const unfollowClick = async () => {
    setFollows(false)

    //if state not initialized yet, update from api data, else update state data
    if (followCountState===null) {
      setfollowCountState(followercount-1)
    } else {
    setfollowCountState(followCountState-1)
    }
    await unfollow(username);
  }

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className='flex flex-row justify-center pt-3 pb-4 border-b-[5px] border-stone-400'>
        <TouchableOpacity onPress={() => {router.back()}}>
          <Ionicons size={28} name='chevron-back'></Ionicons>
        </TouchableOpacity>
        <Text className='text-3xl px-[108]'>{username}</Text>
        <TouchableOpacity>
          <Ionicons size={28} name='ellipsis-horizontal-circle-outline'></Ionicons>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Image className="w-full h-[300px] -top-24" resizeMode="contain" source={require('@/assets/images/background.jpg')}/>
        <View className='bg-white -top-48'>
          <View className='flex flex-row'>
            <Image className='w-[115px] h-[115px] border border-black border-[5px] rounded-full ml-6 -top-6' resizeMode="contain" source={{uri: avatar}} />
            <View className='flex flex-col'>
              <View className='flex flex-row m-3 w-64 h-12'>
                <TouchableOpacity className='flex flex-col w-1/3'>
                  <Text className='text-3xl self-center'>{postcount}</Text>
                  <Text className='text-sm self-center'>Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex flex-col w-1/3' onPress={() => {router.push({pathname: '/(follows)/followers' , params: {userid: userid.userid}})}}>
                  {followcountnumber}
                  <Text className='text-sm self-center'>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex flex-col w-1/3' onPress={() => {router.push({pathname: '/(follows)/following' , params: {userid: userid.userid}})}}>
                  <Text className='text-3xl self-center'>{followingcount}</Text>
                  <Text className='text-sm self-center'>Following</Text>
                </TouchableOpacity>
              </View>
              <View className='flex flex-row self-center w-60'>
                {followbutton}
                <TouchableOpacity className='bg-slate-200 w-1/2 rounded-lg'>
                    <Text className='self-center py-2 font-medium'>Message</Text>
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