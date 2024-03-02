import { Text, View } from '@/components/Themed'
import { MyContext } from '@/providers/storageProvider';
import React, { useContext, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useEffect } from 'react';
import axios from 'axios';
import idToken from '@/components/getIdToken';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import { useColorScheme } from '@/components/useColorScheme.web';
import { useLocalSearchParams, useRouter } from 'expo-router';


const EditProfile = () => {
  const { storeToken, storeId } = useContext(MyContext);
  const [isAdmin, setIsAdmin] = useState<string>('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [updatedName, setUpdatedName] = useState('')
  const [updatedPassword, setUpdatedPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [updatedLoading, setUpdatedLoading] = useState(false)

  type editProfileProps = {
    iA: string,
    un: string,
    eM: string,
    nm: string,
    uN: string
  }

  const { iA, un, eM, nm, uN }: editProfileProps = useLocalSearchParams()

  useEffect(() => {
    setIsAdmin(iA)
    setUsername(un)
    setEmail(eM)
    setName(nm)
    setUpdatedName(uN)
  }, [])

  // console.log("storeToken", storeToken);
  // console.log("storeId", storeId);
  //console.log(Dimensions.get('window').width);

  const colorScheme = useColorScheme();

  const token = storeToken == 'No Token' ? idToken().storeToken : storeToken

  loading && <ActivityIndicator />

  // useEffect(() => {
  //   // @refresh reset
  //   setLoading(true)
  //   const user = async () => {
  //     await axios.get('http://10.0.0.58:8000/api/user/', {
  //       headers: {
  //         Authorization: token
  //           ? "Bearer " + token
  //           : null,
  //         "Content-Type": "application/json",
  //         accept: "application/json",
  //       },
  //     })
  //       .then(res => {
  //         // console.log(res.data);
  //         setIsAdmin(res.data.isAdmin)
  //         setEmail(res.data.email)
  //         setUsername(res.data.username)
  //         setUpdatedUsername(res.data.username)
  //         setLoading(false)
  //       })
  //       .catch((error: any) => {
  //         console.log(error)
  //         setLoading(false)
  //       })
  //   }
  //   user()

  // }, [token])

  const router = useRouter()


  const updateInfo = async () => {
    setLoading(true)

    type user = {
      name: string
      password: string
    }

    const updatedUser: user = { name, password: updatedPassword }

    if (updatedName == '') {
      Alert.alert("Name cannot be empty")
      setLoading(false)
      return
    }

    if (updatedName !== name) {
      updatedUser['name'] = updatedName
    }

    if (updatedPassword !== null && updatedPassword !== '') {
      if (updatedPassword.length < 6) {
        Alert.alert("Password must be more than 6 characters")
        setLoading(false)
        return
      }
      updatedUser["password"] = updatedPassword
    }

    const size = Object.keys(updatedUser).length
    // console.log(updatedUser);

    size > 0 && await axios.put('http://10.0.0.58:8000/api/user/', updatedUser, {
      headers: {
        Authorization: token
          ? "Bearer " + token
          : null,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then(res => {
        setName('')
        setUpdatedPassword('')
        // console.log(res.data)
        Alert.alert("User Updated")
        // setUsername(res.data.username)
        setLoading(false)
        router.push('/(main)/profile')

      })
      .catch((error: any) => {
        console.log(error)
        setLoading(false)
      })
  }


  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={{ display: "flex", alignItems: "center" }}>

          <Image source={require('../../../assets/images/user.jpg')} resizeMode='cover' style={styles.img} alt='cover'></Image>

          <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
            {
              isAdmin ?
                <>
                  <Text style={styles.isuser}>User</Text>
                  <Text style={styles.isadmin}>Admin</Text>
                </>
                :
                <>
                  <Text style={styles.isadmin}>User</Text>
                  <Text style={styles.isuser}>Admin</Text>
                </>

            }
          </View>

        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            style={[styles.input, { backgroundColor: "#ded4d4", color: "black", opacity: 0.8 }]}
            editable={false}
          />

          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            style={[styles.input, { backgroundColor: "#ded4d4", color: "black", opacity: 0.8 }]}
            editable={false}
          />

          <Text style={styles.label}>Name</Text>
          <TextInput
            value={updatedName}
            onChangeText={setUpdatedName}
            onChange={() => setUpdatedLoading(true)}
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={updatedPassword}
            onChangeText={setUpdatedPassword}
            onChange={() => setUpdatedLoading(true)}
            style={styles.input}
          />

          <Button
            onPress={updateInfo}
            disabled={!updatedLoading}
            text={loading ? 'Updating info...' : 'Update info'}
          />
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    minHeight: Dimensions.get('window').height
  },

  img: {
    width: (Dimensions.get('window').width) * 0.7,
    height: (Dimensions.get('window').width) * 0.7,
    borderRadius: (Dimensions.get('window').width) * 0.5,
    borderWidth: 2.5,
    borderColor: "cyan"
  },

  isuser: {
    backgroundColor: "blue",
    padding: 10,
    color: "white",
    fontSize: 16,
    textAlign: "center",
    verticalAlign: "middle",
    opacity: 0.5
  },

  isadmin: {
    backgroundColor: "red",
    padding: 10,
    color: "white",
    fontSize: 18,
    textAlign: "center",
    verticalAlign: "middle",
    fontWeight: "800"
  },

  label: {
    color: 'gray',
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },

  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 30,
    fontSize: 16
  },
});

export default EditProfile

