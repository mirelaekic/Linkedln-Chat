import React from "react";
import "../css/Evgeni.css";
import { GoPencil } from "react-icons/go";
import { Col, Row, Container, Dropdown, Image } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { addProfilePic } from "../fetch";
import PDFDropdown from "./PDFDropdown"
//var tries = 1 NO pl NO
class MyJumbotron extends React.Component {
  state = {
    myObject: {},
  };
  fetchMe = async (id) => {
    try {
      console.log(this.props.tracksUrl);
      let TOKEN = process.env.REACT_APP_TOKEN;
      let response = await fetch(
        `${process.env.REACT_APP_URL}profile/${id ? id : "me"}`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${TOKEN}`,
          }),
        }
      );
      let parsedResponse = await response.json();
      this.setState({ myObject: parsedResponse });
      console.log(parsedResponse);
    } catch (e) {
      console.log("ERROR fetching" + e);
    }
    /*let parsedResponse = await me();
    console.log(parsedResponse);*/
    //this.setState({ myObject: parsedResponse })
  };
  /*fetchAddProfilePic = async (e) => {
		console.log("doing the fetch post")
		let formData = new FormData()
		formData.append("profile", e.target.files[0])
		let parsedResponse = await addProfilePic(formData, this.state.myObject._id)
		console.log(parsedResponse)
	}*/
  fetchAddProfilePic = async (e) => {
    console.log("doing the fetch post");
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    let parsedResponse = await addProfilePic(formData, this.state.myObject._id);
    console.log(parsedResponse);
    this.fetchMe(this.props.id);
  };
  showChangeAvatar = () => {
    let inputButton = document.querySelector(".inputImage");
    //if (tries % 2 == 1) {
    //	inputButton.classList.remove("d-none")
    inputButton.classList.toggle("d-none"); //the logic is wrong and if it wasn't this is still the way to do it not a VAR
    //} else {
    //	inputButton.classList.add("d-none")
    //}
    //tries++
  };
  componentDidMount = () => {
    console.log("id passed to the jumbotron", this.props.id);
    this.fetchMe(this.props.id);
  };
  componentDidUpdate = (oldprops) => {
    document.querySelector(".inputImage").classList.add("d-none");
    if (oldprops.id !== this.props.id) {
      this.fetchMe(this.props.id);
    }
  };
  loadFile = (e) => {
    var image = document.querySelector(".profilePhoto");
    image.src = URL.createObjectURL(e.target.files[0]);
  };
  displayImage = () => {
    let image = document.querySelector(".inputImage");
    console.log(image);
  };
  render() {
    return (
      <>
        <Container className="notJumbotronContainer ">
          <div>
            <Row>
              <Image
                className="profileCover"
                src="https://www.zipjob.com/blog/wp-content/uploads/2020/08/linkedin-default-background-cover-photo-1.png"
                fluid
              />
            </Row>
            <Row className="d-flex align-items-center">
              <Col>
                <Image
                  className="profilePhoto "
                  src={this.state.myObject.image}
                  fluid
                  roundedCircle
                  onClick={() => this.showChangeAvatar()}
                />
                <input
                  className="inputImage d-none"
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  onChange={(event) => this.fetchAddProfilePic(event)}
                />
              </Col>
              <Col className="offset-lg-3">
                <Dropdown className="Jumbodrop">
                  <Dropdown.Toggle
                    className="addProfileSection rounded-pill"
                    id="dropdown-basic"
                  >
                    <strong>Add profile section</strong> 
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="dropDownItem" href="#/action-1">
                      Finding a new job
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item className="dropDownItem" href="#/action-2">
                      Hiring
                    </Dropdown.Item>
					<Dropdown.Item className="dropDownItem" href="#/action-1">
                      Intro
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item className="dropDownItem" href="#/action-2">
                      About
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item className="dropDownItem" href="#/action-3">
                      Background
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item className="dropDownItem" href="#/action-3">
                      Skills
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item className="dropDownItem" href="#/action-3">
                      Accomplishments
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item className="dropDownItem" href="#/action-3">
                      Additional information
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item className="dropDownItem" href="#/action-3">
                      Supported Languages
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={2} lg={2}>
				<PDFDropdown
				id={this.state.myObject._id} />
              </Col>
              <Col sm={1} xl={1} className="d-flex">
                {this.props.id === "me" && (
                  <GoPencil className="icons0 pencil ml-auto " />
                )}
              </Col>
            </Row>
            <h2 className="username mt-3">
              {this.state.myObject.name + " " + this.state.myObject.surname}
            </h2>
            <h5>{this.state.myObject.title + "  @ Strive School"} </h5>
            {/*<Row className="bio">{this.state.myObject.bio}</Row> i commented this out because it broke stuff if the bio was too long*/}
            {/* <Row className="bio">
					{this.state && new String(this.state.myObject.bio).substring(0, 200)}
					{" ..."}
				</Row> */}
            <Row>
              <Col className="location">
                <h5 className="d-inline location">
                  {this.state.myObject.area}{" "}
                </h5>
                <h5 className="d-inline location">
                  <a href="/profile/me">. 597 Connections . Contact Info </a>
                </h5>
              </Col>
            </Row>

            <Row>
              <Col sm={12} xs={12}>
                <Container className="dottedContainer">
                  <Row className="ml-1">
                    Show recruiters you're open to work-you control who sees
                    this{" "}
                  </Row>
                  <Row className="ml-1 mt-4">
                    <a href="/profile/me">Get started</a>
                  </Row>
                </Container>
              </Col>
              {/* <Col sm={6} xs={7}>
						<Container className="dottedContainer">
							<Row className="ml-1">
								Shere that you're hiring - and attract qualified candidates.{" "}
							</Row>
							<Row className="ml-1 mt-4">
								<a href="/profile/me">Get started</a>
							</Row>
						</Container>
					</Col> */}
            </Row>
          </div>
        </Container>

        <div className=" pt-3 px-3 pb-0 cardsin content">
          <div className=" d-flex ">
            <h4 className="mb-3 d-inline ">About</h4>
            {this.props.id === "me" && <GoPencil className="icons0 ml-auto" />}
          </div>
          <div className="d-flex  bio mt-3 mb-3  ">
            {/* {this.state && new String(this.state.myObject.bio).substring(0, 200)+ " ...  see more"} */}
            <p className="dots">
              {this.state && String(this.state.myObject.bio)}{" "}
            </p>
          </div>
        </div>
      </>
    );
  }
}
export default MyJumbotron;
