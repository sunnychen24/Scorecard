import React from 'react'
import { Stack } from 'expo-router'

const FollowsLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="viewprofile" options={{ headerShown: false }} />
        <Stack.Screen name="followers" options={{ headerShown: false }} />
        <Stack.Screen name="following" options={{ headerShown: false }} />
    </Stack>
  )
}

export default FollowsLayout