import { Link } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import PostCont from "./PostCont";

const GridPostList = ({ posts, showUser = true, showStats = true }) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imgUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user border-x-2 border-b-2 border-stone-100 bg-stone-100">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1  ">
                <img
                  src={
                    post.creator.imgUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
