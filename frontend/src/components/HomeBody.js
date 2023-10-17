import React, { useContext, useEffect, useState } from 'react'
import CardEnrolled from './CardEnrolled'
import CardAvailable from './CardAvailable'
import userContext from '../states/userContext'
import axios from 'axios';
import { baseRoute } from '../utils/ApiRoutes';

export default function HomeBody() {
    const {auth} = useContext(userContext);
    const [Courses, setCourse] = useState();
    const [categorySort, setCategory] = useState('all');
    const [levelSort, setLevel] = useState('all');
    useEffect(()=>{
        axios.get(`${baseRoute}/get-courses`)
        .then(res => setCourse(res.data))
        .catch(err => console.log(err))
    },[])
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
        {auth?
            <>
                <hr/>
                <div className='p-3'>
                    <b>Continue learning</b>
                    <div className='row'>
                        <CardEnrolled/>
                        <CardEnrolled/>
                    </div>
                </div>
            </>
        :null
        }

        <hr/>

        <div className='p-3'>
            <b className='fs-5'>Available Courses</b>
            <div className='d-flex py-2'>
                <div>
                    <label className='pe-2'>Category</label>
                    <select name={categorySort} onChange={(e) => setCategory(e.target.value)}>
                        <option >All</option>
                        <option  value="business">Business</option>
                        <option  value="computer science">Computer Science</option>
                        <option  value="creative arts">Creative Arts</option>
                        <option  value="health and fitness">Health and Fitness</option>
                        <option  value="languages">Languages</option>
                        <option  value="soft skills">Soft Skills</option>
                    </select>
                </div>
                <div>
                    <label className='ps-5 pe-2'>Level</label>
                    <select className={levelSort} onChange={(e)=>setLevel(e.target.value)}>
                        <option value={''} selected={true}>All</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
            </div>
            <div className='row'>
                {
                    Courses?
                    Courses.map((course)=> <CardAvailable data={course}/> )
                    :null
                }
                
                {/* <CardAvailable/>
                <CardAvailable/>
                <CardAvailable/>
                <CardAvailable/> */}
            </div>
        </div>
    </div>
  )
}
