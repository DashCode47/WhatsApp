import {
  StyleSheet,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import bg from "../../assets/images/BG.png";
import Message from "../components/Message";
import messages from "../../assets/data/messages.json";
import InputBox from "../components/InputBox";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getChatRoom, listMessagesByChatRoom } from "../graphql/queries";

const ChatScreen = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setmessages] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  const chatroomID = route.params.id;
  /* FETCH CHAT ROOM */
  useEffect(() => {
    API.graphql(graphqlOperation(getChatRoom, { id: chatroomID })).then(
      (result) => {
        setChatRoom(result.data?.getChatRoom);
      }
    );
  }, [chatroomID]);
  /* FECTHING MESSAGES */
  useEffect(() => {
    API.graphql(
      graphqlOperation(listMessagesByChatRoom, {
        chatroomID,
        sortDirection: "DESC",
      })
    ).then((result) => {
      setmessages(result.data?.listMessagesByChatRoom?.items);
    });
  }, [chatroomID]);

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  if (!chatRoom) return <ActivityIndicator />;

  return (
    <ImageBackground source={bg} style={styles.bg}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message message={item} style={styles.list} />
        )}
        inverted
      />
      <InputBox chatroom={chatRoom} />
    </ImageBackground>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});
