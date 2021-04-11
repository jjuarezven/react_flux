import React, {useState, useEffect} from 'react';
import { getCourses } from "../api/courseApi";
import CourseList from './CourseList';



function CoursesPage() {
    // state = {
    //     courses: []
    // };
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses().then(_courses => setCourses(_courses));
    }, []) // empty array tells React to run getCourses just one time

    // componentDidMount() {
    //     getCourses().then(courses => this.setState({ courses : courses }));        
    // }
    
    return (
        <>
            <h2>Courses</h2>
            <CourseList courses={courses} />
        </>
    );
    
}

export default CoursesPage;