import SignIn from '@/app/(auth)/signin';
import {Account, Client, Databases, ID, Avatars, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.sunny.scorecard',
    projectID: '66fda14b00114a1f380b',
    databaseID: '66fda8020038d50aee7b',
    userCollectionID: '66fda94e0000ed474930',
    postCollectionID: '66fda980003bd683dc29',
    followsCollectionID: '670f428b00192a2e66a1',
    storageId: '6770e364002ac664ecbd'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectID)
    .setPlatform(config.platform)

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(),email,password, username)

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getImage('https://media.istockphoto.com/id/1004838584/vector/golf-hole-icon-on-the-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=LVjEiMhTcQ4vR5tfUj6IW2K1qEOwajt_q4DDVc60Y7Q=');

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseID, 
            config.userCollectionID, 
            ID.unique(),
            {accountid: newAccount.$id, email: email, username: username, avatar: avatarUrl}
        );
        return newUser
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async(email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(config.databaseID, config.userCollectionID, 
            [Query.equal('accountid', currentAccount.$id)])
        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

//gets all users other than current user
export const getAllUsers = async (currentUser) => {
    try {
        const users = await databases.listDocuments(config.databaseID, config.userCollectionID, 
            [Query.notEqual('accountid', currentUser)]);
        console.log(users.documents)
        return users.documents;
        
    } catch (error) {
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (error) {
        throw new Error(error)
    }
}

export const getIdByUsername = async (username) => {
    try {
        //console.log(username)
        const user = await databases.listDocuments(config.databaseID, config.userCollectionID, 
            [Query.equal('username', username)])
        if (!user) throw Error;
        //console.log(user.documents[0])
        return user.documents[0].accountid;
    } catch (error) {
        throw new Error(error)
    }
}

export const getUsernameById = async (userid) => {
    try {
        //console.log(userid)
        const user = await databases.listDocuments(config.databaseID, config.userCollectionID, 
            [Query.equal('accountid', userid)])
        if (!user) throw Error;
        //console.log(user.documents[0])
        return user.documents[0].username;
    } catch (error) {
        throw new Error(error)
    }
}

export const follow = async (user) => {
try {
    const userid = await getIdByUsername(user);
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const fol = await databases.createDocument(config.databaseID, config.followsCollectionID, ID.unique(), 
        {follower: currentUser.accountid, following: userid});
    return fol
} catch (error) {
    throw new Error(error)
}
}

export const usernameExists = async (user) => {
    try {
        const userCheck = await databases.listDocuments(config.databaseID, config.userCollectionID, 
            [Query.equal('username', user)])
        //console.log(userCheck);
        if (userCheck.total == 0) return false;
        return true;

    } catch (error) {
        throw new Error(error)
    }
}

export const getFollowers = async (userid) => {
    try {
        const followers = await databases.listDocuments(config.databaseID, config.followsCollectionID, 
            [Query.equal('following', userid)]);
        
        
        const users = [];
        for (var i=0; i<followers.documents.length; i++){
            const user = await databases.listDocuments(config.databaseID, config.userCollectionID, 
                [Query.equal('accountid', followers.documents[i].follower)])
            users.push(user.documents[0])
        }
        console.log(users);
        return users;
    } catch (error) {
        throw new Error(error)
    }
}

export const getFollowerCount = async (userid) => {
    try {
        const followers = await databases.listDocuments(config.databaseID, config.followsCollectionID, 
            [Query.equal('following', userid)]);

        return followers.total
    } catch (error) {
        throw new Error(error)
    }
}

export const getFollowings = async (userid) => {
    try {
        //console.log(user);
        const followings = await databases.listDocuments(config.databaseID, config.followsCollectionID, 
            [Query.equal('follower', userid)]);

        //console.log(followings.documents);
        const users = [];
        for (var i=0; i<followings.documents.length; i++){
            const user = await databases.listDocuments(config.databaseID, config.userCollectionID, 
                [Query.equal('accountid', followings.documents[i].following)])
            users.push(user.documents[0])
        }
        console.log(users);
        return users;
    } catch (error) {
        throw new Error(error)
    }
}

export const getFollowingCount = async (userid) => {
    try {
        const following = await databases.listDocuments(config.databaseID, config.followsCollectionID, 
            [Query.equal('follower', userid)]);

        return following.total
    } catch (error) {
        throw new Error(error)
    }
}

export const addPost = async (coursename, caption, scores, user) => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw Error;

        const newPost = await databases.createDocument(
            config.databaseID, 
            config.postCollectionID, 
            ID.unique(),
            {course: coursename, caption: caption, scores: scores, creator: user}
        );
        return newPost;
    } catch (error) {
        throw new Error(error)
    }
}

