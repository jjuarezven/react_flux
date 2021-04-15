import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";

function CoursesPage() {
  // state = {
  //     courses: []
  // };
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    // since our component is connected to the Flux store, when courses are added to the store, onChange will be called
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) {
      loadCourses();
    }
    return () => courseStore.removeChangeListener(onChange); // cleanup on unmount
  }, [courses.length]);

  // componentDidMount() {
  //     getCourses().then(courses => this.setState({ courses : courses }));
  // }

  const onChange = () => {
    setCourses(courseStore.getCourses());
  };

  return (
    <>
      <h2>Courses</h2>
      <Link to="/course" className="btn btn-primary">
        Add course
      </Link>
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </>
  );
}

export default CoursesPage;
