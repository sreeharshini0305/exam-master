import React from 'react';
import './About.css';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer';
import aboutimg2 from '../images/Aboutimg2.PNG';

function About(){
    return(
        <div>
            <Navbar/>
            <div className='about-page-first-div'>
                {/* first div in about page */}
                <h2>We understand the realities of</h2>
                <h1>THE CLASSROOM</h1>
            </div>
                    {/* about page second div second part */}
                    <div className='about-page-second-div-first-part-each about-page-second-div-second-part-each'>
                        <img src={aboutimg2} alt="aboutimg2" className='about-page-second-div-img'/>
                        <div>
                            <p>
                            ExamMaster holds the view that every teacher is the ultimate authority in their classroom. ExamMaster makes it simple for educators like you to administer tests in the manner that best suits your needs. 
                           We'll Never impose beliefs or frameworks outside of education. We also recognise that the teacher is directly impacted by the student's experience, which is why we allow you to customise tests to each student's specific requirements.
                            </p>
                            <p>
                            The team at ExamMaster has been making products that work and that teachers 
                            trust for more than five years. We are dedicated to helping teachers like you 
                            do what you do best.
                            </p>
                        </div>
                    </div>

            <Footer/>
        </div>
    );
}
export default About;