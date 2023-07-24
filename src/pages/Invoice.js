import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import './invoice_css/Invoice.style.css'
import logo from './invoice_css/logo.png';
import { db } from "../firebase";
import { useNavigate } from 'react-router-dom'

const Invoice = () => {
  const [todos, setTodos] = useState([]);
    const fetchPost = async () => {
        await getDocs(collection(db, "orders"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                setTodos(newData); 
                console.log(newData);
            })
    }


    useEffect(()=>{
      fetchPost();
    }, [])

    var [date, setDate] = useState(new Date());
    useEffect(()=>{
      var timer = setInterval(() => setDate(new Date()), 1000)
      return function cleanup(){
        clearInterval(timer)
      }
    })
    
    return (
      <div style={{position: "relative", 
                   width: "21cm", 
                   height: "29.7cm", 
                   margin: "0 auto", 
                   color: "#001028",
                   }}>

        <header class="clearfix">   
        <div id="logo">
          <Image src={logo} />
        </div>
        <h1 className='h1invoice'>INVOICE</h1>
    
      <div id="project">
        <div><span>PROJECT</span>  KAFE</div>
        <div><span>ALAMAT</span>  Institut Teknologi Tangerang Selatan</div>
        <div><span>TANGGAL</span>  {date.toLocaleDateString()}</div>
        <div><span>ORDER ID</span>  {todos.map(data => data.id)[0]}</div>
      </div>
      </header>

      <main>
      <table>
        <thead>
          <tr>
            <th class="desc">PRODUK</th>
            <th>HARGA</th>
            <th>QTY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>   
        {
            todos.map(data => data.menus.map(food => <Frame 
              produk={food.product['nama']}
              harga={food.product['harga']}
              qty={food.jumlah}
              total={food.jumlah*food.product['harga']}
            />))
        }
          <tr>
            <td colspan="3" class="grand total">TOTAL BAYAR</td>
            {todos.map(data => <td class="grand total">Rp{data.total_bayar.toLocaleString()}</td>)}
          </tr>
        </tbody>
      </table>
    </main>

        <Button variant="primary" as={Link} to="/" onClick={() => 
                                                        deleteDoc(doc(db, "orders", todos.map(data => data.id)[0]))} >
          Kembali
        </Button>

      </div>
    );
}



const Frame = ({ produk, harga, qty, total }) => {
  return (
    <tr>
      <td class="desc">{produk}</td>
      <td class="unit">{harga.toLocaleString()}</td>
      <td class="qty">{qty}</td>
      <td class="total">{total.toLocaleString()}</td>
    </tr>
  );
}


export default Invoice;