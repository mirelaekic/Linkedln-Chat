import React from "react"
import User from "./User.jsx"
import { Button } from "react-bootstrap"
import { withRouter } from "react-router-dom"

class Sidebar extends React.Component {
	state = {
		users: [],
		show: "3",
	}

	fetch = async (team) => {
		const url = `${process.env.REACT_APP_URL}profile`
		let response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
			},
		})
		if (response.ok) {
			let users = await response.json()
			if (team) {
				users = users.filter(
					(user) =>
						user.name === "Hilal" ||
						user.name === "mirela" ||
						user.name === "Roberto"
				)
			}
			//console.log("sidebar users", users)
			this.setState({ users })
		}
	}

	componentDidMount = () => {
		this.fetch(this.props.title === "Our Team")
	}

	render() {
		return (
			<div className="cardsin pt-3 px-3 pb-0 ">
				<strong><p className="mb-3" style={{fontSize: "16px" }}>{this.props.title}</p></strong>
				{this.state.users.slice(0, this.state.show).map((user) => (
					<User
						key={user.id}
						image={user.image}
						name={user.name}
						title={user.title}
						id={user._id}
					/>
				))}
				<Button
					className="btn-sidebar"
					onClick={() =>
						this.state.show === "3"
							? this.setState({ show: "6" })
							: this.setState({ show: "3" })
					}
				>
					{this.state.show === "3" ? <p>Show More</p> : <p>Show Less</p>}{" "}
				</Button>
			</div>
		)
	}
}
export default withRouter(Sidebar)
