import React from 'react'
import CardEnrolled from './CardEnrolled'
import CardAvailable from './CardAvailable'

export default function HomeBody() {
  return (
    <div className='rounded-3 p-md-3 p-sm-0 shadow card'>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active sizer-c" >
                    <img src="https://i.pinimg.com/originals/81/2c/22/812c229c60047ee347f778135cd76b81.gif" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item sizer-c">
                    <img src="https://i.pinimg.com/originals/85/04/77/850477fed08bfe98598082bcd309ce70.gif" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item sizer-c">
                    <img src="https://i.pinimg.com/originals/4f/b6/51/4fb6514d951bf35407c2e733c47b27b0.gif" className="d-block w-100" alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
            </button>
        </div>
        <div className='m-0 px-0 mt-3'>
            <form className='d-flex p-2'>
                <input type='text' className='form-control border-success bg-success bg-opacity-10' placeholder='search to learn'/>
                <button className='btn btn-outline-success' type='submit'>Search</button>
            </form>
        </div>
        <hr/>
        <div className='p-3'>
            <b>Continue learning</b>
            <div className='row'>
                <CardEnrolled/>
                <CardEnrolled/>
            </div>
        </div>

        <hr/>

        <div className='p-3'>
            <b>Available Courses</b>
            <div className='row'>
                <CardAvailable/>
                <CardAvailable/>
                <CardAvailable/>
                <CardAvailable/>
                <CardAvailable/>
            </div>
        </div>
    </div>
  )
}
