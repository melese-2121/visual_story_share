import { Link } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import PostCont from "./PostCont";

const GridPostList = ({ posts, showUser = true, showStats = true }) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container py-2 gap-y-2 ">
      {posts.map((post) => (
        <li
          key={post.$id}
          className="relative w-[90%] bg-white shadow-2xl rounded-lg p-4 mx-auto "
        >
          <div className=" -mt-12 mb-4 border-x-2 rounded-2xl px-2 py-2 border-t-2 border-stone-200 bg-white">
            {showUser && (
              <div className="flex  items-center  justify-center gap-2 flex-1  ">
                <img
                  src={
                    post.creator.imgUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1 font-bold text-lg">
                  {post.creator.name}
                </p>
              </div>
            )}
          </div>
          <p className="mb-2 text-center">{post.caption}</p>
          <Link to={`/posts/${post.$id}`} className="grid-post_link ">
            <img
              src={post.imgUrl}
              alt="post"
              className="w-full h-auto object-cover "
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
