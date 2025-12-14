import axios from "axios";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "mlz8crqf"); // must be unsigned

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dss2rl3la/image/upload",
    formData
  );

  return res.data.secure_url;
};


