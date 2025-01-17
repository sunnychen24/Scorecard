import { Image, StyleSheet, Platform, TouchableOpacity, FlatList, View, SafeAreaView, Text, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Account } from 'react-native-appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import {router} from 'expo-router';
import { getFollowerCount, getFollowingCount, getPostCount, getUsersPosts, signOut } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import { withDecay } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const {data: posts, refetch } = useAppwrite(() => getUsersPosts(user.accountid));
  const {data: postcount} = useAppwrite(() => getPostCount(user.accountid));
  const {data: followercount} = useAppwrite(() => getFollowerCount(user.accountid));
  const {data: followingcount} = useAppwrite(() => getFollowingCount(user.accountid));
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const dateToEnglish = (date: string) => {
    const values = date.substring(0, 10).split("-")
    var out = month[parseInt(values[1])-1]
    out = out + " " + values[2] + ", " + values[0]
    return out
  }
  
  const onClick = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/')
  }
  
  type ItemProps = {prop: object};

  function Post ({prop}: ItemProps) {
    var scores = prop.scores.split("")
    var front9 = scores.slice(0,9)
    var back9 = scores.slice(9,18)
    var front9hole = [];
    var back9hole = [];
    for (let i=1;i<=9;i++){

      front9hole.push(
        <View className='w-9'>
          <Text className='text-3xl self-center'>{i}</Text>
        </View>);
      front9[i-1] = <View className='w-9'>
      <Text className='text-3xl text-primary self-center'>{front9[i-1]}</Text>
    </View>

      back9hole.push(
        <View className='w-9'>
          <Text className='text-3xl self-center'>{i+9}</Text>
        </View>)
      back9[i-1] = <View className='w-9'>
      <Text className='text-3xl text-primary self-center'>{back9[i-1]}</Text>
    </View>
    }

    return (
    <View className=''>
      <View className='flex flex-row mt-10 mb-6 mx-6'>
        <Image className="w-[80px] h-[80px] border border-black border-[2px] rounded-full" resizeMode="contain" source={{uri: user?.avatar}}></Image>
        <View className='flex flex-col justify-center ml-3'>
          <Text className='text-3xl'>{prop.username}</Text>
          <Text>{dateToEnglish(prop.$updatedAt)} • {prop.course}</Text>
        </View>
      </View>
      <Text className='text-3xl mx-6'>{prop.caption}</Text>

      <View className='flex flex-row mt-5 mx-6 shadow shadow-slate-300 bg-white rounded-lg p-2'>
        <View className='flex flex-col'>
          <Text className='text-3xl'>Hole</Text>
          <Text className='text-3xl text-primary'>Score</Text>
        </View>
        <View className='flex flex-col grow'>
          <View className='flex flex-row'>
            {front9hole}
          </View>
          <View className='flex flex-row'>
            {front9}
          </View>
        </View>
      </View>

      <View className='flex flex-row mt-4 mx-6 shadow shadow-slate-300 bg-white rounded-lg p-2'>
        <View className='flex flex-col'>
          <Text className='text-3xl'>Hole</Text>
          <Text className='text-3xl text-primary'>Score</Text>
        </View>
        <View className='flex flex-col grow'>
          <View className='flex flex-row'>
            {back9hole}
          </View>
          <View className='flex flex-row'>
            {back9}
          </View>
        </View>
      </View>
      <View className='flex flex-row justify-center p-7'>
        <TouchableOpacity>
          <Ionicons size={28} name='heart-outline'></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity className='mx-28'>
          <Ionicons size={28} name='chatbubble-ellipses-outline'></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons size={28} name='paper-plane-outline'></Ionicons>
        </TouchableOpacity>
      </View>
      <View className='border-b-[5px] border-stone-200'></View>
    </View>
  );
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
          <Image className='w-[115px] h-[115px] border border-black border-[5px] rounded-full ml-6 -top-6' resizeMode="contain" source={{uri: user?.avatar}} />
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
        <View className='ml-6 w-[115px] mb-6'>
          <Text className='text-4xl self-center'>{user?.username}</Text>
        </View>
        <View className='border-b-[5px] border-stone-200'></View>
        <FlatList
          data={posts}
          renderItem={({item}) => <Post prop={item}/>}
          keyExtractor={item => item.postid}
          scrollEnabled={false}>
        </FlatList>
        <TouchableOpacity onPress={() => {onClick();}}>
        <ThemedText type="title">Sign Out</ThemedText>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/background.jpg')}
    //       style={styles.reactLogo}
    //     />
    //   }>
    //   <ThemedView style={styles.titleContainer}>
    //     <Image style={styles.avatar} source={{uri: user?.avatar}} />
    //     <ThemedText type="title">{user?.username}</ThemedText>
    //     <TouchableOpacity style={styles.button} onPress={() => {router.push('/(profile)/editprofile')}}>
    //     <ThemedText style={styles.buttonText} type="title">Edit Profile</ThemedText>
    //   </TouchableOpacity>
    //   </ThemedView>
    //   <ThemedView style={styles.titleContainer}>
    //     <TouchableOpacity onPress={() => {router.push('/(follows)/followers')}}>
    //       <ThemedText type="subtitle">Followers</ThemedText>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={() => {router.push('/(follows)/following')}}>
    //       <ThemedText type="subtitle">Following</ThemedText>
    //     </TouchableOpacity>
    //   </ThemedView>
    //   <TouchableOpacity style={styles.button} onPress={() => {onClick();}}>
    //     <ThemedText style={styles.buttonText} type="title">Sign Out</ThemedText>
    //   </TouchableOpacity>
    //   <FlatList
    //     data={posts}
    //     renderItem={({item}) => <Item title={item.course} scores={item.scores} caption={item.caption}/>}
    //     keyExtractor={item => item.$id}>
    //   </FlatList>
    // </ParallaxScrollView>
  );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 38,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 300,
//     width: "100%",
//     bottom: -30,
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
//   },
//   item: {
//     backgroundColor: '#19f29f',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
//   scores: {
//     fontSize: 22,
//   },
//   caption: {
//     fontSize: 22,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//   },
// });