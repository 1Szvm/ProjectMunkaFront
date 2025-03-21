import axios from 'axios';

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_COULD_NAME}/image/upload`;
    try {
        const response = await axios.post(url, formData);
        return { url: response.data.secure_url, id: response.data.public_id };
    } catch (error) {
        console.error("Error uploading file:", error);
        return { error: "File upload failed" };  // Return an error object
    }
};


//const url="http://localhost:5000/post/"
const url = "https://projectmunkaback.onrender.com/post/";

//This is broken for some fucking reason
export const deletePhoto = async (id) => {
  console.log("Deleting photo with ID:", id);
  try {
    await axios.delete(url+id);
    console.log("Successfully deleted the photo.");
  } catch (error) {
    console.error("Error deleting photo:", error);
  }
};