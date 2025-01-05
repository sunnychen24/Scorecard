import { Client, Storage, ID } from "react-native-appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66fda14b00114a1f380b');

const storage = new Storage(client);


export async function uploadFile1() {
    const promise = storage.createFile(
        '6770e364002ac664ecbd',
        ID.unique(),
        {
            name: "61109.png",
            type: "image",
            uri: "data:image/png;base64,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"
        }
    );

    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });
}