import { Stack } from 'expo-router';


export default function RootLayoutNav() {

    return (
        <Stack>
            <Stack.Screen name="editProfile" options={{ title: "Edit Profile"}} />
        </Stack>
    );
}
