import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase";
import type { User } from "firebase/auth";
import { useRouter } from "next/router";

type UserType = User | null;

type AuthContextProps = {
  user: UserType;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>(null);
  const auth = getAuth(app);
  const router = useRouter();
  const needLoginPage =
    router.pathname === "/items/cart" ||
    router.pathname === "/items/order" ||
    router.pathname === "/items/ordercomplete";

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      !user && needLoginPage && (await router.push("/user/login"));
    });
    return () => {
      authStateChanged();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const value = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
