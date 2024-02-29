import { ActivityIndicator, FlatList, Image, Pressable } from 'react-native'
import { Text, View } from '@/components/Themed'
import React, { useContext, useState, useEffect } from 'react'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { profileData } from '@/lib/profileData'
import { FontAwesome } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import RenderProfileData from '@/components/RenderProfileData'
import idToken from '@/components/getIdToken'
import { MyContext } from '@/providers/storageProvider'
import axios from 'axios'


function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number
}) {
  return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}


const Profile = () => {
  const colorScheme = useColorScheme()

  const { storeToken, storeId } = useContext(MyContext);
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [updatedUsername, setUpdatedUsername] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // console.log("storeToken", storeToken);
  // console.log("storeId", storeId);
  //console.log(Dimensions.get('window').width);

  const token = storeToken == 'No Token' ? idToken().storeToken : storeToken

  loading && <ActivityIndicator />

  useEffect(() => {
    // @refresh reset
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
          setIsAdmin(res.data.isAdmin)
          setEmail(res.data.email)
          setUsername(res.data.username)
          setUpdatedUsername(res.data.username)
          setLoading(false)
        })
        .catch((error: any) => {
          console.log(error)
          setLoading(false)
        })
    }
    user()

  }, [token])

  const router = useRouter()

  return (
    <View style={{ minHeight: "100%" }}>

      <View style={{ display: "flex", flexDirection: "row", paddingVertical: 20, paddingHorizontal: 20, justifyContent: "space-between" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image source={require('../../assets/images/user.jpg')} style={{ width: 70, height: 70, borderRadius: 50 }} />
          <View style={{ marginVertical: "auto", marginLeft: 20, gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>{email}</Text>
            <Text style={{ fontSize: 16, color: "gray", fontWeight: "700" }}>@{username}</Text>
          </View>
        </View>
        <View style={{ marginVertical: "auto" }} >
          <Link href={{ pathname:'/(components)/editProfile', params: {iA: isAdmin.toString(), uN: username, eM: email, uU: updatedUsername}}} >
            <Icon name='edit' color={Colors[colorScheme ?? 'light'].icon} size={36} />
          </Link>
        </View>
      </View>

      <hr style={{ width: '90%' }} />

      <FlatList
        data={profileData}
        renderItem={({ item }) => <RenderProfileData data={item} />}
        contentContainerStyle={{ gap: 40, marginTop: 30, paddingHorizontal: 20 }}
      />


    </View>
  )
}

export default Profile
