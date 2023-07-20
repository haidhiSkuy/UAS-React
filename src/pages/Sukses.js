import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Sukses extends Component {
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/sukses.png" width="500" />
        <h2>
          <strong>Pembayaran Berhasil</strong>
        </h2>
        <p>Terima Kasih Telah Menjadi Pelanggan Kami </p>
        <Button variant="primary" as={Link} to="/Invoice">
          Invoice
        </Button>
      </div>
    );
  }
}
