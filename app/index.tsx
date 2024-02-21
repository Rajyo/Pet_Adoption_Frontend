import { StyleSheet, Text, View } from 'react-native'
import { Link, Stack, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '@/components/Button'

const Home = () => {
    const [userToken, setUserToken] = useState('')
    const router = useRouter()

    useEffect(() => {
        const idToken = async () => {
            const token = await AsyncStorage.getItem('token')
            setUserToken(token || "No Token")
        }
        idToken()
    }, [userToken])

    if(userToken == 'No Token'){
        router.push('/(auth)/sign-in')
    }


    return (
        <View>
            <Stack.Screen options={{ title: "Home", headerTitleAlign: "center" }} />
            <Text>Home Page</Text>
            <View style={{ display: 'flex', gap: 50, justifyContent: "center", alignItems: "center" }}>
                <Link href={'/tabs/'}>tab one</Link>
                <Link href={'/tabs/two'}>tab two</Link>
                <Link href={'/modal'}>modal</Link>
                {
                    userToken ? <Button text='Logout' onPress={async() => { await AsyncStorage.clear(); router.push('/(auth)/sign-in')}}></Button> : <>
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