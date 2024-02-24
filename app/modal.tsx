import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ModalScreen() {

  const [userId, setUserId] = useState('')
  const [userToken, setUserToken] = useState('')

  useEffect(() => {
    const idToken = async () => {
      const id = await AsyncStorage.getItem('id')
      setUserId(id || "Unauthorized")
      const token = await AsyncStorage.getItem('token')
      setUserToken(token || "No Token")
    }
    idToken()
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={{ marginVertical: 20 }}>
        <Text>User ID</Text>
        <Text>{userId}</Text>
      </View>

      <View>
        <Text>Token</Text>
        <Text>{userToken}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});