import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { onUpdateChatRoom } from "../../graphql/subscriptions";

dayjs.extend(relativeTime);

const index = ({ chat }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [chatRoom, setchatRoom] = useState(chat);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const userItem = chatRoom.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };
    fetchUser();
  }, []);
  /* loop trhough chat.users and find a user that is not us */
  /* fetch char room */
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chat.id } } })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (err) => console.warn(err),
    });
    return () => subscription.unsubscribe();
  }, [chat.id]);

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("Chat", { id: chatRoom.id, name: user?.name })
      }
    >
      <Image
        source={{
          uri: chat.user?.image,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {user?.name}
          </Text>
          {chatRoom.LastMessage && (
            <Text style={styles.subtitle}>
              {dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>
        <Text style={styles.row} numberOfLines={2}>
          {chatRoom.LastMessage?.text}
        </Text>
      </View>
    </Pressable>
  );
};

export default index;

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
