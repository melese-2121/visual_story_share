import * as Yup from "yup";

export const postValidationSchema = Yup.object({
  caption: Yup.string()
    .min(3, "Caption must be at least 3 characters")
    .max(220, "Caption must be at most 220 characters")
    .required("Caption is required"),
  location: Yup.string().required("Location is required"),
  tags: Yup.string()
    .min(3, "Tags must be at least 3 characters")
    .max(220, "Tags must be at most 220 characters")
    .required("Tags are required"),
  // image: Yup.mixed().test("fileType", "Invalid file type", (value) => {
  //   // Validate image type
  //   return value && value.type.startsWith("image/");
  // }),
});
