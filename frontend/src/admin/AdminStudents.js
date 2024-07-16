import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { baseRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import Loading from '../components/Loading';

export default function AdminStudents() {
    const [search, setSearch] = useState('');
    const [students, setStudents] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${baseRoute}/get-students`)
            .then(res => {
                setStudents(res.data);
                setLoading(false); // Set loading to false when data is received
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Make sure to set loading to false even if there's an error
            });
    }, []);

    if (loading){
        <Loading/>
    } else {
  return (
    <div className='bg-theme p-3' style={{"height":"100vh"}}>
        <div className='container-fluid h-100'>
            <div className='d-flex h-100'>
                <AdminSidebar />
                <div className='col-xl-10 col-lg-9 col-md-8 p-2'>
                    <div className='card border rounded h-100 p-3'>
                        <span className='p-4 pb-0 pt-3 fw-bold fs-3'>Students</span>
                        <div className='d-flex w-100 px-3 flex-column'>
                            <div className='m-0 px-0 mt-3 w-100 d-flex'>
                                <form className='d-flex p-2 col'>
                                    <input type='text' onChange={(e)=>setSearch(e.target.value)} className='form-control border-success border-end-0 rounded-end-0 bg-success bg-opacity-10' placeholder='search to learn'/>
                                    <span className='border-top border-end border-bottom border-success bg-success bg-opacity-10 border-start-0 rounded-end px-3 py-1'><i className='bi bi-search'></i></span>
                                    <button className='d-none btn btn-outline-success' type='submit'>Search</button>
                                </form>
                            </div>
                            <hr/>
                            <div className='p-2 d-flex flex-column'>
                                <span className='py-2 fw-bold fs-5'>Students</span>
                                <div className='table-wraper'>
                                    <table className="table rounded-top-4 shadow-sm">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone No.</th>
                                            <th scope="col">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                students && students.length > 0 ?(
                                                students.filter((student)=> {
                                                    return search.toLowerCase() === '' 
                                                    || student.username.toLowerCase().includes(search) 
                                                    || student.email.toLowerCase().includes(search)
                                                    || student.phone.toString().includes(search);
                                                }).map((student, index) => (
                                                    <tr key={student._id}>
                                                        <td>{index+1}</td>
                                                        <td>{student.username}</td>
                                                        <td>{student.phone}</td>
                                                        <td>{student.email}</td>
                                                    </tr>
                                                ))
                                                ): (
                                                    <tr>
                                                        <td colSpan={6}>No Data Found</td>
                                                    </tr>
                                                )
                                                
                                            }
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
  )}
}
