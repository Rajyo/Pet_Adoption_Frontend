import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  async function signInWithEmail() {

    if(email == '' && password == ''){
      Alert.alert("Please enter Email and Password")
      return
    }

    if(email == ''){
      Alert.alert("Please enter Email")
      return
    }
    
    if(password == ''){
      Alert.alert("Please enter Password")
      return
    }

    setLoading(true);
    await axios.post('http://10.0.0.58:8000/api/auth/login', {
      email,
      password
    }).then(async (res: any) => {
      await AsyncStorage.setItem('id', res.data._id)
      await AsyncStorage.setItem('token', res.data.token)
      setEmail('')
      setPassword('')
      router.push('/')
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

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
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
    marginVertical: 10,
  },
});

export default SignInScreen;