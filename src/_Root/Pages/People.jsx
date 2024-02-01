import {
  useGetUsers,
  useSearchUsers,
} from "../../lib/react-query/queriesAndMutations";
import PostLoading from "../../components/shared/PostLoading";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const People = () => {
  const [searchValue, setSearchValue] = useState("");
  const { ref, inView } = useInView();
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isPending: isLoadingUsers,
  } = useGetUsers();
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedUsers, isFetching: isSearchFetching } =
    useSearchUsers(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if (!users && isLoadingUsers) return <PostLoading />;

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    users?.pages.every((item) => item.documents.length === 0);

  const SearchResults = ({ isSearchFetching, searchedUsers }) => {
    if (isSearchFetching) {
      return <PostLoading />;
    } else if (searchedUsers && searchedUsers.documents.length > 0) {
      return <GridPostList posts={searchedUsers.documents} />;
    } else {
      return (
        <p className="text-light-4 mt-10 text-center w-full">
          No results found
        </p>
      );
    }
  };

  console.log(searchedUsers);

  return (
    <section className="w-full h-auto bg-stone-100 mt-3 overflow-scroll custom-scrollbar">
      <div className="user-inner_container py-0">
        <h2 className="h3-bold md:h2-bold w-full">Find people</h2>
        <div className="flex justify-center items-center  px-5 w-full rounded-lg bg-white">
          <i className="fas fa-search text-gray-500"></i>
          <input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>
      <p className="text-center font-serif text-zinc-600 my-3">
        You may know those people
      </p>

      <div>
        {shouldShowSearchResults ? (
          console.log(searchedUsers)
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          <div>
            {users?.pages.map((data) => (
              <div
                key={data.documents}
                className="grid grid-cols-1 mb-3 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3  "
              >
                {data.documents.map((user) => (
                  <div
                    key={user.$id}
                    className="mx-auto bg-slate-900 w-[80%] rounded-md py-3 flex  items-center"
                  >
                    <img
                      src={user.imgUrl}
                      alt="User Photo"
                      className="w-20 h-20 rounded-full mx-3"
                    />
                    <div>
                      <p className="text-gray-300 font-bold text-lg font-sans">
                        {user.name}
                      </p>
                      <p className="text-gray-500 font-serif text-sm italic ">
                        <span className="text-teal-400"> @</span>
                        {user.username}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mb-5 pt-2 bg-stone-100 ">
          <PostLoading />
        </div>
      )}
    </section>
  );
};

export default People;
