import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
} from "react-native";
import ContactList from "../../components/ContactListItems/ContactListItem";
import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../../graphql/queries";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { useNavigation } from "@react-navigation/native";

const NewGroupScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserID, setSelectedUserID] = useState([]);
  const [name, setName] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      setUsers(result.data?.listUsers?.items);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Create"
          disabled={!name || selectedUserID.length < 1}
          onPress={onCreateGroupPress}
        />
      ),
    });
  }, [name, selectedUserID]);

  const onCreateGroupPress = async () => {
    /* CREATE A NEW CHATROOM */
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );

    if (!newChatRoomData.data?.createChatRoom) {
      console.log("error");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;
    /* ADD USERS TO THE CREATED CHATROOM */
    Promise.all(
      selectedUserID.map((userID) =>
        API.graphql(
          graphqlOperation(createUserChatRoom, {
            input: { chatRoomID: newChatRoom.id, userID },
          })
        )
      )
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
    setSelectedUserID([]);
    setName("");
    navigation.navigate("Chat", { id: newChatRoom.id });
  };

  const onContactPress = (id) => {
    setSelectedUserID((userIds) => {
      if (userIds.includes(id)) {
        //remove id from selected
        return [...userIds].filter((uid) => uid !== id);
      } else {
        //add id to selected
        return [...userIds, id];
      }
    });
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Group Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <ContactList
            chat={item}
            selectable
            onPress={() => onContactPress(item.id)}
            isSelected={selectedUserID.includes(item.id)}
          />
        )}
      />
    </View>
  );
};

export default NewGroupScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: "white" },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray",
    padding: 10,
    margin: 10,
  },
});
