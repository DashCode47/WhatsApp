import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { Auth } from "aws-amplify";
const Settings = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button title="Sign Out" onPress={() => Auth.signOut()} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
