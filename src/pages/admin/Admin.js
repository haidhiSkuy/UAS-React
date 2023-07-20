import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"
import { useNavigate } from "react-router-dom";
import Edit from "./Edit";
import "./login.css"

export var IS_LOGIN = false;

const Admin = () => {
  const [todos, setTodos] = useState([]);
    const fetchPost = async () => {
        await getDocs(collection(db, "admin"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                setTodos(newData); 
            })
    }
    useEffect(()=>{
      fetchPost();
    }, [])

    //FETCH ALL ADMIN
    const usernameArr = todos.map(data => data.username);
    const passArr = todos.map(data => data.password);

  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const input_name = inputs.username;
    const nameExist = usernameArr.includes(input_name);
    const nameIndex = usernameArr.indexOf(input_name);

    const realPassword = passArr[nameIndex] 
    const inputPassword = inputs.pass
    const LoginStatus = (realPassword == inputPassword)

    if (nameExist){ 
      if (LoginStatus){ 
        alert("LOGIN SUKSES")
        IS_LOGIN = true
        navigate("/edit")
    
      } else {
        //LOGIN GAGAL
        alert("WRONG USERNAME OR PASSWORD")
      }
    } else { 
      //LOGIN GAGAL
      alert("WRONG USERNAME OR PASSWORD")
    }
  }

  return (
    <div>
      <div className="overlay">
        <form onSubmit={handleSubmit} className="LoginForm">
          <div className="con">
            <header className="head-form">
              <h2>Login Admin Kafe</h2>
            </header>
            <br></br>
              <div className="field-set">
                <span className="input-item">
                  <i className="fa fa-user-circle"></i>
                </span>
                <input type="text" name="username" value={inputs.username || ""} onChange={handleChange} className="form-input" id="txt-input" placeholder="Username" required />
                <br></br>
                <span className="input-item">
                  <i className="fa fa-key"></i>
                </span>
                <input type="password" name="pass" value={inputs.pass || ""} onChange={handleChange} className="form-input" placeholder="Password" id="pwd" required />
                <span>
                  <i className="fa fa-eye" aria-hidden="true"  type="button" id="eye"></i>
                </span>
                <br></br>
                <button className="log-in" type="submit"> Log In </button>
              </div>
    </div>
    </form>
    </div>
    </div>
  )

  // return (
  //   <div>
  //   <form onSubmit={handleSubmit}>
  //     <label>Username:
  //     <input type="text" name="username" value={inputs.username || ""} onChange={handleChange}/>
  //     </label>
  //     <br></br>
  //     <label>Password:<input type="password" name="pass" value={inputs.pass || ""} onChange={handleChange} />
  //     </label>
  //     <input type="submit" />
  //   </form>
  // </div>
  // )
}

export default Admin;