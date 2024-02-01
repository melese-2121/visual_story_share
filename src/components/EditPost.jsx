import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import { postValidationSchema } from "../schemas/CreatePostSchema";
import ImageUploader from "../_Root/Pages/ImageUploader";
import Toast from "./shared/Toast";
import {
  useGetPostById,
  useUpdatePost,
} from "../lib/react-query/queriesAndMutations";
import { BiEdit } from "react-icons/bi";

const EditPost = () => {
  const { mutateAsync: updatePost, isLoading: isLoadingUpdate } =
    useUpdatePost();
  const { id } = useParams();
  const { data: post, isPending: isLoadingPost } = useGetPostById(id || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [updateError, setUpdateError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const onSubmit = async (values, { resetForm }) => {
    const newValues = {
      ...values,
      file: selectedImage && selectedImage,
    };
    const updatedPost = await updatePost({
      ...newValues,
      postId: post.$id,
      imageId: post.imgId,
      imgUrl: post.imgUrl,
    });

    if (!updatedPost) {
      setUpdateError(true);
      navigate("/");
    } else {
      setUpdateSuccess(true);

      return navigate(`/posts/${post.$id}`);
    }
  };

  const formik = useFormik({
    initialValues: {
      caption: post?.caption,
      location: post?.location,
      tags: post?.tags,
      imgUrl: post?.imgUrl,
      file: [],
    },
    validationSchema: postValidationSchema,
    onSubmit,
  });

  const handleReset = () => {
    formik.resetForm();
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleImageSelect = (imageFile) => {
    setSelectedImage(imageFile);
    formik.setFieldValue("file", imageFile);
  };

  return (
    <section className="create-post-form overflow-y-scroll">
      <section className="flex justify-center gap-3 mx-auto ">
        <BiEdit className="w-10 h-10" />
        <h1 className="text-[26px] font-bold mt-1">Edit Post</h1>
      </section>
      <form onSubmit={formik.handleSubmit} className="create-post-container">
        <div>
          <ImageUploader onImageSelect={handleImageSelect} />
        </div>
        <div className="mb-4">
          <label htmlFor="caption" className="block  font-bold mb-2">
            Caption:
          </label>
          <textarea
            id="caption"
            name="caption"
            rows="3"
            className={`w-full p-2 border rounded ${
              formik.errors.caption && formik.touched.caption
                ? "border-red"
                : "border-red"
            }`}
            placeholder="Enter your caption"
            value={formik.values.caption}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          {formik.errors.caption && (
            <p className="text-red text-sm italic mt-1">
              {formik.errors.caption}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700  font-bold mb-2"
          >
            Location:
          </label>
          <input
            autoComplete="off"
            type="text"
            id="location"
            name="location"
            className={`w-full p-2 border rounded ${
              formik.errors.location ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your location"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
          {formik.errors.location && (
            <p className="text-red text-sm italic mt-1">
              {formik.errors.location}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700  font-bold mb-2">
            Tags:
          </label>
          <input
            autoComplete="off"
            type="text"
            id="tags"
            name="tags"
            className={`w-full p-2 border rounded ${
              formik.errors.tags ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your tags"
            value={formik.values.tags}
            onChange={formik.handleChange}
          />
          {formik.errors.tags && (
            <p className="text-red text-sm italic mt-1">{formik.errors.tags}</p>
          )}
        </div>
        <div className="flex justify-between mb-4">
          {/* ... (existing buttons) ... */}

          <div className="flex ml-auto">
            <button
              type="button"
              onClick={handleReset}
              className="post-form-reset-button"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="post-form-cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoadingUpdate}
            className="post-form-submit-btn"
          >
            Edit
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPost;
