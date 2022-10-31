import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../../graphql/queries";
import ContactList from "../../components/ContactListItems/ContactListItem";
import chats from "../../../assets/data/chats.json";

const Contacts = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      console.log(result);
      setUsers(result.data?.listUsers?.items);
    });
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <ContactList chat={item} />}
    />
  );
};

export default Contacts;

const styles = StyleSheet.create({});
