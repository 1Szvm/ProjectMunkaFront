import {collection,query, orderBy,onSnapshot, doc, getDoc, updateDoc, arrayUnion, arrayRemove, addDoc,serverTimestamp, deleteDoc} from "firebase/firestore";
import {db} from "./firebaseApp";
import { v4 as uuidv4 } from 'uuid'; // Correct import for UUID v4

  export const readCategories = (setCategories) => {
    const collectionRef = collection(db, "kategoriak");
    const q = query(collectionRef, orderBy('nev', 'asc'))                                       
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  export const readRaces = (setRaces) => {
    const collectionRef = collection(db, "futamok");
    const q = query(collectionRef, orderBy('idopont', 'asc'))                                       
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRaces(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  export const readAuthorization = (setAuth) => {
    const collectionRef = collection(db, "adminIds");
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setAuth(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  export const readPosts = (setPosts) => {
    const collectionRef = collection(db, "forum");
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  export const readPost=async(id,setPost)=>{
    const docRef=doc(db,"forum",id)  
    const unsubscribe=onSnapshot(docRef,(snapshot)=>{
      setPost({...snapshot.data(),id:snapshot.id})
    })
    return unsubscribe
  }

  export const readUsers = (setUsers) => {
    const collectionRef = collection(db, "users");                                      
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  export const toggleAplication = async (id, uid) => {
    const docRef = doc(db, "futamok", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        console.error("Document does not exist");
        return;
    }
    const appliArr = docSnap.data().resztvevok || [];
    if (appliArr.includes(uid)) {
        await updateDoc(docRef, {
            resztvevok: arrayRemove(uid)
        });
        console.log("Removed:", uid);
    } else {
        await updateDoc(docRef, {
            resztvevok: arrayUnion(uid)
        });
        console.log("Added:", uid);
    }
};

export const addFutam = async (formData) => {
    try {
      console.log(formData.imageUrl);
      
        const collectionRef = collection(db, "futamok");
        const newItem = { 
            idopont: formData.idopont instanceof Date 
                ? formData.idopont 
                : serverTimestamp(),
            imageUrl: formData.imageUrl || "",
            kategoria: formData.kategoria || "", 
            max: formData.max ? Number(formData.max) : 0,
            palya: formData.palya || "", 
            resztvevok: Array.isArray(formData.resztvevok) ? formData.resztvevok : [],
        };
        const docRef = await addDoc(collectionRef, newItem);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document:", error);
        throw error;
    }
};

export const updatePost = async (id, { idopont, kategoria, max, palya }) => {
  try {
    const docRef = doc(db, "futamok", id);
    const updatedData = {
      idopont,
      kategoria,
      max,
      palya
    };
    await updateDoc(docRef, updatedData);
    console.log("Post updated successfully!");
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

export const addPost=async({uid,letrehozas,content,title})=>{
  console.log(uid,letrehozas,content,title);
  try {
    const collectionRef = collection(db, "forum");
    const newItem = { 
      uid,
      letrehozas,
      content,
      title,
      comments: {}
    }
    await addDoc(collectionRef, newItem);
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
}

export const deletePost=async(id)=>{
  console.log(id);
  const docRef= doc(db, "forum", id);
  await deleteDoc(docRef)
}

export const addComment = async (id, { uid, comment, date}) => {
  const docRef = doc(db, "forum", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.error("Document does not exist");
    return;
  }

  const commentsMap = docSnap.data().comments || {};
  const randomId = uuidv4();
  const newComment = [uid, comment, date];
  commentsMap[randomId] = newComment;
  await updateDoc(docRef, {
    comments: commentsMap,
  });
  console.log("Comment added successfully!");
};

export const deleteComment = async (postId, commentId) => {
  try {
    const docRef = doc(db, "forum", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const commentsObj = docSnap.data().comments || {};
      // Check if the comment exists in the object
      if (!(commentId in commentsObj)) {
        return;
      }
      // Create a shallow copy without the deleted comment
      const updatedComments = { ...commentsObj };
      delete updatedComments[commentId];
      // Update Firestore with the new object
      await updateDoc(docRef, { comments: updatedComments });
    } else {
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

export const deleteFutam=async (id)=>{
  const docRef= doc(db, "futamok", id);
  await deleteDoc(docRef)
}