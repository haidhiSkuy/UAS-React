import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar variant="dark">
      <Navbar.Brand href="/" className="mx-4">
        <strong>
          BAYAR APP <FontAwesomeIcon icon={faMoneyBillWave} />
        </strong>
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end mx-4">
      </Navbar.Collapse>
      <Button variant="primary" as={Link} to="/admin" style={{textAlign:'right',marginRight:'20px'}}>
              <strong>
                <FontAwesomeIcon icon={faUser} />{" "}
                  <span>&nbsp;&nbsp;</span>
                    Admin
              </strong>
        </Button>
    </Navbar>
  );
};

export default NavbarComponent;
