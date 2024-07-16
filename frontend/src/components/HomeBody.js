import React, { useContext, useEffect, useState } from 'react'
import CardEnrolled from './CardEnrolled'
import CardAvailable from './CardAvailable'
import userContext from '../states/userContext'
import axios from 'axios';
import { baseRoute } from '../utils/ApiRoutes';

export default function HomeBody() {
    axios.defaults.withCredentials = true;
    const {auth, userId} = useContext(userContext);
    const [Courses, setCourse] = useState();
    const [categorySort, setCategory] = useState('all');
    const [levelSort, setLevel] = useState('all');
    const [search, setSearch] = useState('');
    const [enrolledData, setEnrolledData] = useState([]);
    console.log(userId)
    useEffect(()=>{
        //availabel course
        try {

            axios.get(`${baseRoute}/get-courses`)
            .then(res => {
                setCourse(res.data)
                //console.log(res.data)
            })
            .catch(err => console.log(err))

            //enrolled course
            if (auth) {
                axios.get(`${baseRoute}/get-enrolled-courses`)
                .then((res) =>{
                    setEnrolledData(res.data.data)
                    console.log("hereis", res.data)
                }).catch((err) => {
                    console.log(err)
                })
            }
        } catch (error) {
            
        }
    },[auth])
  return (
    <div className='rounded-3 p-md-3 p-sm-0 shadow card'>
        <div id="carouselExampleAutoplaying" className="d-none d-lg-block d-xxl-block d-xl-block carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active sizer-c" >
                    <img src="https://i.pinimg.com/originals/81/2c/22/812c229c60047ee347f778135cd76b81.gif" className="d-none w-100" alt="..."/>
                    <img src="/media/mac.jpg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item sizer-c">
                    <img src="https://i.pinimg.com/originals/85/04/77/850477fed08bfe98598082bcd309ce70.gif" className="d-none w-100" alt="..."/>
                    <img src="/media/desk.jpg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item sizer-c">
                    <img src="https://i.pinimg.com/originals/4f/b6/51/4fb6514d951bf35407c2e733c47b27b0.gif" className="d-none w-100" alt="..."/>
                    <img src="/media/pencil.jpg" className="d-block w-100" alt="..."/>
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
            {/* <form className='d-flex p-2'>
                <input type='text' className='form-control border-success bg-success bg-opacity-10' placeholder='search to learn'/>
                <button className='btn btn-outline-success' type='submit'>Search</button>
            </form> */}
            <form className='d-flex p-2 col'>
                <input type='text' onChange={(e)=>setSearch(e.target.value)} name='search' value={search} className='form-control border-success border-end-0 rounded-end-0 bg-success bg-opacity-10' placeholder='search to learn'/>
                <span className='border-top border-end border-bottom border-success bg-success bg-opacity-10 border-start-0 rounded-end px-3 py-1'><i className='bi bi-search'></i></span>
                <button className='d-none btn btn-outline-success' type='submit'>Search</button>
            </form>
        </div>
        {auth && search===''?
            <>
                <hr/>
                <div className='p-3'>
                    <b>Continue learning</b>
                    <div className='row'>
                        {
                            enrolledData?
                            enrolledData.map((item) => <CardEnrolled data={item} />)
                            :null
                        }
                    </div>
                </div>
            </>
        :null
        }

        <hr/>

        <div className='p-3'>
            {
                search?<b className='fs-5'>Search result</b>
                :<b className='fs-5'>Available Courses</b>
            }
            <div className='d-flex py-2'>
                <div>
                    <label className='pe-2'>Category</label>
                    <select name={categorySort} onChange={(e) => {
                        setCategory(e.target.value)
                        setSearch(e.target.value)
                        }}>
                        <option value={''} selected={true}>All</option>
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
                    <select className={levelSort} onChange={(e)=> {
                        setLevel(e.target.value)
                        setSearch(e.target.value)
                        }}>
                        <option value={''} selected={true}>All</option>
                        <option value="beginner" >Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
            </div>
            <div className='row'>
                {
                    Courses?
                    Courses.filter((course)=> {
                        return search.toLowerCase() === '' 
                        || course.courseTitle.toLowerCase().includes(search)
                        || course.courseLevel.toLowerCase().includes(search)
                        || course.price.toString().includes(search)
                        || course.courseDescription.toLowerCase().includes(search)
                        || course.category.toLowerCase().includes(search);
                    }).map((course)=> <CardAvailable data={course}/> )
                    :null
                }
                
                {/* <CardAvailable/>
                <CardAvailable/>
                <CardAvailable/>
                <CardAvailable/> */}
            </div>
            <div class="accordion accordion-flush mt-5" id="accordionFlushExample">
                <b className='fs-2 px-3 pb-3'>FAQ</b>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    How do I enroll in a course on LearnHub?
                    </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">To enroll in a course on LearnHub, simply create an account or log in if you already have one. Browse through our diverse range of courses, select the one that interests you, and click on the "Enroll" button. Follow the on-screen instructions to complete the enrollment process. Once enrolled, you'll gain access to the course content and can start your learning journey.</div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    Can I access my courses from multiple devices?
                    </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">Yes, LearnHub is designed to provide a seamless learning experience across various devices. Whether you prefer learning on your computer, tablet, or smartphone, you can access your enrolled courses from anywhere with an internet connection. Just log in to your LearnHub account, and your progress will be synchronized across devices.</div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    What happens if I face technical issues during a video lecture or assessment?
                    </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">Technical issues can happen, but we're here to help! If you encounter any problems during a video lecture or assessment, first, check your internet connection. If the issue persists, reach out to our dedicated support team through the "Help" or "Support" section on LearnHub. Our team will promptly assist you in resolving any technical difficulties, ensuring your learning experience remains smooth.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
