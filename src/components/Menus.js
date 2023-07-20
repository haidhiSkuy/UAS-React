import React, { useEffect, useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import MenuDataService from "../services/menu.services";
import { numberWithCommas } from "../services/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Menus = ({ tambahPesananHandler }) => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    const data = await MenuDataService.getAllMenu();
    setMenu(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div>
      <Row className="overflow-auto menu">
        {menu.map((doc) => (
          <Col md={3} xs={6} className="mb-3" key={doc.id}>
            <Card className="shadow" key={doc.id}>
              <Card.Img variant="top" src={doc.foto} />
              <Card.Header className="text-center">
                <strong className="text-uppercase">{doc.kategori}</strong>
              </Card.Header>
              <Card.Body className="text-center">
                <Card.Title>
                  <strong className="text-uppercase">{doc.produk}</strong>
                </Card.Title>
                <Card.Text>Rp {numberWithCommas(doc.harga)}</Card.Text>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    onClick={() => tambahPesananHandler(doc)}
                  >
                    <strong>
                      <FontAwesomeIcon icon={faPlus} />{" "}
                      <span>&nbsp;&nbsp;</span>
                      Tambah Pesanan
                    </strong>
                  </Button>
                 <Button style={{backgroundColor:"white", 
                                 borderColor:"white", 
                                 maxHeight:"0px", paddingTop:"50px"}}>
                    <strong>
                     
                    </strong>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Menus;
