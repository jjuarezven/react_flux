import { EventEmitter } from "events";
import actionTypes from "../actions/actionTypes.js";
import dispatcher from "../appDispatcher";

const CHANGE_EVENT = "change";
let _courses = [];

class CourseStore extends EventEmitter {
  addChangeListener(callBack) {
    this.on(CHANGE_EVENT, callBack);
  }

  removeChangeListener(callBack) {
    this.removeListener(CHANGE_EVENT, callBack);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find((course) => course.slug === slug);
  }
}

dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map((course) =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;
    case actionTypes.DELETE_COURSE:
      _courses = _courses.filter(
        (course) => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    default:
  }
});

const store = new CourseStore();

export default store;
