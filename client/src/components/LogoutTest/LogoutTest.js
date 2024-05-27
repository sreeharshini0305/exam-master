import React from 'react';
import './LogoutTest.css';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer';
import cheatprevention from '../images/cheatprevention.PNG';
import automark from '../images/automark.PNG';
import devloprichexams from '../images/developrichexams.PNG';
import anonymizedexams from '../images/anonymizedexams.PNG';
function LogoutTest(){
    return(
        <div>
            <Navbar/>
            {/* logout first div */}
            <div className="logout-test-first-div-bg-image">
                <h2>All you need for your</h2>
                <h1>EXAM</h1>
            </div>
            {/* logout second div */}
            <div className="logout-test-page-second-div">
                <h1>Everything you need</h1>
                <p>WCreate comprehensive exams with powerful tools that are easy to use and quick to apply</p>
            </div>
            <div className="logout-test-page-second-div">
                <h1>Make it simple</h1>
                <p>Conduct exams with confidence and control thanks to our intuitive software that simplifies technical complexity</p>
            </div>
            <div className="logout-test-page-second-div">
                <h1>Empower every student</h1>
                <p>Customize exams to empower each student's individual needs and let their knowledge shine</p>
            </div>
            <Footer/>
        </div>
    );
}
export default LogoutTest;