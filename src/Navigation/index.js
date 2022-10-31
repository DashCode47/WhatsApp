import { StyleSheet, Text, View } from "react-native";
import ChatScreen from "../Screens/ChatScreen";
import ChatsScreen from "../Screens/ChatsScreen";
import Contacts from "../Screens/Contacts/Contacts";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./MainTabNavigator/MainTabNavigator";

const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}
      >
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="contacts" component={Contacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
