//working with audio
var k = 0;
document.addEventListener("scroll", ()=> {
	var clocl = document.getElementById("clocksound");
	var bell = document.getElementById("bell");
	var noise = document.getElementById("examnoises");
	
	clocl.play();
	var positionnow = getScrollTop();
	var testend = 4300; //the position where the test ends, we need to adjust it
	var noisestart = 300;
	var noiseend = 2500;
	
	if (positionnow >= noisestart && positionnow <= noiseend && k === 0) {
		noise.play();
		noise.volume = 0.3;
		noise.loop = true;
	}
	if (noiseend < positionnow) {
		noise.loop = false;
		noise.pause();
	}
	if (positionnow < testend && k===0) {
		clocl.volume = 0.05;
	}
	else if (testend<=positionnow && k===0) {
		clocl.volume = 0;
		bell.volume = 0.01;
		bell.play();
		if (bell.currentTime === 0.5) bell.pause();
		k=1;
	}
})

function getScrollTop() { 
	return window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop; 
}

// function getTop(obj) {
// 	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
// }

// intro section animation
// disabling animation by default so user can't scroll down when on title screen
disableScroll();
// document.addEventListener('DOMContentLoaded', () => {
// 	let title = document.querySelector('.title');
// 	setTimeout(() => {
// 		title.classList.add('fade');
// 		enableScroll();
// 	}, 500);
// 	setTimeout(() => {
// 		title.remove();
// 	}, 4000);
// })

document.addEventListener('DOMContentLoaded', () => {
	let title = document.querySelector('.title');
	title.addEventListener('click', () => {
		title.classList.add('fade');
		enableScroll();
		setTimeout(() => {
			title.remove();
		}, 1000);
	})
})

gsap.registerPlugin(ScrollTrigger);

// our global variables
let userInput = 0;
let correctAnswer = 110;

// parallax animation
gsap.to(".clock", {
	scrollTrigger: {
		trigger: ".intro",
		start: "top center",
		end: "bottom top",
		scrub: 0.5,
		pinSpacing: false
	},
	y: "-700"
})

gsap.to(".intro-background", {
	scrollTrigger: {
		trigger: ".intro",
		start: "top top",
		end: "bottom center",
		scrub: 0.8,
		pinSpacing: false
	},
	y: "-200",
	opacity: 0
})

// pinning the character at certain point
gsap.to(".main-character", {
	scrollTrigger: {
		trigger: ".main-character",
		start: "top 40%",
		endTrigger: ".third",
		end: "top bottom",
		pinSpacing: false,
		pin: true,
		once: true,
	}
})


// second section for two dialogues
gsap.to(".dialogue-1", {
	scrollTrigger: {
		trigger: ".second",
		start: "top 50%",
		// toggleClass: "reveal",
		endTrigger: ".dialogue-1",
		end: "top 20%",
		toggleActions: "restart reverse restart reverse",
		//  changing the image for different dialogues
		onLeave: () => {
			document.querySelector(".main-character").src = "images/frame 5 - praying.png";
		},
		onLeaveBack: () => {
			document.querySelector(".main-character").src = "images/frame 4 - stressed guy.png";
		}
	},
	opacity: 1,
	duration: 0.2
})

gsap.to(".dialogue-2", {
	scrollTrigger: {
		trigger: ".dialogue-1",
		start: "top 20%",
		// toggleClass: "reveal",
		endTrigger: ".third",
		end: "top bottom",
		toggleActions: "restart reverse restart reverse",
	},
	opacity: 1,
	duration: 0.2
})

