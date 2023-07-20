import React, { useEffect, useState } from "react";
import { Row, Card, Col, Button, Modal, Form } from "react-bootstrap";
import MenuDataService from "../../services/menu.services";
import { numberWithCommas } from "../../services/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faSave,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

const Menus = () => {
  const [menu, setMenu] = useState([]);
  const [editMenu, setEditMenu] = useState(null); // State untuk melacak item menu yang sedang diedit
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    const data = await MenuDataService.getAllMenu();
    setMenu(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await MenuDataService.deleteMenu(id);
    getMenu();
  };

  const handleEdit = (menuItem) => {
    setEditMenu(menuItem);
    setShowEditModal(true);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditMenu({ ...editMenu, [name]: value });
  };

  const handleSaveEdit = async () => {
    await MenuDataService.updateMenu(editMenu.id, editMenu);
    getMenu();
    setShowEditModal(false);
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
      
                  <Button variant="success" onClick={() => handleEdit(doc)}>
                    <strong>
                      <FontAwesomeIcon icon={faEdit} />{" "}
                      <span>&nbsp;&nbsp;</span>
                      Edit
                    </strong>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    <strong>
                      <FontAwesomeIcon icon={faTrash} />{" "}
                      <span>&nbsp;&nbsp;</span>
                      Hapus
                    </strong>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <strong>Edit Item Menu</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editMenu && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Nama Produk</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="produk"
                  value={editMenu.produk}
                  onChange={handleEditInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Kategori</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="kategori"
                  value={editMenu.kategori}
                  onChange={handleEditInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Harga</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="harga"
                  value={editMenu.harga}
                  onChange={handleEditInputChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            <strong>
              <FontAwesomeIcon icon={faClose} /> <span>&nbsp;</span>Tutup
            </strong>
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            <strong>
              <FontAwesomeIcon icon={faSave} /> <span>&nbsp;</span>Simpan
            </strong>
          </Button>
        </Modal.Footer>
      </Modal>

      
    </div>
  );
};

export default Menus;
