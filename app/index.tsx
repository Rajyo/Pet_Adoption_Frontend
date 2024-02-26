import { View, Text } from '@/components/Themed'
import { Link, Stack } from 'expo-router'
import idToken from '@/components/getIdToken'

const Home = () => {

    const token = idToken()
    // console.log(token);

    return (
        <View style={{ minHeight: "100%" }}>
            <Stack.Screen options={{ title: "Home" }} />
            <Text>Home Page</Text>
            <View style={{ display: 'flex', gap: 50, justifyContent: "center", alignItems: "center" }}>
                {
                    (token.storeToken == null || token.storeToken == 'No Token')  && <>
                        <Text><Link href={'/(auth)/sign-in'}>Sign-In</Link></Text>
                        <Text><Link href={'/(auth)/sign-up'}>Sign-Up</Link></Text>
                    </>
                }
            </View>
        </View>
    )
}

export default Home

// import { View, Text } from '@/components/Themed'
// import { Link, Stack } from 'expo-router'
// import { useContext, useEffect, useState} from 'react'
// import { MyContext } from '@/providers/storageProvider'


// const Home = () => {
//     const { storeToken, storeId } = useContext(MyContext);
//     const [token, setToken] = useState(storeToken)
    
//     useEffect(() => {
//         setToken(storeToken)
//         console.log(token);
//     }, [token])

//     return (
//         <View style={{ minHeight: "100%" }}>
//             <Stack.Screen options={{ title: "Home" }} />
//             <Text>Home Page</Text>
//             <View style={{ display: 'flex', gap: 50, justifyContent: "center", alignItems: "center" }}>
//                 <Text><Link href={'/(tabs)'}>tab one</Link></Text>
//                 <Text><Link href={'/(tabs)/two'}>tab two</Link></Text>
//                 {
//                     (token == null || token == 'No Token') && <>
//                         <Text><Link href={'/(auth)/sign-in'}>Sign-In</Link></Text>
//                         <Text><Link href={'/(auth)/sign-up'}>Sign-Up</Link></Text>
//                     </>
//                 }
//             </View>
//         </View>
//     )
// }

// export default Home
