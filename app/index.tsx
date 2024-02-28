import { View, Text } from '@/components/Themed'
import { Link, Stack } from 'expo-router'
import idToken from '@/components/getIdToken'
import { StatusBar } from 'expo-status-bar'

const Home = () => {

    const token = idToken()
    // console.log(token);

    return (
        <View style={{ minHeight: "100%" }}>
            {/* <Stack.Screen options={{ title: "Home", gestureEnabled:false}} /> */}
            <StatusBar animated={true} backgroundColor='gray' />
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
