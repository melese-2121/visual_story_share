import { useUserContext } from "../../context/AuthContext";
import { useGetRecentPosts } from "../../lib/react-query/queriesAndMutations";
import UserActions from "./UserActions";

const PostCont = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  const { isAuthenticated, user } = useUserContext();
  return (
    <ul className="grid gap-5">
      {posts?.documents.map((post) => (
        <li key={post.$id}>
          <UserActions post={post} userId={user.id} />
        </li>
      ))}
    </ul>
  );
};

export default PostCont;
