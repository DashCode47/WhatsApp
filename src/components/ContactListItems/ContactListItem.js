import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { getCommonChatRoom } from "../../components/Services/chatRoomService";
dayjs.extend(relativeTime);

const ContactList = ({ chat }) => {
  const navigation = useNavigation();

  const onPress = async () => {
    /* check if tehres already a chataroom */
    const existingChatRoom = await getCommonChatRoom(chat.id);
    if (existingChatRoom) {
      navigation.navigate("Chat", { id: existingChatRoom.chatRoom.id });
      return;
    }
    /*  const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );
    console.log(newChatRoomData);
    if (!newChatRoomData.data?.createChatRoom) {
      console.log("error");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomID: newChatRoom.id, userID: chat.id },
      })
    );

    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {
          chatRoomID: newChatRoom.id,
          userID: authUser.attributes.sub,
        },
      })
    );
    navigation.navigate("Chat", { id: newChatRoom.id }); */
  };
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: chat.image,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {chat.name}
          </Text>
        </View>
        <Text numberOfLines={1}>{chat.status}</Text>
      </View>
    </Pressable>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  content: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: "bold",
  },
  subtitle: {
    color: "gray",
  },
});
