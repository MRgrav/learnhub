import React from 'react'

export default function CardAvailable({data}) {
  //const key = key;
  //const data = data;
  //const preImage = "https://www.irvinestandard.com/images/2020/08/distance_learning_1600x960-1600x960.jpg";
  const offer = Math.ceil((data.price/data.estimated)*100) || 90;
  return (
    <div className='col-sm-12 col-md-4 p-2'>
        <div className="card shadow card-w">
          <div className='w-100 fw-bold text-end px-2 text-dark' style={{zIndex: "10"}}>
            <small className='bg-warning p-2 rounded-bottom-4 shadow fst-italic'>INTERMEDIATE</small>
          </div>
            <img src={data.thumbnail.url} className="card-img-top" alt=""  style={{marginTop: "-30px"}}/>
            <div className="card-body">
                <h5 className="card-title fw-bold">{data.courseTitle}</h5>
                <p className="card-text">{data.courseDescription || "description"}</p>
                <div>
                  <a href={`/course/${data._id}`} className="btn btn-danger shadow">Buy {data.price}/-</a>
                  <span className='text-success fw-bold ps-3'>{offer}% off</span>
                </div>
            </div>
        </div>
    </div>
  )
}
