import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TextInput, TouchableOpacity, Alert, FlatList, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { getAllUsers } from '@/lib/appwrite';
import useAppwrite from "@/lib/useAppwrite";
import ViewProfile from '../(follows)/viewprofile';
import { router } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Models } from 'react-native-appwrite';

export default function TabTwoScreen() {
  const {user} = useGlobalContext();
  const [form, setForm] = useState({
    search: "",
  });
  
  const { data: users, refetch } = useAppwrite(() => getAllUsers(user.accountid));

  const onClick = async () => {
    if (form.search === "") Alert.alert("Error", "Missing search input");
  }

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
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedText type="subtitle">Search for a user:</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Search user"
        keyboardType="default"
        value = {form.search}
        onChangeText={(value) => setForm({ ...form, search: value })}
      />
      <TouchableOpacity style={styles.button} onPress={() => {onClick();}}>
        <ThemedText style={styles.buttonText} type="title">Search</ThemedText>
      </TouchableOpacity>
      <FlatList
        data={users}
        renderItem={({item}) => <Item user={item} />}
        keyExtractor={item => item.accountid}>
      </FlatList>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
    padding: 10,
    margin: 12,
  },
  buttonText:{
    color: 'white'
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
