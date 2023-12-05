import { account, appwriteConfig, avatars, database } from "./appwrite/config";
import { ID } from "appwrite";

// Create a New User to Auth and Save to DB
export async function createUserAccount(user) {
  try {
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newUser) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const result = await recordUserOnDB({
      name: newUser.name,
      username: user.username,
      accountId: newUser.$id,
      email: newUser.email,
      imgUrl: avatarUrl,
    });
    if (!result) throw Error;
    return result;
  } catch (error) {
    console.log(error);
  }
}

// Save User to DB
export async function recordUserOnDB(user) {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

// Create a Session for Sign in Account
export async function signInAccount({ email, password }) {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
  }
}
