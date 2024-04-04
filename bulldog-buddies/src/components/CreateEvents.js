import React from 'react';
import "./CreateEvents.css"
import Sidebar from './sidebar';
import { useEventOperations } from '../FirebaseEventOperations';
import { useNavigate } from 'react-router-dom';



function CreateEvents() {

    //const { bring in functions from firebaseeventOperations} = useEventOperations(); 

  
    function handleEventCreate(e) {
        
      console("submit was clicked");
      e.preventDefault();


      //constant stores values entered into textbox
      const title = document.getElementById("Title");
      const ExpirationTime = document.getElementById("ExpirationTime");
      const description = document.getElementById("description");
      const location = document.getElementById("location");
      const eventPeopleRegistered = document.getElementById("eventPeopleRegistered");
      const time = document.getElementById("Time");
      const Limit = document.getElementById("Limit");
      

      //check to see if fields were entered
      if(!title || !ExpirationTime || !description || !location || !eventPeopleRegistered || !time || !Limit){
        alert("Please fill in all the required fields");
        return;
      }

    }
    return(
        <div className='CreateEvents'>
            <div className='sidebar'>
            <React.Fragment>
                <Sidebar />
            </React.Fragment>
            </div>

        <div className='form'>
        <form method="post" onSubmit={handleEventCreate}>


      <label>
        Title: <input name="eventTitle" defaultValue="" id = "Title"/> <br />
        Expiration Time: <input name="eventExpirationTime" defaultValue="" id = "ExpirationTime"/> <br />
        Description: <input name="Descriptio" defaultValue="" id = "description"/><br />
        Location: <input name="eventLocation" defaultValue="" id = "location"/><br />
        Number of People to Resgister: <input name="eventPeopleRegistered" defaultValue="" id = "PeopleRegistered"/><br />
        Time: <input name="eventTitle" defaultValue="" id = "Time"/>  <br /> {/*come back later. not a text input. need a checkbox for am and pm*/  }  
        Number of People Limit: <input name="PeopleLimit" defaultValue="" id ="Limit" /><br />

      </label>


      <button type="reset">Reset form</button>
      <button type="submit" id = "submit-event-button">Submit form</button>
      </form>
        </div>
    </div>
    );
}

export default CreateEvents;