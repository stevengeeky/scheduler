// Contains a list of plugins for various site needs, including JamesonCamp

var plugins_handle;

(function(){
//
window.addEventListener("load", function(){
    doStyles();
    init();
});
//

plugins_handle = function(v) {
    if (v instanceof Array) {
        for (var i in v)
            plugins_handle(v[i]);
        return;
    };
    
    if (typeof v != "string")
        v = v.className;
    v = v.split(" ")[0];
    
    handle([v], _c[v.substring(2)]);
}

function init() {
    handle(["--slideshow", "--extender", "--card", "--videolist", "--revealer", "--smoothloader"], [_c.slideshow, _c.extender, _c.card, _c.videolist, _c.revealer, _c.smoothloader]);
}

function rstyle(v) {
    return addSupport(v, ["transform-style", "transform", "transition", "user-select", "linear-gradient", "radial-gradient", "background-image", "box-shadow", "border-radius", "backface-visibility", "animation", "background-image", "box-sizing", "text-shadow"]);
}

function style(v) {
    // selection -> attribs
    var res = "";
    for (var i in v) {
        res += i + "{";
        var o = rstyle(v[i]);
        for (var j in o) {
            var val = o[j];
            res += j + (j[j.length - 1] == ":" ? "" : ":") + val + (val[val.length - 1] == ";" ? "" : ";");
        }
        res += "}";
    }
    return res;
}

function addSupport(v, name) {
    if (name instanceof Array) {
        for (var i in name)
            v = addSupport(v, name[i]);
    }
    else {
        if (v[name])
            v["-moz-" + name] = v["-ms-" + name] = v["-o-" + name] = v["-webkit-" + name] = v[name];
    }
    return v;
}

function doStyles() {
    var els = document.getElementsByClassName("--flags");
    var json = {};
    for (var i in els) {
        var el = els[i];
        if (el.type == "application/json" || el instanceof HTMLScriptElement) {
            var tjson = JSON.parse(el.textContent);
            for (var i in tjson)
                json[i] = tjson[i];
        }
    }
    
    var sty = document.createElement("style");
    var sval = "";
    // Slideshow
    sval += style({
        ".c_slideshow_button": {
            "background": "rgb(0, 0, 0)",
            "border": "none",
            "color": "white",
            "opacity": "0",
            "font-weight": "bold",
            "transition": "opacity .3s linear",
            "position": "absolute"
        },
        ".c_slideshow_button:hover": {
            "opacity": "1"
        },
        ".c_slideshow_navigator": {
            "background": "rgb(50, 50, 50)",
            "border": "1px solid rgb(0, 0, 0)",
            "opacity": ".2",
            "cursor": "default"
        },
        ".c_slideshow_navigator.active": {
            "opacity": "1"
        }
    });
    // Card
    sval += style({
        ".c_card": {
            "position":"relative",
            "transform":"perspective(1000)",
            "overflow":"visible"
        },
        ".c_card_front": {
            "backface-visibility": "hidden",
            "position":"absolute",
            "left":"0",
            "top":"0",
            "transform-style":"preserve-3d",
            "transform":"rotateY(0)",
            "transition":"all .5s ease-in-out",
            "box-shadow":"4px 4px 5px rgba(0, 0, 0, .3)",
            "overflow":"hidden"
        },
        ".c_card_back": {
            "backface-visibility": "hidden",
            "position":"absolute",
            "left":"0",
            "top":"0",
            "transform-style":"preserve-3d",
            "transform":"rotateY(-179deg)",
            "transition":"all .5s ease-in-out",
            "box-shadow":"4px 4px 5px rgba(0, 0, 0, .3)",
            "overflow":"hidden"
        },
        ".c_card_front.flip": {
            "transform":"rotateY(179deg)"
        },
        ".c_card_back.flip": {
            "transform":"rotateY(0)",
            "z-index":"100"
        }
    });
    
    /*
    sty.textContent = ".c_slideshow_button {background:rgb(0, 0, 0);border:none;color:white;opacity:.2;font-weight:bold;transition:opacity .2s linear;position:absolute;} .c_slideshow_button:hover {opacity:1;} .c_slideshow_navigator {background:rgb(50, 50, 50);border:1px solid rgb(0, 0, 0);opacity:.2;cursor:default;} .c_slideshow_navigator.active {opacity:1;}" +
        ".c_card {position:relative;transform:perspective(1000);overflow:visible;} .c_card_front {backface-visibility:hidden;position:absolute;left:0;top:0;transform-style:preserve-3d;transform:rotateY(0);transition:all .5s ease-in-out;box-shadow:4px 4px 5px rgba(0, 0, 0, .3);overflow:hidden} .c_card_back {backface-visibility:hidden;position:absolute;left:0;top:0;transform-style:preserve-3d;transform:rotateY(-179deg);transition:all .5s ease-in-out;overflow:hidden;box-shadow:4px 4px 5px rgba(0, 0, 0, .3);} .c_card_front.flip {transform:rotateY(179deg);} .c_card_back.flip {transform:rotateY(0);z-index:100;}" + (json.extraCss || "");
    */
    
    sty.textContent = sval;
    document.head.appendChild(sty);
    
}

var _c = {};

function __next(list, ind, unt) {
    if (ind >= list.length)
        return;
    
    var el = list[ind];
    if (el && typeof el != "number" && typeof el != "undefined") {
        
        var doop = false, dotr = false;
        var wam = 500;
        
        if (el.style.opacity != "") {
            doop = true;
            el.style.transition = "opacity " + wam + "ms";
        }
        if (el.style.transform != "" && el.style.transform != "") {
            dotr = true;
            el.style.transition += (doop ? "," : "") + "transform " + wam + "ms";
        }
        setTimeout(function() {
            if (doop)
                el.style.opacity = 1;
            if (dotr)
                el.style.transform = "none";
        }, 20);
        
        setTimeout(function() {
            __next(list, ++ind, unt);
        }, unt);
    }
}

_c.smoothloader = function(p) {
    p.style.display = "inline-block";
    var d = p.dataset;
    
    var tname = d.name || d.target || d.t || d.targetname || "__target";
    var unt = d.untilnexttransform || d.interval || d.time || 100;
    var del = d.initial || d.initialdelay || d.delay || d.waittime || unt;
    var list = document.getElementsByClassName(tname);
    
    setTimeout(function() {
        __next(list, 0, unt);
    }, del);
};

_c.revealer = function(p) {
    var d = p.dataset;
    
    var target = d.class ? document.getElementsByClassName(d.class)[0] : d.id ? document.getElementById(d.id) : d.target || document.createElement("div");
    var time = d.time || 500;
    
    if (d.html)
        target.innerHTML = d.html;
    
    target.style["transform-origin"] = "50% 100%";
    target.style.transform = "scale(0)";
    target.style.opacity = "0";
    target.style.position = "fixed";
    target.style.left = target.style.top = "0";
    target.style.width = target.style.height = "100%";
    
    setTimeout(function() {
        target.style.transition = "opacity " + time + "ms, transform " + time + "ms";
    }, 20);
    p.reveal = target.reveal = function() {
        setTimeout(function() {
            target.style.transform = "none";
            target.style.opacity = 1;
        }, 20);
    };
    p.unreveal = target.unreveal = function() {
        setTimeout(function() {
            target.style.transform = "scale(0)";
            target.style.opacity = 0;
        }, 20);
    };
};

_c.extender = function(p) {
    var d = p.dataset;
    var lerps = d.lerp || d.lerps || d.amount || 20;
    for (var i = 0; i < lerps; i++)
        p.innerHTML += "&nbsp;<br />";
};

_c.videolist = function(p) {
    var d = p.dataset;
    var list = (d.list || d.videos || d.links || p.textContent || "");
    var ts = (d.titles || d.values || d.texts || d.labels || d.title || d.value || d.text || d.label || "").split(",");
    var inlist = false;
    var pw, ph;
    
    var cont = document.createElement("div");
    
    if (list == p.textContent)
        inlist = true;
    p.textContent = "";
    list = list.split(",");
    
    var aspect = d.aspect || 4 / 3;
    var cols = d.columns || d.items || d.amount || 2;
    var marg = d.margin || 2;
    
    if (d.dontuseparent) {
        pw = d.width || 400;
        ph = d.height || 300;
    }
    else {
        var b = p.parentElement.getBoundingClientRect();
        pw = b.width;
        ph = b.height;
    }
    p.style.width = pw + "px";
    //p.style.height = ph + "px";
    
    var fs = d.fontsize, bold = d.bold;
    var w = pw / cols - marg * cols;
    var h = w / aspect;
    
    for (var i = 0; i < list.length; i++) {
        var l = list[i];
        var t = "";
        
        if (inlist) {
            var ind = l.indexOf("|");
            t = l.substring(0, ind);
            l = l.substring(ind + 1);
        }
        else
            t = ts[i % ts.length];
        
        var di = document.createElement("div");
        di.style.display = "inline-block";
        di.style.position = "auto";
        di.style.width = w + "px";
        di.style.height = "auto";
        
        var sub1 = document.createElement("div"), sub2 = document.createElement("div");
        sub2.style["text-align"] = "center";
        sub2.style.background = "black";//"rgb(40, 80, 255)";
        sub2.style.color = "white";
        
        while (t.charAt(0) == " ")
            t = t.substring(1);
        
        sub2.innerHTML = t;
        if (bold && bold == "true")
            sub2.style["font-weight"] = "bold";
        if (fs)
            sub2.style["font-size"] = fs + "px";
        sub2.style.padding = "10px 0 10px 0";
        
        sub1.innerHTML = '<embed width="' + w + '" height="' + h + '" type="application/x-shockwave-flash" src="' + l + '" wmode="transparent" allowscriptaccess="always" allowfullscreen />';
        
        di.style["vertical-align"] = "top";
        di.style.margin = marg / 2 + "px";
        di.appendChild(sub1);
        di.appendChild(sub2);
        cont.appendChild(di);
    }
    
    return cont;
};

_c.card = function(p) {
    if (p.children.length < 2)
        return;
    
    var d = p.dataset;
    var w = d.width || 300, h = d.height || 300;
    
    var cont = document.createElement("div");
    cont.className = "c_card";
    cont.style.width = w + "px";
    cont.style.height = h + "px";
    
    p.style.position = "relative";
    p.style.display = "inline-block";
    
    var front = p.children[0], back = p.children[1];
    cont.appendChild(front);
    cont.appendChild(back);
    
    var extf = front.className, extb = back.className;
    front.className = "c_card_front " + extf;
    back.className = "c_card_back " + extb;
    
    front.style.width = back.style.width = cont.style.width;
    front.style.height = back.style.height = cont.style.height;
    
    var flipped = false;
    
    cont.flipOver = function() {
        front.className = "c_card_front flip " + extf;
        back.className = "c_card_back flip " + extb;
    };
    cont.flipBack = function() {
        front.className = "c_card_front " + extf;
        back.className = "c_card_back " + extb;
    };
    cont.flip = function() {
        if (!flipped) {
            flipped = true;
            this.flipOver();
        }
        else {
            flipped = false;
            this.flipBack();
        }
    }
    
    return cont;
};

var first = true;
var slideEffects = {
    horizontal: function(im, nim, iw, icont, aw, ah, back, transTime) {
        im.style.transition = nim.style.transition = "left " + transTime;
        if (back) {
            im.style.top = im.ctop + "px";
            nim.style.top = nim.ctop + "px";
            
            im.style.left = (im.cleft) + "px";
            nim.style.left = (nim.cleft - aw) + "px";
            icont.appendChild(im);
            icont.appendChild(nim);
            
            setTimeout(function(){
                nim.style.left = nim.cleft + "px";
                im.style.left = (im.cleft + aw) + "px";
            }, iw);
        }
        else {
            im.style.top = im.ctop + "px";
            nim.style.top = nim.ctop + "px";
            
            im.style.left = (im.cleft) + "px";
            nim.style.left = (nim.cleft + aw) + "px";
            icont.appendChild(im);
            icont.appendChild(nim);
            
            setTimeout(function(){
                nim.style.left = nim.cleft + "px";
                im.style.left = (im.cleft - aw) + "px";
            }, iw);
        }
    },
    vertical: function(im, nim, iw, icont, aw, ah, back, transTime) {
        im.style.transition = nim.style.transition = "top " + transTime;
        if (back) {
            im.style.left = im.cleft + "px";
            nim.style.left = nim.cleft + "px";
            
            im.style.top = (im.ctop) + "px";
            nim.style.top = (nim.ctop - ah) + "px";
            icont.appendChild(im);
            icont.appendChild(nim);
            
            setTimeout(function() {
                nim.style.top = nim.ctop + "px";
                im.style.top = (im.ctop + ah) + "px";
            }, iw);
        }
        else {
            im.style.left = im.cleft + "px";
            nim.style.left = nim.cleft + "px";
            
            im.style.top = (im.ctop) + "px";
            nim.style.top = (nim.ctop + ah) + "px";
            icont.appendChild(im);
            icont.appendChild(nim);
            
            setTimeout(function() {
                nim.style.top = nim.ctop + "px";
                im.style.top = (im.ctop - ah) + "px";
            }, iw);
        }
    },
    flip: function(im, nim, iw, icont, aw, ah, back, transTime) {
        var a = im.cloneNode(true), b = nim.cloneNode(true);
        var sub = document.createElement("div");
        
        sub.className = "c_card";
        
        a.style.left = im.cleft + "px"; a.style.top = im.ctop + "px";
        b.style.left = nim.cleft + "px"; b.style.top = nim.ctop + "px";
        
        if (back) {
            a.className = "c_card_front";
            b.className = "c_card_back";
            a.style.transition = b.style.transition = "all " + transTime + " ease-in-out";
            
            sub.appendChild(a);
            sub.appendChild(b);
            icont.appendChild(sub);
            
            setTimeout(function() {
                a.className = "c_card_front flip";
                b.className = "c_card_back flip";
            }, iw);
        }
        else {
            a.className = "c_card_back flip";
            b.className = "c_card_front flip";
            a.style.transition = b.style.transition = "all " + transTime + " ease-in-out";
            
            sub.appendChild(a);
            sub.appendChild(b);
            icont.appendChild(sub);
            
            setTimeout(function() {
                a.className = "c_card_back";
                b.className = "c_card_front";
            }, iw);
        }
    },
    fade: function(im, nim, iw, icont, aw, ah, back, transTime) {
        var a = im.cloneNode(true), b = nim.cloneNode(true);
        var sub = document.createElement("div");
        sub.style.position = "absolute";
        
        a.style.left = im.cleft + "px"; a.style.top = im.ctop + "px";
        b.style.left = nim.cleft + "px"; b.style.top = nim.ctop + "px";
        
        a.style.opacity = b.style.opacity = 1;
        a.style.transition = "opacity " + transTime;
        
        sub.appendChild(b);
        sub.appendChild(a);
        icont.appendChild(sub);
        
        setTimeout(function() {
            a.style.opacity = 0;
        }, iw);
    },
    cardstack: function(im, nim, iw, icont, aw, ah, back, transTime) {
        var a = im.cloneNode(true), b = nim.cloneNode(true);
        var sub = document.createElement("div");
        sub.style.position = "absolute";
        
        a.style.left = im.cleft + "px"; b.style.left = nim.cleft + "px";
        b.style.top = im.ctop + "px"; b.style.top = nim.ctop + "px";
        
        sub.appendChild(b);
        sub.appendChild(a);
        icont.appendChild(sub);
        icont.parentElement.style.overflow = "visible";
        
        var time = +transTime.replace(/[A-Za-z]+/g, "");
        var target = back ? b : a;
        a.style["z-index"] = "0"; b.style["z-index"] = "-1";
        target.style.transition = "transform " + transTime;
        
        setTimeout(function() {
            target.style.transform = "translate(-100%, 0)";
            setTimeout(function(){
                a.style["z-index"] = "-1";
                b.style["z-index"] = "0";
                target.style.transform = "translate(0, 0)";
            }, time + iw);
        }, iw);
    },
    rcardstack: function(im, nim, iw, icont, aw, ah, back, transTime) {
        var a = im.cloneNode(true), b = nim.cloneNode(true);
        var sub = document.createElement("div");
        sub.style.position = "absolute";
        
        a.style.left = im.cleft + "px"; b.style.left = nim.cleft + "px";
        b.style.top = im.ctop + "px"; b.style.top = nim.ctop + "px";
        
        sub.appendChild(b);
        sub.appendChild(a);
        icont.appendChild(sub);
        icont.parentElement.style.overflow = "visible";
        
        var time = +transTime.replace(/[A-Za-z]+/g, "");
        var target = back ? b : a;
        a.style["z-index"] = "0"; b.style["z-index"] = "-1";
        target.style.transition = "transform " + transTime;
        
        setTimeout(function() {
            target.style.transform = "translate(100%, 0)";
            setTimeout(function(){
                a.style["z-index"] = "-1";
                b.style["z-index"] = "0";
                target.style.transform = "translate(0, 0)";
            }, time + iw);
        }, iw);
    },
    cardstack_rotate: function(im, nim, iw, icont, aw, ah, back, transTime) {
        var a = im.cloneNode(true), b = nim.cloneNode(true);
        var sub = document.createElement("div");
        sub.style.position = "absolute";
        
        a.style.left = im.cleft + "px"; b.style.left = nim.cleft + "px";
        b.style.top = im.ctop + "px"; b.style.top = nim.ctop + "px";
        
        sub.appendChild(b);
        sub.appendChild(a);
        icont.appendChild(sub);
        icont.parentElement.style.overflow = "visible";
        
        var time = Math.floor(+transTime.replace(/[A-Za-z]+/g, "") / 2);
        
        a.style["z-index"] = "0"; b.style["z-index"] = "-1";
        
        var target = back ? b : a;
        target.style.transition = "transform " + time + "ms";
        target.style["transform-origin"] = "0 100%";
        target.style = addSupport(a.style, "transform-origin");
        
        setTimeout(function() {
            target.style.transform = "rotate(-135deg)";
            setTimeout(function(){
                a.style["z-index"] = "-1";
                b.style["z-index"] = "0";
                target.style.transform = "rotate(0)";
            }, time - iw);
        }, iw);
    },
    rcardstack_rotate: function(im, nim, iw, icont, aw, ah, back, transTime) {
        var a = im.cloneNode(true), b = nim.cloneNode(true);
        var sub = document.createElement("div");
        sub.style.position = "absolute";
        
        a.style.left = im.cleft + "px"; b.style.left = nim.cleft + "px";
        b.style.top = im.ctop + "px"; b.style.top = nim.ctop + "px";
        
        sub.appendChild(b);
        sub.appendChild(a);
        icont.appendChild(sub);
        icont.parentElement.style.overflow = "visible";
        
        var time = Math.floor(+transTime.replace(/[A-Za-z]+/g, "") / 2);
        
        a.style["z-index"] = "0"; b.style["z-index"] = "-1";
        a.style.transition = "transform " + time + "ms";
        
        var target = back ? b : a;
        target.style.transition = "transform " + time + "ms";
        target.style["transform-origin"] = "100% 100%";
        target.style = addSupport(a.style, "transform-origin");
        
        setTimeout(function() {
            target.style.transform = "rotate(135deg)";
            setTimeout(function(){
                a.style["z-index"] = "-1";
                b.style["z-index"] = "0";
                target.style.transform = "rotate(0)";
            }, time - iw);
        }, iw);
    }
};

_c.slideshow = function(p) {
    var cont = document.createElement("div");
    cont.style.overflow = "hidden";
    
    var d = p.dataset;
    if (!(d.notInline && d.notInline == "true")) {
        p.style.display = "inline-block";
    }
    cont.style.position = "relative";
    cont.style.display = "inline-block";
    cont.style.transform = "perspective(1000px)";
    
    var dw = 520, aw = +(d.width || dw);
    var dh = 240, ah = +(d.height || dh);
    var icont = document.createElement("div");
    icont.style.display = "inline-block";
    icont.style.position = "relative";
    
    icont.resizeTo = function(w, h) {
        icont.style.width = w + "px";
        icont.style.height = h + "px";
    };
    icont.resizeTo(aw, ah);
    
    cont.style.width = aw + "px";
    cont.style.height = ah + "px";
    
    var transTime = (d.transtime || 300) + "ms";
    var ls = rep(d.links || d.link || "#").split(",");
    var _imgs = rep(d.image || d.img || d.imgs || d.images || d.imagelist || "").split(",");
    var va = aw / ah;
    
    var transs = (d.transitions || d.transs || d.transition || "horizontal");
    while (transs.indexOf(" ") != -1)
        transs = transs.replace(/ /g, "");
    transs = transs.split(",");
    
    var limg = new Image();
    limg.src = "https://preview.c9.io/stevengeeky/plugins/images/loading.gif";
    limg.style.position = "absolute";
    limg.width = limg.height = 32;
    limg.style.left = (aw - limg.width) / 2 + "px";
    limg.style.top = (ah - limg.height) / 2 + "px";
    cont.appendChild(limg);
    cont.resizeTo = function(w, h){};
    
    loadImages(_imgs, function(imgs){
        cont.removeChild(limg);
        
        cont.resizeTo = function(w, h){
            aw = w; ah = h;
            while (cont.hasChildNodes())
                cont.removeChild(cont.firstChild);
            
            p.dataset.width = w; p.dataset.height = h;
            cont.style.width = w + "px"; cont.style.height = h + "px";
            icont.resizeTo(aw, ah);
            
            for (var i = 0; i < imgs.length; i++) {
                var di = document.createElement("div");
                var img = imgs[i];
                di.appendChild(img);
                imgs[i] = di;
                
                di.linked = ls[i % ls.length];
                di.onclick = function() { window.open(this.linked); };
                di.style.position = "absolute";
                di.style.cursor = "pointer";
                di.title = di.linked;
                di.style.transition = "left " + transTime;
                
                var ia = img.width / img.height;
                if (va > ia) {
                    // h
                    img.height = ah;
                    img.width = img.height * ia;
                }
                else {
                    // w
                    img.width = aw;
                    img.height = img.width / ia;
                }
                di.width = img.width;
                di.height = img.height;
                di.style.width = img.width + "px";
                di.style.height = img.height + "px";
                
                di.cleft = img.cleft = (aw - img.width) / 2;
                di.ctop = img.ctop = (ah - img.height) / 2;
                di.style.left = img.cleft + "px";
                di.style.top = img.ctop + "px";
            }
            
            var back = button({
                "className":"c_slideshow_button",
                "style": {
                    "left":"0",
                    "top":"0",
                    "height":"100%"
                }
            });
            var fwd = button({
                "className":"c_slideshow_button",
                "style": {
                    "right":"0",
                    "top":"0",
                    "height":"100%"
                }
            });
            var bw = 40 / dw * aw;
            
            fwd.width = back.width = bw;
            fwd.style.fontSize = back.style.fontSize = (30 / dw * aw) + "px";
            fwd.innerHTML = "&rarr;";
            back.innerHTML = "&larr;";
            
            cont.appendChild(icont);
            cont.appendChild(back);
            cont.appendChild(fwd);
            
            if (imgs.length == 0)
                return;
            
            var moveTime = (d.movetime || 4000) + "ms";
            var curr = 0, lfwd = true;
            var iw = 20, modded = false;
            icont.appendChild(imgs[curr % imgs.length]);
            
            function clN() {
                icont.children.length = 0;
            }
            
            function moveTo(nc) {
                nc %= imgs.length;
                curr %= imgs.length;
                if (nc == curr)
                    return;
                
                clN();
                
                while (icont.hasChildNodes())
                    icont.removeChild(icont.firstChild);
                
                icont.parentElement.style.overflow = "hidden";
                var eind = transs[curr % transs.length];
                var effect = slideEffects[eind] || slideEffects.horizontal;
                
                if (nc < curr) {
                    // back
                    var im = imgs[curr], nim = imgs[nc];
                    effect(im, nim, iw, icont, aw, ah, true, transTime);
                }
                else {
                    // forward
                    var im = imgs[curr], nim = imgs[nc];
                    effect(im, nim, iw, icont, aw, ah, false, transTime);
                }
                curr = nc;
            }
            
            // Navigation
            var ss = 13, pad = 5, items = [];
            var act;
            
            for (var i = 0; i < imgs.length; i++) {
                var l = aw - bw - (pad + ss) * (imgs.length - i);
                var t = ah - (pad + ss);
                
                var bu = button({
                    "className":"c_slideshow_navigator",
                    "style":{
                        "borderRadius":ss / 2 + "px",
                        "width":ss + "px",
                        "height":ss + "px",
                        "position":"absolute",
                        "left":l + "px",
                        "top":t + "px"
                    }
                });
                bu.slideIndex = i;
                bu.onclick = function() {
                    modded = true;
                    act.className = "c_slideshow_navigator";
                    this.className = "c_slideshow_navigator active";
                    act = this;
                    moveTo(this.slideIndex);
                };
                
                cont.appendChild(bu);
                items.push(bu);
            }
            act = items[0];
            act.className = "c_slideshow_navigator active";
            
            //
            function forward() {
                var nc = (curr + 1) % imgs.length;
                items[nc].click();
            }
            function backward() {
                var nc = curr - 1 < 0 ? imgs.length - 1 : curr - 1;
                items[nc].click();
            }
            
            fwd.onclick = function() {
                forward();
                lfwd = true;
                modded = true;
            };
            back.onclick = function() {
                backward();
                lfwd = false;
                modded = true;
            };
            
            cont.onmouseenter = function() {
                fwd.style.opacity = back.style.opacity = .2;
            };
            cont.onmouseleave = function() {
                fwd.style.opacity = back.style.opacity = 0;
            };
            function fullopaque() {
                this.style.opacity = 1;
            };
            function slightopacity() {
                this.style.opacity = .2;
            }
            
            fwd.onmouseenter = fullopaque; fwd.onmouseleave = slightopacity;
            back.onmouseenter = fullopaque; back.onmouseleave = slightopacity;
            
            var mt = +("" + moveTime).replace(/[A-Za-z]+/g, "");
            var tt = +("" + transTime).replace(/[A-Za-z]+/g, "");
            
            function periodic() {
                setTimeout(periodic, mt + tt);
                if (lfwd && !modded)
                    forward();
                else if (!lfwd && !modded)
                    backward();
                modded = false;
            }
            
            setTimeout(periodic, mt);
        };
        cont.resizeTo(aw, ah);
        
    });
    
    return cont;
}

function loadImage(source, cb) {
    if (source instanceof Image)
        cb(source);
    else {
        var img = new Image();
        img.onload = function() {
            cb(this);
        };
        img.src = source;
    }
}

function loadImages(srcs, cb, r) {
    r = r || [];
    if (!cb)
        return;
    if (typeof srcs == "string")
        srcs = srcs.split(",");
    if (srcs.length == 0) {
        cb(r);
        return;
    }
    
    var item = srcs[0];
    loadImage(item, function(img) {
        r.push(img);
        srcs.splice(0, 1);
        loadImages(srcs, cb, r);
    });
}

function button(attr, pb) {
    var b = pb || document.createElement("button");
    for (var i in attr) {
        if (typeof attr[i] == "object")
            button(attr[i], b[i]);
        else
            b[i] = attr[i];
    }
    return b;
}

//
function createComp(comp, parent) {
    var comp_el = comp.call(window, parent);
    if (comp_el && typeof comp_el != "undefined")
        parent.appendChild(comp_el);
}

function handle(c, n) {
    if (c instanceof Array) {
        for (var i = 0; i < c.length; i++) {
            if (n instanceof Array)
                handle(c[i], n[i]);
            else
                handle(c[i], n);
        }
    }
    else {
        var els = document.getElementsByClassName(c);
        for (var i in els) {
            var el = els[i];
            if (el.plugins_handled)
                continue;
            el.plugins_handled = true;
            
            if (el instanceof HTMLDivElement) {
                createComp(n, el);
            }
        }
    }
}

function rep(items) {
    return items;
    //return items.replace(/http:\/\//g, "https://");
}

function pam(v, p) {
    v = "" + v;
    p = p || "px";
    if (v.indexOf(p) != -1)
        v = v.substring(0, v.indexOf(p));
    return +v;
}

//
}).call(window);