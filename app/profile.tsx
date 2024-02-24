import Button from '@/components/Button';
import { Text, View } from '@/components/Themed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react'

const Profile = () => {
  const router = useRouter()
  return (
    <View style={{ minHeight: "100%" }}>
      <Text>Profile</Text>
      <Button text='Logout' onPress={async () => { await AsyncStorage.clear(); router.push('/(auth)/sign-in') }} />
    </View>
  )
}

export default Profile

