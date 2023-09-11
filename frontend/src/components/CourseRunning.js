import React from 'react';
//import ReactPlayer from 'react-player';
//import Vid from '/home/gaurav/skill-up/frontend/src/components/media/test.mp4';
//import VideoPlayer from 'react-video-js-player';
import { Link } from 'react-router-dom';

export default function CourseRunning() {
  return (
    <div className='card w-100 p-3'>
        <img src="https://www.irvinestandard.com/images/2020/08/distance_learning_1600x960-1600x960.jpg" className="card-img-top" alt=""/>
        <div className="card-body">
            <h5 className="card-title fw-1 fw-bold">MongoDB</h5>
            <p className="card-text">Learn MongoDB, the NoSQL database.</p>
            <hr/>
            <div className='d-flex'>
                <div className="accordion accordion-flush w-100" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Introduction
                        </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                        
                        <video controls autoPlay className='w-100 rounded rounded-3 border border-light border-2 shadow'>
                            <source src='/media/test.mp4' type='video/mp4'></source>
                        </video>    
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            First Project
                        </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                Quize
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                            <code>print('hello world');</code>
                            <Link to='/quiz' className='btn btn-success'>Go to Quiz</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <b>Topics covered</b>
            <ul>
                <li>Introduction</li>
                <li>Installation and Setup</li>
                <li>First Cluster</li>
                <li>CRUD operations</li>
                <li>Final Test</li>
            </ul>
            <hr/>
            <b>Course by </b>
        </div>
    </div>
  )
}
