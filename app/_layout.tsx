import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useContext, useEffect, useState } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '@/providers/storageProvider';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'tabs',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}


export function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3, }} {...props} />;
}


function RootLayoutNav() {
  const colorScheme = useColorScheme();


  const [storeToken, setStoreToken] = useState<string | null>(null)
  const [storeId, setStoreId] = useState<string | null>(null)

  useEffect(() => {
    const idToken = async () => {
      const token = await AsyncStorage.getItem('token')
      setStoreToken(token || "No Token")

      const id = await AsyncStorage.getItem('id')
      setStoreId(id || "No Id")
    }
    idToken()
  })

  return (
    <MyContext.Provider value={{ storeToken, storeId }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{
          headerRight: () =>
            <View style={{
              display: "flex", flexDirection: "row", marginRight: 16, gap: 30, backgroundColor: colorScheme === 'dark' ? 'rgb(18, 18, 18)' : 'rgb(255, 255, 255)'
            }}>
              <Link href={'/profile'} style={{ marginRight: 10 }}>
                <Icon name='user' color={Colors[colorScheme ?? 'light'].text} />
              </Link>

              <Icon name='sign-out' color={Colors[colorScheme ?? 'light'].text} />
            </View>
        }}>
          <Stack.Screen name="modal" options={{ title: "Modal", presentation: 'modal' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Tabs" }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false, title: "Auth" }} />
        </Stack>
      </ThemeProvider>
    </MyContext.Provider>
  );
}