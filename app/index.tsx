import { Alert, StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import { Link, Stack, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


const Home = () => {
    const [userToken, setUserToken] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const router = useRouter()

    const idToken = async () => {
        const token = await AsyncStorage.getItem('token')
        setUserToken(token || "No Token")
    }

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
            .then(res => {
                // console.log(res.data);
                setEmail(res.data.email)
                setUsername(res.data.username)
            })
            .catch((error: any) => console.log(error))
    }

    useEffect(() => {
        idToken()
        userToken && user()
        
    }, [userToken])


    userToken == 'No Token' && router.push('/(auth)/sign-in')
    


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
                    !userToken && <>
                        <Text><Link href={'/(auth)/sign-in'}>Sign-In</Link></Text>
                        <Text><Link href={'/(auth)/sign-up'}>Sign-Up</Link></Text>
                    </>
                }
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})
// import { Alert, StyleSheet, Text, View } from 'react-native'
// import { Link, Stack, useRouter } from 'expo-router'
// import { useContext, useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import axios from 'axios'


// const Home = () => {
//     const [userToken, setUserToken] = useState('')
//     const router = useRouter()


//     useEffect(() => {
//         const idToken = async () => {
//             const token = await AsyncStorage.getItem('token')
//             setUserToken(token || "No Token")
//         }
//         idToken()

//         if (userToken) {
//             const user = async () => {
//                 await axios.get('http://10.0.0.58:8000/userInfo', {
//                     headers: {
//                         Authorization: userToken
//                             ? "Bearer " + userToken
//                             : null,
//                         "Content-Type": "application/json",
//                         accept: "application/json",
//                     },
//                 })
//                     .then(res => console.log(res.data))
//                     .catch((error: any) => console.log(error))
//             }
//             user()
//         }


//     }, [userToken])


//     if (userToken == 'No Token') {
//         router.push('/(auth)/sign-in')
//     }


//     return (
//         <View>
//             <Stack.Screen options={{ title: "Home" }} />
//             <Text>Home Page</Text>
//             <View style={{ display: 'flex', gap: 50, justifyContent: "center", alignItems: "center" }}>
//                 <Link href={'/(tabs)/'}>tab one</Link>
//                 <Link href={'/(tabs)/two'}>tab two</Link>
//                 <Link href={'/modal'}>modal</Link>
//                 {
//                     !userToken && <>
//                         <Link href={'/(auth)/sign-in'}>Sign-In</Link>
//                         <Link href={'/(auth)/sign-up'}>Sign-Up</Link>
//                     </>
//                 }
//             </View>
//         </View>
//     )
// }

// export default Home

// const styles = StyleSheet.create({})