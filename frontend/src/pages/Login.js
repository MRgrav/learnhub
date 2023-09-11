import React from 'react'

export default function Login() {
  return (
    <div className='card border-0 container login-container hv-100'>
      <div className='login-block d-flex flex-column shadow'>
        <b className='fs-4 text-center p-3 bg-primary rounded-top text-white'>LOGIN</b>
        <form className='login-form' action='' method='post'>
          <div className='d-flex flex-column p-4 border border-3 border-primary'>
            <table>
              <tr>
                <td>
                  <label for='uid' className='p-2 py-4'>username/email</label>
                </td>
                <td>
                  <input className='login-input border-primary' type='text' id='uid'/>
                </td>
              </tr>
              <tr>
                <td>
                  <label for='pwd' className='p-2 pb-4'>password</label>
                </td>
                <td>
                  <input className='login-input border-primary' type='text' id='pwd'/>
                </td>
              </tr>
            </table>
            <div className='d-flex justify-content-between p-3'>
              <button className='btn btn-secondary shadow'>cancel</button>
              <button type='submit' className='btn btn-success px-4 shadow'>sign in</button>
            </div>
            <hr/>
            <p className='text-center'>create new account <a href='/create-account'>Sign up</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}
