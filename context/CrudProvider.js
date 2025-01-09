import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "@/firebaseConfig"; // Import your Firebase auth instance
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const CRUDContext = createContext();

export const CrudProvider = ({ children }) => {
  const [read, setread] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "adarsha"));
      const todosList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setread(todosList);
    };
    fetchTodos();
  }, []);
  const create = async (task) => {
    await addDoc(collection(db, "adarsha"), {
      data: task,
      createdAt: new Date(),
    });
  };

  const update = async (selectedItem, editText) => {
    await updateDoc(doc(db, "adarsha", selectedItem), {
      data: editText,
      updatedAt: new Date(),
    });
    console.log("object updated=", selectedItem, "updated editText=", editText);
    console.log("object updated");
  };
  const remove = async (task) => {
    await deleteDoc(doc(db, "adarsha", task.id));
    //
    console.log("object deleted");
  };
  return (
    <CRUDContext.Provider
      value={{
        read,
        create,
        update,
        remove,
      }}
    >
      {children}
    </CRUDContext.Provider>
  );
};

export const useCRUD = () => useContext(CRUDContext);
