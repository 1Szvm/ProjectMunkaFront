import {collection,query, orderBy,onSnapshot, doc, getDoc, updateDoc, arrayUnion, arrayRemove, addDoc,serverTimestamp, deleteDoc} from "firebase/firestore";
import {db} from "./firebaseApp";

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
    const q = query(collectionRef, orderBy('Ids', 'asc'))
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setAuth(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  export const readPosts = (setPosts) => {
    const collectionRef = collection(db, "forum");
    const q = query(collectionRef, orderBy('Ids', 'asc'))
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

export const addComment=async (id,{uid,comment})=>{
  const docRef= doc(db, "forum", id);
  const docSnap=await getDoc(docRef)

  const commentsMap = docSnap.data().comment || {};
  const userComments = commentsMap[uid] || [];
  userComments.push(comment);
  await updateDoc(docRef, {
    [`comment.${uid}`]: userComments,
  });
}

export const deleteFutam=async (id)=>{
  const docRef= doc(db, "futamok", id);
  await deleteDoc(docRef)
}