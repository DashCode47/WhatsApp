import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import chats from "../../assets/data/chats.json";
import ChatlistItem from "../components/ChatListItem";
const ChatsScreen = () => {
  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ChatlistItem chat={item} />}
      style={{ backgroundColor: "white" }}
    />
  );
};

export default ChatsScreen;
