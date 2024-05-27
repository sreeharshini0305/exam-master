import React from 'react'
import Navbar from '../Navbar/Navbar'
import HomeImage from '../images/HomeImage.jpg';
import './Home.css';
import filesetting from '../images/file-setting.png';
import maths from '../images/maths.png';
import system from '../images/system.png';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div className="home-page-container">
        <Navbar/>
        <div>
          {/* first div part */}
          <div className='home-page-first-div'>
            <div className='home-page-headers'>
            <h1>ONLINE EXAMS</h1>
            <h3>Made Easy</h3>
          
            <p>ExamMaster gives you all the tools and functionality you require to safely design, administer, and grade tests for your students.
            Construct and administer your initial test in under sixty minutes.</p>
           
            </div>
            <div className='home-page-image-first-div'>
            <img src={HomeImage} alt="home-image" className='Home-page-head-image'/>
            </div>
          </div>
          {/* second div part*/}
          <div className="home-page-second-div-container">
            <div className="home-page-second-div-head">
              <h1>Why choose ExamMaster?</h1>
            </div>
            <div className="home-page-second-div-parts">
              {/* 2nd div 1st */}
              <div className="home-page-sec-parts-each">
              <img src={maths} alt="maths" className="home-page-second-each-img"/>
              <h1>EVERYTHING YOU NEED</h1>
              <p>Create comprehensive exams with powerful tools that are easy to use and quick to apply</p>

              </div>
              {/* 2nd div 1st */}
              <div className="home-page-sec-parts-each">
              <img src={system} alt="system" className="home-page-second-each-img"/>
              <h1>MAKE IT SIMPLE</h1>
              <p> Conduct exams with confidence and control thanks to our intuitive software that simplifies technical complexity</p>
              </div>
              {/* 2nd div 1st */}
              <div className="home-page-sec-parts-each">
              <img src={filesetting} alt="file-setting" className="home-page-second-each-img"/>
              <h1>EMPOWER EVERY STUDENT</h1>
              <p>Customize exams to empower each student's individual needs and let their knowledge shine</p>
              </div>
            </div>
          </div>

        </div>

        {/* third div in home page */}
        <div className="home-page-third-div-container">
          <div className="home-page-third-div-header">
            <p>Trusted by Over <b>10000+</b> teachers across the world</p>
          </div>
          <div className="home-page-third-div-parts">
            <div className="home-page-third-div-parts-each">
            {/* 1st div in 3r*/}
              <p>2000+</p>
              <p>Schools</p>
            </div>
            <div className="home-page-third-div-parts-each">
            {/* 2nd div in 3r */}
              <p>500+</p>
              <p>Universities</p>
            </div>
            <div className="home-page-third-div-parts-each">
            {/* 3rd div in 3r */}
              <p>10 million</p>
              <p>Exams started</p>
            </div>
          </div>
        </div>
        
        
       <Footer/>
        
    </div>
  )
}
export default Home