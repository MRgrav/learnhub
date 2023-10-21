import React from 'react'

export default function Avatar({name, type}) {
    let firstLetter;
    //firstLetter = firstLetter.toUpperCase();

      name?firstLetter = name[0].toUpperCase()
      :firstLetter = 'A'

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
