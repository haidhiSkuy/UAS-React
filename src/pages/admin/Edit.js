import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Menus from "./EditMenus";
import { useNavigate, Link } from "react-router-dom";
import { IS_LOGIN } from "./Admin"

const Edit = () => {
  const navigate = useNavigate();
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

  const STATUS = IS_LOGIN
 
  if(STATUS){ 
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Col className="mt-1">
              <h5>
                <strong>Edit menu only for admin</strong>
              </h5>
  
              <Button variant="primary" onClick={() => navigate("/tambahmenu")}>
               TAMBAH MENU
              </Button>
              <hr />
              <Menus tambahPesananHandler={tambahPesananHandler} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else { 
    return(
      <div >
        <h1 style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%", top: "50%", paddingTop:"20%"}}>Access Denied<span role="img">💀</span></h1>
      </div>
    )
  }
};

export default Edit;
