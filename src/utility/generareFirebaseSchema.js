
import {collection,getDocs} from "firebase/firestore";

export const generateSchema = async (collectionName,setSchema) => {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  const schema = {};

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const type = Array.isArray(value)
        ? "array"
        : value === null
        ? "null"
        : typeof value;
      schema[key] = type; // Egyedi mezőnév és típus tárolása
    });
  });
  setSchema(schema)
  console.log("Schema:", schema);
};


export const generateSchemav2 = async (collectionName,setSchema) => {
  const collectionRef = collection(db,collectionName);
  const snapshot = await getDocs(collectionRef);

  const schema = {};

  console.log('snapshot:',snapshot);
  

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const type = Array.isArray(value)
        ? "array"
        : value === null
        ? "null"
        : typeof value;
      schema[key] = type; // Egyedi mezőnév és típus tárolása
    });
  });
  setSchema(schema)
  console.log("Schema:", schema);
};
