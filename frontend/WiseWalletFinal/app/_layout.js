import { Stack, SplashScreen, Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { AuthProvider } from '../src/context/AuthContext';
import { useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f5f5f5',
  },
};

export default function Layout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: '#666',
              tabBarStyle: {
                height: 60,
                paddingBottom: 8,
                paddingTop: 8,
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Budget',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="wallet" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="goals"
              options={{
                title: 'Goals',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="flag" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="discounts"
              options={{
                title: 'Discounts',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="tag" size={size} color={color} />
                ),
              }}
            />
          </Tabs>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 