"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseApi = require('../api/courseApi.js');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
	createCourse: function(course) {
		var newCourse = CourseApi.saveCourse(course);

		//Hey dispatcher, go tell all the stores that an author was just created.
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_COURSE,
			course: newCourse
		});
	},

	updateCourse: function(course) {
		var updatedCourse = CourseApi.saveCourse(course);

		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_COURSE,
			course: updatedCourse
		});
	},

	deleteCourse: function(id) {
		CourseApi.deleteCourse(id);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_COURSE,
			id: id
		});
	}
};

module.exports = AuthorActions;