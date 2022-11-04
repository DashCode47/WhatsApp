import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

dayjs.extend(relativeTime);

const ContactList = ({
  chat,
  onPress = () => {},
  selectable = false,
  isSelected = false,
}) => {
  const navigation = useNavigation();

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
      {selectable &&
        (isSelected ? (
          <AntDesign name="checkcircle" size={24} color="royalblue" />
        ) : (
          <FontAwesome name="circle-thin" size={24} color="lightgray" />
        ))}
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
