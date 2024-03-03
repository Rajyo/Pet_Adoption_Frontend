import { View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme.web';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number
}) {
  return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}

export default function HomeLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs>


      <Tabs.Screen name='home'
        options={{
          title: "Title", headerTitle: "PAWSFORYOU",
          headerTitleStyle: { color: "#fd6100", fontSize: 22, fontWeight: "700" },
          headerRight: () => <Icon name="bell-o" color={colorScheme == "light" ? "black" : "white"} size={23} />, headerRightContainerStyle: { paddingRight: 10 },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />, tabBarActiveTintColor: "#fd6100",
        }}
      />

      <Tabs.Screen name='explore'
        options={{
          title: "Explore", headerTitle: "PAWSFORYOU",
          headerTitleStyle: { color: "#fd6100", fontSize: 22, fontWeight: "700" },
          headerRight: () => <View style={{ display: "flex", flexDirection: "row", gap: 40, paddingRight: 20 }}>
            <Link href={'/(components)/(explore)/SearchComponent'}>
              <Icon name='search' color={colorScheme == "light" ? "black" : "white"} size={25}></Icon>
            </Link>
            <Link href={'/(components)/(explore)/FilterComponent'}>
              <Icon name='filter' color={colorScheme == "light" ? "black" : "white"} size={25}></Icon>
            </Link>
          </View>,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />, tabBarActiveTintColor: "#fd6100",
        }}
      />

      <Tabs.Screen name='chat'
        options={{
          title: "Chats", headerTitle: "Chats",
          headerTitleStyle: { fontSize: 22, fontWeight: "700" },
          tabBarIcon: ({ color }) => <TabBarIcon name="coffee" color={color} />, tabBarActiveTintColor: "#fd6100",
        }}
      />

      <Tabs.Screen name='profile'
        options={{
          title: "Profile", headerTitle: "Profile",
          headerTitleStyle: { fontSize: 22, fontWeight: "700" },
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          tabBarActiveTintColor: "#fd6100",
        }}
      />


    </Tabs>
  );
}