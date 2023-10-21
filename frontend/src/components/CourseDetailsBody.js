import React, { useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { baseRoute } from '../utils/ApiRoutes';
import userContext from '../states/userContext';
import ImageComponents from './ImageComponents';

export default function CourseDetailsBody({courseData}) {
  const imagePrefix = "https://res.cloudinary.com/daidqbafw/image/upload/";
  const {auth} = useContext(userContext);
  const [flexMode, setFlex] = useState('flex-row')
  const [buttonMode, setButton] = useState('more')
  const [textMode, setTextMode] = useState('text-truncate')
  const [ course, setCourse ] = useState({
    name: courseData.courseTitle,
    price: courseData.price,
    cState: "Buy",
    transactionID: null,
    offer: 100 - Math.ceil((courseData.price/courseData.estimated)*100),
    imgSRC :  courseData.thumbnail.url || courseData.thumbnail,
    //imgSM: imagePrefix + 'q_30,w_500,h_350/' + (courseData.thumbnail.url.split(imagePrefix)[1] || courseData.thumbnail.split(imagePrefix)[1]),
    //imgLG: imagePrefix + 'w_1000,h_700/' + (courseData.thumbnail.url.split(imagePrefix)[1] || courseData.thumbnail.split(imagePrefix)[1]),
  });
  const imgSM = courseData.thumbnail ? (imagePrefix + 'q_30,w_500,h_350/' + courseData.thumbnail.split(imagePrefix)[1]) : courseData.thumbnail;
  const imgLG = courseData.thumbnail ? (imagePrefix + 'w_1000,h_700/' + courseData.thumbnail.split(imagePrefix)[1]) : courseData.thumbnail;

  console.log(courseData)

  const initPayment = (data) => {
    const options = {
      KEY: "rzp_test_wxeH03loidaJgI",
      amount: data.amount,
      currency: data.currency,
      name: course.name,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = `${baseRoute}/payment/verify`;
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
          alert('done');
          setCourse({
            price: "",
            cState: "Enrolled",
            transactionId: data.transactionID,
          });
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#171dc2",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async() => {
    try {
      const orderUrl = `${baseRoute}/payment/orders`;
      const { data } = await axios.post(orderUrl, { amount: course.price });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleDescMode = () => {
    //e.preventDefalut()
    if (buttonMode === 'more') {
      setFlex('flex-column')
      setButton('...less')
      setTextMode('')
    } else {
      setFlex('flex-row')
      setButton('more')
      setTextMode('text-truncate')
    }
  }
  return (
    <div className='card w-100 p-3 shadow'>
        <div className='w-100 fw-bold text-end px-2 text-dark' style={{zIndex: "10"}}>
          <span className='bg-warning p-2 rounded-bottom-4 shadow fst-italic'>{courseData.courseLevel}</span>
        </div>
        <ImageComponents src={courseData.thumbnail.url || courseData.thumbnail} classData={'card-img-top'} />
        <img 
          src={course.imgSRC} 
          srcSet={`${imgSM} 640w, ${imgLG} 1920w`}
          className="d-none card-img-top" alt="" 
          style={{marginBottom: "-54px", marginTop: "-30px"}}/>
        {/* <div className='card-img-top' style={{background: `url(${course.imgSRC})`,height: "240px", backgroundSize: "cover", marginBottom: "-54px", marginTop: "-30px"}}>
          <img src={courseData.thumbnail.url || courseData.thumbnail} className="card-img-top" alt=""/>
        </div> */}
        <div className="card-body">
            <h5 className="card-title fs-3 fw-bolder bg-primary-subtle position-relative rounded p-2 shadow border border-dark text-dark" style={{zIndex: 10}}>{courseData.courseTitle}</h5>
            <div className={`d-flex py-3 ${flexMode}`}>
              <p className={`col card-text m-0 ${textMode}`} style={{maxWidth: "78vw"}}>{courseData.courseDescription}</p>
              {
                courseData.courseDescription.length > 19
                ?<button type='button' className='btn text-end p-0' onClick={handleDescMode}>{buttonMode}</button>
                :null
              }
            </div>
            <div className='d-flex flex-row'>
                {
                  auth
                  ?<>
                    <button onClick={handlePayment} className="btn btn-danger me-2">{course.cState} {course.price}</button>
                    <span className='px-4 py-2 fw-bold text-success '>{course.offer}% off</span>
                  </>
                  :<a className='btn btn-primary' href='/login'>Enrol</a>
                }
            </div>
            <hr/>
            <div className='py-2'>
              <b>Benefits : " {courseData.benefits.toUpperCase()} "</b>
            </div>
            <hr/>
            <b>Topics covered</b>
            <ul>
                {
                  courseData.syllabus?(
                  courseData.syllabus.map((item, index) => {
                    return <li key={index}>{item.chapter}</li>
                  }))
                  :null
                }
            </ul>
            <hr/>
            
        </div>
    </div>
  )
}
