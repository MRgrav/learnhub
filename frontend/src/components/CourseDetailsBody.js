import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { baseRoute } from '../utils/ApiRoutes';
import userContext from '../states/userContext';
import ImageComponents from './ImageComponents';
import ParagraphComponent from './ParagraphComponent';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CourseDetailsBody({courseData, demo}) {
  const {auth,userId} = useContext(userContext);
  const [ course, setCourse ] = useState({
    name: courseData.courseTitle,
    price: courseData.price,
    cState: "Buy",
    transactionID: '',
    offer: 100 - Math.ceil((courseData.price/courseData.estimated)*100),
    imgSRC :  courseData.thumbnail.url || courseData.thumbnail,
  });

  //console.log(courseData)
  const navigate = useNavigate();

  const initPayment = async (data) => {
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
          toast.success("Course enrolled", {
            position: toast.POSITION.TOP_RIGHT,
          })
          setCourse({
            price: "",
            cState: "Enrolled",
            transactionID: data.receipt,
            orderID: data.id,
          });
          setTimeout(()=>{
            navigate('/')
          },500)
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
    // console.log('course : ',courseData._id);
    // console.log('me : ',userId)
    // console.log(course)
    await axios.post(`${baseRoute}/buy-course`,{ 
      userId: userId, 
      receiptId: data.receipt, 
      courseId: courseData._id,
      orderId: data.id,
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  };

  const handlePayment = async() => {
    try {
      const orderUrl = `${baseRoute}/payment/orders`;
      const { data } = await axios.post(orderUrl, { amount: course.price });
      //console.log(data);
      await initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const [isEnrolled, setEnrolled] = useState(false);

useEffect(() => {
  try {
    auth && (
      axios.get(`${baseRoute}/check-course-enrollment/` + userId)
    .then(res => {
      // console.log('courses: ', res.data)
      const isEnrolled = res.data && res.data.some(resdata => resdata.courseId === courseData._id);
      setEnrolled(isEnrolled);
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching enrollment data:', error);
    })
    )
  } finally {
    console.log('login first')
  }
}, [auth, userId, courseData._id]);
  return (
    <div className='p-md-3 p-sm-mode shadow card'>
        <div className='w-100 fw-bold text-end px-2 text-dark' style={{zIndex: "10"}}>
          <span className='bg-warning p-2 rounded-bottom-4 shadow fst-italic'>{courseData.courseLevel}</span>
        </div>
        <ImageComponents src={courseData.thumbnail.url || courseData.thumbnail} classData={'card-img-top'} />
        <img 
          src={course.imgSRC} 
          //srcSet={`${imgSM} 640w, ${imgLG} 1920w`}
          className="d-none card-img-top" alt="" 
          style={{marginBottom: "-54px", marginTop: "-30px"}}/>
        {/* <div className='card-img-top' style={{background: `url(${course.imgSRC})`,height: "240px", backgroundSize: "cover", marginBottom: "-54px", marginTop: "-30px"}}>
          <img src={courseData.thumbnail.url || courseData.thumbnail} className="card-img-top" alt=""/>
        </div> */}
        <div className="card-body">
            <h5 className="card-title fs-3 fw-bolder bg-primary-subtle position-relative rounded p-2 shadow border border-dark text-dark" style={{zIndex: 10}}>{courseData.courseTitle}</h5>
            <ParagraphComponent text={courseData.courseDescription}/>
            {/* what if course is already taken by student, it will not show bellow buttons */}
            {
              auth&&isEnrolled?
              <div className='d-flex flex-row pe-2 m-0'>
                <button className="btn btn-secondary" disabled>Enrolled for Rs. {course.price}/-</button>
              </div>
              :
              <div className='d-flex flex-row pe-2 m-0'>
                {
                  auth
                  ?<>
                    <button onClick={handlePayment} className="btn btn-danger" disabled={demo}>{course.cState} {course.price}</button>
                    <span className='px-4 py-2 fw-bold text-success '>{course.offer}% off</span>
                  </>
                  :<a className='btn btn-primary' href='/login'>Enroll</a>
                }
              </div>
            }
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
        <ToastContainer/>
    </div>
  )
}
