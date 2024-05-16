import { useInView } from "react-intersection-observer";
import PostLoading from "../../components/shared/PostLoading";
import { useGetSavedPosts } from "../../lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import GridPostList from "../../components/shared/GridPostList";
import SavedPostCard from "../../components/shared/SavedPostCard";
import { useUserContext } from "../../context/AuthContext";

const Saved = () => {
  const { data: savedPosts, fetchNextPage, hasNextPage } = useGetSavedPosts();
  const { ref, inView } = useInView();
  const { user } = useUserContext();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!savedPosts)
    return (
      <div className="w-full h-full text-center mx-auto ">
        <PostLoading />
      </div>
    );

  return (
    <div className="explore-container">
      {savedPosts &&
        user &&
        savedPosts.pages.map((page, index) => {
          const userSaved = page.documents.filter(
            (post) => post.user.$id === user.id
          );

          if (!userSaved) return <div>No saved post found.</div>;

          return <SavedPostCard userSaved={userSaved} key={index} />;
        })}
      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <PostLoading />
        </div>
      )}
    </div>
  );
};

export default Saved;
