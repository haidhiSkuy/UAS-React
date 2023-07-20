import { useState } from "react";
import { numberWithCommas } from "../../services/utils";
import {
  Card,
  Col,
  ListGroup,
  Row,
  Badge,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import OrderDataService from "../../services/order.service"; // Update the path accordingly

const Pesanan = ({ pesanan, updatePesanan }) => {
  const [isPembayaranBerhasil, setIsPembayaranBerhasil] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [jumlahPesanan, setJumlahPesanan] = useState(0);
  const [catatan, setCatatan] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const filteredPesanan = pesanan.filter((item) => item.jumlah > 0);

  const calculateTotalHarga = () => {
    return filteredPesanan.reduce(
      (total, item) => total + item.harga * item.jumlah,
      0
    );
  };

  const handlePembayaran = async () => {
    // Prepare the order data to be saved to Firebase
    const orderData = {
      total_bayar: calculateTotalHarga(),
      menus: filteredPesanan.map((item) => ({
        jumlah: item.jumlah,
        total_harga: item.harga * item.jumlah,
        product: {
          id: item.id,
          kode: item.kode,
          nama: item.produk,
          harga: item.harga,
          gambar: item.foto,
        },
        id: item.id,
        catatan: item.catatan || "", // Tambahkan catatan pesanan di sini
      })),
    };

    try {
      // Save the order data to Firebase
      await OrderDataService.addOrder(orderData);

      // Simulasi logika pembayaran berhasil
      setIsPembayaranBerhasil(true);

      // Navigasi ke "/sukses"
      navigate("/sukses");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const handleEditPesanan = (item) => {
    setSelectedItem(item);
    setJumlahPesanan(item.jumlah); // Set nilai jumlah pesanan dari item yang dipilih
    setCatatan(item.catatan || ""); // Set nilai catatan dari item yang dipilih atau kosong jika tidak ada catatan
    setShowModal(true); // Tampilkan modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    // Perbarui jumlah pesanan pada item yang dipilih
    const updatedItem = {
      ...selectedItem,
      jumlah: jumlahPesanan,
      catatan: catatan,
    };

    // Panggil fungsi updatePesanan dengan item yang diperbarui
    updatePesanan(updatedItem);

    // Tutup modal dan reset state
    setShowModal(false);
    setSelectedItem(null);
    setJumlahPesanan(0);
    setCatatan("");
  };

  const handleDeletePesanan = () => {
    const deletedItem = {
      ...selectedItem,
      jumlah: 0,
    };
    updatePesanan(deletedItem);

    // Tutup modal dan reset state
    setShowModal(false);
    setSelectedItem(null);
    setJumlahPesanan(0);
    setCatatan("");
  };

  return (
    <Col md={3} className="mt-1">
      <h5>
        <strong>Pesanan</strong>
      </h5>
      <hr />
      <Card className="overflow-auto hasil">
        {filteredPesanan.map((item) => (
          <ListGroup
            variant="flush"
            key={item.id}
            onClick={() => handleEditPesanan(item)}
          >
            <ListGroup.Item>
              <Row>
                <Col xs={2} className="mt-4">
                  <h4>
                    <Badge pill bg="success" style={{ cursor: "pointer" }}>
                      {item.jumlah}
                    </Badge>
                  </h4>
                </Col>
                <Col className="mt-3">
                  <h5>{item.produk}</h5>
                  <p>Rp {numberWithCommas(item.harga)}</p>
                </Col>
                <Col className="mt-3">
                  <strong className="float-end">
                    Rp {numberWithCommas(item.harga * item.jumlah)}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </Card>
      <>
        {/* Web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h5>
                Total Pesanan :{" "}
                <strong className="float-end me-3">
                  Rp {numberWithCommas(calculateTotalHarga())}
                </strong>
              </h5>
              <div className="d-grid gap-2">
                {!isPembayaranBerhasil && (
                  <Button
                    variant="primary"
                    className="mb-2 me-3"
                    size="lg"
                    onClick={handlePembayaran}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>&nbsp;&nbsp;</span>
                    <strong>BAYAR</strong>
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>

        {/* Mobile  */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h5>
                Total Pesanan :{" "}
                <strong className="float-end me-3">
                  Rp {numberWithCommas(calculateTotalHarga())}
                </strong>
              </h5>
              <div className="d-grid gap-2">
                {!isPembayaranBerhasil && (
                  <Button
                    variant="primary"
                    className="mb-2 me-3"
                    size="lg"
                    onClick={handlePembayaran}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>&nbsp;&nbsp;</span>
                    <strong>BAYAR</strong>
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pesanan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Produk: {selectedItem?.produk}</p>
          <p>Harga: Rp {numberWithCommas(selectedItem?.harga || 0)}</p>
          <Form>
            <Form.Group>
              <Form.Label>Jumlah Pesanan:</Form.Label>
              <Form.Control
                type="number"
                value={jumlahPesanan}
                onChange={(e) => setJumlahPesanan(+e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Catatan:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDeletePesanan}>
            Hapus
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default Pesanan;
