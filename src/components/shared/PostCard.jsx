import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faSave } from "@fortawesome/free-solid-svg-icons";
import { FaPencilAlt } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TimeAgo } from "../../utils/TimeAgo";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "../../lib/react-query/queriesAndMutations";
import LikeSaveLoader from "./LikeSaveLoader";
import EditIcon from "./EditIcon";

const PostCard = ({ post, userId }) => {
  const likeList = post.likes.map((user) => userId);
  const [likes, setLikes] = useState(likeList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost, isPending: tryingToLike } = useLikePost();
  const { mutate: savePost, isPending: isSaving } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  const [isHovered, setHovered] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100; // Set your threshold for when the element should be hidden

      if (window.scrollY > threshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Attach the function to the scroll event
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const savedPostRecord = currentUser?.save.find(
    (record) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(savedPostRecord ? true : false);
  }, [currentUser]);

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

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

  return (
    <div className="  w-screen  mx-auto     overflow-hidden">
      <div className="relative max-sm:w-[70%] mx-auto border-2    border-slate-200  rounded-lg px-3 ">
        <div className="py-1    pb-4 px-2 my-1  mb-2 rounded-lg ">
          <div className="flex justify-between gap-2">
            <div className="flex justify-between items-center gap-2">
              <Link to={`profile/${post.creator.id}`}>
                <img
                  className="rounded-full"
                  src={post.creator.imgUrl}
                  alt="img"
                  width={39}
                  height={39}
                />
              </Link>
              <div>
                <p className="text-xl font-bold italic">{post.creator.name}</p>
                <p className="text-sm">
                  <TimeAgo dateString={post.$createdAt} />
                </p>
              </div>
            </div>

            <div className="grid gap-1 justify-center text-center">
              <Link
                to={`/update-post/${post?.$id}`}
                className={`${post.creator.$id !== userId && "hidden"}`}
              >
                <EditIcon />
              </Link>
            </div>
          </div>
          <p className="mt-2 ">{post.caption}</p>
        </div>
        <div
          className="group overflow-hidden  rounded-md text-center mx-auto "
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Link to={`/posts/${post.$id}`}>
            <img
              src={post.imgUrl}
              alt="Image"
              className={`min-w-[95%] max-w-full object-cover mx-auto rounded-md  transition-transform duration-500 transform ${
                isHovered ? " border-1 duration-1000 rounded-lg " : ""
              } `}
            />
          </Link>
        </div>

        <div
          className={` mt-3 px-5  flex justify-between  w-full ${
            isVisible
              ? "opacity-100"
              : "opacity-0 transition-opacity duration-300"
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div>
            {tryingToLike ? (
              <div className="ml-10">
                <LikeSaveLoader />
              </div>
            ) : (
              <div className="flex justify-center items-center gap-1 mt-1">
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`cursor-pointer ml-2 w-5 h-5 transition-colors 
                ${
                  likes.includes(userId)
                    ? "text-green-500 font-bold "
                    : "text-neutral-600 "
                } `}
                  onClick={handleLikeClick}
                />
                <p className="text-sm font-mono">{likes.length}</p>
              </div>
            )}
          </div>

          <div>
            {isSaving || isDeletingSaved ? (
              <LikeSaveLoader />
            ) : (
              <div className="flex justify-center items-center gap-1">
                <FontAwesomeIcon
                  icon={faSave}
                  className={`cursor-pointer ml-2 w-5 h-5 transition-colors ${
                    isSaved ? "text-green-500 font-bold " : "text-neutral-600"
                  }`}
                  onClick={handleSaveClick}
                />

                <p className="text-sm font-mono">Save</p>
              </div>
            )}
          </div>
        </div>
        {/* Comment icon and input bar */}
        <div className=" flex justify-center items-center text-center border-2 py-1 border-gray-200 focus:border-gray-500 rounded-md  px-2 w-full mt-3 my-2">
          <FontAwesomeIcon icon={faComment} className="text-gray-500 mr-2 " />
          <Form className="w-full">
            <input
              type="text"
              id="commentInput"
              placeholder="Add a comment..."
              value={commentText}
              onChange={handleInputChange}
              className="border-none outline-none w-full text-sm h-full py-1 flex justify-center items-center "
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
