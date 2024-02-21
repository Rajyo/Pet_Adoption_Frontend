import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, Stack } from 'expo-router';

export default async function AuthLayout() {
  const token = await AsyncStorage.getItem('token')

  if (token) {
    return <Redirect href={'/'} />;
  }

  return <Stack>
    <Stack.Screen name='sign-in' options={{title: "Sign-In"}} />
    <Stack.Screen name='sign-up' options={{title: "Sign-Up"}} />
  </Stack>;
}