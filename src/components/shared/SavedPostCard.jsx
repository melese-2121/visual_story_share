import PostCont from "./PostCont";

const SavedPostCard = ({ userSaved }) => {
  console.log(userSaved);
  return (
    <div className="grid gap-5">
      {userSaved.map((saved, index) => (
        <div
          className=" max-md:w-[80%] md:w-[60%] md:flex justify-between items-center p-4  max-sm:p-2 mx-auto  bg-white shadow-lg   relative"
          key={index}
        >
          <div>
            <div className="h-12  flex justify-between items-center ">
              <img
                className="w-10 h-10 rounded-full p-1"
                src={saved.user.imgUrl}
                alt="Saved Image"
              />
            </div>
            <p className="px-3 pb-4">{saved.post.caption}</p>
          </div>
          <img
            className="w-[100%] md:w-[20%] auto object-cover object-center rounded-t-md "
            src={saved.post.imgUrl}
            alt="Post Image"
          />
        </div>
      ))}
    </div>
  );
};

export default SavedPostCard;
