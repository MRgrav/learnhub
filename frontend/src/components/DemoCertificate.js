import React from 'react'
//import { StyleSheet } from '@react-pdf/renderer'

export default function DemoCertificate() {
  return (
    <div className='bg-certificate'>
        <div className='text-dark'>
            <div className='d-flex pb-5'>
                <div className='col-8'>
                    <p className='h-certificate pt-5'>CERTIFICATE</p>
                    <p className='fs-3 m-0 pb-5'>OF COMPELETION</p>
                    <p className='fs-5 m-0 pt-5'>11th June 2023</p>
                    <p className='fs-1 fw-bold m-0 pt-2 border-bottom' style={{'width':'fit-content'}}>Gaurab Gogoi</p>
                    <p className='pt-3'> Has successfully completed </p>
                    <p className='fs-2 fw-bold'>Laravel Intermediate</p>
                    <p>an online quize based course from LearnHub</p>
                </div>
                <div className='col-4'>
                    <span className='rounded-circle p-3 py-4 border border-white border-2 bg-success shadow text-white badge'>
                        <p className='navbar-brand fs-2 fw-light m-0 py-5'>LearnHub</p>
                    </span>
                </div>
            </div>
            <div className='d-flex justify-content-end pt-5'>
                <div>
                <b className='d-block text-end w-100'>verify at</b>
                <p className='m-0 p-0 text-primary'>http://nothing.com</p>
                </div>
            </div>
        </div>
    </div>
  )
}
