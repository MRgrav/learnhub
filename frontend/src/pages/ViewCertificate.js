import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import CertificatePDF from '../certificate/CertificatePDF'
import DemoCertificate from '../components/DemoCertificate'

export default function ViewCertificate() {
  return (
    <div className='bg-theme p-md-4 px-sm-0 pt-md-5 pt-sm-0 mt-5' style={{'height':'fit-content', 'min-height': '1000px'}}>
        <div className='container' style={{'height':'100%'}}>
            <span className='fs-3 fw-bold'>Certificate</span>
            <hr/>
            <DemoCertificate />
            <div className='certificate-wrapper d-none'>
                <PDFViewer className='w-100 h-100' >
                    <CertificatePDF/>
                </PDFViewer>
            </div>
        </div>
    </div>
  )
}
