import React from "react"

import { Modal, Button, Form, Col, Image, Spinner } from "react-bootstrap"
import { me } from "../fetch"

class AddExperience extends React.Component {
	state = {
		experience: {
			role: "",
			employmentType: "Choose one",
			company: "",
			area: "",
			currentlyWork: true,
			startDate: "",

			endDate: "",
			updateIndustry: false,
			headline: "",
			description: "",
		},
		formData: null,

		exp: {},
		errMessage: "",
		loading: false,
	}
	// myId = async () => {
	// 	let id = await me()
	// 	id = id._id
	// 	this.setState({ id })
	// }
	//It passes false as showMode to parent body. It means dont show Modal.
	handleClose = () => this.props.handleClose(false)

	updateField = (e) => {
		let experience = { ...this.state.experience }
		let currentid = e.currentTarget.id

		if (currentid === "currentlyWork") {
			experience[currentid] = e.currentTarget.checked
		} else if (currentid === "updateIndustry") {
			experience[currentid] = e.currentTarget.checked
		} else if (currentid === "updateHeadline") {
			experience[currentid] = e.currentTarget.checked
		} else {
			experience[currentid] = e.currentTarget.value // e.currentTarget.value is the keystroke
		}

		this.setState({ experience: experience })
	}

	EditFetch = async () => {
		let TOKEN = process.env.REACT_APP_TOKEN
		let response

		try {
			if (this.props.exId) {
				console.log("exId:",this.props.exId)
				const url = `${process.env.REACT_APP_URL}profile/${this.props.uid}/experience/`
				response = await fetch(url + this.props.exId, {
					method: "PUT",
					body: JSON.stringify(this.state.experience),
					headers: new Headers({
						"Content-Type": "application/json",

						Authorization: `Bearer ${TOKEN}`,
					}),
				})
			} else {
				response = await fetch(
					`${process.env.REACT_APP_URL}profile/${this.props.uid}/experience`,
					{
						method: "POST",
						body: JSON.stringify(this.state.experience),
						headers: new Headers({
							"Content-Type": "application/json",

							Authorization: `Bearer ${TOKEN}`,
						}),
					}
				)
			}
			console.log("RESPONSE", response)
			if (response.ok) {
				let res = await response.json()
				console.log("res of post", res)

				this.setState({
					experience: {
						role: "",
						company: "",
						area: "",
						startDate: "",
						endDate: "",
						description: "",
					},
					errMessage: "",
				})
				//this.handleClose()
				return res
			} else {
				console.log("an error occurred")
				let error = await response.json()
				this.setState({
					errMessage: error.message,
					loading: false,
				})
			}
		} catch (e) {
			console.log(e) // Error
			this.setState({
				errMessage: e.message,
				loading: false,
			})
		}
	}

