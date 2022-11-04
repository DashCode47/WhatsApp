import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { listUsers } from "../../graphql/queries";
import ContactList from "../../components/ContactListItems/ContactListItem";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { getCommonChatRoom } from "../../components/Services/chatRoomService";

const Contacts = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      setUsers(result.data?.listUsers?.items);
    });
  }, []);

  const createAChatRoomWithTheUser = async (chat) => {
    /* check if tehres already a chataroom */
    const existingChatRoom = await getCommonChatRoom(chat.id);
    if (existingChatRoom) {
      navigation.navigate("Chat", { id: existingChatRoom.chatRoom.id });
      return;
    }
    /* CREATE A NEW CHATROOM */
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );

    if (!newChatRoomData.data?.createChatRoom) {
      console.log("error");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;
    /* ADD USERS TO THE CREATED CHATROOM */
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomID: newChatRoom.id, userID: chat.id },
      })
    );
    /* ADD AUTHUSER TO CHATROOM */
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {
          chatRoomID: newChatRoom.id,
          userID: authUser.attributes.sub,
        },
      })
    );
    navigation.navigate("Chat", { id: newChatRoom.id });
  };

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <ContactList
          chat={item}
          onPress={() => createAChatRoomWithTheUser(item)}
        />
      )}
      ListHeaderComponent={() => (
        <Pressable
          onPress={() => navigation.navigate("New Group")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            paddingHorizontal: 20,
          }}
        >
          <MaterialIcons
            name="group"
            size={24}
            color="royalblue"
            style={{
              marginRight: 20,
              backgroundColor: "gainboro",
              padding: 7,
              borderRadius: 20,
              overflow: "hidden",
            }}
          />
          <Text style={{ color: "royalblue", fontSize: 16 }}>New Group</Text>
        </Pressable>
      )}
    />
  );
};

export default Contacts;

const styles = StyleSheet.create({});
