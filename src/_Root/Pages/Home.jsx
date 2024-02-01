import { useEffect } from "react";
import PostCard from "../../components/shared/PostCard";
import PostLoading from "../../components/shared/PostLoading";
import { useGetRecentPosts } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FooterPeople from "../../components/shared/FooterPeople";

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  const { isAuthenticated, user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/sign-in");
  });

  return (
    <section>
      <hr className=" w-[80%] mx-auto border-gray-300 " />
      <div className="md:hidden footer-people z-50 py-2 rounded-b-full flex justify-center items-center">
        <FooterPeople />
      </div>
      <section
        className="mx-auto bg-stone-100 pt-3 overflow-y-auto max-md:w-[90%] md:w-[70%]  h-screen"
        style={{ scrollbarColor: "white" }}
      >
        <div>
          {isPostLoading ? (
            <PostLoading />
          ) : (
            <section>
              <ul className="grid gap-5">
                {posts.documents.map((post) => (
                  <li key={post.$id}>
                    <PostCard post={post} userId={user.id} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </section>
    </section>
  );
};

export default Home;
