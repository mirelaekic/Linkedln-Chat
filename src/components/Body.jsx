import React from "react"
import Experience from "./Experience.jsx"
import { AiOutlinePlus } from "react-icons/ai"
import AddExperience from "./AddExperience.jsx"
import { Image,Dropdown,DropdownButton } from "react-bootstrap"
import { GoPencil } from "react-icons/go"
import {CgExport} from  "react-icons/cg"
import { me } from "../fetch"
import { CSVLink, CSVDownload } from "react-csv";

//HERE IS PROFILE BODY

class Body extends React.Component {
	state = {
		experiences: [],
		show: false,
		errMessage: "",
		loading: false,
		exId: "",

		id: false,
		isEditable: false,
		csv:""
	}


	//THis fetch for showing experiences based on id/Id is coming from clicking
	fetch = async () => {
		try {
			let TOKEN = process.env.REACT_APP_TOKEN
			console.log("this.state.id", this.state.id)
			//old url ${process.env.REACT_APP_URL}profile/5fc4c459ed266800170ea3d7/experiences
			const url = `${process.env.REACT_APP_URL}profile/${
				this.props.id === "me" ? this.state.id : this.props.id
			}/experience`
			let response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${TOKEN}`,
				},
			})
			if (response.ok) {
				let experiences = await response.json()
				console.log("experiences:", experiences)
	
				this.setState({ experiences: experiences })
			}
			else {
				console.log("there is an error")
			}
		} catch (error) {
			console.log(error)
			
		}
	
	}
	componentDidMount = () => {
		this.myId()
		this.props.id === "me"
			? this.setState({ isEditable: true })
			: this.setState({ isEditable: false })
		//this.fetch()
	}

	myId = async () => {
		let id = await me()
		console.log("me", id)
		id = id._id
		console.log("my own id", id)
		this.setState({ id }, this.fetch)
	}

	//when comes the new id , it updates the profile page based on new id
	componentDidUpdate = (oldprops) => {
		if (oldprops.id !== this.props.id) {
			this.fetch()
			this.props.id === "me"
				? this.setState({ isEditable: true })
				: this.setState({ isEditable: false })
		}
	}

	//It opens the modal in the component(AddExperience)
	handleShow = (showMode) => this.setState({ show: showMode })
	handleId = (id) => this.setState({ exId: id })

	//Here the showMode (false) is coming from a child component(AddExperience-inside of the Modal)
	handleClose = (showMode) => {
		this.setState({ show: showMode, exId: "" })

		this.myId()

		this.fetch()
	}
	getCSV=async ()=>{ 
		try {
		let TOKEN = process.env.REACT_APP_TOKEN
	
		const url = `${process.env.REACT_APP_URL}profile/${
			this.props.id === "me" ? this.state.id : this.props.id
		}/ex/csv`
		let response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		})
	
		if (response.ok) {
		let csv= await response.text()
		console.log(csv)
		this.setState({csv:csv})
		console.log("done")
	
		}
	
		else
		{ console.log("there is an error")
	    }
			
		} catch (error) {
			console.log(error)
			
		}
		

	}

	render() {
		console.log("ex id:", this.state.exId)
		return (
			<>
				{this.state.show && (
					<AddExperience
						show={this.state.show}
						handleClose={this.handleClose}
						exId={this.state.exId}
						uid={this.state.id}
					/>
				)}

				<div className="cardsin pt-3 px-3 pb-0 ">
					<div className="d-flex content">
						<h4 className="mb-3 d-inline ">{this.props.title}</h4>
						{this.props.id === "me" && (

							
							<div className= "d-flex ml-auto">
								 
								<DropdownButton variant="Secondary"
								title="More..."
								onClick={this.getCSV}>
								<Dropdown.Item as="button" ><CSVLink data={this.state.csv}>Download your experience as CSV</CSVLink></Dropdown.Item>
								</DropdownButton>
									<AiOutlinePlus
								className="icons0 ml-auto"
								onClick={this.handleShow}/>
							</div>
							
							
						)}
					</div>

					{this.state.experiences.map((experience) => (
						//console.log("experience",experience)

						<Experience
							key={experience._id}
							id={experience._id}
							role={experience.role}
							company={experience.company}
							description={experience.description}
							startDate={experience.startDate}
							endDate={experience.endDate}
							image={experience.image}
							area={experience.area}
							handleShow={this.handleShow} //It accepts the showMode:true as prop from Experience and triggers the modal(add experience) open
							handleId={this.handleId}
							isEditable={this.state.isEditable}
						/>
					))}
					<div className="d-flex content">
						<h4 className="mb-3 d-inline ">Education</h4>
						{this.props.id === "me" && (
							<AiOutlinePlus className="icons0 ml-auto" />
						)}
					</div>
					<div className="d-flex  content  mt-3 mb-3 ">
						<Image
							className="Img"
							src="data:image/png;base64,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"
						/>
						<div className="ml-3">
							<h6> Strive School</h6>

							<p className="mb-0 d-inline ">
								{" "}
								Undergraduate, Full Stack Developer{" "}
							</p>

							<p className="mb-0 d-inline ">2020-2021</p>
							{/* <p className="mb-0 d-inline ">{endDate && this.dateDiffInDays(endDate,startDate)}</p> */}
							<p className="mb-0">
								Strive School is a Y Combinator company on a mission to train
								the next generation of software engineers in Europe. Program
								curriculum consist of both Backend & Frontend Development
								Software Technologies.
							</p>
						</div>
						{this.props.id === "me" && <GoPencil className="icons0 ml-auto" />}
					</div>
					<div className="d-flex content">
						<h4 className="mb-3 d-inline ">Licenses & certifications</h4>
						{this.props.id === "me" && (
							<AiOutlinePlus className="icons0 ml-auto" />
						)}
					</div>
					<div className="d-flex  content  mt-3 mb-3 ">
						<Image
							className="Img"
							src="data:image/png;base64,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"
						/>
						<div className="ml-3">
							<h6> Licenses & certifications</h6>

							<p className="mb-0 d-inline "> Java Script:Async</p>

							<p className="mb-0 d-inline ">Linkedin Learning</p>
							{/* <p className="mb-0 d-inline ">{endDate && this.dateDiffInDays(endDate,startDate)}</p> */}
							<p className="mb-0">Issued</p>
						</div>
						{this.props.id === "me" && <GoPencil className="icons0 ml-auto" />}
					</div>
				</div>
			</>
		)
	}
}

export default Body
