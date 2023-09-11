import React from 'react'

export default function CardAvailable() {
  return (
    <div className='col-sm-12 col-md-4 p-2'>
        <div className="card shadow card-w">
            <img src="https://www.irvinestandard.com/images/2020/08/distance_learning_1600x960-1600x960.jpg" className="card-img-top" alt="" />
            <div className="card-body">
                <h5 className="card-title">MongoDB</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/course" className="btn btn-success">Enroll</a>
            </div>
        </div>
    </div>
  )
}
