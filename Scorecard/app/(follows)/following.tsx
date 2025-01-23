import { Image, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGlobalContext } from '@/context/GlobalProvider';
import useAppwrite from '@/lib/useAppwrite';
import { router, useLocalSearchParams } from 'expo-router';
import { getFollowings } from '@/lib/appwrite';
import { Models } from 'react-native-appwrite';

export default function HomeScreen() {
  const userid = useLocalSearchParams();
  const { data: users, refetch } = useAppwrite(() => getFollowings(userid.userid));
  console.log(users)
  
  type ItemProps = {
    user: Models.Document;
  };
  
  const Item = ({user}: ItemProps) => (
  <TouchableOpacity style={styles.item} onPress={() => {router.push({pathname: '/(follows)/viewprofile' , params: user})}}>
    <Image
      style={styles.tinyLogo}
      source={{
        uri: user.avatar,
      }}
    />
    <ThemedText type="subtitle"> {user.username} </ThemedText>
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
        <ThemedText type="title">Following</ThemedText>
      </ThemedView>
      <FlatList
        data={users}
        renderItem={({item}) => <Item user={item} />}
        keyExtractor={item => item.accountid}>
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