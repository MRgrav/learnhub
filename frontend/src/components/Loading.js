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
    <div className="loading-container bg-light d-flex w-100 vh-100 justify-content-center align-items-center">
      <HashLoader color={'#56D7C7'} css={override} size={70} />
    </div>
  );
}

export default Loading;
