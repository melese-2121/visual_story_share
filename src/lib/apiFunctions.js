import {
  account,
  appwriteConfig,
  avatars,
  database,
  storage,
} from "./appwrite/config";
import { ID, Query } from "appwrite";

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

    const savedUser = await recordUserOnDB({
      name: newUser.name,
      username: user.username,
      accountId: newUser.$id,
      email: newUser.email,
      imgUrl: avatarUrl,
    });
    if (!savedUser) throw Error;
    return savedUser;
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
    return;
  }
}

// Get Current Account user
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw error;

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

// Sign out from Account
export const signOutAccount = () => {
  try {
    const session = account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
    return;
  }
};

// Create  a new post
export async function createPost(post) {
  try {
    // Upload image to storage
    const uploadedFile = await uploadFile(post.file);
    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = await getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      await deleteFileFromStorage(uploadedFile.$id);
      throw Error;
    }
    // Convert tags to an array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Save a new post to database
    const newPost = await createNewPost(post, tags, uploadedFile, fileUrl);
    if (!newPost) {
      await deleteFileFromStorage(uploadedFile.$id);
      throw Error;
    }
  } catch (error) {
    console.log(error);
  }
}

// Upload image to storage
export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// Check if uploaded file exist
export async function getFilePreview(fileId) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      200,
      200,
      "top",
      100
    );
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// Delete image from storage
export async function deleteFileFromStorage(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

// Create a new post to post table
export async function createNewPost(post, tags, uploadedFile, fileUrl) {
  try {
    const newPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imgUrl: fileUrl,
        imgId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );
    return newPost;
  } catch (error) {
    console.log(error);
  }
}

// Get Recent Posts for Home Page
export async function getRecentPsts() {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(22)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

// LIKE / UNLIKE POST
export async function likePost({ postId, likesArray }) {
  try {
    const updatedPost = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// SAVE POST
export async function savePost({ userId, postId }) {
  try {
    console.log(userId);
    console.log(postId);
    const updatedPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savedCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// DELETE SAVED POST
export async function deleteSavedPost(savedRecordId) {
  try {
    const statusCode = await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savedCollectionId,
      savedRecordId
    );

    if (!statusCode) throw Error;

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

// FIND POST BY ID
export async function findPostById(postId) {
  try {
    const post = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    if (!post) throw error;
    return post;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE POST
export async function updatePost(post) {
  const hasFileToUpdate = !!post.file;

  try {
    let image = {
      imageUrl: post.imgUrl,
      imageId: post.imageId,
    };
    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(post.file);
      if (!uploadedFile) throw Error;
      // Get new file url
      const fileUrl = await getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //  Update post
    const updatedPost = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        imgUrl: image.imageUrl,
        imgId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    // Failed to update
    if (!updatedPost) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }

      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE POST
export async function deletePost({ postId, imageId }) {
  if (!postId || !imageId) return;

  try {
    const statusCode = await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    if (!statusCode) throw Error;

    await deleteFile(imageId);

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

//  DELETE FILE
export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

//  GET USER'S POST
export async function getUserPosts(userId) {
  if (!userId) return;

  try {
    const post = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET POSTS
export async function searchPosts(searchTerm) {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

// GET INFINITE POSTS

export async function getInfinitePosts({ pageParam }) {
  const queries = [Query.orderDesc("$updatedAt"), Query.limit(6)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

// GET INFINITE USER SAVED POSTS

export async function getInfiniteSavedPosts({ pageParam }) {
  const queries = [Query.orderDesc("$updatedAt"), Query.limit(4)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savedCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

// GET INFINITE USERS

export async function getInfiniteUsers({ pageParam }) {
  const queries = [Query.orderDesc("$updatedAt"), Query.limit(4)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const users = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET POSTS
export async function searchUsers(searchTermText) {
  try {
    const users = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.search("username", searchTermText)]
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}
