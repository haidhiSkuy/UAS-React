import React, { useState } from "react";
import { Form, Col, Row, Button, Container, Alert } from "react-bootstrap";
import MenuDataService from "../services/menu.services";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const TambahMenu = () => {
  const [produk, setProduk] = useState("");
  const [kode, setKode] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("");
  const [foto, setFoto] = useState(null);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const types = ["image/jpg", "image/png", "image/jpeg"];

  const handleFoto = (e) => {
    let selectedFoto = e.target.files[0];
    if (selectedFoto && types.includes(selectedFoto.type)) {
      setFoto(selectedFoto);
      setMessage({ error: false, msg: "" });
    } else {
      setFoto(null);
      setMessage({
        error: true,
        msg: "Pilih Gambar Dengan Ekstensi PNG, JPG, JPEG",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (
      produk === "" ||
      kode === "" ||
      harga === "" ||
      kategori === "" ||
      foto === null
    ) {
      setMessage({ error: true, msg: "Semua Kolom Harus Diisi" });
      return;
    }
    try {
      const storageRef = ref(storage, 'product-images/' + foto.name);
      await uploadBytes(storageRef, foto);

      const url = await getDownloadURL(storageRef);

      const newMenu = {
        produk,
        kode,
        harga,
        kategori,
        foto: url,
      };
      await MenuDataService.addMenu(newMenu);
      setMessage({ error: false, msg: "Menu Berhasil Ditambahkan" });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setProduk("");
    setKode("");
    setHarga("");
    setKategori("");
    setFoto(null);
  };
  return (
    <Container>
      <Form className="mt-5 mx-5" onSubmit={handleSubmit}>
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
        <center>
          <h3>
            <strong>Tambah Menu</strong>
          </h3>
        </center>
        <hr />
        <Row className="mt-5 mb-5">
          <Form.Group as={Col} controlId="formGridNameProduct">
            <Form.Label>
              <strong>Nama Produk</strong>
            </Form.Label>
            <Form.Control
              placeholder="Masukkan Nama Produk"
              value={produk}
              onChange={(e) => setProduk(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCodeProduct">
            <Form.Label>
              <strong>Kode Produk</strong>
            </Form.Label>
            <Form.Control
              placeholder="Masukkan Kode Produk"
              value={kode}
              onChange={(e) => setKode(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-5">
          <Form.Group as={Col} controlId="formGridPrice">
            <Form.Label>
              <strong>Harga Produk</strong>
            </Form.Label>
            <Form.Control
              placeholder="Masukkan Harga Barang"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCategoryProduct">
            <Form.Label>
              <strong>Kategori Produk</strong>
            </Form.Label>
            <Form.Control
              placeholder="Masukkan Kategori Produk"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
            />
          </Form.Group>
        </Row>
        <hr />
        <Form.Group className="mb-3" controlId="formGridPhotoProduct">
          <Form.Label>
            <strong>Photo Produk</strong>
          </Form.Label>
          <Form.Control type="file" onChange={handleFoto} />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" className="mt-3">
            <strong>Tambah Menu</strong>
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default TambahMenu;
