import React, { useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { baseRoute } from '../utils/ApiRoutes';
import userContext from '../states/userContext';

export default function CourseDetailsBody() {
  const {auth} = useContext(userContext);
  const [ course, setCourse ] = useState({
    name: "MongoDB",
    price: "100",
    cState: "Pay",
  });

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
          });
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#33FF33",
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
  return (
    <div className='card w-100 p-3'>
        <img src="https://www.irvinestandard.com/images/2020/08/distance_learning_1600x960-1600x960.jpg" className="card-img-top" alt=""/>
        <div className="card-body">
            <h5 className="card-title fw-1 fw-bold">{course.name}</h5>
            <p className="card-text">Learn MongoDB, the NoSQL database.</p>
            <div className='d-flex flex-row'>
                {
                  auth?<button onClick={handlePayment} className="btn btn-success me-2">{course.cState} {course.price}</button>
                  :<a className='btn btn-primary' href='/login'>Enrol</a>
                }
            </div>
            <hr/>
            <b>Topics covered</b>
            <ul>
                <li>Introduction</li>
                <li>Installation and Setup</li>
                <li>First Cluster</li>
                <li>CRUD operations</li>
                <li>Final Test</li>
            </ul>
            <hr/>
            <b>Course by </b>
        </div>
    </div>
  )
}
