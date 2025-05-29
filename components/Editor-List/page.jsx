"use client";
import axios from "axios";
import { useState } from "react";
const GetEditor = () => {
  const [userlist, setUserlist] = useState([]);
  const getUserList=async()=>{
    const response=await axios.get('')
  }
  return <div></div>;
};

export default GetEditor;
