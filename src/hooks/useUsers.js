import { useState, useEffect } from "react";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    async function callUsersApiEndpoint() {
      const response = await fetch("https://aocbot.zerobot.xyz/users");
      const data = await response.json();
      setUsers(data);
    }
    callUsersApiEndpoint();
  }, []);

  return users;
}