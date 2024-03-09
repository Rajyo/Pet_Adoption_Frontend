import { Text } from '@/components/Themed';
import { Stack, useRouter } from 'expo-router';


export default function RootLayoutNav() {
    const router = useRouter()

    return (
        <Stack>
            
            <Stack.Screen name="(profile)/editProfile" options={{ title: "Edit Profile"}} />
            <Stack.Screen name="(profile)/aboutUs" options={{ title: "About Us"}} />
            <Stack.Screen name="(profile)/petCare" options={{ title: "Pet Care"}} />
            <Stack.Screen name="(profile)/petResources" options={{ title: "Pet Resources"}} />
            
            <Stack.Screen name="(explore)/FilterComponent" options={{ title: "Filters", headerRight: () => <Text style={{paddingRight:20, fontWeight:"bold", color:"orange", opacity: 0.85}} onPress={() => router.replace('/(components)/(explore)/FilterComponent')}>Clear All</Text>}} />
            <Stack.Screen name="(explore)/PetProfile" options={{ title: "", headerTransparent: true}} />
            <Stack.Screen name="(explore)/PetAdopt" options={{ title: ""}} />
        
        </Stack>
    );
}
