import { StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
dayjs.extend(relativeTime);

const Message = ({ message }) => {
  const [isMe, setisMe] = useState(false);
  useEffect(() => {
    const isMymessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      setisMe(message.userID === authUser.attributes.sub);
    };

    isMymessage();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMe ? "#DCF8C5" : "white",
          alignSelf: isMe ? "flex-end" : "flex-start",
        },
      ]}
    >
      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxwidth: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  time: {
    color: "gray",
    alignSelf: "flex-end",
  },
});
