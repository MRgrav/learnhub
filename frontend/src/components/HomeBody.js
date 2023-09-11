import React from 'react'
import CardEnrolled from './CardEnrolled'
import CardAvailable from './CardAvailable'

export default function HomeBody() {
  return (
    <div className='rounded-3 p-md-3 p-sm-0 shadow card'>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active sizer-c" >
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp4385886.jpg&f=1&nofb=1&ipt=3dd3380cbab992b4f6839571d4b0c920bb8cdb01157daff7717e6227d5378430&ipo=images" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item sizer-c">
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.irvinestandard.com%2Fimages%2F2020%2F08%2Fdistance_learning_1600x960-1600x960.jpg&f=1&nofb=1&ipt=5ee5244347e3c0e5d195435b19058e9f74b3d061ae9cafb7cf9d4b838dfc3a92&ipo=images" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item sizer-c">
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.springwise.com%2Fwp-content%2Fuploads%2F2018%2F12%2FComputer_school_VIPKIDS_Springwise1.jpg&f=1&nofb=1&ipt=df4b82b4e50a92ff80f51769baa573c8bd5e0019f839988153d41797a480d95d&ipo=images" className="d-block w-100" alt="..."/>
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
