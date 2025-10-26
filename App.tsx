import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import LoginScreen from './src/screens/LoginScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

// Habilita screens para compatibilidad legacy con SDK 31
enableScreens();

export type RootStackParamList = {
  Login: undefined;
  ProductList: undefined;
  ProductDetail: { product: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{ title: 'Medicamentos' }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Detalle del Producto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
