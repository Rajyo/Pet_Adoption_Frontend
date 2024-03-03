import { Text } from '@/components/Themed';
import { Stack } from 'expo-router';


export default function RootLayoutNav() {

    return (
        <Stack>
            
            <Stack.Screen name="(profile)/editProfile" options={{ title: "Edit Profile"}} />
            <Stack.Screen name="(profile)/aboutUs" options={{ title: "About Us"}} />
            <Stack.Screen name="(profile)/petCare" options={{ title: "Pet Care"}} />
            <Stack.Screen name="(profile)/petResources" options={{ title: "Pet Resources"}} />
            <Stack.Screen name="(profile)/adoptionStatus" options={{ title: "Adoption Status"}} />
            <Stack.Screen name="(profile)/help" options={{ title: "Help"}} />
            
            <Stack.Screen name="(explore)/FilterComponent" options={{ title: "Filters", headerRight: () => <Text style={{paddingRight:20, fontWeight:"bold", color:"orange", opacity: 0.85}}>Clear All</Text>}} />
            <Stack.Screen name="(explore)/SearchComponent" options={{ title: "Search", headerRight: () => <Text style={{paddingRight:20, fontWeight:"bold", color:"orange",}}>Clear All</Text>}} />
        
        </Stack>
    );
}
