import React from "react"
import Sidebar from "./Sidebar"
import Sidebar0 from "./Sidebar0"
import { Container, Row, Col } from "react-bootstrap"
import Body from "./Body.jsx"
import GenericSidebar from "./GenericSidebar"
import MyJumbotron from "./MyJumbotron"
import Footer from "./Footer"
import { withRouter } from "react-router-dom"
import YourDashboard from "./YourDashboard"
import { me } from "../fetch"

/**
 * we will neeed this when we start routing stuff
 */
class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	gotId = () => {
		return this.props.match.params.id ? this.props.match.params.id : "me"
	}

	myId = async () => {
		let id = await me()
		id = id._id
		return id
	}

	render() {
		return (
			<>
				<Container>
					<Row>
						<Col md={12} lg={9} className="bodyColumn">
							{/**here goes the body*/}
							<MyJumbotron id={this.gotId()} />
							<YourDashboard />
							<Body title="Experience" id={this.gotId()} />
						</Col>
						<Col md={12} lg={3}>
							<Sidebar0 />
							<Sidebar title="Our Team" />
							<Sidebar title="People also viewed" />
							<Sidebar title="People you may know" />
							<GenericSidebar />
						</Col>
					</Row>
					<Row>
						<Footer />
					</Row>
				</Container>
				{/**bonus if we get to the chat that should stick to the bottom of the viewport*/}
			</>
		)
	}
}

export default withRouter(Home)
