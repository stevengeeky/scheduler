/*
	Indiana Academy Schedule Manager
	
	By Steven Geeky
*/

var student = "Steven";

// ///////////////////////////////////////////

(function() {
//

var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

var hourRanges = { };
var schedules = { };

var lshowmore = false;
var sc;

function init() {
	genRanges(26);
	
	for (var i in hourRanges) {
		console.log("\n" + i + "\n{\n\tstart: " + hourRanges[i].start + ",\n\tend: " + hourRanges[i].end + "\n}");
	}
	
	genSchedule(student, {
		// Senior Year
		
		"Linear Algebra (DC)": {
			range: "1-2",
			days: "m,w-f",
			instructor: "Joshua J Ruark",
			room: "BU202"
		},
		"French II (DC)": {
			range: "5-6",
			days: "m,w-f",
			instructor: "Jennifer E Robinson",
			room: "BU121"
		},
		"American History 2 (DC)": {
			range: "7-8",
			days: "m,w,f",
			instructor: "Mark S Myers",
			room: "BG102"
		},
		"Multivariable Calculus (DC)": {
			range: "9-10",
			days: "m,w-f",
			instructor: "Franklin D Shobe",
			room: "BU203"
		},
		"Creative Writing (CL)": {
			range: "17-18",
			days: "m,w,f",
			instructor: "David Graham Haynes",
			room: "BU202"
		},
		"Colloquium": {
			range: "13-15",
			days: "t",
			instructor: "Jennifer E Robinson",
			room: "BU121"
		}
		
		// Junior Year
		/* May Term
		"Cryptology": {
			days: "m-f",
			instructor: "Franklin D Shobe",
			room: "BU204",
			range: "3-6"
		},
		"Cryptology": {
			days: "m-f",
			instructor: "Franklin D Shobe",
			room: "BU204",
			range: "11-14"
		},*/
		
		
		// Semester 2
		/*"French 1 (DC)": {
			days: "m,w-f",
			instructor: "Jennifer E Robinson",
			room: "BU121",
			range: "1-2"
		},
		"Jr Colloquium (CL)": {
			days: "t",
			instructor: "Jennifer E Robinson",
			room: "BU202",
			range: "2-4"
		},
		"American History 1 (DC)": {
			days: "m,w,f",
			instructor: "Sean A Scott",
			room: "BU131",
			range: "5-6"
		},
		"Research in Computer Science (XC)": {
			days: "r",
			instructor: "Jon D Grady",
			room: "BU202",
			range: "5-8"
		},
		"AP Calculus BC 2 (DC)": {
			days: "m,w-f",
			instructor: "John F Rajca",
			room: "BU219",
			range: "7-8"
		},
		"World Literature (CL)": {
			days: "m,w,f",
			instructor: "David Graham Haynes",
			room: "BU126",
			range: "13-14"
		},
		"AP Physics C 2 (DC)": {
			days: "m,w,f",
			instructor: "Stephen Peter Schuh",
			room: "BU205",
			range: "15-18"
		},
		"AP Computer Science A 2 (DC)": {
			days: "w",
			instructor: "Susie A Cunningham",
			room: "BU115",
			range: "20-24"
		}*/
		
		// Semester 1
		/*
		"French 1 (DC)": {
			days: "m,w-f",
			instructor: "Jennifer E Robinson",
			room: "BU121",
			range: "1-2"
		},
		"Foundations of American Experience (CL)": {
			days: "m,w,f",
			instructor: "Mark S Myers",
			room: "BU131",
			range: "5-6"
		},
		"American Literature (CL)": {
			days: "t,r",
			instructor: "Christine A Ney",
			room: "BU131",
			range: "5-7"
		},
		"AP Calculus BC 1 (DC)": {
			days: "m,w-f",
			instructor: "Kimberly A Foltz",
			room: "BU219",
			range: "9-10"
		},
		"Visual Programming": {
			days: "t,r",
			instructor: "Susie A Cunningham",
			room: "BU115",
			range: "13-16"
		},
		"AP Physics C 1 (DC)": {
			days: "m,w",
			instructor: "Stephen Peter Schuh",
			room: "BU205",
			range: "15-18"
		},
		"AP Physics C 1 Lab (DC)": {
			days: "f",
			instructor: "Stephen Peter Schuh",
			room: "BU205",
			range: "15-18"
		},
		"AP Computer Science A 1 (DC)": {
			days: "w",
			instructor: "Susie A Cunningham",
			room: "BU115",
			range: "20-24"
		}*/
		
	});
	
	showMoreInit();
}

function genSchedule(name, classes) {
	if (!schedules[name])
		schedules[name] = { };
	
	for (var i in classes) {
		var cl = classes[i];
		var range = getDateRange(cl.days);
		
		delete cl.days;
		
		for (var j = 0; j < range.length; j++) {
			var d = days[range[j]];
			
			if (!schedules[name][d])
				schedules[name][d] = {};
			
			schedules[name][d][i] = cl;
		}
	}
};

function genRanges(end) {
	var last = parseTime("8:00 AM");
	var curr;
	
	for (var i = 0; i < end; i++) {
		var curr = 30 + last;
		hourRanges[i + 1] = {
			start:unparseTime(last),
			end:unparseTime(curr)
		};
		last = curr;
	}
}

function showLessInit() {
	appendstuff(true);
	
	var dae = document.createElement("div");
	var ae = document.createElement("a");
	ae.className = "action";
	ae.innerHTML = "Show More";
	
	ae.onclick = showMoreInit;
	dae.appendChild(ae);
	document.body.appendChild(dae);
	
	lshowmore = false;
}

function showMoreInit() {
	appendstuff();
	
	var dae = document.createElement("div");
	var ae = document.createElement("a");
	ae.className = "action";
	ae.innerHTML = "Show Less";
	
	ae.onclick = showLessInit;
	dae.appendChild(ae);
	document.body.appendChild(dae);
	
	lshowmore = true;
};

function appendstuff(cday) {
	var da = new Date(), dw = +da.getDay() - 1;
	var d = days[+dw];
	var handles = [];
	
	var sobj = schedules[student];
	document.body.innerHTML = "";
	
	for (var i = 0; i < days.length; i++) {
		// i = day
		
		var cd = days[i];
		if (!cday || cday && cd == d) {
			var daydiv = document.createElement("div");
			var dname = lab(cd);
			dname.className = "dname";
			daydiv.appendChild(dname);
			daydiv.className = "daydiv";
			
			var parent = sobj[cd];
			
			for (var j in parent) {
				// j = class name
				var classDiv = document.createElement("div");
				classDiv.style.position = "relative";
				classDiv.style.display = "inline-block";
				
				var card = document.createElement("div");
				card.className = "--card __card";
				
				var cname = divf("");
				var subname = divf(j);
				
				cname.appendChild(subname);
				cname.className = "classname";
				subname.className = "subname";
				
				//classDiv.appendChild(cname);
				card.appendChild(cname);
				classDiv.className = "classdiv";
				
				handles.push(card);
				var subp = parent[j];
				var s2 = divf("");
				s2.className = "subname";
				
				for (var k in subp) {
					// k = attrib name (room|range)
					var adiv = document.createElement("div");
					
					adiv.innerHTML = "<font class='aname'>" + k + ":</font> <font class='avalue'>" + (k.toLowerCase() == "range" ? parseRange(subp[k]) : subp[k]) + "</font>";
					adiv.className = "adiv";
					
					s2.appendChild(adiv);
				}
				
				classDiv.appendChild(s2);
				card.appendChild(classDiv);
				card.onclick = function(){ this.children[0].flip(); };
				
				daydiv.appendChild(card);
			}
			
			document.body.appendChild(daydiv);
		}
		
	}
	
	plugins_handle(handles);
}

function divf(s) {
	var d = document.createElement("div");
	d.innerHTML = s;
	return d;
}

function lab(s) {
	var l = document.createElement("div");
	l.innerHTML = s;
	return l;
}

function getDateRange(r) {
	var _days = ["m", "t", "w", "r", "f"];
	var res = [];
	
	r = r.replace(/ |\t|\n/g, "").toLowerCase();
	
	if (r.indexOf(",") != -1) {
		var sp = r.split(",");
		for (var i in sp) {
			var rng = getDateRange(sp[i]);
			for (var j in rng)
				res.push(rng[j]);
		}
	}
	else {
		var sp = r.split("-");
		if (sp.length == 1)
			res.push(_days.indexOf(sp[0]));
		else {
			var st = _days.indexOf(sp[0]);
			var en = _days.indexOf(sp[1]);
			for (var i = st; i <= en; i++)
				res.push(i);
		}
		
	}
	return res;
}

window.onload = function() {
	init();
};

//

var parseRange = function(s) {
	if (s.indexOf("-") == -1)
		return s;
	var p = s.split("-");
	var r = "";
	
	if (!hourRanges[p[0]])
		return s;
	
	if (p.length == 1) {
		var hr = hourRanges[p[0]];
		r = hr.start + " to " + hr.end;
	}
	else {
		var ha = hourRanges[p[0]];
		var hb = hourRanges[p[1]];
		r = ha.start + " to " + hb.end;
	}
	return r;
};

var parseTime = function(t) { // Returns value, in minutes, of time
    var res = 0;
    t = t.replace(/ |\t|\n/g, "");
    
    var dosub = t.substring(t.length - 2).toLowerCase() == "am";
    var doadd = t.substring(t.length - 2).toLowerCase() == "pm";
    
    t = t.toLowerCase().replace(/pm|am/g, "");
    
    var sp = t.split(":");
    if (sp.length != 2)
        return 0;
    
    var hour = +sp[0];
    var min = (+sp[1] % 60);
    
    if (doadd && hour != 12)
        hour += 12;
    else if (hour == 12 && dosub)
        hour -= 12;
    
    hour %= 24;
    
    res += 60 * hour + min;
    return res;
};

var unparseTime = function(t) {
	if (typeof t == "string")
		return t;
	
	var ending = "AM";
	var addone = 0;
	var factor = 12 * 60;
	
	if (t >= factor)
		ending = "PM";
	if (t > factor)
		addone = 1;
	
	t = (t < factor || t >= factor + 60) ? t % factor : t;
	
	var hour = "" + ((t - t % 60) / 60);
	var min = "" + (t % 60);
	
	return hour + ":" + (min.length == 1 ? "0" : "") + min + " " + ending;
}

//
}).call(window);