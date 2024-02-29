import { Stack } from 'expo-router';


export default function EntryLayout() {

    return (
        <Stack>
            <Stack.Screen name="slide1" options={{ title: "Slide 1", gestureEnabled: false}} />
            <Stack.Screen name="slide2" options={{ title: "Slide 2", gestureEnabled: false}} />
            <Stack.Screen name="slide3" options={{ title: "Slide 3", gestureEnabled: false}} />
        </Stack>
    );
}
