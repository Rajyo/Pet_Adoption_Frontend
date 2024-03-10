import { TextInput, StyleSheet, Alert } from 'react-native';
import { View, Text } from "@/components/Themed"
import React, { useContext, useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '../_layout';
import {BACKEND_URL} from '@env'


const SignInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()


  async function signInWithEmail() {

    if (email == '' && password == '') {
      Alert.alert("Please enter Email and Password")
      return
    }

    if (email == '') {
      Alert.alert("Please enter Email")
      return
    }

    if (password == '') {
      Alert.alert("Please enter Password")
      return
    }

    setLoading(true);
    await axios.post(`${BACKEND_URL}/auth/login`, {
      email,
      password
    }).then(async (res: any) => {
      // console.log(res.data);
      await AsyncStorage.setItem('id', res.data._id)
      await AsyncStorage.setItem('token', res.data.token)
      setEmail('')
      setPassword('')
      // @refresh reset
      router.replace('/(main)/home')
    }).catch((error: any) => {
      // console.log(error.response.data);
      Alert.alert(error.response.data)
      setEmail('')
      setPassword('')
    })

    setLoading(false);
  }

  return (

    <View style={styles.container}>
      
      <View style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: 60, gap:10}}>
        <Icon name='paw' color='#fd6100' />
        <Text style={{ color: "#fd6100", fontSize: 25, fontWeight: "bold" }}>PAWSFORYOU</Text>
      </View>
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder=""
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button
        onPress={signInWithEmail}
        disabled={loading}
        text={loading ? 'Signing in...' : 'Sign in'}
      />
      <Link href="/(auth)/sign-up" style={styles.textButton}>
        Create an account
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
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

export default SignInScreen;