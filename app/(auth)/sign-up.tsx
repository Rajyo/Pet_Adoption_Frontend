import { TextInput, StyleSheet, Alert } from 'react-native';
import { View, Text } from "@/components/Themed"
import React, { useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '../_layout';


const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  async function signUpWithEmail() {

    if (email == '' && password == '' && username == '' && name == '') {
      Alert.alert("Please enter Email, Password, Username and Name")
      return
    }

    if (name == '') {
      Alert.alert("Please enter Name")
      return
    } else {
      if (name.length < 3) {
        Alert.alert("Please enter Name more than 3 letters")
        return
      }
    }
    
    if (username == '') {
      Alert.alert("Please enter Username")
      return
    } else {
      if (username.length < 3) {
        Alert.alert("Please enter Username more than 3 letters")
        return
      }
    }

    if (username.match(/\b\w/g)?.toString() !== username.match(/\b\w/g)?.toString().toLowerCase()) {
      Alert.alert("First letter of username should be small")
      return
    }


    if (email == '') {
      Alert.alert("Please enter Email")
      return
    } else {
      var re = /\S+@\S+\.\S+/;
      var test = re.test(email);
      if (test === false) {
        Alert.alert("Please enter vaild Email")
        return
      }
    }

    if (email.match(/\b\w/g)?.toString() !== email.match(/\b\w/g)?.toString().toLowerCase()) {
      alert("First letter of email should be small")
      return
    }


    if (password == '') {
      Alert.alert("Please enter Password")
      return
    } else {
      if (password.length < 6) {
        Alert.alert("Please enter Password more than 6 letters")
        return
      }
    }


    setLoading(true);
    await axios.post('http://10.0.0.58:8000/api/auth/register', {
      name,
      username,
      email,
      password
    }).then(async (res: any) => {
      // console.log(res.data);
      await AsyncStorage.setItem('id', res.data._id)
      await AsyncStorage.setItem('token', res.data.token)
      setUsername('')
      setEmail('')
      setPassword('')
      router.replace('/(home)/home')
    }).catch((error: any) => {
      Alert.alert(error.response.data)
      setUsername('')
      setEmail('')
      setPassword('')
    })
    setLoading(false);
  }

  return (
    <View style={styles.container}>

      <View style={{ display: "flex", alignItems: "center", paddingBottom: 40, gap: 10 }}>
        <Icon name='paw' color='orange' />
        <Text style={{ color: "orange", fontSize: 25, fontWeight: "bold" }}>PAWSFORYOU</Text>
      </View>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        maxLength={10}
        placeholder=""
        style={styles.input}
      />
      
      <Text style={styles.label}>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        maxLength={10}
        placeholder=""
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        maxLength={20}
        placeholder=""
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        maxLength={10}
        style={styles.input}
      />

      <Button
        onPress={signUpWithEmail}
        disabled={loading}
        text={loading ? 'Creating account...' : 'Create account'}
      />
      <Link href="/(auth)/sign-in" style={styles.textButton}>
        Sign in
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

export default SignUpScreen;