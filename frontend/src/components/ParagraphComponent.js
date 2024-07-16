import React, { useState } from 'react'

export default function ParagraphComponent({text}) {
    const [flexMode, setFlex] = useState('flex-row')
    const [buttonMode, setButton] = useState('more')
    const handleDescMode = () => {
        //e.preventDefalut()
        if (buttonMode === 'more') {
          setFlex('flex-column')
          setButton(' . . . less')
        } else {
          setFlex('flex-row')
          setButton('more')
        }
    }
  return (
    <div className={`d-flex py-3 ${flexMode}`}>
        
        
        {
            buttonMode === 'more'
            ?<pre className={`col card-text m-0 text-truncate pt-1`} style={{maxWidth: "78vw"}}>{text}</pre>
            :<pre className={`col card-text m-0 pt-1`} style={{maxWidth: "78vw", whiteSpace: "pre-wrap"}}>{text}</pre>
        }
        {
            text.length > 19
            ?<button type='button' className='bg-transparent border-0  text-end p-0' onClick={handleDescMode}>{buttonMode}</button>
            :null
        }
    </div>
  )
}
