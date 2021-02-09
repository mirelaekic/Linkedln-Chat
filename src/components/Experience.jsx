import React from "react"
import { Image } from "react-bootstrap"
import { GoPencil } from "react-icons/go"
import { differenceInCalendarDays, format, parseISO } from "date-fns"

class Experience extends React.Component {
	//It opens the same Add Experience Modal when click the pencil icon, by passing props to parent Body Component
	handleShow = () => this.props.handleShow(true)
	handleId = () => this.props.handleId(this.props.id)
	SomeFunc = () => {
		this.handleShow()
		this.handleId()
	}



        // // a and b are javascript Date objects
        //  dateDiffInDays=(a, b)=> {
        //     const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        //   // Discard the time and time-zone information.
        //   const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        //   const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        
        //   return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        // }
        
    

		
	
        render(){
            //  console.log("id:",this.props.id)

           const {company,role, area, startDate, endDate,id,image, isEditable} = this.props
           //console.log(startDate,endDate)
            // new Date(endDate).getDate() + '-'+ new Date(endDate).getFullYear() + '-'+ (parseInt(new Date(endDate).getMonth())+1)
        
          

           
         return(
          
           <>
            
            <div className="d-flex  content  mt-3 mb-3 ">
            <Image className="Img" src={image}/>
            <div className="ml-3">
                <h6> {role} </h6>
                <p className="mb-0 ">{company}</p>
                <p className="mb-0 d-inline "> {format (parseISO(startDate),'yyyy-MM-dd')} </p>
                
               
                <p className="mb-0 d-inline ">{endDate && format (parseISO(endDate),'yyyy-MM-dd')}</p>
                {/* <p className="mb-0 d-inline ">{endDate && this.dateDiffInDays(endDate,startDate)}</p> */}
                <p className="mb-0">{area}</p>
                
            </div>
              {isEditable && <GoPencil className="icons0 ml-auto" onClick={this.SomeFunc}  />}
        </div>

       
        
           </>
         
          
        
         )
     }
 }
 export default Experience;
