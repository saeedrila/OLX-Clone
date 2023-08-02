import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date()
  const history = useHistory()

  const handleSubmit = ()=>{
    //Generate a random string
    const randomString = Math.random().toString(36).substring(2, 10);
    //Create unique image name
    const uniqueImageName = `${Date.now()}-${randomString}-${image.name}`;
    //Save image in the Firestorage
    firebase.storage().ref(`/image/${uniqueImageName}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url)
        //Save data in the firestore
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        history.push('/')
      })
    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input" 
            type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)} 
            name="Price" />
            <br />
          </form>
          <br />
          {image && <img alt="#" width="200px" height="200px" src={URL.createObjectURL(image)}/>}          
            <br />
            <input type="file" 
            onChange={(e)=>{
              setImage(e.target.files[0])
            }}/>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
