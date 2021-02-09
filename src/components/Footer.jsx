import React from "react";
import { Row, Col, Image, Container } from "react-bootstrap";
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
class Footer extends React.Component {
  render() {
    return (
      <Container fluid class="footerContainer ">
        <Row className="mainRow">
          <Col sm={8}>
            <Row>
              <Col sm={4}>
                <Image
                  className="footerImage"
                  src="https://www.comeet.com/resources/wp-content/uploads/2019/03/linkedin-logo.png"
                />
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="footerItem">
                About
              </Col>
              <Col sm={4} className="footerItem">
                Accessibillity
              </Col>
              <Col sm={4} className="footerItem">
                Talent Solutions
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="footerItem">
                Comunity Guidelines
              </Col>
              <Col sm={4} className="footerItem">
                Careers
              </Col>
              <Col sm={4} className="footerItem">
                Marketing Solutions
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="footerItem">
                Privacy And Terms
              </Col>
              <Col sm={4} className="footerItem">
                Ad Choices
              </Col>
              <Col sm={4} className="footerItem">
                Advertising
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="footerItem">
                Sales Solutions
              </Col>
              <Col sm={4} className="footerItem">
                Mobile
              </Col>
              <Col sm={4} className="footerItem">
                Small Business
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="footerItem">
                About
              </Col>
              <Col sm={4} className="footerItem">
                Accessibillity
              </Col>
              <Col sm={4} className="footerItem">
                Talent Solutions
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="footerItemCorporation">
                Stivedin Corporation 2020
              </Col>
            </Row>
          </Col>
          <Col sm={4} className="colWithIcons">
            <Row className="questionRow">
              {" "}
              <Col sm={1}>
                <AiFillQuestionCircle className="questionMark" />{" "}
              </Col>
              <Col className="footerColToMove">
                <Row className="firstRowToCSS">Questions</Row>
                <Row className="HelpCenter">Visit our Help Center</Row>
              </Col>
            </Row>
            <Row className="questionRow">
              {" "}
              <Col sm={1}>
                <IoMdSettings className="questionMark" />{" "}
              </Col>
              <Col className="footerColToMove">
                <Row className="firstRowToCSS">
                  Manage your account and privacy
                </Row>
                <Row className="HelpCenter">Go to your Settings.</Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Footer;
