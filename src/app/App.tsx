import { Platform, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./screens/dashboard/index";
import ProductsScreen from "./screens/products/index";
import React, { useState } from "react";
import HomeScreen from "./screens/dashboard/index";

const Stack = createNativeStackNavigator();

export default function App() {
  const Wrapper = Platform.OS === "web" ? View : React.Fragment;

  return (
    <Wrapper style={Platform.OS === "web" ? styles.webContainer : null}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    maxWidth: 390,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    height: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
