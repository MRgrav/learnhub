import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { baseRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import Loading from './Loading';
// import ParagraphComponent from './ParagraphComponent';

export default function CertificateCards({certificateData}) {
  // console.log('data ', certificateData)
  const enrollmentId = certificateData.enrollmentId;
  const [cardData, setCardData] = useState();
  const [completionDate, setCompletionDate] = useState();
  useEffect(()=>{
    axios
    .get(`${baseRoute}/get-completed-course/`+enrollmentId)
    .then((result) => {
      console.log('re', result)
      setCardData(result.data.responseData);
      setCompletionDate(result.data.newDate);
    })
  },[enrollmentId])
  if (!cardData) {
    <Loading/>
  } else {
  return (
    <div className='card pb-3 border-0'>
        <Link to={`/certificate/user/shared/${certificateData._id}`} className='link d-flex flex-row card p-3 rounded-3 shadow'>
            <div className='flex-shrink-0 p-2'>
                <img src={cardData.thumbnail.url} className='certificate-thumb' alt='' />
            </div>
            <p className='flex-grow-1 ms-2 mb-0 p-2 c-thumb-text'>
              <b className='fs-5'>{cardData.courseTitle}</b><br/>
              <small className='text-secondary'>completed on : {completionDate}</small><br/>
              {/* <ParagraphComponent text={cardData.courseDescription} /> */}
              {cardData.courseDescription}
            </p>
        </Link>
    </div>
  )}
}
