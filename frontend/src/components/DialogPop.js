import React from 'react'

export default function DialogPop({type, onClose, setResponse}) {
    console.log({type});

    //onCancel = true;
    const toggleNo = () => {
        onClose(true);
    }
    const clickedYes = () => {
        console.log("yes")
        setResponse('Yes')
        onClose(true)
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
                    background: "rgba(0,0,0,0.9)",
                    zIndex: "99",
                }}>
                    <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                        <dialog open className='rounded bg-white p-1 border-0 shadow-lg'>
                            <div className='d-flex flex-column p-3'>
                                <div className='text-center'>
                                    <i className='bi bi-exclamation-triangle-fill text-danger fs-1'></i>
                                </div>
                                <div className='text-center'>
                                    <pre className='text-dark fs-3 fw-bold'>Are you sure?</pre>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <button 
                                    onClick={clickedYes}
                                    className='btn btn-lg btn-primary px-5 rounded-end-0'
                                >Yes</button>
                                <button 
                                    onClick={toggleNo}
                                    className='btn btn-lg btn-danger px-5 rounded-start-0'
                                >No</button>
                            </div>
                        </dialog>
                    </div>
                    <div className='d-none d-flex border border-danger flex-column justify-content-center align-items-center h-100'>
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
                        
                        <div className='d-none' style={{minWidth: "360px"}}>
                            <div className='col pe-1'>
                                <div className='bg-primary p-2 px-3 shadow' style={{
                                    borderRadius: "6px 6px 6px 16px",
                                }}>
                                    <button onClick={clickedYes} className='btn w-100 fs-4 p-0'>Yes</button>
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
        {
            type==='progress'?<>progress</>:null
        }
    </>
  )
}
