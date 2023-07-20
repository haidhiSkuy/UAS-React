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

const orderCollectionRef = collection(db, "orders");
class OrderDataService {
  addOrder = (newOrder) => {
    return addDoc(orderCollectionRef, newOrder);
  };

  updateOrder = (id, updatedOrder) => {
    const orderDoc = doc(db, "orders", id);
    return updateDoc(orderDoc, updatedOrder);
  };

  deleteOrder = (id) => {
    const orderDoc = doc(db, "orders", id);
    return deleteDoc(orderDoc);
  };

  getAllOrders = () => {
    return getDocs(orderCollectionRef);
  };

  getOrder = (id) => {
    const orderDoc = doc(db, "orders", id);
    return getDoc(orderDoc);
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new OrderDataService();
