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

const url="http://localhost:5000"
//const url = "https://projectmunkaback.onrender.com";

export const deletePhoto = async (id) => {
  console.log("Deleting photo with ID:", id);
  try {
    await axios.delete(url+"/post/"+id);
    console.log("Successfully deleted the photo.");
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

export const getUserById = async(id) => {
  axios.get(url+"/api/users/"+id)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error("Error fetching users:", error);
    });
}

export const deleteUserPfp = async(id) => {
  axios.delete(url+"/api/users/"+id+"/photo")
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error("Error fetching users:", error);
    });
}

export const editUserDName = async(id,displayName) => {
  axios.put(url+"/api/users/"+id+"/displayName",{displayName})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error("Error fetching users:", error);
    });
}