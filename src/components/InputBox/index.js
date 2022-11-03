import { StyleSheet, View, TextInput } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../graphql/mutations";

const InputBox = ({ chatroom }) => {
  const [text, setText] = useState("");

  const onSend = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const newMessage = {
      chatroomID: chatroom.id,
      text,
      userID: authUser.attributes.sub,
    };
    console.warn("sended", newMessage);
    const newMessageData = await API.graphql(
      graphqlOperation(createMessage, { input: newMessage })
    );

    setText("");
    /* set new Message as last message of chat */
    await API.graphql(
      graphqlOperation(updateChatRoom, {
        input: {
          _version: chatroom._version,
          chatRoomLastMessageId: newMessageData.data.createMessage.id,
          id: chatroom.id,
        },
      })
    );
  };
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* icon */}
      <AntDesign name="plus" size={20} color="royalblue" />
      {/* Text input */}
      <TextInput
        placeholder="type message.."
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
      {/* Icon */}
      <MaterialIcons
        name="send"
        size={16}
        color="white"
        style={styles.send}
        onPress={onSend}
      />
    </SafeAreaView>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderColor: "lightgray",
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 10,
  },
  send: {
    backgroundColor: "royalblue",
    padding: 7,
    borderRadius: 15,
    overflow: "hidden",
  },
});
