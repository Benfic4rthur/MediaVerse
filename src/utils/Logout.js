import { getAuth, signOut } from "firebase/auth";

export const logout = () => {
  const auth = getAuth();
  signOut(auth);
};
