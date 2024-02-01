import { useEffect, useState } from "react";
import { useUserContext } from "../../context/AuthContext";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "../../lib/react-query/queriesAndMutations";
import LikeSaveLoader from "./LikeSaveLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSave } from "@fortawesome/free-regular-svg-icons";

const UserActions = ({ post, userId }) => {
  const { user } = useUserContext();
  const likeList = post.likes.map((user) => userId);
  const [likes, setLikes] = useState(likeList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost, isPending: tryingToLike } = useLikePost();
  const { mutate: savePost, isPending: isSaving } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  const [isHovered, setHovered] = useState(false);

  const savedPostRecord = currentUser?.save.find(
    (record) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(savedPostRecord ? true : false);
  }, [currentUser]);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ userId: userId, postId: post.$id });
      setIsSaved(true);
    }
  };
  return <div>something</div>;
};

export default UserActions;
