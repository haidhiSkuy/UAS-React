import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Menus from "../components/Menus";
import Pesanan from "../components/Pesanan";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";


const Home = () => {
  const [pesanan, setPesanan] = useState([]);

  const updatePesanan = (updatedItem) => {
    setPesanan((prevPesanan) =>
      prevPesanan.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const tambahPesananHandler = (menuItem) => {
    const existingItem = pesanan.find((item) => item.id === menuItem.id);

    if (existingItem) {
      const updatedPesanan = pesanan.map((item) =>
        item.id === menuItem.id ? { ...item, jumlah: item.jumlah + 1 } : item
      );
      setPesanan(updatedPesanan);
    } else {
      setPesanan([...pesanan, { ...menuItem, jumlah: 1 }]);
    }
  };


    const deleteInvoiceCache = async () => {
        await getDocs(collection(db, "orders"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                try{
                  deleteDoc(doc(db, "orders", newData[0].id))
                } catch (error) {
                  console.log('No Invoice')
                }
                
            })
    }

    useEffect(()=>{
      deleteInvoiceCache();
    }, [])

  return (
    <div className="mt-3">
      <Container fluid>
        <Row>
          <Col className="mt-1">
            <h5>
              <strong>Daftar Produk</strong>
            </h5>
            <hr />
            <Menus tambahPesananHandler={tambahPesananHandler} />
          </Col>
          <Pesanan pesanan={pesanan} updatePesanan={updatePesanan} />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
