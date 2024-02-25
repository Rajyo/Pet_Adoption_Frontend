import { View, Text } from '@/components/Themed'
import { Link, Stack, useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { MyContext } from '@/providers/storageProvider'
import { ActivityIndicator } from 'react-native'


const Home = () => {
    const { storeToken, storeId } = useContext(MyContext);
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // console.log("storeToken", storeToken);
    // console.log("storeId", storeId);
    // console.log(loading);
    loading && <ActivityIndicator />
    
    useEffect(() => {
        setLoading(true)
        storeToken == 'No Token' && router.push('/(auth)/sign-in')

        const user = async () => {

            await axios.get('http://10.0.0.58:8000/userInfo', {
                headers: {
                    Authorization: storeToken
                        ? "Bearer " + storeToken
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
        storeToken !== 'No Token' && user()

    }, [storeToken])



    return (
        <View style={{ minHeight: "100%" }}>
            <Stack.Screen options={{ title: "Home" }} />
            <Text>Home Page</Text>
            <Text>Email: {email}</Text>
            <Text>Username: {username}</Text>
            <View style={{ display: 'flex', gap: 50, justifyContent: "center", alignItems: "center" }}>
                <Text><Link href={'/(tabs)'}>tab one</Link></Text>
                <Text><Link href={'/(tabs)/two'}>tab two</Link></Text>
                {
                    !storeToken && <>
                        <Text><Link href={'/(auth)/sign-in'}>Sign-In</Link></Text>
                        <Text><Link href={'/(auth)/sign-up'}>Sign-Up</Link></Text>
                    </>
                }
            </View>
        </View>
    )
}

export default Home
