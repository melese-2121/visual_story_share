import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

import { postValidationSchema } from "../../schemas/CreatePostSchema";
import ImageUploader from "../../_Root/Pages/ImageUploader";
import Toast from "../shared/Toast";
import { useCreatePost } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const CreatePostForm = () => {
  const textareaRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const { mutateAsync: createPost, isPending: isCreatingPost } =
    useCreatePost();
  const { user } = useUserContext();
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    const readFileAsDataURL = (selectedImage) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(selectedImage);
      });
    };

    const newPost = await createPost({
      ...values,
      userId: user.id,
      file: selectedImage,
    });

    resetForm();
    setIsSubmitting(false);
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      caption: "",
      location: "",
      tags: "",
      file: [],
    },
    validationSchema: postValidationSchema,
    onSubmit,
  });

  const handleReset = () => {
    formik.resetForm();
  };

  const handleCancel = () => {
    // Redirect to the home page or any other desired page
    navigate("/");
  };

  const handleImageSelect = (imageFile) => {
    // Handle the selected image in the CreatePostForm component
    setSelectedImage(imageFile);
    formik.setFieldValue("file", imageFile);
  };
  const handleEmojiSelect = (emoji) => {
    // Get the current cursor position
    const cursorPosition = textareaRef.current.selectionStart;

    // Append the selected emoji to the existing text value at the cursor position
    const updatedText =
      formik.values.caption.slice(0, cursorPosition) +
      emoji.native +
      formik.values.caption.slice(cursorPosition);

    // Set the updated text value to the form field
    formik.setFieldValue("caption", updatedText);

    // Move the cursor to the end of the textarea
    textareaRef.current.setSelectionRange(
      cursorPosition + emoji.native.length,
      cursorPosition + emoji.native.length
    );

    // Set focus on the textarea
    textareaRef.current.focus();
  };
  return (
    <form onSubmit={formik.handleSubmit} className="create-post-container">
      <div className="mb-4 duration-500">
        <label htmlFor="caption" className="block  font-bold mb-2">
          Caption:
        </label>
        <div
          className={`w-full duration-500 p-2 outline-none  bg-white rounded ${
            formik.errors.caption && formik.touched.caption
              ? "border-stone-100"
              : "border-stone-200"
          }`}
        >
          <textarea
            id="caption"
            name="caption"
            className="w-full outline-none duration-500"
            rows={`1`}
            placeholder="Enter your caption"
            value={formik.values.caption}
            onChange={formik.handleChange}
            autoComplete="off"
            ref={textareaRef}
          />
          <div
            className="flex justify-end items-end duration-500 relative "
            onClick={() => {
              setIsEmojiPickerVisible(!isEmojiPickerVisible);
            }}
          >
            <FontAwesomeIcon
              onMouseEnter={() => {
                setIsEmojiPickerVisible(true);
              }}
              icon={faSmile}
              className={` p-2  h-6 w-6 px-4 rounded-md duration-500 text-orange-500 cursor-pointer hover:bg-gray-200  ${
                formik.values.caption && "text-orange-500"
              } `}
            />
          </div>
          <div
            className={`${isEmojiPickerVisible ? "d-block" : "d-none"} flex-wrap
             overflow-hidden duration-500 emoji-mart-responsive-container   w-full mx-auto`}
            onMouseEnter={() => {
              setIsEmojiPickerVisible(true);
            }}
            onMouseLeave={() => {
              setIsEmojiPickerVisible(false);
            }}
          >
            <Picker
              data={data}
              previewPosition="none"
              onEmojiSelect={handleEmojiSelect}
            />
          </div>
        </div>
        {formik.errors.caption && (
          <p className="text-red text-sm italic mt-1">
            {formik.errors.caption}
          </p>
        )}
      </div>
      <div>
        <p className="pb-2 text-start font-bold">Add Your Image</p>
        <Toast message="Only image files are allowed." />
        <ImageUploader onImageSelect={handleImageSelect} />
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

        <div className="flex ml-auto gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="post-form-reset-button duration-500"
          >
            <FaSyncAlt />
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="post-form-cancel-button"
          >
            <MdCancel className="text-xl" />
          </button>
        </div>
      </div>

      <div className="text-center w-full">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`post-form-submit-btn duration-500 ${
            isSubmitting && "bg-slate-100"
          } `}
        >
          {isSubmitting ? "Submitting..." : "Post Now"}
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
