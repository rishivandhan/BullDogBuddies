import React from 'react';
import { Card } from 'react-bootstrap';
import ItemsSlider from './ItemsSlider'
import Sidebar from "./sidebar";


function ViewEvents() {
  const topDealsItems = [
    { title: 'Event 1', price: 10 },
    { title: 'Event 2', price: 20 },
    { title: 'Event 3', price: 30 },
    { title: 'Event 4', price: 40 },
    { title: 'Event 5', price: 50 },
    { title: 'Event 6', price: 60 },
    { title: 'Event 7', price: 70 },
    { title: 'Event 8', price: 80 },
    { title: 'Event 9', price: 90 },
    { title: 'Event 10', price: 100 }
    // Add more items as needed
  ];

  return (
    <div className='ViewEvents'>
        <div className='sidebar'>
            <React.Fragment>
                <Sidebar />
            </React.Fragment>
        </div>
    <div className='scrollable cards'>
    <ItemsSlider title="Top Deals">
      {topDealsItems.map((item, index) => (
        <span key={index}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                <span className='actual-price'>{item.price}</span>
                <span className='mrp-price'>M.R.P. : <strike>{item.price}</strike><span className='save-price'>16% off</span></span>
                <span className='save-price'>Save{item.price}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </span>
      ))}
    </ItemsSlider>
    </div>
    </div>
  );
};

export default ViewEvents;