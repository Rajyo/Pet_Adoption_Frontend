import { View, useThemeColor } from '@/components/Themed';
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
          headerRight: () => <Icon name="bell-o" color={useThemeColor({ light: 'black', dark: 'white' }, 'text')} size={23} />, headerRightContainerStyle: { paddingRight: 10 },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />, tabBarActiveTintColor: "#fd6100",
        }}
      />

      <Tabs.Screen name='explore'
        options={{
          title: "Explore", headerTitle: "Explore",
          headerTitleStyle: { color: "#fd6100", fontSize: 22, fontWeight: "700" },
          headerRight: () => <View style={{ paddingRight: 20 }}>
            <Link href={'/(components)/(explore)/FilterComponent'}>
              <Icon name='filter' color={useThemeColor({ light: 'black', dark: 'white' }, 'text')} size={25}></Icon>
            </Link>
          </View>,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />, tabBarActiveTintColor: "#fd6100",
        }}
      />

      <Tabs.Screen name='favourites'
        options={{
          title: "Favourites", headerTitle: "Favourites",
          headerTitleStyle: { fontSize: 22, fontWeight: "700" },
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />, tabBarActiveTintColor: "#fd6100",
        }}
      />
      
      <Tabs.Screen name='adoption'
        options={{
          title: "Adoption", headerTitle: "Pet Adoption",
          headerTitleStyle: { fontSize: 22, fontWeight: "700" },
          tabBarIcon: ({ color }) => <TabBarIcon name="paw" color={color} />, tabBarActiveTintColor: "#fd6100",
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