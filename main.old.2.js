/*
	Indiana Academy Schedule Manager
	
	By Steven Geeky
*/

var student = "Steven";

// ///////////////////////////////////////////

(function() {
//

var days = {
	"0": "Monday",
	"1": "Tuesday",
	"2": "Wednesday",
	"3": "Thursday",
	"4": "Friday"
};

var hourRanges = { };

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

var lshowmore = false;
var sc;

function init() {
	genRanges(26);
	/*for (var i in hourRanges) {
		console.log("\n" + i + "\n{\n\tstart: " + hourRanges[i].start + ",\n\tend: " + hourRanges[i].end + "\n}");
	}
	*/
	showMoreInit();
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
	var d = days[dw];
	var handles = [];
	
	var sobj = schedules[student];
	document.body.innerHTML = "";
	
	for (var i in sobj) {
		// i = day
		
		if (!cday || cday && i == d) {
			var daydiv = document.createElement("div");
			var dname = lab(i);
			dname.className = "dname";
			daydiv.appendChild(dname);
			daydiv.className = "daydiv";
			
			var parent = sobj[i];
			
			for (var j in parent) {
				// j = class name
				var classDiv = document.createElement("div");
				classDiv.style.position = "relative";
				classDiv.style.display = "inline-block";
				
				var cname = lab(j);
				cname.className = "classname";
				
				classDiv.appendChild(cname);
				classDiv.className = "classdiv";
				
				var subp = parent[j];
				
				for (var k in subp) {
					// k = attrib name (room|range)
					var adiv = document.createElement("div");
					adiv.className = "--card attrib";
					
					adiv.innerHTML = "<font class='aname'>" + k + "</font>: <font class='avalue'>" + (k.toLowerCase() == "range" ? parseRange(subp[k]) : subp[k]) + "</font>";
					adiv.className = "adiv";
					
					classDiv.appendChild(adiv);
				}
				
				daydiv.appendChild(classDiv);
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

var schedules = {
	"Steven": {
		"Monday": {
			"French I (DC) ": {
				room: "BU121",
				teacher: "Jennifer E Robinson",
				range: "1-2"
			},
			"Foundations of American Experience (CL)": {
				room: "BU131",
				teacher: "Mark S Myers",
				range: "5-6"
			},
			"AP Physics I - Fall": {
				room: "BU205",
				teacher: "Stephen Peter Schuh",
				range: "9-10"
			},
			"AP Calculus AB 1 (DC)": {
				room: "BU219",
				teacher: "Kimberly A Foltz",
				range: "15-16"
			}
		},
		"Tuesday": {
			"Research in Science (XC)": {
				room: "BU209",
				teacher: "George S Devendorf",
				range: "1-4"
			},
			"American Literature (CL)": {
				room: "BU131",
				teacher: "Christine A Ney",
				range: "5-7"
			},
			"AP Physics I - Fall Lab": {
				room: "BU205",
				teacher: "Stephen Peter Schuh",
				range: "13-16"
			}
		},
		"Wednesday": {
			"French I (DC) ": {
				room: "BU121",
				teacher: "Jennifer E Robinson",
				range: "1-2"
			},
			"Foundations of American Experience (CL)": {
				room: "BU131",
				teacher: "Mark S Myers",
				range: "5-6"
			},
			"AP Physics I - Fall": {
				room: "BU205",
				teacher: "Stephen Peter Schuh",
				range: "9-10"
			},
			"AP Calculus AB 1 (DC)": {
				room: "BU219",
				teacher: "Kimberly A Foltz",
				range: "15-16"
			},
			"AP Computer Science A I (DC)": {
				room: "BU115",
				teacher: "Susie A Cunningham",
				range: "17-21"
			}
		},
		"Thursday": {
			"French I (DC) ": {
				room: "BU121",
				teacher: "Jennifer E Robinson",
				range: "1-2"
			},
			"American Literature (CL)": {
				room: "BU131",
				teacher: "Christine A Ney",
				range: "5-7"
			}
		},
		"Friday": {
			"French I (DC) ": {
				room: "BU121",
				teacher: "Jennifer E Robinson",
				range: "1-2"
			},
			"Foundations of American Experience (CL)": {
				room: "BU131",
				teacher: "Mark S Myers",
				range: "5-6"
			},
			"AP Physics I - Fall": {
				room: "BU205",
				teacher: "Stephen Peter Schuh",
				range: "9-10"
			},
			"AP Calculus AB 1 (DC)": {
				room: "BU219",
				teacher: "Kimberly A Foltz",
				range: "15-16"
			},
			"Computer Applications (CP)": {
				room: "N/A",
				teacher: "Jon Grady",
				range: "24-26"
			}
		}
		
	}
};

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