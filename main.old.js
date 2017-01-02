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

var hourRanges = {
	"1": {
		start: "8:00 AM",
		end: "8:30 AM"
	},
	"2": {
		start: "8:30 AM",
		end: "9:00 AM"
	},
	"3": {
		start: "9:00 AM",
		end: "9:30 AM"
	},
	"4": {
		start: "9:30 AM",
		end: "10:00 AM"
	},
	"5": {
		start: "10:00 AM",
		end: "10:30 AM"
	},
	"6": {
		start: "10:30 AM",
		end: "11:00 AM"
	},
	"7": {
		start: "11:00 AM",
		end: "11:30 AM"
	},
	"8": {
		start: "11:30 AM",
		end: "12:00 PM"
	},
	"9": {
		start: "12:00 PM",
		end: "12:30 PM"
	},
	"10": {
		start: "12:30 PM",
		end: "1:00 PM"
	},
	"11": {
		start: "1:00 PM",
		end: "1:30 PM"
	},
	"12": {
		start: "1:30 PM",
		end: "2:00 PM"
	},
	"13": {
		start: "2:00 PM",
		end: "2:30 PM"
	},
	"14": {
		start: "2:30 PM",
		end: "3:00 PM"
	},
	"15": {
		start: "3:00 PM",
		end: "3:30 PM"
	},
	"16": {
		start: "3:30 PM",
		end: "4:00 PM"
	},
	"17": {
		start: "4:00 PM",
		end: "4:30 PM"
	},
	"18": {
		start: "4:30 PM",
		end: "5:00 PM"
	},
	"19": {
		start: "5:00 PM",
		end: "5:30 PM"
	},
	"20": {
		start: "5:30 PM",
		end: "6:00 PM"
	},
	"21": {
		start: "6:00 PM",
		end: "6:30 PM"
	},
	"22": {
		start: "6:30 PM",
		end: "7:00 PM"
	}
};

var lshowmore = false;
var sc;

function init() {
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
    
    res += 60 * hour + min;
    return res;
};

//
}).call(window);