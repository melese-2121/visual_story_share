import PostCont from "./PostCont";

const SavedPostCard = ({ userSaved }) => {
  return (
    <div className="grid gap-5">
      {userSaved.map((saved, index) => (
        <div
          className=" max-w-md mx-auto bg-white shadow-lg rounded-md relative"
          key={index}
        >
          <img
            className="w-full h-48 object-cover object-center rounded-t-md "
            src={saved.post.imgUrl}
            alt="Post Image"
          />
          <div className="h-12 flex justify-between items-center ">
            <img
              className="w-10 h-10 rounded-full p-1"
              src={saved.user.imgUrl}
              alt="Saved Image"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedPostCard;
