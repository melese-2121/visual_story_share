import { BiUpload } from "react-icons/bi";
import CreatePostForm from "../../components/forms/CreatePostForm";

const Post = () => {
  return (
    <section className="create-post-form lg:max-w-[600px]  mx-auto overflow-scroll">
      <section className="flex justify-center gap-3 mx-auto ">
        <BiUpload className="w-10 h-10" />
        <h1 className="text-[26px] font-bold mt-1">Create Post</h1>
      </section>
      <CreatePostForm />
    </section>
  );
};

export default Post;
