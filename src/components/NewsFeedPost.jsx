import React from "react"
import { Card, Image, Container } from "react-bootstrap"
import { GoPencil, GoTrashcan } from "react-icons/go"
import {
	formatISO9075,
	compareAsc,
	formatDuration,
	intervalToDuration,
} from "date-fns"

class NewsFeedPost extends React.Component {
	constructor(props) {
		super(props)
		this.state = this.props.post
		this.state.mine = this.props.mine
	}

	deleteMe = async (id) => {
		console.log(
			"enter delete mode for post",
			this.state.id,
			"or, maybe, for",
			id
		)
		try {
			let TOKEN = process.env.REACT_APP_TOKEN
			let response = await fetch(`${process.env.REACT_APP_URL}posts/` + id, {
				method: "DELETE",
				headers: new Headers({
					Authorization: `Bearer ${TOKEN}`,
					"Content-Type": "application/json",
				}),
			})
			console.log("the server responded", response)
			this.props.refresh()
		} catch (err) {
			console.error(err)
			this.props.refresh()
		}
	}

	componentDidMount = async () => {
		//this.getImgs()
		console.log("got an image?", this.state.imageUrl)
	}
	render() {
		let created = new Date(this.state.createdAt)
		let updated = new Date(this.state.updatedAt)
		return (
			<Card className="cardsin  ">
				<Card.Body className="d-flex flex-column">
					<Container className="d-flex flex-row">
						<Image
							src={this.state.user.image}
							className="miniProfilePic"
							roundedCircle
						/>
						<b className="ml-1">
							{this.state.user.name} {this.state.user.surname}
						</b>
					</Container>
					<div className="myHr w-100  my-1" />
					<Container className="d-flex flex-row">
						<span className="flex-fill d-inline-block myWrap">
							{this.state.text}

							{this.state.imageUrl && (
								<Image
									className="border-0"
									src={this.state.imageUrl}
									thumbnail
								/>
							)}
						</span>
						{this.state.mine && (
							<>
								<GoPencil
									className="icons mx-1"
									onClick={() =>
										this.props.edit({
											text: this.state.text,
											id: this.state._id,
										})
									}
								/>
								<GoTrashcan
									className="icons"
									onClick={() => this.deleteMe(this.state._id)}
								/>
							</>
						)}
					</Container>
					<div className="myHr w-100 my-1" />
					<Container className=" d-flex flex-row-reverse border-top">
						{compareAsc(created, updated) !== 0 && (
							<span className="mx-2 font12 text-muted ">
								edited{" "}
								{formatDuration(
									intervalToDuration({ start: created, end: updated })
								)}{" "}
								ago
							</span>
						)}
						<span className="mx-1 font12 text-muted ">
							created at {formatISO9075(created)}
						</span>
					</Container>
				</Card.Body>
			</Card>
		)
	}
}

export default NewsFeedPost
