import userEvent from "@testing-library/user-event"
import React, { useState } from "react"
import Avatar from '@material-ui/core/Avatar';
import {
	FormControl,
	Card,
	Image,
	Container,
	Row,
	Col,
	Dropdown,
	Button,
} from "react-bootstrap"
import { Link } from "react-router-dom"

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ProfileToggle = React.forwardRef(({ children, onClick }, ref) => (
	<a
		href=""
		ref={ref}
		onClick={(e) => {
			e.preventDefault()
			onClick(e)
		}}
	>
		{children}
	</a>
))

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const ProfileMenu = React.forwardRef(
	({ user, children, style, className, "aria-labelledby": labeledBy }, ref) => {
		const [value, setValue] = useState("")
		console.log("user passed", user)
		return (
			<div
				ref={ref}
				style={style}
				className={className + " m-2 p-1 userMenu"}
				aria-labelledby={labeledBy}
			>
				<Card>
					<Card.Body className="p-1">
						<Container fluid>
							<Row>
								<Col className="p-0 m-2">
									<Avatar alt={user.name || user.surname} src={user.image} />
								</Col>
								<Col className="pl-1 m-0">
									<p className="p-0 m-0">{user.name}</p>
									<p className="p-0 m-0">{user.title}</p>
								</Col>
							</Row>
						</Container>
						<a href="/profile/me">
							<Button
								variant="outline-primary"
								size="sm"
								className="rounded-pill py-0 w-100 mt-1"
							>
								<b>View Profile</b>
							</Button>
						</a>
						<Dropdown.Divider />
						<Dropdown.ItemText className="font-weight-bold">
							<h6>Account</h6>
						</Dropdown.ItemText>

						<Dropdown.Item>Settings & Privacy</Dropdown.Item>
						<Dropdown.Item>Help</Dropdown.Item>
						<Dropdown.Item>Language</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.ItemText>
							<h6>Manage</h6>
						</Dropdown.ItemText>
						<Dropdown.Item>Posts & Activity</Dropdown.Item>
						<Dropdown.Item>Job Posting Account</Dropdown.Item>
						<Dropdown.Divider />
						<p className="mb-0">Sign Out</p>
					</Card.Body>
				</Card>
			</div>
		)
	}
)

export { ProfileToggle, ProfileMenu }
