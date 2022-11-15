import { StyleSheet, Text, View } from "react-native";
import ChatScreen from "../Screens/ChatScreen";
import ChatsScreen from "../Screens/ChatsScreen/ChatsScreen";
import Contacts from "../Screens/Contacts/Contacts";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./MainTabNavigator/MainTabNavigator";
import NewGroupScreen from "../Screens/NewGroupScreen/NewGroupScreen";
import GroupInfoScreen from "../Screens/GroupInfoScreen";
import ContactsScreen from "../Screens/NewGroupScreen/NewGroupScreen";
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
        <Stack.Screen name="Group info" component={GroupInfoScreen} />
        <Stack.Screen name="contacts" component={ContactsScreen} />
        <Stack.Screen name="New Group" component={NewGroupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
