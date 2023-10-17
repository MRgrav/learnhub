import React, { useContext } from 'react'
import userContext from '../states/userContext';
import Avatar from './Avatar';

export default function SideProfile() {
    const {name, auth} = useContext(userContext);
    const current = new Date();
    const week = `${current.getDay()}`;
    //console.log(week);
    //const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <div className='p-3 rounded-3 card shadow'>
        <div className="d-flex flex-row justify-content-between">
            <div className="align-self-end">
                <p className="m-0">My Profile</p>
                <b className="fs-4">{name}</b>
            </div>
            <div className="px-2">
                {console.log(name)}
                {auth?
                <>
                  <i className='p-2'><Avatar name={name} type='med'></Avatar></i>
                </>
                :
                <>
                  <img className="profile-img main-profile" src={"../media/paimg4.jpg" || "./media/paimg4.jpg"} alt="?"/>
                </>
                }
            </div>
        </div>
        <hr/>
        <div className='p-3  bg-opacity-0'>
            <div className="d-flex no-wrap">
                <div className="col text-center">
                    <p>Su</p>
                    { // eslint-disable-next-line
                    (week==0)?<span className="bg-warning px-3 border border-dark rounded rounded-pill"></span>
                    :null}
                </div>
                <div className="col text-center">
                    <p>Mo</p>
                    { // eslint-disable-next-line
                    (week==1)?<span className="bg-warning px-3 border border-dark rounded rounded-pill"></span>
                    :null}
                </div>
                <div className="col text-center">
                    <p>Tu</p>
                    { // eslint-disable-next-line
                    (week!=2)?null
                    :<i className='bi bi-caret-up-fill'></i>}
                </div>
                <div className="col text-center">
                    <p>We</p>
                    { // eslint-disable-next-line
                    (week==3)?<span className="bg-warning px-3 border border-dark rounded rounded-pill"></span>
                    :null}
                </div>
                <div className="col text-center">
                    <p>Th</p>
                    { // eslint-disable-next-line
                    (week==4)?<span className="bg-warning px-3 border border-dark rounded rounded-pill"></span>
                    :null}
                </div>
                <div className="col text-center">
                    <p>Fr</p>
                    { // eslint-disable-next-line
                    (week==5)?<span className="bg-warning px-3 border border-dark rounded rounded-pill"></span>
                    :null}
                </div>
                <div className="col text-center">
                    <p>Sa</p>
                    { // eslint-disable-next-line
                    (week==6)?<span className="bg-warning px-3 border border-dark rounded rounded-pill"></span>
                    :null}
                </div>
            </div>
            <hr/> 
        </div>
        <div className="p-2">
            <div className="rounded-10 bg-primary p-4">
                <span className="p-2 fw-bold text-white border border-white rounded">DAILY QUOTE</span>
                <p className="fst-italic text-white pt-3">"Optimism is an occupational hazard of programming: feedback is the treament."</p>
                <p className="text-white text-end fw-bold">- Kent Beck</p>
            </div>
        </div>
    </div>
  )
}
