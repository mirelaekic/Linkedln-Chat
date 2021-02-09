import React from "react"
import { Container, Form, Button, Image } from "react-bootstrap"
import { me } from "../fetch"
class NewPostForm extends React.Component {
	state = {
		message: { text: "" },
		method: "POST",
		id: "",
		data: null,
		post: null,
		profile: false,
	}
	controlMessage = (event) => {
		console.log("trying to type a message", event.target.value)
		//const data = new FormData()
		//data.append("text", this.state.message.text)
		let text = event.currentTarget.value
		this.setState({ message: { text } })
	}
	handleImg = (ev) => {
		console.log("/****image uploader handler function****")
		console.log("target", ev.target)
		const data = new FormData()
		data.append("image", ev.target.files[0])
		this.setState({ data, post: this.postImg })
	}

	postTxt = async () => {
		try {
			let response = await fetch(
				`${process.env.REACT_APP_URL}posts/${this.state.id && this.state.id}`,
				{
					method: this.state.method,
					headers: new Headers({
						Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
						"Content-Type": "application/json",
					}),
					body: JSON.stringify(this.state.message),
				}
			)
			response = await response.text()
			console.log("new post id from inside the tx creation method", response)
			if (this.state.data !== null) {
				return response
			} else {
				console.log("nopic")
				this.props.refresh()
			}
		} catch (e) {
			console.error(e)
		}
	}

	postImg = async () => {
		try {
			let id = await this.postTxt()
			console.log("new msg id", id)
			let url = `${process.env.REACT_APP_URL}posts/${id}`
			console.log("posimg url", url)
			let response = await fetch(url, {
				method: "POST",
				headers: new Headers({
					Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
				}),
				body: this.state.data,
			})
			response = await response.json()
			console.log(
				"so we did try to post an image here is the response",
				response
			)
			this.props.refresh()
		} catch (e) {
			console.error(e)
		}
		this.props.refresh()
	}

	componentDidMount = async () => {
		let profile = await me()
		this.setState({ post: this.postTxt, profile })
		console.log("formstate", this.state)
		if (this.props.edit) {
			this.setState({
				message: { text: this.props.edit.text },
				method: "PUT",
				id: this.props.edit.id,
			})
			/*this.state.text = this.props.edit.text
			this.state.method = "PUTT"
			this.state.id = this.props.edit.id*/
		}
	}
	render() {
		return (
			<Container className="d-flex flex-row ">
				<Image
					roundedCircle
					src={this.state && this.state.profile.image}
					className="mediumProfilePic"
				/>
				<Container>
					<p>
						{this.state &&
							this.state.profile.name + " " + this.state.profile.surname}
					</p>
					<Button variant="outline-dark" className="rounded-pill py-0">
						Anyone &#x25bc;
					</Button>
					<Form className="mt-1">
						<Form.Control
							as="textarea"
							rows={4}
							className="border-0 noManualResize"
							placeholder="What do you want to talk about"
							onChange={this.controlMessage}
							value={this.state.message.text}
						></Form.Control>
						<Form.File
							id="picture"
							label="add a picture"
							name="pic"
							onChange={this.handleImg}
						/>

						<Button
							className="rounded-pill greyButton float-right mt-1 py-0"
							disabled={this.state.message.text ? false : true}
							onClick={this.state.post}
						>
							Post
						</Button>
					</Form>
				</Container>
			</Container>
		)
	}
}

export default NewPostForm
