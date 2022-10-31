import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigator from "./src/Navigation";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native/dist/Auth";
import { useEffect } from "react";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";
Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  useEffect(() => {
    const syncUser = async () => {
      /* GET AUTH USER */
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      console.log(authUser);
      /* QUERY THE DB USING AUTH USER ID (SUB) */
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );
      console.log(userData);
      /* IF HTERES NO USER IN DB,CREATE ONE */
      if (userData.data.getUser) {
        console.log("user already exists");
        return;
      }
      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.phone_number,
        status: "Hey,im using wp",
      };
      await API.graphql(graphqlOperation(createUser, { input: newUser }));
    };
    syncUser();
  }, []);

  return (
    <View style={styles.container}>
      <Navigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
  },
});
export default withAuthenticator(App);
