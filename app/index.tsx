import { StyleSheet, Text, View } from 'react-native'
import { Link, Stack } from 'expo-router'

const Home = () => {

    return (
        <View>
            <Stack.Screen options={{ title: "Home", headerTitleAlign: "center" }} />
            <Text>Home Page</Text>
            <View style={{ display: 'flex', gap: 50, justifyContent: "center", alignItems: "center" }}>
                <Link href={'/tabs/'}>tabs</Link>
                <Link href={'/tabs/two'}>tabs two</Link>
                <Link href={'/modal'}>modal</Link>
                <Link href={'/auth/'}>Sign-In</Link>
                <Link href={'/auth/sign-up'}>Sign-Up</Link>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})