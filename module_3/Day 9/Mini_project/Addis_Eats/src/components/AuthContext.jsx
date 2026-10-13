
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("addis-eats-user");

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);

        if (
          parsedUser &&
          typeof parsedUser.name === "string" &&
          typeof parsedUser.email === "string"
        ) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("addis-eats-user");
        }
      }
    } catch {
      localStorage.removeItem("addis-eats-user");
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback((name, email) => {
    const signedInUser = { name, email };

    localStorage.setItem(
      "addis-eats-user",
      JSON.stringify(signedInUser)
    );

    setUser(signedInUser);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("addis-eats-user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
