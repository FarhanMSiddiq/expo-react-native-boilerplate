import React from "react";
import {
  View,
  Platform,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardScreen from "../app/screens/dashboard";
import ProductsScreen from "../app/screens/products";
import ProductDetailScreen from "./screens/products/detail";
import RecipesDetailScreen from "./screens/detail_recipes";

const Stack = createNativeStackNavigator();

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === "web") {
    return <View style={styles.webContainer}>{children}</View>;
  }

  // Untuk Android dan iOS: pakai SafeAreaView
  return (
    <SafeAreaView style={styles.nativeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {children}
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <Wrapper>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="RecipesDetail" component={RecipesDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    minHeight: "100%", // Web only
    backgroundColor: "#fff",
  },
  nativeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
  },
});
