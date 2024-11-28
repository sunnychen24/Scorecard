import { Image, StyleSheet, Platform, TouchableOpacity, FlatList, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Account } from 'react-native-appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import {router} from 'expo-router';
import { getUsersPosts, signOut } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';

export default function ProfileScreen() {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUsersPosts(user.accountid));
  console.log(posts)
  const onClick = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/(auth)/signin')
  }
  
  type ItemProps = {title: string, scores: string, caption: string};

  const Item = ({title, scores, caption}: ItemProps) => (
    <View style={styles.item}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.scores}>{scores}</ThemedText>
      <ThemedText style={styles.caption}>{caption}</ThemedText>
    </View>
  );

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
        <ThemedText type="title">Hello, {user?.username}</ThemedText>
        <Image source={{uri: user?.avatar}} />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <TouchableOpacity onPress={() => {router.push('/(follows)/followers')}}>
          <ThemedText type="subtitle">Followers</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {router.push('/(follows)/following')}}>
          <ThemedText type="subtitle">Following</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <TouchableOpacity style={styles.button} onPress={() => {onClick();}}>
        <ThemedText style={styles.buttonText} type="title">Sign Out</ThemedText>
      </TouchableOpacity>
      <FlatList
        data={posts}
        renderItem={({item}) => <Item title={item.course} scores={item.scores} caption={item.caption}/>}
        keyExtractor={item => item.id}>
      </FlatList>
    </ParallaxScrollView>
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