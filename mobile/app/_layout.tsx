import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import * as Device from 'expo-device';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef } from 'react';
import 'react-native-reanimated';

import { AuthProvider } from '@/lib/AuthContext';
import { initAnalytics } from '@/lib/analytics';
import {
  registerForPushNotifications,
  scheduleDailyTeaser,
  addNotificationResponseListener,
} from '@/lib/notifications';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

// Custom dark theme matching the A2Z AI brand
const A2ZDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#a855f7',
    background: '#030712',
    card: '#111827',
    text: '#f9fafb',
    border: '#1f2937',
    notification: '#a855f7',
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Initialize analytics on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Set up push notifications
  useEffect(() => {
    registerForPushNotifications()
      .then(() => scheduleDailyTeaser())
      .catch((e) => console.log('Notification setup skipped:', e.message));
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const responseListener = useRef<ReturnType<typeof addNotificationResponseListener> | null>(null);

  // Handle notification taps (physical device only)
  useEffect(() => {
    if (!Device.isDevice) return;

    responseListener.current = addNotificationResponseListener((response) => {
      const data = response.notification.request.content.data;
      if (data?.type === 'teaser') {
        router.push('/');
      }
    });

    return () => {
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, [router]);

  return (
    <ThemeProvider value={A2ZDarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="article/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Article',
            headerStyle: { backgroundColor: '#111827' },
            headerTintColor: '#f9fafb',
          }}
        />
        <Stack.Screen
          name="quiz/[id]"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Quick Quiz',
            headerStyle: { backgroundColor: '#111827' },
            headerTintColor: '#f9fafb',
          }}
        />
        <Stack.Screen
          name="term/[slug]"
          options={{
            headerShown: true,
            headerTitle: 'AI Term',
            headerStyle: { backgroundColor: '#111827' },
            headerTintColor: '#f9fafb',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
