import React from "react"
import { Image } from "react-bootstrap"
import { HiUserAdd } from "react-icons/hi"
import { Link, withRouter } from "react-router-dom"

class User extends React.Component {
	render() {
		return (
			<div className="d-flex  content  ">
				<Image className="userpic" src={this.props.image} />
				<div>
					<Link to={`/profile/${this.props.id}`}>
						<h6> {this.props.name}</h6>
					</Link>
					<p className="mb-0">{this.props.title}</p>
				</div>
				<HiUserAdd className="icons ml-auto" />
			</div>
		)
	}
}
export default withRouter(User)
