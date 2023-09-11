import React from 'react'

export default function Footer() {
  return (
    <div>
        <div className="container-fluid m-0 p-4 bg-light">
            <div className="d-flex row">
                <div className="col-lg p-2">
                    copyright &copy; 2023
                </div>
                <div className="col-lg p-2">
                    <p className="fs-6">site map</p>
                    <ul>
                        <li>a</li>
                        <li>b</li>
                    </ul>
                </div>
                <div className="col-lg p-2">
                    <address>
                        add, ress, 
                        8767
                    </address>
                </div>
            </div>
        </div>
    </div>
  )
}
