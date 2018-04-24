import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor() {
  	particlesJS.load('particles-js', 'assets/particles.json', function() {
		console.log('callback - particles.js config loaded');
	});
  }

  ngOnInit() {
  }

}
