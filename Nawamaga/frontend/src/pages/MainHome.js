import nawamaga from '../images/nawamaga.png'
import feedback_img from '../images/feedbackimg.jpg'
import Appointment_img from '../images/appoinments.jpg'
import notice_img from '../images/Notice.jpg'
import { useAuthContext } from "../hooks/useAuthContext"

import time_img from '../images/timetable.jpeg'
const Mainhome = () =>{
    const {user} = useAuthContext()


    return(
      <div>
      <div className="card" id="homecard">
        <img src={nawamaga} className="card-img-top" alt="..." />
        <h2>Our Services</h2>
      </div>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col">
            <div className="card" id="adminhomecard1">
            <img src={feedback_img} class="card-img-top" alt="..." id="feedbackimg">
          </img>
              <div className="card-body">
                <h5 className="card-title">All Feedbacks</h5>
                
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" id="adminhomecard2">
            <img src={Appointment_img} class="card-img-top" alt="..." id="feedbackimg"></img>
              <div className="card-body">
                <h5 className="card-title">All Appointments</h5>
                
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" id="adminhomecard3">
            <img src={time_img } class="card-img-top" alt="..." ></img>
              <div className="card-body">
                <h5 className="card-title">Create  Notice</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
  <div className="row mt-3">
    <div className="col">
      <div className="card" id="adminhomecard1">
        <img src={time_img} class="card-img-top" alt="..." id="feedbackimg"></img>
        <div className="card-body">
          <h5 className="card-title">Time table</h5>
          
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card" id="adminhomecard2">
        <img src={Appointment_img} class="card-img-top" alt="..." id="feedbackimg"></img>
        <div className="card-body">
          <h5 className="card-title">All Appointments</h5>
          
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card" id="adminhomecard3">
        <img src={notice_img} class="card-img-top" alt="..." ></img>
        <div className="card-body">
          <h5 className="card-title">Create  Notice</h5>
          <a href="/NoticeHome" className="btn btn-primary">Notices</a>
        </div>
      </div>
    </div>
  </div>
  </div>

    </div>

    )
}
export default Mainhome