// animation for the user input section
gsap.to(".praying", {
	scrollTrigger: {
		trigger: ".praying",
		start: "bottom bottom",
		end: "+=200",
		onEnter: () => {
			let answerInput = document.querySelector('.answer');
			
			// we disable the input when the user is done entering the answer
			// otherwise we disable the scroll
			if (answerInput.disabled == false) disableScroll();
			
			document.querySelector(".answer-popup").classList.add("reveal");
			
			answerInput.addEventListener('keypress', function (e) {
				// avoiding empty values to be entered
				if (answerInput.value != "") {
					if (e.key === 'Enter') {
						// after entering a value, we enable scrolling and disable the input field
						enableScroll();
						answerInput.style.border = "none";
						answerInput.disabled = true;
						userInput = answerInput.value;
						
						document.querySelector(".write").innerText = userInput;

						let endingImage = document.querySelector(".ending-image");
						let dialogue = document.querySelector(".ending-dialogue h2");
						let result = document.querySelector(".result");
						
						// changing the dialogue and image on the basis of the answer
						if (parseInt(userInput) == correctAnswer) {
							endingImage.src = "images/never_cheat_again.png";
							result.src = "images/frame 13 - result A+.png";
							dialogue.innerText= "Thank you God! I will never cheat again.";
						} else {
							endingImage.src= "images/was_i_hallucinating.png";
							result.src = "images/frame 13 - result F.png";
							dialogue.innerText= "Boy, was I hallucinating.";
						}
					}
				}
			});
		},
		// pinning the user input section for a proper look
		onUpdate: () => {
			let y = document.querySelector(".third").offsetTop;
			if (document.querySelector('.answer').disabled == false) window.scrollTo(0, y);
		},
		onLeave: () => {
			enableScroll();
			document.querySelector(".praying").src = "images/frame 6.3.png";
		}
	}
})

// making a timeline for the answer reveal animation
let tl = gsap.timeline({
	scrollTrigger: {
		trigger: ".written-answer",
		start: "top 60%",
	},
})

tl.to(".write", {opacity: 1, duration: 1})
	.to(".surprised", {opacity: 1, duration: 1}, "-=0.5");


//section for "phew i wont fail after all"
gsap.to(".dialogue-5", {
	scrollTrigger: {
		trigger: ".fifth",
		start: "top 40%",
		endTrigger: ".dialogue-5",
		end: "bottom 10%",
		toggleActions: "restart reverse restart reverse",
	},
	opacity: 1,
	duration: 0.2
})
 
gsap.to(".img-5", {
	scrollTrigger: {
		trigger: ".fifth",
		start: "top 40%",
		endTrigger: ".dialogue-5",
		end: "bottom 10%",
		toggleActions: "restart reverse restart reverse",
	},
	opacity: 1,
	duration: 0.2
})
 
//section for "a few days later"
gsap.to(".dialogue-later", {
	scrollTrigger: {
		trigger: ".later",
		start: "top 40%",
		endTrigger: ".dialogue-later",
		end: "bottom 35%",
		toggleActions: "restart reverse restart reverse",
	},
	opacity: 1,
	duration: 0.2
})

//section for the ending
gsap.to(".ending-dialogue", {
	scrollTrigger: {
		trigger: ".ending",
		start: "top bottom",
		endTrigger: ".ending",
		end: "bottom bottom",
		toggleActions: "restart reverse restart reverse",
	},
	opacity: 1,
	duration: 0.2
})

gsap.to(".ending-image", {
	scrollTrigger: {
		trigger: ".ending",
		start: "top bottom",
		endTrigger: ".ending",
		end: "bottom bottom",
		toggleActions: "restart reverse restart reverse",
	},
	opacity: 1,
	duration: 0.2
})


gsap.to(".footer h1", {
	scrollTrigger: {
		trigger: ".ending",
		start: "bottom bottom",
		endTrigger: ".footer",
		end: "bottom top",
		toggleActions: "restart reverse restart reverse",
	},
	opacity: 1,
	duration: 0.5
})

// disable and enable scrolling code
// https://www.geeksforgeeks.org/how-to-disable-scrolling-temporarily-using-javascript/
function disableScroll() {
	// Get the current page scroll position
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
		// if any scroll is attempted, set this to the previous value
		window.onscroll = function() {
			window.scrollTo(scrollLeft, scrollTop);
		};
}
  
function enableScroll() {
	window.onscroll = function() {};
}