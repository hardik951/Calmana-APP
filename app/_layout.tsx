import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
// Import your LoginPage and SignupPage components
import LoginPage from './screens/LoginPage';
import SignupPage from './screens/SignupPage';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/*
          THIS IS WHERE THE BACK ARROW IS ADDED FOR LOGINPAGE ⬅️

          - `headerShown: true`: This is the **most important line**. It tells Expo Router to display a navigation header
                                 at the top of the LoginPage screen.
          - `title: 'Login'`: Sets the text displayed in the center of the header.
          - `headerBackVisible: true`: This explicitly ensures that the back arrow icon is visible
                                       in the top-left corner of the header, provided there's a screen
                                       in the navigation history to go back to.
        */}
        <Stack.Screen
          name="screens/LoginPage"
          options={{
            headerShown: true, // Enables the header where the back arrow appears
            title: 'Login',
            headerBackVisible: true, // Ensures the back arrow is visible
          }}
        />

        {/*
          AND HERE FOR THE SIGNUPPAGE ⬅️

          It works exactly the same way for the SignupPage.
        */}
        <Stack.Screen
          name="screens/SignupPage"
          options={{
            headerShown: true,
            title: 'Sign Up',
            headerBackVisible: true,
          }}
        />

        {/*
          The (tabs) group usually doesn't need a header, as it's often the bottom of a stack
          or a primary navigation level. So, `headerShown: false` is typical here.
        */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Catch-all for any routes that don't match */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}