import { Text, View } from '@/components/Themed'
import { MyContext } from '@/providers/storageProvider';
import React, { useContext, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import axios from 'axios';
import idToken from '@/components/idToken';


const Profile = () => {
  const { storeToken, storeId } = useContext(MyContext);
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  // console.log("storeToken", storeToken);
  // console.log("storeId", storeId);

  const token = storeToken == 'No Token' ? idToken().storeToken : storeToken

  loading && <ActivityIndicator />

  useEffect(() => {
    setLoading(true)
    const user = async () => {
      await axios.get('http://10.0.0.58:8000/api/user/', {
        headers: {
          Authorization: token
            ? "Bearer " + token
            : null,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      })
        .then(res => {
          // console.log(res.data);
          setEmail(res.data.email)
          setUsername(res.data.username)
          setLoading(false)
        })
        .catch((error: any) => {
          console.log(error)
          setLoading(false)
        })
    }

    user()

  }, [token])

  return (
    <View style={{ minHeight: "100%" }}>
      <Text>Profile</Text>
      <Text>Email: {email}</Text>
      <Text>Username: {username}</Text>
    </View>
  )
}

export default Profile

