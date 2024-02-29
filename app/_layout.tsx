import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '@/providers/storageProvider';
import { Button } from 'react-native';
import idToken from '@/components/getIdToken';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '',
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

  const router = useRouter()


  return (
    <MyContext.Provider value={{ storeToken: idToken().storeToken, storeId: idToken().storeId }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{
          // headerRight: () => (
          //   (idToken().storeToken !== 'No Token') ?
          //     <View style={{ backgroundColor: colorScheme === 'dark' ? 'rgb(18, 18, 18)' : 'rgb(255, 255, 255)' }}>
          //       <Link href={'/(home)/home'} style={{ marginRight: 10 }}>
          //         <Icon name='home' color={Colors[colorScheme ?? 'light'].text} />
          //       </Link>
          //     </View>
          //     :
          //     <View style={{
          //       display: "flex", flexDirection: "row", gap: 20, paddingRight: 10, backgroundColor: colorScheme === 'dark' ? 'rgb(18, 18, 18)' : 'rgb(255, 255, 255)'
          //     }}>
          //       <Button title='Sign In' onPress={() => router.replace('/(auth)/sign-in')}></Button>
          //       <Button title='Sign Up' onPress={() => router.replace('/(auth)/sign-up')}></Button>
          //     </View>
          // )
        }}>
          <Stack.Screen name="index" options={{ title: "Home", gestureEnabled: false, }} />
          <Stack.Screen name="(components)" options={{ headerShown: false, title: "Components" }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false, title: "Auth", gestureEnabled: false }} />
          <Stack.Screen name="(home)" options={{ headerShown: false, title: "Start", gestureEnabled: false }} />
          <Stack.Screen name="(slides)" options={{ headerShown: false, title: "Slides" }} />
        </Stack>
      </ThemeProvider >
    </MyContext.Provider >
  );
}
