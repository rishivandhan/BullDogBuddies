import React from 'react';
import "./CreateEvents.css";
import Sidebar from "./sidebar";

function CreateEvents() {
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
    
        // You can pass formData as a fetch body directly:
        fetch('/some-api', { method: form.method, body: formData });
    
        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
      }
      return(
        <div className="createEvents-container">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="create-display">
            <div className="create-title">
              <h3>Create an Event</h3>
            </div>
            <div className='form'>
              <form method="post" onSubmit={handleSubmit}>
                <label>
                  Title: <input className="form-input" name="myInput" defaultValue="" />
                  Type: <input className="form-input"  name="myInput" defaultValue="" />
                  Location: <input className="form-input" name="myInput" defaultValue="" />
                  Description: <input className="form-input" name="myInput" defaultValue="" />
                </label>
                <hr />
                <button type="reset">Reset form</button>
                <button type="submit">Submit form</button>
              </form>
            </div>
          </div>
        </div>
    );
}

export default CreateEvents;