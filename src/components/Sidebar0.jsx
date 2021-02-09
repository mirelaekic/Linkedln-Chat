import React from "react"
//import image from "../../public/advert.png"
import { BsQuestionCircleFill } from "react-icons/bs"
import { Image } from "react-bootstrap"

class Sidebar0 extends React.Component {
	render() {
		return (
			<>
				<div className="cardsin pt-3 px-3 pb-0 mt-0">
					<div className="d-flex content ">
					<strong><p className="d-inline"> Edit Public Profile & URL</p></strong>
						<BsQuestionCircleFill className="icons0 ml-auto" />
					</div>
					<div className="d-flex content ">
						<strong><p className="mb-0 ">Add Profile in Another Language </p></strong>
						<BsQuestionCircleFill className="icons0 ml-auto" />
					</div>
				</div>
				<div className="cardsin pt-3 px-3 pb-0 ">
					<Image
						style={{ width: "100%" }}
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz-vIVh12ImNFzd-_Jwy_GZId0xxdHQJZ_ng&usqp=CAU "
					/>
				</div>
			</>
		)
	}
}
export default Sidebar0
