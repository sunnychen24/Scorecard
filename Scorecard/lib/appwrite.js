import SignIn from '@/app/(auth)/signin';
import {Account, Client, Databases, ID } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.sunny.scorecard',
    projectID: '66fda14b00114a1f380b',
    databaseID: '66fda8020038d50aee7b',
    userCollectionID: '66fda94e0000ed474930',
    postCollectionID: '66fda980003bd683dc29',
    storageId: '66fdab32002450118a1a'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectID)
    .setPlatform(config.platform)

const account = new Account(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(),email,password, username)

        if(!newAccount) throw Error;

        const avatarURL = 'https://media.istockphoto.com/id/1004838584/vector/golf-hole-icon-on-the-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=LVjEiMhTcQ4vR5tfUj6IW2K1qEOwajt_q4DDVc60Y7Q=';
        
        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseID, 
            config.userCollectionID, 
            ID.unique(),
            {accountID: newAccount.$id, email, username, avatarURL}
        );
        return newUser
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}