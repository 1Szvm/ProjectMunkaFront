import {collection,query, orderBy,onSnapshot, doc, getDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
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

export const addPost =async (formData) => {
  console.log(formData);
   const collectionRef= collection(db, "posts");
   const newItem={...formData,timestamp:serverTimestamp()}
   const newDocRef=await addDoc(collectionRef,newItem)
 };

 export const updatePost=async (id,{title,category,story})=>{
  const docRef= doc(db, "posts", id);
  await updateDoc(docRef,{title,category,story})
}