"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');
var _ = require('lodash');

var ManageCoursePage = React.createClass({
  mixins: [
    Router.Navigation
  ],

  statics: {
    willTransitionFrom: function (transition, component) {
      if (component.state.dirty && !confirm('Leave without saving?')) {
        transition.abort();
      }
    }
  },

  getInitialState: function () {
    return {
      course: {id: '', title: '', watchHref: '', author: ''},
      availableAuthors: AuthorStore.getAllAuthors(),
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function () {
    var courseId = this.props.params.id; //from the path '/course:id'
    if (courseId) {
      this.setState({course: CourseStore.getCourseById(courseId)});
    }
    AuthorStore.addChangeListener(this._onChange);
  },

  //Clean up when this component is unmounted
  componentWillUnmount: function () {
    AuthorStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({courses: AuthorStore.getAllAuthors()});
  },


  setCourseState: function (event) {
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.course[field] = value;
    return this.setState({course: this.state.course});
  },

  courseFormIsValid: function () {
    var formIsValid = true;
    this.state.errors = {}; //clear any previous errors.

    if (this.state.course.title.length < 3) {
      this.state.errors.title = 'Course title must be at least 3 characters.';
      formIsValid = false;
    }

    if (this.state.course.watchHref.length < 3) {
      this.state.errors.watchHref = 'Watch Href must be at least 3 characters.';
      formIsValid = false;
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  saveCourse: function (event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    if (this.state.course.id) {
      CourseActions.updateCourse(this.state.course);
    } else {
      CourseActions.createCourse(this.state.course);
    }

    this.setState({dirty: false});
    toastr.success('Course saved.');
    this.transitionTo('courses');
  },

  render: function () {
    return (
        <CourseForm
            course={this.state.course}
            onChange={this.setCourseState}
            onSave={this.saveCourse}
            errors={this.state.errors}
            items={this.state.availableAuthors}/>
    );
  }
});

module.exports = ManageCoursePage;