export const getUsersPosts = async (userid) => {
    try {
        //console.log(userid)
        const posts = await databases.listDocuments(
          config.databaseID,
          config.postCollectionID,
          [Query.equal("creator", userid)]
        );
        //console.log(posts.total)
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}
    
export const getPostCount = async (userid) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseID,
            config.postCollectionID,
            [Query.equal("creator", userid)]
          );

        return posts.total
    } catch (error) {
        throw new Error(error);
    }
}

export const getHomePosts = async (userid) => {
    try {
        const followings = await databases.listDocuments(config.databaseID, config.followsCollectionID, 
            [Query.equal('follower', userid)]);

        const posts = await getUsersPosts(userid);

        //add all followings posts
        for (var i=0; i<followings.documents.length; i++){
            const userposts = await getUsersPosts(followings.documents[i].following)
            for (var a=0; a<userposts.length; a++){
                posts.push(userposts[a])
            }
        }
        posts.sort(function(a, b){
            let x = a.$updatedAt;
            let y = b.$updatedAt;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;});
        posts.reverse();
        //console.log(posts)
        return posts;
    } catch (error) {
        throw new Error(error);
    }
}

export const getAvatar = async (username) => {
    try {
        const user = await databases.listDocuments(config.databaseID, config.userCollectionID, 
            [Query.equal('username', username)])
        if (!user) throw Error;
        //console.log(user.documents[0])
        return user.documents[0].avatar;
    } catch (error) {
        throw new Error(error);
    }
}

// Upload File
export async function uploadFile(file, type) {
    if (!file) return;
  
    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
    // const asset1 = {uri: asset.uri, name: asset.fileName, type: asset.type};
    // const formData = new FormData();
    // formData.append('file', file);

    try {
        //console.log(asset1)
      const uploadedFile = await storage.createFile(
        config.storageId,
        ID.unique(),
        formData
      );
  
      //const fileUrl = await getFilePreview(uploadedFile.$id, type);
      //return fileUrl;
      return uploadedFile;
    } catch (error) {
        throw new Error(error);
    }
  }
  
  // Get File Preview
  export async function getFilePreview(fileId, type) {
    let fileUrl;
  
    try {
      if (type === "video") {
        fileUrl = storage.getFileView(config.storageId, fileId);
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(
            config.storageId,
          fileId,
          2000,
          2000,
          "top",
          100
        );
      } else {
        throw new Error("Invalid file type");
      }
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Create Video Post
  export async function createVideoPost(form) {
    try {
      const [thumbnailUrl] = await Promise.all([
        uploadFile(form.thumbnail, "image"),
      ]);
  
    //   const newPost = await databases.createDocument(
    //     config.databaseId,
    //     config.videoCollectionId,
    //     ID.unique(),
    //     {
    //       title: form.title,
    //       thumbnail: thumbnailUrl,
    //       video: videoUrl,
    //       prompt: form.prompt,
    //       creator: form.userId,
    //     }
    //   );
  
    //  return newPost;
    } catch (error) {
      throw new Error(error);
    }
  }