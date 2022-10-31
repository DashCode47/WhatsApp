import { StyleSheet, View, TextInput } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const InputBox = () => {
  const [newMessage, setnewMessage] = useState("");

  const onSend = () => {
    console.log("sended");
    setnewMessage("");
  };
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* icon */}
      <AntDesign name="plus" size={20} color="royalblue" />
      {/* Text input */}
      <TextInput
        placeholder="type message.."
        style={styles.input}
        value={newMessage}
        onChangeText={setnewMessage}
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
