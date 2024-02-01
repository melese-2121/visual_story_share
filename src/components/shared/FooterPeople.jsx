import { useInView } from "react-intersection-observer";
import { useGetUsers } from "../../lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import PostLoading from "./PostLoading";
import { Spinner } from "react-bootstrap";

const FooterPeople = () => {
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isPending: isLoadingUsers,
  } = useGetUsers();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!users && isLoadingUsers) return <PostLoading />;

  return (
    <div className="footer-people flex justify-center items-center">
      <div className="flex justify-center items-center gap-3">
        {users?.pages.map((data) => (
          <div
            key={data.documents}
            className="flex justify-center items-center gap-3"
          >
            {data.documents.map((user) => (
              <div key={user.$id} className="">
                <img
                  src={user.imgUrl}
                  alt="User Photo"
                  className="w-6 h-6 rounded-full"
                />
              </div>
            ))}
          </div>
        ))}
        {hasNextPage && (
          <div ref={ref}>
            {" "}
            <Spinner
              variant="secondary"
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default FooterPeople;
