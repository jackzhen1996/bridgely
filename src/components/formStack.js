import React, { useEffect, useState, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ABCForm from "./abcForm.js";
import ABCHome from "./abcHome.js";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BackArrow from "../../assets/backArrow.tsx";
import { StackActions } from "@react-navigation/native";
import styles from "./stylesheets/splashStyles.js";

const Stack = createStackNavigator();

const formStack = function () {
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeftContainerStyle: styles.headerLeftContainerStyle,
        headerTitle: null,
        headerStyle: { height: 70 },
        headerBackTitle: null,
        headerBackTitleVisible: null,
      }}
      initialRouteName="ABCHome"
    >
      <Stack.Screen
        options={{
          headerStyle: styles.headerStyle,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={{ marginLeft: 20 }}
            >
              <BackArrow />
            </TouchableOpacity>
          ),
        }}
        name="ABCHome"
        component={ABCHome}
      />
      <Stack.Screen
        options={{
          headerStyle: styles.headerStyle,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(popAction)}
              style={{ marginLeft: 20 }}
            >
              <BackArrow />
            </TouchableOpacity>
          ),
        }}
        name="scoresheet"
        component={ABCForm}
      />
    </Stack.Navigator>
  );
};

export default formStack;
