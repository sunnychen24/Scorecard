import { Image, StyleSheet, Platform, TouchableOpacity, View, FlatList, RefreshControl } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import useAppwrite from '@/lib/useAppwrite';
import { getHomePosts } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useState } from 'react';

export default function HomeScreen() {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getHomePosts(user.accountid));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  type ItemProps = {title: string, scores: string, caption: string};

  const Item = ({title, scores, caption}: ItemProps) => (
    <View style={styles.item}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.scores}>{scores}</ThemedText>
      <ThemedText style={styles.caption}>{caption}</ThemedText>
    </View>
  )

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <TouchableOpacity style={styles.button} onPress={() => {router.push('/(posts)/newpost')}}>
        <ThemedText style={styles.buttonText} type="title">New Post</ThemedText>
      </TouchableOpacity>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Home</ThemedText>
      </ThemedView>
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