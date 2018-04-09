// Mouseover Event
document.addEventListener('mouseover', (event) => {
	if (event.target.className == "profile" || event.target.className == "content") {
		let tweets = document.querySelectorAll(".tweet");

		for (let i = 0; i < tweets.length; i ++) {
			if (tweets[i] == event.target.parentNode) {
				tweets[i].style.backgroundColor = "#f2ebeb";
			}
		}
	}
});

// Mouseout Event
document.addEventListener('mouseout', (event) => {
	if (event.target.className == "profile" || event.target.className == "content") {
		let tweets = document.querySelectorAll(".tweet");

		for (let i = 0; i < tweets.length; i ++) {
			if (tweets[i] == event.target.parentNode) {
				tweets[i].style.backgroundColor = "#ffffff";
			}
		}
	}
});

// Dynamically Generate Year for Footer to replace static text when JS enabled on browser
let date = new Date();
let year = date.getFullYear();
document.getElementById('copyright').textContent = `\u00A9 ${year} Shaun Carmody`;
