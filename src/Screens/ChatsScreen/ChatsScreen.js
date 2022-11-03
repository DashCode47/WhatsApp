import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ChatlistItem from "../../components/ChatListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "./queries";

const ChatsScreen = () => {
  const [chatRoom, setChatRooms] = useState([]);
  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
      );
      const rooms = response?.data?.getUser?.ChatRooms?.items || [];
      const sortedItems = rooms.sort(
        (r1, r2) =>
          new Date(r2.chatRoom.updatedAt) - new Date(r1.chatRoom.updatedAt)
      );

      setChatRooms(sortedItems);
    };
    fetchChatRooms();
  }, []);

  return (
    <FlatList
      data={chatRoom}
      renderItem={({ item }) => <ChatlistItem chat={item.chatRoom} />}
      style={{ backgroundColor: "white" }}
    />
  );
};

export default ChatsScreen;
