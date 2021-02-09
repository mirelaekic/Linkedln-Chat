import LeftSidebarNewsPage from "./leftSideBarNewsPage"

import React from "react"
import Sidebar from "./Sidebar"
import Sidebar0 from "./Sidebar0"
import { Container, Row, Col } from "react-bootstrap"

import GenericSidebar from "./GenericSidebar"
import Footer from "./Footer"
import { withRouter } from "react-router-dom"
import NewsFeedBody from "./NewsFeedBody"

/**
 * we will neeed this when we start routing stuff
 */
class Newsfeed extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	gotId = () => {
		return this.props.match.params.id ? this.props.match.params.id : "me"
	}

	render() {
		return (
			<>
				<Container>
					<Row>
						<Col md={12} lg={3} className="leftSidebar mb-3">
							<LeftSidebarNewsPage />
						</Col>
						<Col md={8} lg={6} className="bodyColumn mb-3">
							<NewsFeedBody
								p={
									this.props.match.params.page
										? this.props.match.params.page
										: 1
								}
								pp={10}
							/>
						</Col>
						<Col md={4} lg={3}className=" mb-3">
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

export default withRouter(Newsfeed)
