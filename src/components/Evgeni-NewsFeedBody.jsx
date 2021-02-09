import React from "react"
import { Container, Button, Modal, Pagination, Dropdown } from "react-bootstrap"
import NewPostForm from "./newPostForm"
import NewsFeedPost from "./NewsFeedPost"
import { me } from "../fetch"

class NewsFeedBody extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			posts: [],
			openForm: false,
			editMe: false,
			Me: {},
			p: 1,
			pp: 10,
			pages: 0,
			reverse: false,
			secondReverse: false,
		}
		this.refresh = this.refresh.bind(this)
		this.stopPosting = this.stopPosting.bind(this)
		this.editMe = this.editMe.bind(this)
	}
	oldestFirst = async () => {
		if (!this.state.reverse) {
			let reversed = this.state.posts.reverse()
			console.log(reversed)
			this.setState({ posts: reversed, reverse: !this.state.reverse })
		}
	}
	newestFirst = async () => {
		if (this.state.reverse) {
			let reversed = this.state.posts.reverse()
			console.log(reversed)
			this.setState({
				posts: reversed,
				secondReverse: !this.state.secondReverse,
			})
		}
	}
	/*openForm() {
		this.setState({ openForm: true })
	}*/
	openForm(mode = true) {
		this.setState({ openForm: mode })
	}
	editMe(editMe) {
		this.setState({ editMe }, () => this.setState({ openForm: true }))
	}
	get = async () => {
		try {
			let TOKEN = process.env.REACT_APP_TOKEN
			let response = await fetch("${process.env.REACT_APP_URL}posts/", {
				method: "GET",
				headers: new Headers({
					Authorization: `Bearer ${TOKEN}`,
					"Content-Type": "application/json",
				}),
			})
			response = await response.json()
			console.log("got posts", typeof response)
			let start = (this.props.p - 1) * this.state.pp
			let end = start + this.state.pp
			let pages = Math.ceil(response.length / this.state.pp)
			console.log("asd start/end/pages", start, "/", end, "/", pages)
			this.state.pages = pages
			return response.reverse().slice(start, end)
		} catch (error) {
			console.error(error)
		}
	}
	componentDidUpdate = async (oldprops) => {
		console.log(
			"the state changed, this is the oldprops",
			oldprops,
			"an these are the new ones",
			this.props
		)
		if (!this.state.posts || oldprops !== this.props) {
			if (!this.state.reverse) {
				let posts = await this.get()
				this.setState({ posts, editMe: false })
			}
		}
	}
	componentDidMount = async () => {
		let posts = await this.get()
		posts = Array.from(posts)
		let Me = await me()
		let p = this.props.p
		console.log(posts)
		this.setState({ posts, Me, p })
	}
	stopPosting = async () => {
		this.setState({ posts: false, openForm: false })
	}
	refresh() {
		this.setState({ posts: false })
	}
	isMine(post) {
		let myid = this.state.Me._id
		return post.user._id === myid ? true : false
	}

	render(props) {
		console.log("triggerd")
		return (
			<>
				<Container className="cardsin mt-0">
					<p
						className="rounded-pill border  p-3 m-2 newPostUi"
						onClick={() => this.openForm()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							data-supported-dps="24x24"
							fill="currentColor"
							width="24"
							height="24"
							focusable="false"
						>
							<path d="M19 12h2v6a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h6v2H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1zm4-8a2.91 2.91 0 01-.87 2l-8.94 9L7 17l2-6.14 9-9A3 3 0 0123 4zm-4 2.35L17.64 5l-7.22 7.22 1.35 1.34z"></path>
						</svg>
						<h5 className="d-inline"> Start a post</h5>
					</p>

					<Container className="d-flex flex-row justify-content-between my-2 p-1">
						<Button
							variant="white"
							className="postTypeBtn newPostUi"
							onClick={() => this.openForm("photo")}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								data-supported-dps="24x24"
								fill="currentColor"
								width="24"
								height="24"
								focusable="false"
							>
								<path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
							</svg>
							Photo
						</Button>
						<Button
							variant="white"
							className="postTypeBtn newPostUi"
							onClick={() => this.openForm()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								data-supported-dps="24x24"
								fill="currentColor"
								width="24"
								height="24"
								focusable="false"
							>
								<path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"></path>
							</svg>
							Video
						</Button>
						<Button
							variant="white"
							className="postTypeBtn newPostUi"
							onClick={() => this.openForm()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								data-supported-dps="24x24"
								fill="currentColor"
								width="24"
								height="24"
								focusable="false"
							>
								<path d="M3 3v15a3 3 0 003 3h12a3 3 0 003-3V3zm13 1.75A1.25 1.25 0 1114.75 6 1.25 1.25 0 0116 4.75zm-8 0A1.25 1.25 0 116.75 6 1.25 1.25 0 018 4.75zM19 18a1 1 0 01-1 1H6a1 1 0 01-1-1V9h14zm-5.9-3a1 1 0 00-1-1H12a3.12 3.12 0 00-1 .2l-1-.2v-3h3.9v1H11v1.15a3.7 3.7 0 011.05-.15 1.89 1.89 0 012 1.78V15a1.92 1.92 0 01-1.84 2H12a1.88 1.88 0 01-2-1.75 1 1 0 010-.25h1a.89.89 0 001 1h.1a.94.94 0 001-.88z"></path>
							</svg>
							Event
						</Button>
						<Button
							variant="white"
							className="postTypeBtn newPostUi"
							onClick={() => this.openForm()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								data-supported-dps="24x24"
								fill="currentColor"
								class="mercado-match"
								width="24"
								height="24"
								focusable="false"
							>
								<path d="M21 3v2H3V3zm-6 6h6V7h-6zm0 4h6v-2h-6zm0 4h6v-2h-6zM3 21h18v-2H3zM13 7H3v10h10z"></path>
							</svg>
							Write article
						</Button>
					</Container>
				</Container>
				<Container className="d-flex flex-row ">
					<div className="myHr flex-fill bg-dark my-auto"></div>
					<p className="m-0">
						<Dropdown>
							<Dropdown.Toggle variant="secondary" id="dropdown-basic">
								Sort by
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item
									href="#/action-1"
									onClick={() => this.newestFirst()}
								>
									Newest first
								</Dropdown.Item>
								<Dropdown.Item
									href="#/action-2"
									onClick={() => this.oldestFirst()}
								>
									Oldest first
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</p>
				</Container>
				<Container className="d-flex fleax-rounded justify-content-center mb-1">
					<Pagination>
						<Pagination.First href="/news/1" />
						<Pagination.Prev href={"/news/" + (parseInt(this.state.p) - 1)} />
						<Pagination.Ellipsis />
						<Pagination.Item active>{this.state.p}</Pagination.Item>
						<Pagination.Ellipsis />
						<Pagination.Next href={"/news/" + (parseInt(this.state.p) + 1)} />
						<Pagination.Last href={"/news/" + this.state.pages} />
					</Pagination>
				</Container>
				<Container>
					{this.state.posts &&
						Array.from(this.state.posts).map((post) => (
							<NewsFeedPost
								key={post._id}
								post={post}
								mine={this.isMine(post)}
								refresh={this.refresh}
								edit={this.editMe}
							/>
						))}
				</Container>
				<Modal
					size="lg"
					show={this.state.openForm}
					onHide={() => this.stopPosting()}
					aria-labelledby="example-modal-sizes-title-sm"
				>
					<Modal.Header closeButton size="lg">
						<Modal.Title id="example-modal-sizes-title-sm">
							{this.state.editMe ? "Edit" : "Create"} a post
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<NewPostForm
							edit={this.state.editMe ? this.state.editMe : false}
							refresh={this.stopPosting}
							photo={this.state.openForm}
						/>
					</Modal.Body>
				</Modal>
			</>
		)
	}
}

export default NewsFeedBody
