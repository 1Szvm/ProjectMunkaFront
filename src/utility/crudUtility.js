import {collection,query, orderBy,onSnapshot, doc, getDoc, updateDoc} from "firebase/firestore";
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

  export const toggleAplication=async (id,uid)=>{
    const docRef= doc(db, "futamok", id);
    const docSnap=await getDoc(docRef)
    const appliArr=docSnap.data().resztvevok || []
    if(appliArr.includes(uid)){
      await updateDoc(docRef,{resztvevok:appliArr.filter(id=>id!=uid)})
    }else{
      await updateDoc(docRef,{resztvevok:[...appliArr,uid]})
    }
  }