import { useEffect, useState } from "react";
import { extractUrlAndId } from "../utility/utils";
import { readUsers } from "../utility/backendHandling";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    readUsers(setUsers)
  }, []);

  const LoadingUsers=()=> {
    const [dots, setDots] = useState("");
  
    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 400);
  
      return () => clearInterval(interval);
    }, []);
  
    return <p className="text-center text-lg font-semibold">Loading{dots}</p>;
  }
    
  return (
    <div className="overflow-auto">
      <h2>User List</h2>
      {users.length === 0 ? (
        <>
          <div className="text-center text-lg font-semibold">Loading users or server is offline</div>
          <LoadingUsers />
        </>
      ) : (
      <ul>
        {users?.map(user => (
          <li key={user.uid}  className="border rounded-xl my-2 p-2">
            <img 
              src={user.photoURL ? extractUrlAndId(user.photoURL)?.url : ""} 
              alt="Nopfp" 
              width="50" 
            />
            <strong>{user.displayName || "No Name"}</strong> - {user.email}
          </li>
        ))}
      </ul>)}
    </div>
  );
}

export default UsersList;
