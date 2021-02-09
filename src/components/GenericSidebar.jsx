import React from "react"
import {Image,Button} from "react-bootstrap"
import {FaLinkedin} from "react-icons/fa"

class GenericSidebar extends React.Component {
	render() {
		return (
			<>
			 <div  className="cardsin pt-3 px-3 pb-0 ">
			 	<h5 className="mb-3"><FaLinkedin/> Learning </h5>
                <strong><p className="mb-3">Add new skills with these courses</p></strong>
						<div className="d-flex  content  ">
									<Image  src="https://miro.medium.com/max/1400/1*tmD_elC_QhRU0Cag2cKoKA.jpeg" className="Img" />
									<div>
										<h6> Vanilla Javascript Animations</h6>
										<p className="mb-0 text-muted">8,317 viewers</p>
										
									</div>
									
								</div>
						<div className="d-flex  content  ">
						<Image className="Img"   src="https://miro.medium.com/max/1400/1*tmD_elC_QhRU0Cag2cKoKA.jpeg" />
						<div>
							<h6> Essentials of CSS for React Developers</h6>
							<p className="mb-0 text-muted">5,960 viewers</p>
							
						</div>
						
					</div>	
			 <Button className="btn-sidebar"  >
               
                <p>Show More</p> </Button>
            </div>
			</>	
			
		)
	}
}

export default GenericSidebar
