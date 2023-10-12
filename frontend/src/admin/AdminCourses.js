import React from 'react'
import AdminSidebar from './AdminSidebar'

export default function AdminCourses() {
  return (
    <div className='bg-theme p-3' style={{"height":"100vh"}}>
        <div className='container-fluid h-100'>
            <div className='d-flex h-100'>
                <AdminSidebar />
                <div className='col-xl-10 col-lg-9 col-md-8 p-2'>
                    <div className='card border rounded h-100 p-3'>
                        <span className='p-4 pb-0 pt-3 fw-bold fs-3'>Courses</span>
                        <div className='d-flex w-100 px-3 flex-column'>
                            <div className='m-0 px-0 mt-3 w-100 d-flex'>
                                <form className='d-flex p-2 col'>
                                    <input type='text' className='form-control border-success bg-success bg-opacity-10' placeholder='search to learn'/>
                                    <button className='btn btn-outline-success' type='submit'>Search</button>
                                </form>
                                <div className='p-2'><a className='btn btn-primary' href='/new-course'>Add course</a></div>
                            </div>
                            <hr/>
                            <div className='p-2 d-flex flex-column'>
                                <span className='py-2 fw-bold fs-5'>Courses</span>
                                <div className='table-wraper'>
                                    <table class="table rounded-top-4 shadow-sm">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <TBody/>
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

export function TBody() {
    const rows = [];
  
    for (let i = 0; i < 100; i++) {
      rows.push(
        <React.Fragment key={i}>
          <tr>
            <td>{i + 1}</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </React.Fragment>
      );
    }
  
    return rows;
}
