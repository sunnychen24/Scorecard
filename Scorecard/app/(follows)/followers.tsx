import { Image, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import useAppwrite from '@/lib/useAppwrite';
import { getAvatar, getFollowers } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function HomeScreen() {
  const {user} = useGlobalContext();
  const { data: users, refetch } = useAppwrite(() => getFollowers(user.accountid));
  console.log(users)

  type ItemProps = {
    title: string;
    image: string;
  };
  
  const Item = ({title, image}: ItemProps) => (
  <TouchableOpacity style={styles.item} onPress={() => {router.push({pathname: '/(follows)/viewprofile' , params: {username: title}})}}>
    <Image
      style={styles.tinyLogo}
      source={{
        uri: image,
      }}
    />
    <ThemedText type="subtitle"> {(title)} </ThemedText>
  </TouchableOpacity>
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
        <ThemedText type="title">Followers</ThemedText>
      </ThemedView>
      <FlatList
        data={users}
        renderItem={({item}) => <Item title={item.documents[0].username} image={item.documents[0].avatar} />}
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
  item: {
    backgroundColor: '#eff2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});