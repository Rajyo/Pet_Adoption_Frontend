import { Stack } from 'expo-router';


export default function RootLayoutNav() {

    return (
        <Stack>
            <Stack.Screen name="editProfile" options={{ title: "Edit Profile"}} />
            <Stack.Screen name="aboutUs" options={{ title: "About Us"}} />
            <Stack.Screen name="petCare" options={{ title: "Pet Care"}} />
            <Stack.Screen name="petResources" options={{ title: "Pet Resources"}} />
            <Stack.Screen name="adoptionStatus" options={{ title: "Adoption Status"}} />
            <Stack.Screen name="help" options={{ title: "Help"}} />
        </Stack>
    );
}
