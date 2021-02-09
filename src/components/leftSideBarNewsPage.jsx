import React from "react"
import "../css/EvgeniSecond.css"
import { GrUserAdd } from "react-icons/gr"
import { RiVipDiamondFill } from "react-icons/ri"
import { RiFlag2Fill } from "react-icons/ri"
import { AiOutlinePlus } from "react-icons/ai"
import { Col, Row, Container, Image } from "react-bootstrap"
import { me } from "../fetch"

class LeftSideBarNewsPage extends React.Component {
	state = {
		myObject: {},
	}
	fetchMe = async () => {
		/*try {
			let response = await fetch(
				`${process.env.REACT_APP_URL}profile/me`,
				{
					method: "GET",
					headers: new Headers({
						Authorization:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM0Y2MwNGVkMjY2ODAwMTcwZWEzZTEiLCJpYXQiOjE2MDY3MzI4MDQsImV4cCI6MTYwNzk0MjQwNH0.5SXRMRe0ODrHgIQD_X5IjaBng7GYCNd_FeZthitZ8bs",
					}),
				}
			)*/
		let parsedResponse = await me()
		this.setState({ myObject: parsedResponse })
		console.log(parsedResponse)
		/*} catch (e) {
			console.log("ERROR fetching" + e)
		}*/
	}
	componentDidMount = () => {
		console.log("mounted left sidebar of the newsfeed")
		this.fetchMe()
	}

	render() {
		return (
			<>
				<Container className="firstContainer font">
					<Row className="coverImageRow">
						<Image
							className="coverPhoto"
							fluid
							src="https://www.zipjob.com/blog/wp-content/uploads/2020/08/linkedin-default-background-cover-photo-1.png"
						/>
					</Row>
					<Row className="profilePicRow">
						<Image
							className="profilePic border-2 border-white"
							fluid
							src={this.state.myObject.image}
							roundedCircle
						/>
					</Row>
					<Row className="userNameRow text-center">
						<Col>
							{this.state.myObject.name + " " + this.state.myObject.surname}
						</Col>
					</Row>
					<Row className="bioRow">
						<Col>{this.state.myObject.bio}</Col>
					</Row>
					<Row>
						<Col sm={9} xs={9}>
							<Row className="connections">Connections</Row>
							<Row className="grow">Grow your network</Row>
						</Col>
						<Col sm={3} xs={3}>
							{" "}
							<GrUserAdd className="addUser icons0" />
						</Col>
					</Row>
					<Row className="access">Acces exclusive tools {"&"} insights </Row>
					<Row className="premiumRow">
						<Col sm={2} xs={2}>
							<RiVipDiamondFill className="premiumIcon " />
						</Col>
						<Col sm={10} xs={10} className="premiumText">
							Reactivate Premium
						</Col>
					</Row>
					<Row>
						<Col sm={2} xs={2}>
							{" "}
							<RiFlag2Fill className="dirtyFlag" />
						</Col>
						<Col sm={10} xs={10} className="savedText">
							{" "}
							Saved Items{" "}
						</Col>
					</Row>
				</Container>

				<Container className="secondContainer ">
				<Row className="events">
						<Col sm={8} xs={6}>
							<a href="/" className="hashTagText" className="text-muted font12">
								Groups
							</a>
						</Col>
					</Row>
					<Row className="events">
						<Col sm={8} xs={6}>
							<a href="/" className="font12 text-muted ">
								Events
							</a>
						</Col>
						<Col sm={4} xs={6}>
							<AiOutlinePlus className="plus" />
						</Col>
					</Row>
					<Row className="hashTag">
						<Col sm={8} xs={6}>
							<a href="/" className="hashTagText " className="text-muted font12">
								Followed Hashtag
							</a>
						</Col>
					</Row>
					<div className="discoverMe">
						<p className="discoverText font14">Discover more</p>
					</div>
				</Container>
			</>
		)
	}
}

export default LeftSideBarNewsPage
