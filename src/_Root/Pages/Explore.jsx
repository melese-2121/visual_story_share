import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useInView } from "react-intersection-observer";
import Post from "../Pages/Post";
import {
  useGetPosts,
  useSearchPosts,
} from "../../lib/react-query/queriesAndMutations";
import PostLoading from "../../components/shared/PostLoading";
import GridPostList from "../../components/shared/GridPostList";

const SearchResults = ({ isSearchFetching, searchedPosts }) => {
  if (isSearchFetching) {
    return <PostLoading />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if (!posts)
    return (
      <div className="h-full -mt-10 w-full ">
        <PostLoading />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts?.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container overflow-scroll w-full">
      <div className="explore-inner_container max-lg:fixed max-lg:top-10 z-40 w-full max-lg:px-10 max-lg:pt-3 pb-1  max-lg:bg-[#823ef7]  max-w-full   sm:px-0">
        {/* <div className="flex space-between sm:hidden w-full justify-between">
          <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
          <div className="flex-center gap-3 bg-gray-200 rounded-xl px-4 py-2 cursor-pointer">
            <p className="small-medium md:base-medium text-gray-700">All</p>
            <i className="fas fa-filter text-gray-500"></i>
          </div>
        </div> */}
        <div className="flex justify-start items-center gap-x-2 sm:fixed sm:z-40 sm:top-1 px-2 rounded-lg bg-white">
          <i className="fas fa-search text-gray-500"></i>
          <input
            type="text"
            placeholder="Search"
            className="explore-search z-50"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>
      <div className="flex-between w-full px-[5%] max-w-5xl mt-4 mb-7 ">
        <h3 className="body-bold font-normal text-gray-700">Popular Today</h3>
      </div>
      <div className="w-[400px]   flex flex-col gap-9">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10 ">
          <PostLoading />
        </div>
      )}
    </div>
  );
};

export default Explore;
