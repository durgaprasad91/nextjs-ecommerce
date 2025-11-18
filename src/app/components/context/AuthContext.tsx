"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: Omit<User, "password"> | null;
  signup: (name: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<Omit<User, "password"> | null>(null);

  // Load active logged user once
  useEffect(() => {
    try {
      const stored = localStorage.getItem("activeUser");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      console.error("LocalStorage read failed");
    }
  }, []);

  // --------------------------------------
  // ⭐ SIGNUP
  // --------------------------------------
  const signup = useCallback(
    (name: string, email: string, password: string) => {
      try {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.some((user) => user.email === email)) {
          toast.error("Account already exists");
          return;
        }

        const newUser = { name, email, password };
        const updatedUsers = [...users, newUser];

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem(
          "activeUser",
          JSON.stringify({ name, email })
        );

        setUser({ name, email });

        toast.success("Account created successfully!");
        router.push("/");
      } catch {
        toast.error("Something went wrong");
      }
    },
    [router]
  );

  // --------------------------------------
  // ⭐ LOGIN
  // --------------------------------------
  const login = useCallback(
    (email: string, password: string) => {
      try {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

        const found = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!found) {
          toast.error("Invalid credentials");
          return;
        }

        localStorage.setItem(
          "activeUser",
          JSON.stringify({ name: found.name, email: found.email })
        );

        setUser({ name: found.name, email: found.email });

        toast.success("Logged In");
        router.push("/");
      } catch {
        toast.error("Something went wrong");
      }
    },
    [router]
  );

  // --------------------------------------
  // ⭐ LOGOUT
  // --------------------------------------
  const logout = useCallback(() => {
    localStorage.removeItem("activeUser");
    setUser(null);
    toast("Logged out");
    router.push("/");
  }, [router]);

  // Memoize context value to avoid rerenders
  const value = useMemo(
    () => ({
      user,
      signup,
      login,
      logout,
    }),
    [user, signup, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
