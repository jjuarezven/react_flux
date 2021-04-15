import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm.js";
import courseStore from "../stores/courseStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // from the path /courses/:slug

    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  const onChange = () => {
    setCourses(courseStore.getCourses());
  };

  const handleChange = (event) => {
    const updatedCourse = {
      ...course,
      [event.target.name]: event.target.value,
    };
    setCourse(updatedCourse);
  };

  const formIsValid = () => {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author Id is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formIsValid()) {
      return;
    }
    courseActions.saveCourse(course).then(() => {
      // an optional approach to make a redirect
      props.history.push("/courses");
      toast.success("Course saved");
    });
  };

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
