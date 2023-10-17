import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import axios from 'axios'
import { baseRoute } from '../utils/ApiRoutes'
import DialogPop from '../components/DialogPop';
import { Link } from 'react-router-dom';

export default function AdminCourses() {
    axios.defaults.withCredentials=true;
    const [courses, setCourse] = useState([]);
    const [search, setSearch] = useState('');
    const [askDelete, setDeletePop] = useState(false);
    const fetchData = async () => {
        await axios.get(`${baseRoute}/get-courses`)
        .then(res => setCourse(res.data))
        .catch(err => console.log(err))
    }
    //fetchData();
    useEffect(()=>{
        //const interval = setInterval(fetchData, 5 * 60 * 1000);

        //return () => clearInterval(interval);
        axios.get(`${baseRoute}/get-courses`)
        .then(res => setCourse(res.data))
        .catch(err => console.log(err))
    },[]);
    //fetchData();
    //setInterval(fetchData, 5 * 1000);

    const toggleDelete = () => {
        setDeletePop(true);
    }
    const togglePop = () => {
        setDeletePop(false);
    }
  return (
    <div onLoad={fetchData} on className='bg-theme p-3' style={{"height":"100vh"}}>
        <div className='container-fluid h-100'>
            {askDelete?<DialogPop type='ask' onClose={togglePop}/>:null}
            <div className='d-flex h-100'>
                <AdminSidebar />
                <div className='col-xl-10 col-lg-9 col-md-8 p-2'>
                    <div className='card border rounded h-100 p-3'>
                        <span className='p-4 pb-0 pt-3 fw-bold fs-3'>Courses</span>
                        <div className='d-flex w-100 px-3 flex-column'>
                            <div className='m-0 px-0 mt-3 w-100 d-flex'>
                                <form className='d-flex p-2 col'>
                                    <input type='text' onChange={(e)=>setSearch(e.target.value)} className='form-control border-success border-end-0 rounded-end-0 bg-success bg-opacity-10' placeholder='search to learn'/>
                                    <span className='border-top border-end border-bottom border-success bg-success bg-opacity-10 border-start-0 rounded-end px-3 py-1'><i className='bi bi-search'></i></span>
                                    <button className='d-none btn btn-outline-success' type='submit'>Search</button>
                                </form>
                                <div className='p-2'><a className='btn btn-primary' href='/new-course'>Add course</a></div>
                            </div>
                            <hr/>
                            <div className='p-2 d-flex flex-column'>
                                <span className='py-2 fw-bold fs-5'>Courses</span>
                                <div className='table-wraper'>
                                    <table className="table rounded-top-4 shadow-sm">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Course Name</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Price</th>
                                            <th scope='col'>Edit</th>
                                            <th scope='col'>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                courses.length > 0 ?(
                                                courses.filter((course)=> {
                                                    return search.toLowerCase() === '' || course.courseTitle.toLowerCase().includes(search);
                                                }).map((course, index) => (
                                                    <tr key={course._id}>
                                                        <td>{index+1}</td>
                                                        <td>{course.courseTitle || course.title}</td>
                                                        <td>{course.category}</td>
                                                        <td>{course.price}</td>
                                                        <td>
                                                            <Link to={`/edit-course/${course._id}`} className='btn btn-sm py-0'>
                                                                <i className='bi bi-pen'></i>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <button type='button' onClick={toggleDelete} className='btn bt-sm py-0'>
                                                                <i className='bi bi-trash'></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                                ): (
                                                    <tr>
                                                        <td colSpan={6}>No Data Found</td>
                                                    </tr>
                                                )
                                                
                                            }
                                            <tr>
                                                <td>a</td>
                                                <td>b</td>
                                                <td>c</td>
                                                <td>d</td>
                                                <td>a</td>
                                            </tr>
                                            <tr>
                                                <td>a</td>
                                                <td>b</td>
                                                <td>c</td>
                                                <td>d</td>
                                                <td>a</td>
                                            </tr>
                                            <tr>
                                                <td>a</td>
                                                <td>b</td>
                                                <td>c</td>
                                                <td>d</td>
                                                <td>a</td>
                                            </tr>
                                            <tr>
                                                <td>a</td>
                                                <td>b</td>
                                                <td>c</td>
                                                <td>d</td>
                                                <td>a</td>
                                            </tr>
                                            <tr>
                                                <td>a</td>
                                                <td>b</td>
                                                <td>c</td>
                                                <td>d</td>
                                                <td>a</td>
                                            </tr>
                                            <tr>
                                                <td>a</td>
                                                <td>b</td>
                                                <td>c</td>
                                                <td>d</td>
                                                <td>a</td>
                                            </tr>
                                            <tr>
                                                <td>a</td>
                                                <td>b</td>
                                                <td>c</td>
                                                <td>d</td>
                                                <td>a</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
