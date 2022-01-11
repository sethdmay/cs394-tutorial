import React, { useState, useEffect } from 'react';
import CourseList from './components/CourseList.js';
import { addScheduleTimes } from './utilities/times';
import { useData } from './utilities/firebase.js';
import './App.css';

const Banner = ({ title }) => (
    <h1>{ title }</h1>
);

const App = () => {
  const [schedule, loading, error] = useData('/', addScheduleTimes);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>;



  // const url = "https://courses.cs.northwestern.edu/394/data/cs-courses.php";

  // useEffect(() => {
  //     const fetchSchedule = async () => {
  //       const response = await fetch(url);
  //       if (!response.ok) throw response;
  //       const json = await response.json();
  //       setSchedule(addScheduleTimes(json))
  //     }
  //     fetchSchedule();
  //   }, 
  //   []
  // );

  // if (!schedule) return <h1>Loading schedule...</h1>;

  return (
    <div className='container'>
      <Banner title={ schedule.title } />
      <CourseList courses= { schedule.courses } />
    </div>
  );
};

export default App; 