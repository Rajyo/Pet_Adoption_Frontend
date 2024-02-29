import { Stack } from 'expo-router';


export default function Auth() {

    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{ title: "Sign In", gestureEnabled: false}} />
            <Stack.Screen name="sign-up" options={{ title: "Sign Up", gestureEnabled: false}} />
        </Stack>
    );
}

// import { FontAwesome } from '@expo/vector-icons';
// import { Tabs } from 'expo-router';

// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

// export default function Auth() {

//   return (
//     <Tabs screenOptions={{
//       headerShown: false
//     }}>
//       <Tabs.Screen name='sign-in' options={{ title: "Sign-In", tabBarIcon: ({ color }) => <TabBarIcon name="sign-in" color={color} />, }} />
//       <Tabs.Screen name='sign-up' options={{ title: "Sign-Up", tabBarIcon: ({ color }) => <TabBarIcon name="sign-in" color={color} />, }} />
//     </Tabs>
//   );
// }