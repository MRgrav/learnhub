import React from 'react'

export default function Avatar({name, type}) {
    const firstLetter = name[0].toUpperCase();
    //firstLetter = firstLetter.toUpperCase();
  return (
    <>
        { type === 'big'?
            <i className='nameAvatar main-profile'><center>{firstLetter}</center></i>
            :
            <>
            { type === 'med'?
              <i className='nameAvatar main-profile med-profile'><center>{firstLetter}</center></i>
              :
              <i className='nameAvatar '><center>{firstLetter}</center></i>
            }
            </>
        }
    </>
  )
}
