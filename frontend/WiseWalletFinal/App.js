import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { View, Text } from 'react-native';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';

console.log('App.js is loading...');

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f5f5f5',
  },
};

const Navigation = () => {
  console.log('Navigation component rendering...');
  const { user } = useAuth();
  console.log('Current user state:', user);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      {!user ? (
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ 
            title: 'WiseWallet',
            headerTitleStyle: {
              color: '#fff',
            },
          }}
        />
      )}
    </Stack.Navigator>
  );
};

// Fallback error boundary component
const ErrorFallback = ({ error }) => {
  console.error('App Error:', error);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text>Something went wrong!</Text>
      <Text style={{ color: 'red', marginTop: 10 }}>{error.message}</Text>
    </View>
  );
};

const App = () => {
  console.log('App component rendering...');
  try {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    );
  } catch (error) {
    console.error('Error in App component:', error);
    return <ErrorFallback error={error} />;
  }
};

export default App; 