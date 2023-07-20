import { db } from "../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const menuCollectionRef = collection(db, "kasir-menu");
class MenuDataService {
  addMenu = (newMenu) => {
    return addDoc(menuCollectionRef, newMenu);
  };

  updateMenu = (id, updateMenu) => {
    const menuDoc = doc(db, "kasir-menu", id);
    return updateDoc(menuDoc, updateMenu);
  };

  deleteMenu = (id) => {
    const menuDoc = doc(db, "kasir-menu", id);
    return deleteDoc(menuDoc);
  };

  getAllMenu = () => {
    return getDocs(menuCollectionRef);
  };

  getMenu = (id) => {
    const menuDoc = doc(db, "kasir-menu", id);
    return getDoc(menuDoc);
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new MenuDataService();
