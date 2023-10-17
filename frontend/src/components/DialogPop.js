import React from 'react'

export default function DialogPop({type, onClose}) {
    console.log({type});

    //onCancel = true;
    const toggleNo = () => {
        onClose(true);
    }
  return (
    <>
        {
            type === 'ask'?
            (
                <div style={{
                    position: "fixed",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    background: "rgba(0,30,30,0.7)",
                    zIndex: "99",
                }}>
                    <div className='d-flex border border-danger flex-column justify-content-center align-items-center h-100'>
                        <div className='py-2' style={{minWidth:"360px"}}>
                            <div className='p-3 bg-white shadow' style={{
                                borderRadius: "20px 20px 8px 8px",
                            }}>
                                <div className='text-center'>
                                    <i className='bi bi-exclamation-triangle-fill text-danger fs-1'></i>
                                </div>
                                <p className='text-dark text-center fw-bold fs-3'>Are you sure?</p>
                                <p className='text-dark text-center m-0'>logout</p>
                            </div>
                        </div>
                        <div className='d-flex' style={{minWidth: "360px"}}>
                            <div className='col pe-1'>
                                <div className='bg-primary p-2 px-3 shadow' style={{
                                    borderRadius: "6px 6px 6px 16px",
                                }}>
                                    <button className='btn w-100 fs-4 p-0'>Yes</button>
                                </div>
                            </div>
                            <div className='col ps-1'>
                                <div className='bg-warning p-2 px-3 shadow' style={{
                                    borderRadius: "6px 6px 16px 6px",
                                }}>
                                    <button className='btn w-100 fs-4 p-0' onClick={toggleNo}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
            
                </div>
            )
            :null
        }
    </>
  )
}
