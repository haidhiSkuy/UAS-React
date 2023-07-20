import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Menus from "../components/Menus";
import Pesanan from "../components/Pesanan";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

  return (
    <div className="mt-3">
      <Container fluid>
        <Row>
          <Col className="mt-1">
          <Button variant="primary" as={Link} to="/admin">
              <strong>
                <FontAwesomeIcon icon={faUser} />{" "}
                  <span>&nbsp;&nbsp;</span>
                    Admin
              </strong>
            </Button>
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