	getFetch = async () => {
		let TOKEN = process.env.REACT_APP_TOKEN

		try {
			//${process.env.REACT_APP_URL}profile//experience
			const url = `${process.env.REACT_APP_URL}profile/${this.props.uid}/experience/`
			let response = await fetch(url + this.props.exId, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${TOKEN}`,
				},
			})
			if (response.ok) {
				let exp = await response.json()
				console.log("exp:", exp)

				this.setState({
					experience: {
						role: exp.role,
						company: exp.company,
						area: exp.area,
						startDate: exp.startDate,
						endDate: exp.endDate,
						description: exp.description,
					},
				})
			}
		} catch (e) {
			console.log(e)
		}
	}

	handleDelete = async () => {
		let TOKEN = process.env.REACT_APP_TOKEN
		this.setState({ loading: true })
		try {
			const url = `${process.env.REACT_APP_URL}profile/${this.props.uid}/experience/`
			let response = await fetch(url + this.props.exId, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${TOKEN}`,
				},
			})
			if (response.ok) {
				alert("exp deleted succesfully")
				this.setState({ loading: false })
				this.handleClose()
			} else {
				alert("Something went wrong!")
				this.setState({ loading: false })
			}
		} catch (e) {
			console.log(e)
			this.setState({ loading: false })
		}
	}

	handleImageUpload = (event) => {
		console.log("target", event.target)
		const formData = new FormData()
		formData.append("image", event.target.files[0])
		this.setState({ formData })
	}

	UploadImageFetch = async (id) => {
		let TOKEN = process.env.REACT_APP_TOKEN
		console.log("token", TOKEN)
		console.log(
			"url",
			`${process.env.REACT_APP_URL}profile/${this.props.uid}/experience/`
		)
		try {
			let response = await fetch(
				`${process.env.REACT_APP_URL}profile/${this.props.uid}/experience/` +
					id +
					"/picture",
				{
					method: "POST",
					body: this.state.formData,
					headers: new Headers({
						// "Content-Type": "application/json",
						Authorization: `Bearer ${TOKEN}`,
					}),
				}
			)

			if (response.ok) {
				let result = response.json()
				alert("Experience saved!")
				this.setState({ loading: false })
				console.log(result)
				this.handleClose()
			}
		} catch (e) {
			console.log(e)
		}
	}
	submitForm = (e) => {
		e.preventDefault()
		this.setState({ loading: true })
		this.postExp()
	}
	postExp = async () => {
		let expId = await this.EditFetch()
		console.log("expId", expId)
		this.UploadImageFetch(expId._id)
	}

	componentDidMount = async () => {
		console.log(this.props.exId)
		//this.myId()

		if (this.props.exId) {
			this.getFetch()
		}
	}

	render() {
		const { show } = this.props
		return (
			<>
				<Modal show={show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>
							{this.props.exId ? (
								<p>Edit/Delete Experience</p>
							) : (
								<p>Add New Experience</p>
							)}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.submitForm}>
							<Form.Group>
								<Form.Label>Title*</Form.Label>

								<Form.Control
									id="role"
									type="text"
									value={this.state.experience.role}
									onChange={this.updateField}
									placeholder="Ex: Retail Sales Manager"
									required
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label htmlFor="employmentType">
									Employment Type
								</Form.Label>
								<Form.Control
									as="select"
									name="employmentType"
									id="employmentType"
									value={this.state.experience.employmentType}
									onChange={this.updateField}
								>
									<option>Full-time</option>
									<option>Part-time</option>
									<option>Self- Employed</option>
									<option>Freelance</option>
									<option>Contract</option>
									<option>Internship</option>
									<option>Seasonal</option>
									<option>Apprenticeship</option>
								</Form.Control>
								<Form.Label htmlFor="employmentType">
									Country Spesific Employment Types
								</Form.Label>
							</Form.Group>

							<Form.Group>
								<Form.Label>Change the Image</Form.Label>
								<Form.Control
									id="fileUpload"
									type="file"
									onChange={this.handleImageUpload}
									required
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Company *</Form.Label>
								<Form.Control
									id="company"
									type="text"
									value={this.state.experience.company}
									onChange={this.updateField}
									placeholder="Ex: Strive School"
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Location</Form.Label>
								<Form.Control
									id="area"
									type="text"
									value={this.state.experience.area}
									onChange={this.updateField}
									placeholder="Ex: İstanbul /Turkey"
									required
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>
									<Form.Check
										type="checkbox"
										id="currentlyWork"
										label="I am currently working in this role"
										checked={this.state.experience.currentlyWork}
										onChange={this.updateField}
									/>
								</Form.Label>
							</Form.Group>
							<Form.Row>
								<Form.Group as={Col}>
									<Form.Label htmlFor="date">Start Date</Form.Label>
									<Form.Control
										type="date"
										name="startDate"
										id="startDate"
										placeholder="start date"
										value={this.state.experience.startDate}
										onChange={this.updateField}
										required
									></Form.Control>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label htmlFor="date">End Date</Form.Label>
									{this.state.experience.currentlyWork && <p>present</p>}

									{!this.state.experience.currentlyWork && (
										<Form.Control
											type="date"
											name="endDate"
											id="endDate"
											placeholder="end date"
											value={this.state.experience.endDate}
											onChange={this.updateField}
											required
										></Form.Control>
									)}
								</Form.Group>
							</Form.Row>

							<Form.Group>
								<Form.Label>
									<Form.Check
										type="checkbox"
										id="updateIndustry"
										label="Update my industry"
										checked={this.state.experience.updateIndustry}
										onChange={this.updateField}
									/>
								</Form.Label>
							</Form.Group>

							<Form.Group>
								<Form.Label>
									<Form.Check
										type="checkbox"
										id="updateHeadline"
										label="Update my headline"
										checked={this.state.experience.updateHeadline}
										onChange={this.updateField}
									/>
								</Form.Label>
							</Form.Group>

							<Form.Group>
								<Form.Label htmlFor="description">Description</Form.Label>
								<Form.Control
									as="textarea"
									name="description"
									id="description"
									placeholder="description"
									value={this.state.experience.description}
									onChange={this.updateField}
									required
								/>
							</Form.Group>
							<Form.Group className="d-flex px-3">
								{this.props.exId && (
									<Button
										className=" deleteBtn"
										variant="primary"
										onClick={this.handleDelete}
									>
										{this.state.loading && (
											<Spinner animation="border" variant="warning" />
										)}
										Delete
									</Button>
								)}
								<Button
									className="saveBtn ml-auto"
									variant="primary"
									type="submit"
								>
									{" "}
									{this.state.loading && (
										<Spinner animation="border" variant="warning" />
									)}{" "}
									Save
								</Button>
							</Form.Group>
						</Form>
					</Modal.Body>
				</Modal>
			</>
		)
	}
}
export default AddExperience
