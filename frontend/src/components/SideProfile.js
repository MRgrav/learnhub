import React from 'react'

export default function SideProfile() {
  return (
    <div className='p-3 rounded-3 bg-white shadow'>
        <div className="d-flex flex-row justify-content-between">
            <div className="align-self-end">
                <p className="m-0">My Profile</p>
                <b className="fs-4">Gaurab Gogoi</b>
            </div>
            <div className="px-2">
                <img className="profile-img" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ft3.ftcdn.net%2Fjpg%2F02%2F33%2F46%2F24%2F360_F_233462402_Fx1yke4ng4GA8TJikJZoiATrkncvW6Ib.jpg&f=1&nofb=1&ipt=7628c7602f78c0dcd987d1cefecde3d5b70032407a85790583360cb1eff0010e&ipo=images" alt=""/>
            </div>
        </div>
        <hr/>
        <div className='p-3 bg-light'>
            <div className="d-flex no-wrap">
                <div className="col text-center">
                    <p>Su</p>
                    <span className="bg-warning px-3 border border-dark rounded rounded-pill"></span>
                </div>
                <div className="col text-center">Mo</div>
                <div className="col text-center">Tu</div>
                <div className="col text-center">We</div>
                <div className="col text-center">Th</div>
                <div className="col text-center">Fr</div>
                <div className="col text-center">Sa</div>
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
