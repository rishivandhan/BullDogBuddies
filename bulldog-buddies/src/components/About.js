import React from 'react';
import Sidebar from './sidebar';
import './About.css';

function About() {

    return (
        <div className="createAbout-container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="create-display">
                <div className="create-title">
                    <h3>About Us</h3>
                </div>
                <div className="aboutform-container">
                    <div className="team-container">
                        <h1>Our Team</h1>
                        <h3>Back End</h3>
                        <p>Rishi</p> 
                        <p>Arjun</p>
                        <h3>Front End</h3>
                        <p>Antonio</p>
                        <p>Sanjay</p>
                        <p>Luke</p>
                    </div>
                    <div className="stuffUsed-container">
                        <h1>Tools Used</h1>
                        <h3>Source Control</h3>
                        <p>GitHub</p>
                        <h3>Diagrams and Models</h3>
                        <p>Figma</p>
                        <p>Miro</p>
                        <h3>Database</h3>
                        <p>Google Firebase</p>
                    </div>
                    <div className="language-container">
                        <h1>Languages and Frameworks</h1>
                        <p>JavaScript</p>
                        <p>React.js</p>
                        <p>CSS</p>
                    </div>
                    <div className="description-container">
                        <h1>What is Bulldog Buddies</h1>
                        <p>Bulldog Buddies is a web app that allows students
                            to meet people in an easy and fun way. Students are 
                            able to "make an event" and people who are interested 
                            can rsvp to attend. "Events" can be anything from a
                            party to a pick up basketball game, or if you are
                            looking for a tennis partner or something as simple as 
                            a study session.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;