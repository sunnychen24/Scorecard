import { Client, Storage, ID, Account } from "react-native-appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66fda14b00114a1f380b');

const storage = new Storage(client);


export async function uploadFile1(asset) {
    console.log(asset)
    const promise = storage.createFile(
        '6770e364002ac664ecbd',
        ID.unique(),
        asset.file
    );

    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });
}
