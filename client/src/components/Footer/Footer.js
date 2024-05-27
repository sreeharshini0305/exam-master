import React from 'react';
import './Footer.css';

function Footer(){
    return(
        <>
        <div className="footer-container">
            
            <div className="footer-container-first-part">
                <h1>ExamMaster</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui animi laboriosam 
                explicabo minus provident expedita saepe tenetur inventore </p>
        
            </div>
            {/* part2 */}
            <div className="footer-container-first-part">
                <p>Home</p>
                <p>About Us</p>
                <p>Contact Us</p>
            </div>
            {/* part3*/}
            <div className="footer-container-first-part">
                <h1>Give Us a Call</h1>
               
                <div className="footer-container-first-part-first">
                <p>call: 999-999-9999</p>
                </div>
                

                <h1>Mail us</h1>
                <div className="footer-container-first-part-first">
                <p>mail: ExamMaster@gmail.com</p>
                </div>
                
                
            </div>
        </div>
        
        </>
    );
}

export default Footer;