import React, { useContext, useEffect, useState } from 'react'
import userContext from '../states/userContext';
import Avatar from './Avatar';

export default function SideProfile() {
    const {name, auth} = useContext(userContext);
    const current = new Date();
    const week = `${current.getDay()}`;
    //console.log(week);
    //const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const quotes = [
        {
            qText: "Education is the most powerful weapon which you can use to change the world.", 
            qBy: "Dr. A.P.J. Abdul Kalam",
        },
        {
            qText: "Learning never exhausts the mind.",
            qBy: "Leonardo da Vinci",
        },
        {
            qText: "The best error message is the one that never shows up.",
            qBy: "Thomas Fuchs",
        },
    ]

    const [todayQuote, setQuote] = useState(quotes[0])

    
    function randomQuotePicker() {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        setQuote(randomQuote)
        console.log(randomQuote)
    }

    useEffect(()=>{
        randomQuotePicker();
        // eslint-disable-next-line
    },[])

  return (
    <div className='p-3 rounded-3 card shadow'>
        {
            auth && (
            <>
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
            </>       
            )
        }
        <div className='p-3  bg-opacity-0'>
            <div className="d-flex no-wrap">
                <div className="col text-center">
                    <p>Su</p>
                    { // eslint-disable-next-line
                    (week==0)?<i className='bi bi-caret-up-fill'></i>
                    :null}
                </div>
                <div className="col text-center">
                    <p>Mo</p>
                    { // eslint-disable-next-line
                    (week==1)?<i className='bi bi-caret-up-fill'></i>
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
                    (week==3)?<i className='bi bi-caret-up-fill'></i>
                    :null}
                </div>
                <div className="col text-center">
                    <p>Th</p>
                    { // eslint-disable-next-line
                    (week==4)?<i className='bi bi-caret-up-fill'></i>
                    :null}
                </div>
                <div className="col text-center">
                    <p>Fr</p>
                    { // eslint-disable-next-line
                    (week==5)?<i className='bi bi-caret-up-fill'></i>
                    :null}
                </div>
                <div className="col text-center">
                    <p>Sa</p>
                    { // eslint-disable-next-line
                    (week==6)?<i className='bi bi-caret-up-fill'></i>
                    :null}
                </div>
            </div>
            <hr/> 
        </div>
        <div className="p-2">
            <div className="rounded-10 bg-primary p-4">
                <span className="p-2 fw-bold text-white border border-white rounded">DAILY QUOTE</span>
                {
                }
                <p className="fst-italic text-white pt-3">"{todayQuote.qText}"</p>
                <p className="text-white text-end fw-bold">- {todayQuote.qBy}</p>
            </div>
        </div>
    </div>
  )
}
