import { API, graphqlOperation, Auth } from "aws-amplify";

export const getCommonChatRoom = async (userID) => {
  const authUser = await Auth.currentAuthenticatedUser();
  /* GET ALL CHATROOMS FROM USER1 */
  const response = await API.graphql(
    graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
  );
  const chatRooms = response.data?.getUser?.ChatRooms?.items || [];
  /* GET ALL CHATROOMS FROM USER2 */
  /* remove chatrooms with more than 2 users */
  /* Get common chat rooms */
  console.log(chatRooms[0].chatRoom.users);
  const chatRoom = chatRooms.find((chatRoomItem) => {
    return chatRoomItem.chatRoom.users.items.some(
      (userItem) => userItem.user.id === userID
    );
  });
  console.log(chatRoom);
  return chatRoom;
};

export const listChatRooms = /*GraphQL*/ `
    query GetUser($id:ID!) {
        getUser(id:$id){
            id
            ChatRooms{
                items{
                    chatRoom{
                        id
                        users{
                            items{
                                user{
                                    id

                                }
                            }
                        }
                    }
                }
                
            }
        }
    }

`;
