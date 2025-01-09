import React, { createContext, useEffect, useState, useContext } from "react";
import { auth } from "@/firebaseConfig"; // Import your Firebase auth instance
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [isauthenticated, setIsAuthenticated] = useState(undefined);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsername(user.email);
        setIsAuthenticated(true);

        // Save user data in AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } else {
        setUsername(null);
        setIsAuthenticated(false);

        // Remove user data from AsyncStorage
        await AsyncStorage.removeItem("user");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error;
    }
  };

  // Register function
  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registration successful");
    } catch (error) {
      console.error("Error registering:", error.message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Logout successful");
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        isauthenticated,
        setIsAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
