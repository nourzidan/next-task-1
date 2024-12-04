
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mood } from "../../pages/Dashboard";
import './CreateForm.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface MoodContextType {
  mood: string;
}

export default function CreateForm() {
  const { mood } = useContext(Mood) as MoodContextType;

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);

  const navigate = useNavigate();

  // Handle image file selection
  const handleImageChange = (file: File) => {
    setNewImage(URL.createObjectURL(file)); 
  };

  const send = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, price, image });

    axios.post(
      'https://vica.website/api/items',
      { name, price, image },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('userdata')!).token
          }`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      console.log(res);
      navigate("/", { state: { message: 'Your product was created successfully' } });
    })
    .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={`head${mood}`}>
        <h1>Create Product</h1>
      </div>
      <form className={`form${mood}`} onSubmit={send}>
        <div className="left">
          <div>
            <label htmlFor="name">Product Name: </label>
            <input
              id="name"
              type="text"
              placeholder="Enter Product Name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price">Product Price: </label>
            <input
              id="price"
              type="text"
              placeholder="Enter Product Price"
              onChange={(event) => setPrice(Number(event.target.value))}
            />
          </div>
          <div>
            <input type="submit" value="Create" />
          </div>
        </div>
        <div className="right">
          <label htmlFor="image">
            <img
              style={{ maxWidth: "150px" }}
              src={newImage || "/public/assets/icons/upload.svg"}
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                setImage(file);
                handleImageChange(file);
              }
            }}
          />
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
