import { getAuth } from "firebase/auth";

export const allUsers =async()=>{
    getAuth()
        .getUser("JCY7Plpkb7eLPb5PUKsstgVwbny1")
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });
}