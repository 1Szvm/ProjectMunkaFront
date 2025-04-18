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
        return { error: "File upload failed" };
    }
};

//const url="http://localhost:5000"
const url = "https://projectmunkaback.onrender.com";

export const deletePhoto = async (id) => {
  try {
    await axios.delete(url+"/post/"+id);
  } catch (error) {
    console.error("Error deleting photo:", error);
  }
};

export const readUsers = async(setUsers) => {
  axios.get(url+"/api/users")
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error("Error fetching users:", error);
    });
}

export const deleteUserPfp = async(id) => {
  try {
    await axios.delete(url+"/api/users/"+id+"/photo")
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

export const editUserDName = async(id,displayName) => {
 try {
    await axios.put(url+"/api/users/"+id+"/displayName",{displayName})
  } catch (error) {
    console.error("Error editing user:", error);
  }
}

export const deleteUserById = async(id) => {
  try {
    await axios.delete(url+"/api/users/"+id)
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

export const getCollections = async(setCollections) => {
  try {
    const response = await axios.get(url+"/api/collections")
    setCollections(response.data)
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
}

export const getCollectionData = async(collectionName,setCollectionData) => {
  try {
    const response = await axios.get(url+"/api/collections/"+collectionName)
    setCollectionData(response.data)
  } catch (error) {
    console.error("Error fetching collection data:", error);
  }
}