import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
dayjs.extend(relativeTime);

const index = ({ chat }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const userItem = chat.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };
    fetchUser();
  }, []);
  /* loop trhough chat.users and find a user that is not us */

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("Chat", { id: chat.id, name: user?.name })
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
          {chat.LastMessage && (
            <Text style={styles.subtitle}>
              {dayjs(chat.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>
        <Text style={styles.row} numberOfLines={2}>
          {chat.LastMessage?.text}
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
