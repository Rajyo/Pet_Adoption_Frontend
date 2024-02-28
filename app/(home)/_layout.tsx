import { FontAwesome } from '@expo/vector-icons';
import {Tabs} from 'expo-router';

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  }

export default function Auth() {

    return (
        <Tabs>
            <Tabs.Screen name='home' options={{ title: "Home", tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />, }} />
            <Tabs.Screen name='explore' options={{ title: "Explore", tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />, }} />
            <Tabs.Screen name='chat' options={{ title: "Chat", tabBarIcon: ({ color }) => <TabBarIcon name="coffee" color={color} />, }} />
            <Tabs.Screen name='profile' options={{ title: "Profile", tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />, }} />
        </Tabs>
    );
}