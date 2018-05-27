import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	date: any;
	daysInThisMonth: any;
	daysInLastMonth: any;
	daysInNextMonth: any;

  daysTotal: any;
  currentWeek: any;
  baseDate: any;

	monthNames: string[];
	currentMonth: any;
	currentYear: any;
	currentDate: any;

  constructor(public navCtrl: NavController) {
      this.baseDate = new Date().getDate();
  }

  ionViewDidEnter() {
  	this.date = new Date();
  	this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  	this.getDaysOfMonth();
  }

  // function for calendar
  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.daysTotal = new Array();
    this.currentWeek = new Array();
    
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
      this.daysTotal.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
      this.daysTotal.push(i+1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var i = 0; i < (6-lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
      this.daysTotal.push(i+1);
    }

    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
        this.daysInNextMonth.push(i);
        this.daysTotal.push(i);
      }
    }

    var currentIndex = this.baseDate + this.daysInLastMonth.length;
    var remainder = currentIndex % 7;

    for (var i = currentIndex - remainder - 1; i < currentIndex - remainder + 6; i ++) {
      this.currentWeek.push(this.daysTotal[i + 1]);
    }

    if(currentIndex < 0) {
      if (this.daysInLastMonth.length == 0) {
        var last = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        this.baseDate = last + this.baseDate - 1;
      } else {
        this.baseDate = this.daysInLastMonth[0] + currentIndex - 1;
      }

      this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
      this.getDaysOfMonth();
    }
    
    if(this.baseDate > 31) {
      this.baseDate = this.baseDate - this.daysInThisMonth.length;
      this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
      this.getDaysOfMonth();
    }

  }

  goToLastMonth() {
    this.baseDate = this.baseDate - 7;
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.baseDate = this.baseDate + 7;
    this.getDaysOfMonth();
  }

  swipeLeft(event) {
    this.goToNextMonth();
  }

  swipeRight(event) {
    this.goToLastMonth();
  }

}
