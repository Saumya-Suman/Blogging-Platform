// src/firebase/blogService.js

import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Add new blog
export const addBlog = async (blogData) => {
  const docRef = await addDoc(collection(db, "posts"), blogData);
  return docRef.id;
};

// Get all blogs
export const getAllBlogs = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get a single blog by ID
export const getBlogById = async (id) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Update a blog
export const updateBlog = async (id, updatedData) => {
  const docRef = doc(db, "posts", id);
  await updateDoc(docRef, updatedData);
};

// Delete a blog
export const deleteBlog = async (id) => {
  const docRef = doc(db, "posts", id);
  await deleteDoc(docRef);
};
