import { View, Text, Image, TouchableOpacity, } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";


const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const dateToEnglish = (date: string) => {
    const values = date.substring(0, 10).split("-")
    var out = month[parseInt(values[1])-1]
    out = out + " " + values[2] + ", " + values[0]
    return out
}

export function Post ({prop}: {prop: object}) {
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
        <Image className="w-[80px] h-[80px] border border-black border-[2px] rounded-full" resizeMode="contain" source={{uri: prop.avatar}}></Image>
        <View className='flex flex-col justify-center ml-3'>
          <TouchableOpacity onPress={() => {router.push({pathname: '/(follows)/viewprofile' , params: {userid: prop.creator}})}}>
            <Text className='text-3xl'>{prop.username}</Text>
          </TouchableOpacity>
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