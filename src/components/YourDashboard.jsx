import React from "react";
import { Row, Col, Image, Container } from "react-bootstrap";
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { BiMoney } from "react-icons/bi";
import { RiFlag2Fill } from "react-icons/ri";
class YourDashboard extends React.Component {
  render() {
    return (
      <Container fluid className="dasboardContainer">
        <Row className="yourDasboard move"> Your Dashboard </Row>
        <Row className="privateToYou move"> Private to you </Row>
        <Container fluid className="firstInsideContainer">
          <Row>
            <Col sm={4} className="colToRepsonse">
              <Row className="number">44</Row>
              <Row className="textInContainer">Who viewed your profile</Row>
            </Col>
            <Col sm={4} className="colBorderLeft colToRepsonse">
              <Row className="number">56</Row>
              <Row className="textInContainer">Article views</Row>
            </Col>
            <Col sm={4} className="colBorderLeft last colToRepsonse">
              <Row className="number">22</Row>
              <Row className="textInContainer">Search appearances</Row>
            </Col>
          </Row>
        </Container>
        <Container fluid className="secondInsideContainer">
          <Row>
            <Col sm={1}>
              <BiMoney className="dirtyMoney" />
            </Col>
            <Col className="secondColForContainer" sm={11}>
              <Row className="outOfNames">Salary insights </Row>
              <Row className="outOfNames2 first">
                See how your salary compares to others in the community{" "}
              </Row>
            </Col>{" "}
          </Row>
          <Row>
            <Col sm={1}>
              <RiFlag2Fill className="dirtyFlag" />
            </Col>
            <Col sm={11}>
              <Row className="outOfNames">My items </Row>
              <Row className="outOfNames2">
                Keep track of your jobs, courses and articles{" "}
              </Row>
            </Col>{" "}
          </Row>
        </Container>
      </Container>
    );
  }
}
export default YourDashboard;
