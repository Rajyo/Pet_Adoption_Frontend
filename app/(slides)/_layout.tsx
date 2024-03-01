import { Stack } from 'expo-router';
import {Link} from "expo-router"

export default function EntryLayout() {

    return (
        <Stack>
            <Stack.Screen name="slide1" options={{ title: "PAWSFORYOU", headerTitleStyle: {color: "orange", fontSize: 22, fontWeight: "700"}, headerRight: () => <Link style={{marginRight: 20, fontSize: 16, color: "gray", fontWeight: "600"}} href={'/(auth)/sign-in'}>Skip</Link>}}/>
            <Stack.Screen name="slide2" options={{ title: "PAWSFORYOU", headerTitleStyle: {color: "orange", fontSize: 22, fontWeight: "700"}, headerRight: () => <Link style={{marginRight: 20, fontSize: 16, color: "gray", fontWeight: "600"}} href={'/(auth)/sign-in'}>Skip</Link>}}/>
            <Stack.Screen name="slide3" options={{ title: "PAWSFORYOU", headerTitleStyle: {color: "orange", fontSize: 22, fontWeight: "700"}, }}/>
        </Stack>
    );
}
