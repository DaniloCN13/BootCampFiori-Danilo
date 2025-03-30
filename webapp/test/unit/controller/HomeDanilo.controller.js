/*global QUnit*/

sap.ui.define([
	"com/bootcamp/sapui5/project/controller/HomeDanilo.controller"
], function (Controller) {
	"use strict";

	QUnit.module("HomeDanilo Controller");

	QUnit.test("I should test the HomeDanilo controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
