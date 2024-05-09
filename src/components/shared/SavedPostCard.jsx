import PostCont from "./PostCont";

const SavedPostCard = ({ userSaved }) => {
  console.log(userSaved);
  return (
    <div className="grid gap-5">
      {userSaved.map((saved, index) => (
        <div
          className=" max-w-[90%] max-sm:p-2 mx-auto  bg-white shadow-lg rounded-md  relative"
          key={index}
        >
          <div className="h-12  flex justify-between items-center ">
            <img
              className="w-10 h-10 rounded-full p-1"
              src={saved.user.imgUrl}
              alt="Saved Image"
            />
          </div>
          <p className="px-3 pb-4">{saved.post.caption}</p>
          <img
            className="w-full h-48 object-cover object-center rounded-t-md "
            src={saved.post.imgUrl}
            alt="Post Image"
          />
        </div>
      ))}
    </div>
  );
};

export default SavedPostCard;
