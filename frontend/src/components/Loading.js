import React from 'react';
import { css } from '@emotion/react';
import { HashLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  z-index: 99;
`;

function Loading() {
  return (
    <div className="loading-container bg-black d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className='d-flex flex-column'>
      <HashLoader color={'#56D7C7'} css={override} size={70} />
      <p className='pt-5 text-success fs-5'>Loading...</p>
      </div>

    </div>
  );
}

export default Loading;
