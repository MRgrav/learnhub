import React from 'react'

export default function Question() {
  return (
    <div className='p-2 w-100 pb-5'>
        <div className='d-flex flex-column'>
            <p>1. What type of system is used in BlockChain technology?</p>
            <div className='ps-4 d-flex justify-content-between'>
                <div>
                    <input type='radio' name='q1' value='a1' id='a1'/>
                    <label className='ps-2' for=''>Centrelized</label>
                </div>
                <div>
                    <input type='radio' name='q1' value='a2' id='a2'/>
                    <label className='ps-2' for='a2'>Distributed</label>
                </div>
                <div>
                    <input type='radio' name='q1' value='a3' id='a3'/>
                    <label className='ps-2' for='a3'>Pair</label>
                </div>
                <div>
                    <input type='radio' name='q1' value='a4' id='a4'/>
                    <label className='ps-2' for='a4'>None of the above</label>
                </div>
            </div>
        </div>
    </div>
  )
}
