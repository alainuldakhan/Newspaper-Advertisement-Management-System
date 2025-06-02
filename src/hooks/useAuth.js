import { useState, useEffect } from "react";


export function useAuth() {
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedRole     = localStorage.getItem("userRole");
    const storedUserName = localStorage.getItem("userName");

    if (storedRole)     setRole(storedRole);
    if (storedUserName) setUserName(storedUserName);
  }, []);

  return { role, userName };
}
