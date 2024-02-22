import { Alert, StyleSheet, Text, View } from 'react-native'
import { Link, Stack, useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { StorageContext } from '@/providers/storageProvider'


const Home = () => {
    const [userToken, setUserToken] = useState('')
    const router = useRouter()

    // const { storeId, storeToken } = useContext(StorageContext)
    // console.log(storeId, storeToken);


    useEffect(() => {
        const idToken = async () => {
            const token = await AsyncStorage.getItem('token')
            setUserToken(token || "No Token")
        }
        idToken()

        if (userToken) {
            const user = async () => {
                await axios.get('http://10.0.0.58:8000/userInfo', {
                    headers: {
                        Authorization: userToken
                            ? "Bearer " + userToken
                            : null,
                        "Content-Type": "application/json",
                        accept: "application/json",
                    },
                })
                    .then(res => console.log(res.data))
                    .catch((error: any) => console.log(error))
            }
            user()
        }


    }, [userToken])


    if (userToken == 'No Token') {
        router.push('/(auth)/sign-in')
    }


    return (
        <View>
            <Stack.Screen options={{ title: "Home" }} />
            <Text>Home Page</Text>
            <View style={{ display: 'flex', gap: 50, justifyContent: "center", alignItems: "center" }}>
                <Link href={'/tabs/'}>tab one</Link>
                <Link href={'/tabs/two'}>tab two</Link>
                <Link href={'/modal'}>modal</Link>
                {
                    !userToken && <>
                        <Link href={'/(auth)/sign-in'}>Sign-In</Link>
                        <Link href={'/(auth)/sign-up'}>Sign-Up</Link>
                    </>
                }
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})