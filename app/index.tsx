import { Redirect } from 'expo-router'
import idToken from '@/components/getIdToken'
import { Text, View } from '@/components/Themed';
import { StatusBar } from 'expo-status-bar';
import Entry from './(slides)/slide1';


const Home = () => {
    const token = idToken()
    var finalToken: any = []
    token.storeToken != null && finalToken.push(token.storeToken)

    return (
        <View style={{ minHeight: "100%" }}>
            <StatusBar animated={true} backgroundColor='gray' />
            {
                (finalToken[0] == undefined || finalToken[0] == null || finalToken[0] == 'No Token') ? <Entry /> : <Redirect href={'/(main)/home'} />
            }
        </View>
    )
}

export default Home
