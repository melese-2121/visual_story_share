import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeletePost,
  useGetPostById,
} from "../lib/react-query/queriesAndMutations";
import PostLoading from "./shared/PostLoading";
import { useUserContext } from "../context/AuthContext";
import DeleteIcon from "./shared/DeleteIcon";
import EditIcon from "./shared/EditIcon";
import { FaMapMarker } from "react-icons/fa";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post, isPending: isPostLoading } = useGetPostById(id || "");
  const { mutate: deletePost } = useDeletePost();
  const { user } = useUserContext();

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imgId });
    navigate(-1);
  };

  return (
    <div className="post_details-container">
      {isPostLoading ? (
        <PostLoading />
      ) : (
        <div className="post_details-card">
          <img src={post?.imgUrl} alt="creator" className="post_details-img " />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator.imgUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className=" font-bold ">{post?.creator.name}</p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {/* {post && multiFormatDateString(post?.$createdAt)} */}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <EditIcon />
                </Link>

                <Link
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <DeleteIcon onClick={handleDeletePost} />
                </Link>
              </div>
            </div>
            <div className="flex justify-start items-center gap-x-2">
              <FaMapMarker className="text-red-500 " />
              <p className="subtle-semibold lg:small-regular">
                {post?.location}
              </p>
            </div>

            <hr className=" w-full border-gray-400" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-x-2 mt-2">
                {post?.tags.map((tag, index) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular"
                  >
                    <span className="text-blue-500">#</span>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PostDetail;
