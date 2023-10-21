import React from 'react'
import { Link } from 'react-router-dom';

export default function CardAvailable({data}) {
  //const key = key;
  //const data = data;
  //const preImage = "https://www.irvinestandard.com/images/2020/08/distance_learning_1600x960-1600x960.jpg";
  const imagePrefix = "https://res.cloudinary.com/daidqbafw/image/upload/";
  const offer = (100 - Math.ceil((data.price/data.estimated)*100));
  const imgSM = imagePrefix + 'w_500,h_350/' + data.thumbnail.url.split(imagePrefix)[1];
  const imgLG = imagePrefix + 'q_40,w_1000,h_700/' + data.thumbnail.url.split(imagePrefix)[1];
  return (
    <div className='col-sm-12 col-md-4 p-2'>
        <Link to={`/course/${data._id}`} className="card shadow card-hover card-w">
          <div className='w-100 fw-bold text-end px-2 text-dark' style={{zIndex: "10"}}>
            <small className='bg-warning p-2 rounded-bottom-4 shadow fst-italic'>{data.courseLevel}</small>
          </div>
            <img src={data.thumbnail.url} className="d-none card-img-top" alt=""  />
            <img 
              src={data.thumbnail.url} 
              srcset={`${imgLG} 600w, ${imgSM} 1000w`}
              // sizes="(max-width: 576px) 100vw, 33vw"
              className="card-img-top" alt="" 
              style={{marginTop: "-28px"}}/>
            <div className="card-body">
                <h5 className="card-title fw-bold">{data.courseTitle}</h5>
                <p className="card-text">{data.courseDescription || "description"}</p>
                <div>
                  <a href={`/course/${data._id}`} className="btn btn-danger shadow">Buy {data.price}/-</a>
                  <span className='text-success fw-bold ps-3'>{offer}% off</span>
                </div>
            </div>
        </Link>
    </div>
  )
}
