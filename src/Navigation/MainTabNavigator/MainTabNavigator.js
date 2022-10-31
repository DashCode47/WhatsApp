import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotImplemented from "../../Screens/NotImplemented/NotImplemented";
import ChatsScreen from "../../Screens/ChatsScreen";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Settings from "../../Screens/Settings/Settings";
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Chats">
      <Tab.Screen
        name="Status"
        component={NotImplemented}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-whatsapp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calls"
        component={NotImplemented}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={NotImplemented}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubbles-sharp" size={size} color={color} />
          ),
          headerRight: () => (
            <Entypo
              onPress={() => navigation.navigate("contacts")}
              name="new-message"
              size={18}
              color={"royalblue"}
              style={{
                marginRight: 7,
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
