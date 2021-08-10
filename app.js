//--------------------VARIABLES------------------------//

var userD = {
	day: '3',
	month: '2',
	year: '2020',
};
var pre = {
	day: '3',
	month: '2',
	year: '2020',
};
var nex = {
	day: '3',
	month: '2',
	year: '2020',
};
var count = 0;
var clic = 0;
var arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var months1 = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
	'December',
];
//---------------------SELECTORS------------------------//

var btnS = document.querySelector('#startt');
const btnE = document.querySelector('.btn-enter');
var cont1 = document.getElementById('intro-box');
var cont2 = document.getElementById('func-box');
var output = document.querySelector('.output');
cont1.style.display = 'block';
cont2.style.display = 'none';
//---------------------------------------------//
const currD = document.querySelector('#birthdate');

//---------------------------------------------//

//----------------EVENT LISTENERS--------------//

console.log(btnS);
btnS.addEventListener('click', clickStart);
function clickStart() {
	cont1.style.display = 'none';
	cont2.style.display = 'block';
	return;
}
btnE.addEventListener('click', clickEnter);

function getAllDates(dates) {
	var ddmmyyyy = dates.day + dates.month + dates.year;
	var mmddyyyy = dates.month + dates.day + dates.year;
	var yyyymmdd = dates.year + dates.month + dates.day;
	var ddmmyy = dates.day + dates.month + dates.year.slice(-2);
	var mmddyy = dates.month + dates.day + dates.year.slice(-2);
	var yymmdd = dates.year.slice(-2) + dates.month + dates.day;
	return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function refreshPage() {
	window.location.reload();
}
function clickEnter() {
	if (clic === 1) {
		clic = 0;
		refreshPage();
		return;
	}
	clic++;
	count = 0;
	var temp = currD.value;
	var i = 0;
	var temp1 = '';
	while (temp[i] != '-') {
		temp1 = temp1 + temp[i];
		i++;
	}
	pre.year = temp1;
	nex.year = temp1;
	userD.year = temp1;
	temp1 = '';
	i++;
	while (temp[i] != '-') {
		temp1 = temp1 + temp[i];
		i++;
	}
	pre.month = temp1;
	nex.month = temp1;
	userD.month = temp1;
	temp1 = '';
	i++;
	while (i < temp.length) {
		temp1 = temp1 + temp[i];
		i++;
	}
	pre.day = temp1;
	nex.day = temp1;
	userD.day = temp1;
	console.log('clicked!!!', temp);
	console.log(userD, pre, nex);
	rightForm(userD);
	rightForm(pre);
	rightForm(nex);
	// console.log(pre, nex);

	nP();
	return;
}

function UpdateUserD(dob) {
	dob;
}
function isPal(s) {
	var temp = s;
	var temp1 = s.split('').reverse().join('');
	// console.log(temp);
	// console.log(temp1);
	var ans = temp.localeCompare(temp1);
	if (ans === 0) {
		return true;
	} else {
		return false;
	}
}

function rightForm(obj) {
	if (Number(obj.day) < 10) {
		obj.day = '0' + obj.day;
	}
	if (Number(obj.month) < 10) {
		obj.month = '0' + obj.month;
	}
}

function isLeap(year) {
	{
		if (year % 400 === 0) {
			return true;
		}

		if (year % 100 === 0) {
			return false;
		}

		if (year % 4 === 0) {
			return true;
		}
		return false;
	}
}

function nextD() {
	var days = Number(nex.day) + 1;
	var months = Number(nex.month);
	var years = Number(nex.year);
	if (months === 2) {
		if (isLeap(years)) {
			if (days > 29) {
				days = 1;
				months++;
			}
		} else {
			if (days > 28) {
				days = 1;
				months++;
			}
		}
	} else if (days > arr[months - 1]) {
		days = 1;
		months++;
	}

	if (months > 12) {
		months = 1;
		years++;
	}
	// console.log(days, months, years);
	nex.day = String(days);
	nex.month = String(months);
	nex.year = String(years);
	rightForm(nex);
	// console.log(nex);
}

function prevD() {
	var days = Number(pre.day) - 1;
	var months = Number(pre.month);
	var years = Number(pre.year);
	if (days < 1) {
		months--;
		if (months < 1) {
			months = 12;
			years--;
		}
		if (isLeap(years) && months === 2) {
			days = 29;
		} else if (months === 2) {
			days = 28;
		} else {
			days = arr[months - 1];
		}
	}

	// console.log(days, months, years);

	// console.log(days, months, years);
	pre.day = String(days);
	pre.month = String(months);
	pre.year = String(years);
	rightForm(pre);
}

function nextPalD() {
	if (isPal(userD)) {
		// console.log('Yes, Pal!!!!!!');
		output.innerHTML = `Your birthday is a palindrome! yayyy🎉 `;

		return;
	} else {
		// console.log(userD);

		while (1) {
			c++;
			nextD();
			prevD();
			if (isPal(nex)) {
				userD.day = nex.day;
				userD.month = nex.month;
				userD.year = nex.year;
				break;
			}
			if (isPal(pre)) {
				userD.day = pre.day;
				userD.month = pre.month;
				userD.year = pre.year;
				break;
			}
			console.log(nex, pre);
			console.log('------------------');
		}
		// console.log('HEre!!!! ', c, userD);
		output.innerHTML = `${userD.day}-${userD.month}-${userD.year}`;
	}
}

function nP() {
	var c = getAllDates(userD);
	for (var i = 0; i < c.length; i++) {
		if (isPal(c[i])) {
			output.innerHTML = `Your birthday is a palindrome! yayyy🎉 `;
			return;
		}
	}
	while (1) {
		count++;
		var flag = false;
		nextD();
		prevD();
		var t1 = getAllDates(pre);
		var t2 = getAllDates(nex);
		for (var i = 0; i < 6; i++) {
			if (isPal(t1[i])) {
				userD.day = pre.day;
				userD.month = pre.month;
				userD.year = pre.year;
				console.log(t1[i]);
				output.innerHTML = `Your birthday is not Palindrome 😥<br>Nearest Palindrome is ${
					userD.day
				}-${months1[userD.month - 1]}-${userD.year}🎉 <br>The date forms: ${
					t1[i]
				}<br> You missed by ${count} days!`;
				flag = true;
				break;
			}
			if (isPal(t2[i])) {
				userD.day = nex.day;
				userD.month = nex.month;
				userD.year = nex.year;
				console.log(t2[i]);

				output.innerHTML = `Your birthday is not Palindrome 😥<br>Nearest Palindrome is ${
					userD.day
				}-${months1[userD.month - 1]}-${userD.year}🎉<br>The date forms: ${
					t2[i]
				}<br> You missed by ${count} days!`;
				flag = true;
				break;
			}
		}
		// console.log(t1, t2, count);

		if (flag) {
			break;
		}
	}
}
