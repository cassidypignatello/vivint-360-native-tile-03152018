//ONE: HTML5 Ver 4.7.0 Release on Thu Oct 26 2017 09:30:12 GMT-0400 (EDT) from release/4.7

var inMRAIDContainer = false;
var mraidVersion;
var releaseVerion_str = "ONE: HTML5 Ver 4.7.0 Release on Thu Oct 26 2017 09:30:12 GMT-0400 (EDT) from release/4.7";
var adSize = "Expandable_rich_media_mobile_320x50";
var formatType = "Expandable_rich_media_mobile";
var numApps = "0";
var settings;
var formatInit = function(){}; // IMPORTANT: overwrite this var in core<<FormatName>>.js
var testPromiseSupport = function() {
  return window.Promise ? true: false;
};
var promisesSupported = testPromiseSupport();
var promisePolyfillUrl = "//ads.pictela.net/rm/PXL/vendor/polyfills/promise-polyfill.min.js";


var AdtechReady = function () {
  return ADTECH.ready(formatInit);
};


//browser detections
if (typeof console == "undefined") {
    window.console = {
        log: function () {}
    };
}
iOS = navigator.userAgent.match(/like Mac OS X/i);
android4 = navigator.userAgent.match(/Android 4/i);
android5 = navigator.userAgent.match(/Android 5/i);
android6 = navigator.userAgent.match(/Android 6/i);
android7 = navigator.userAgent.match(/Android 7/i);
android4_3 = navigator.userAgent.match(/Android 4.3/i);
android4_4 = navigator.userAgent.match(/Android 4.4/i);
android4_4_2 = navigator.userAgent.match(/Android 4.4.2/i);
android2 = navigator.userAgent.match(/Android 2/i);
android = navigator.userAgent.match(/Android/i);
androidBrowser = ((navigator.userAgent.indexOf('Mozilla/5.0') > -1 && navigator.userAgent.indexOf('Android ') > -1 && navigator.userAgent.indexOf('AppleWebKit') > -1) && (navigator.userAgent.indexOf('Chrome') < 0));
chrome = navigator.userAgent.match(/Chrome/i);
chrome39 = navigator.userAgent.toLowerCase().indexOf('chrome/39') > -1;
chrome40 = navigator.userAgent.toLowerCase().indexOf('chrome/40') > -1;
iOS5= iOS && navigator.userAgent.match(/OS 5/i);
iOS6= iOS && navigator.userAgent.match(/OS 6/i);
iOS8= iOS && navigator.userAgent.match(/OS 8/i);
iPad= navigator.userAgent.match(/iPad/i);
iPhone= navigator.userAgent.match(/iPhone/i);
firefox = navigator.userAgent.toLowerCase().match('firefox');
//var IE6 = false /*@cc_on || @_jscript_version < 5.7 @*/
anyIE = (navigator.userAgent.toString().toLowerCase().indexOf("msie")>-1 || navigator.userAgent.toString().toLowerCase().indexOf("trident/7")!=-1);
ie7 = (document.all && !window.opera && window.XMLHttpRequest && navigator.userAgent.toString().toLowerCase().indexOf('trident/4.0') == -1) ? true : false;
ie8 = (navigator.userAgent.toString().toLowerCase().indexOf('trident/4.0') != -1);
ie9 = navigator.userAgent.toString().toLowerCase().indexOf("trident/5")>-1;
ie10 = navigator.userAgent.toString().toLowerCase().indexOf("trident/6")>-1;
ie11 = navigator.userAgent.toString().toLowerCase().indexOf("trident/7")>-1;
ieTablet = (navigator.userAgent.toLowerCase().indexOf("msie") !== -1 && navigator.userAgent.toLowerCase().indexOf("touch") !== -1);
safari = (navigator.userAgent.toString().toLowerCase().indexOf("safari") != -1) && (navigator.userAgent.toString().toLowerCase().indexOf("chrome") == -1);
mobileSafari = ((navigator.userAgent.toString().toLowerCase().indexOf("iphone")!=-1) || (navigator.userAgent.toString().toLowerCase().indexOf("ipod")!=-1) || (navigator.userAgent.toString().toLowerCase().indexOf("ipad")!=-1)) ? true : false;

isAndroid4AndAbove = Boolean(android4 || android5 || android6 || android7);

//Platforms
MAC = (navigator.userAgent.toString().toLowerCase().indexOf("mac")!=-1) ? true: false;
WINDOWS = (navigator.appVersion.indexOf("Win")!=-1) ? true : false;
LINUX = (navigator.appVersion.indexOf("Linux")!=-1) ? true : false;
UNIX = (navigator.appVersion.indexOf("X11")!=-1) ? true : false;

//using mousedown in place of touchstart to fix ios9 problems
var myClickAction = (iOS || android) ? "mousedown":"click";

PXL_appRefs = ["notAPP", "notloaded", "notloaded", "notloaded"];
PXL_iframes = [];
PXL_appsReady = ["notAPP", false, false, false];
numApps = "0";
if (isNaN(numApps)) numApps = 3;
/////////////////////// placholder expand contract functions//////////////////
function PXLcollapse() {
    console.log("PXLcollapse()");};

function PXLexpand() {};
////////////////////////////////////////////////////////////////////
function PXLinject(environment) {
    var thisDoc = environment.document;
    PXL_iframes.push(environment);
    if (typeof environment.ADTECH == "undefined") {
        environment.ADTECH = ADTECH;
    }
    environment.PXL = {
        collapseAd: function () {
            console.log("collapseAd");
            PXLcollapse();
        },
        expandAd: function () {
            PXLexpand();
        },
        showModule: function (appNum, interaction) {
            if (typeof interaction == "undefined") interaction = false;
            PXLshowModule(appNum, interaction);
        },
        hideModule: function (appNum, interaction) {
            if (typeof interaction == "undefined") interaction = false;
            PXLhideModule(appNum, interaction);
        },
        getModuleList: function () {
            return PXLgetModuleList();
        },
        getModule: function (appNum) {
            return PXLgetModule(appNum);
        },
        resizeModule: function (appNum, formatObj) {
            PXLresizeModule(appNum, formatObj);
        },
        loadModule: function (appNum, optionObj) {
            PXLloadModule(appNum, optionObj);
        },
        skipIntro: function () {
            console.log("skipIntro");
            PXLskipIntro();
        },
        completeIntro: function () {
            PXLcompleteIntro();
        },
        replayIntro: function () {
            PXLreplayIntro();
        },
        isAppReady: function (appNum) {
            return PXLisAppReady(appNum);
        },
        EXPAND: "expand",
        COLLAPSE: "collapse",
        addEventListener: function (_evtName, _func) {
            PXLaddEventListener(_evtName, _func);
        },
        removeEventListener: function (_evtName, _func) {
            PXLremoveEventListener(_evtName, _func);
        },
        $core: $,
        $: function (sel) {
            return $(sel, thisDoc);
        }
    };

    try {
        environment.PXLready();
        environment.PXLisready = true;
    } catch (e) {
        console.log('PXLready is not found in the custom HTML: ', e);
    }
}

function PXLonIframeLoadInjectApi(id) {
    console.log("PXLonIframeLoadInjectApi");
    $(id).on("load", function () {
        console.log("PXLonIframeLoadInjectApi LOAD");
        PXLinject(this.contentWindow);
    });
}

function PXLonReadyInjectApi() {
    console.log("PXLonReadyInjectApi into CORE");
    var thisWindow = this;
    thisWindow.PXLready = function(){}; // prevents try/catch errors
    PXLinject(thisWindow);
}

function PXLinit() {
    ADTECH.addEventListener("expand", function () {
        PXLeventHandler("expand")
    });
    ADTECH.addEventListener("show", function () {
        PXLeventHandler("expand")
    });
    ADTECH.addEventListener("contract", function () {
        PXLeventHandler("collapse")
    });
    ADTECH.addEventListener("hide", function () {
        PXLeventHandler("collapse")
    });
}

function PXLeventHandler(_evt) {
    console.log("PXLeventHandler(_evt)", _evt);
    var _array = PXLeventsArray;
    for (var i = 0; i < _array.length; i++) {
        try {
            if (_array[i].evtName == _evt) {
                _array[i]._func();
            }
        } catch (e) {
            console.log("_array[i]._func:", _array[i]._func, "error:", e);
        };
    }
}

PXLeventsArray = [];

function PXLaddEventListener(_evtName, _func) {
    PXLeventsArray.push({
        evtName: _evtName,
        _func: _func
    });
}

function PXLremoveEventListener(_evtName, _func) {
    var _array = PXLeventsArray;
    for (var i = 0; i < _array.length; i++) {
        if (_array[i].evtName == _evtName) {
            if (_array[i]._func == _func) {
                _array.splice(i, 1);
            }
        }
    }
}
function PXLcollapse() {
  PXL.collapseAd();
};
function PXLexpand() {
  PXL.expandAd();
};
/**
 * Copyright 2013 AOL Networks.
 * @author james.christie@adtech.com
 */

ADTECH.ready(initSpecial);


function initSpecial() {
  console.log("initSpecial");
  ADTECH.specialEvent = function (event, obj) {
    var str ="specialEventName="+escape(event);
    for(var i in obj ) {
      str += ";dn"+i +"=" + escape(obj[i]);
    }
    var url = ADTECH.constructCustomEventURL()+str;
    ADTECH.event('specialEvent',{link:url});
  }
}

com.adtech.Core.prototype.constructCustomEventURL = function() {
  var adServerVars = ADTECH.adConfig.adServerVars;
  var base = adServerVars.servingProto+'://'+adServerVars.servingHost+'/dtrack/3.0/';
  var nw = adServerVars.networkId+'.'+adServerVars.subNetworkId+'/';
  var placement = adServerVars.placementId+'/1/1/';
  var bnid = ';bnid='+adServerVars.bannerId;
  var adid = ';adid='+adServerVars.id;
  var keyValue = ';dn';
  var rnd = ';misc=' + (+new Date()) + ';';
  return base+nw+placement+bnid+adid+rnd+keyValue;
};

// allow all events to be heard
com.adtech.Core.prototype.event_org = com.adtech.Core.prototype.event; 
com.adtech.Core.prototype.event = function(name, meta) {
  //console.log("com.adtech.Core.prototype.event", name);
  try{
    this.dispatchEvent(name);
  } catch(e) {
    console.log("event error:",e);
  };
  this.event_org(name,meta);
};


DEFAULT_DELAY = 300;
COOKIE_LIFESPAN = 24; //in hours
PXL_SVP_VERSION = '1.4.2';

function isNullUndefinedEmptyNONE(value) {
    if(value === "" || value === undefined || value === null || value === "undefined" || value === "NONE") {
        return true;
    }
    return false;
}
function NOT_NullUndefinedEmptyNONE_AND_NotFalse(value) {
    if(!isNullUndefinedEmptyNONE(value) && value !== false) {
        return true;
    }
    return false;
}
// dynamic method of getting the proper url to Pictela services
function getServicesHost(type) {
  try {
    type = (type || 'get').toUpperCase();
  } catch (e) {}
  if (type !== 'GET' && type !== 'POST') {
    console.warn('Invalid type argument for getServicesHost!');
    return;
  }
  return ADTECH.getServicesHosts()[type.toUpperCase()] + 'a/';
}

function addPX_unitIfNeeded(obj, prop_Str) {
  if(!isNaN(obj[prop_Str])) {
    obj[prop_Str] += 'px';
  }
  return obj[prop_Str];
}


function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// convert a hexidecimal color string to 0..255 R,G,B
function hexToRGB(hex) {
  try{
      if (hex[0]=="#") hex=hex.substr(1);
      if (hex.length==3) {
        var temp=hex; hex='';
        temp = /^([a-f0-9])([a-f0-9])([a-f0-9])$/i.exec(temp).slice(1);
        for (var i=0;i<3;i++) hex+=temp[i]+temp[i];
      }
      var triplets = /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(hex).slice(1);
      return {
        r: parseInt(triplets[0],16), g: parseInt(triplets[1],16), b: parseInt(triplets[2],16)
      }
  }
  catch(e){
    return {r: 0, g: 0, b: 0}; 
  }
}

this._PXL = this._PXL || {};

(function (module) {
  'use strict';

  module.utils = module.utils || {};
  module.utils.loadScript = module.utils.loadScript || {};

  var _loadScript = function(src, done)  {
    var js = document.createElement('script');
    js.src = src;
    // console.dir(done);
    js.onload = function() {
      done();
    };
    js.onerror = function() {
      done(new Error('Failed to load script ' + src));
    };
    document.head.appendChild(js);
  };

  module.utils.loadScript = _loadScript;

  return module;

})(_PXL);
 // needed for promise polyfill

function injectWeine(_key,_section, _window) {
	var script = _window.document.createElement('script');
	script.src = "https://weinre.mybluemix.net/target/target-script-min.js#"+_key+_section;
	script.type = 'text/javascript';

	var headEl = _window.document.getElementsByTagName('head')[0];
	headEl.appendChild(script);
  console.log("WEINRE: started https://weinre.mybluemix.net/client/#"+_key+_section);
  console.log(Date.now());
	console.log("WEINRE:from core you can inject weinre into apps!!!");
	console.log("WEINRE:from url above goto console: injectWeinreApp(num)");
}
function injectWeinreAdtech(_section) {
	var settings = ADTECH.getContent('AdSettings');
	if(settings["Enable Weinre"] == true) {
		injectWeine(settings["Weinre Key"], _section, window);
	}
}
function injectWeinreApp(num) {
	try {
		var settings = ADTECH.getContent('AdSettings');
		if(settings["Enable Weinre"] == true) {
			var _win = document.getElementById('app1').contentWindow;
			injectWeine(settings["Weinre Key"], "app"+num, _win);
		}
	} catch(e) {
		console.log("WEINRE: ERROR on call to injectWeinreApp("+num+")", e);
		console.log("WEINRE: You may not be calling this from Core window");
	}
}
//leave this line for bake
;

if (typeof _PXL === 'undefined') {
	_PXL = {};
}

_PXL.module = function() {
	var modules = {};
	return function(name) {
		if (modules[name]) {
			return modules[name];
		}
		return modules[name] = {
		};
	};
}();

(function(mod) {

	mod.allowAlert = false;
	mod.log = function(message) {
		
		try {
			console.log(message);
		} catch (e) {
			if (mod.allowAlert) {
				alert(message);
			}
		}
		
	}

})(_PXL.module('console'));
//
;
(function(mod) {

  var _advert;
  var _funcStack = {};
  var _id;

  /* call a function in a different window, or dispatch an event to another window
  implemented using ADTECH.event
  
  */  

  function _call(receiverId, funcName, params) {

    //console.log('-------------------> call_crossframe :: _call ',arguments);

    try {
      var args = Array.prototype.slice.call(arguments);
      var obj = {};

      obj.funcName = funcName;
      obj.receiverId = receiverId;
      obj.params = args.slice(2);

      if (_advert) {
        _advert.eventBus.dispatchEvent({'type':'callCrossFrame','meta':obj});
      } else {

        // console.log('-------------------> call_crossframe :: _call obj',obj);

        ADTECH.event('callCrossFrame',obj);

      }

    } catch (e) {
      _PXL.module('console').log('call_crossframe::call failed: ' + e);
    }

  }

  function _listen() {
    // console.log('-------------------> call_crossframe :: _listen ');
    
    if (_advert) {
      _advert.eventBus.addEventListener('callCrossFrame',_callHandler);
    } else {
      ADTECH.addEventListener('callCrossFrame',_callHandler);
    }

  }

  /*function _stop() {
  }*/

  function _callHandler(event) {
    //console.log('------------------> call_crossframe :: _callHandler event',event);
    var params = event.meta ? event.meta.params : null;
    var funcName = event.meta ? event.meta.funcName : null;
    var id = event.meta ? event.meta.receiverId : null;

    if (id == _id && typeof _funcStack[funcName] !== 'undefined') {
      try {
        _funcStack[funcName].apply(null,params);
      } catch (e) {
        console.log('------------------> call_crossframe :: _callHandler apply function failed',e);
      }
    }

  }

  function _neverCall() {
    ADTECH.event('callCrossFrame')
  }
    
  mod.listen = _listen;
  mod.call = _call;
  
  //mod.stop = _stop;

  mod.setAdvert = function(advert) {
    _advert = advert;
  }
  mod.addFunc = function(funcName, func) {
    _funcStack[funcName] = func;
  }

  mod.setId = function(id) {
    _id = id;
  }

  mod.getId = function() {
    return _id;
  };

  var _instances = [];

  function _CrossFrame() {
    this._funcStack = {};
    this._id = '';
  };

  _CrossFrame.prototype.setAdvert = mod.setAdvert;

  _CrossFrame.prototype.setId = function(id) {
    this._id = id;
  }

  _CrossFrame.prototype.getId = function() {
    return this._id;
  }

  _CrossFrame.prototype.addFunc = function(funcName, func) {
    this._funcStack[funcName] = func;
  }

  _CrossFrame.prototype.getFunc = function(funcName) {
    return this._funcStack[funcName];
  }

  _CrossFrame.prototype.call = _call;

  _CrossFrame.prototype.listen = function() {
    if (_advert) {
      _advert.eventBus.addEventListener('callCrossFrame',this._callHandler.bind(this));
    } else {
      ADTECH.addEventListener('callCrossFrame',this._callHandler.bind(this));
    }
  };

  _CrossFrame.prototype._callHandler = function(event) {
    //console.log('------------------> '+this._id+' >> call_crossframe :: _callHandler event',event);
    var params = event.meta ? event.meta.params : null;
    var funcName = event.meta ? event.meta.funcName : null;
    var id = event.meta ? event.meta.receiverId : null;

    if (id == this._id && typeof this._funcStack[funcName] !== 'undefined' && typeof params !== 'undefined' ) {
      try {
        this._funcStack[funcName].apply(null,params);
      } catch (e) {
        console.log('------------------> call_crossframe :: _callHandler apply function failed',e);
      }
    }
  }

  mod.getInstance = function() {
    var inst = new _CrossFrame();
    _instances.push(inst);
    return inst;
  }

})(_PXL.module('call_crossframe'));



function initCore() {
  // console.log('start initCore')
  injectWeinreAdtech("core");

  settings = ADTECH.getContent('AdSettings');


	if(typeof(advanced_settings) == "undefined" || isNullUndefinedEmptyNONE(advanced_settings)) {
	  advanced_settings = settings;
	}

	if(typeof(advanced_settings.consoleLogging) == "undefined" || advanced_settings.consoleLogging === false) {
		console.log = function() {};
	}

  if(NOT_NullUndefinedEmptyNONE_AND_NotFalse(settings['extra_JS_Start'])) {
          eval(settings['extra_JS_Start']);
  }

  //UKFeedback - allow css file upload
  if(NOT_NullUndefinedEmptyNONE_AND_NotFalse(settings['extraCSSFile'])){
          var cssLink = $('<link>');
          cssLink.appendTo('head'); //IE hack: append before setting href // Which IE? Is this still necessary?
          cssLink.attr({
            rel:  'stylesheet',
            type: 'text/css',
            href: settings['extraCSSFile']
          });
  }

  if(NOT_NullUndefinedEmptyNONE_AND_NotFalse(settings['extraCSS'])) {
     $( "<style>"+settings['extraCSS']+"</style>" ).appendTo( "head" );
  }

  PXLinit(); // PXLapi.js
  PXLonReadyInjectApi(); // PXLapi.js

	if(NOT_NullUndefinedEmptyNONE_AND_NotFalse(settings['extra_JS_End'])) {
	  eval(settings['extra_JS_End']);
	}
	//UKFeedback - allow js file upload
	if(NOT_NullUndefinedEmptyNONE_AND_NotFalse(settings['extra_JS_File'])){
	  $.getScript(settings['extra_JS_File']);
	}
  /***
  *** MMJS Bridge script START
  *** To use MMJS API:
  *** Set a layer click_url in the content panel to:
  *** javascript:(function(){if(window.MMJS) window.MMJS.device.composeSms(['07754686038'],'Lorem ipsum') })()
  *** or call the API inside your html content:
  *** if(parent.MMJS) parent.MMJS.device.composeSms(['07754686038'],'Lorem ipsum');
  ***/

  var mmjsCallbacks = {};
  var CMD_TYPE_MMJS = 'CMD_MMJS';
  var MMJS = {};

  MMJS.device = {

  	openAppStore: function (appId, callback) {
  		sendMessage('device.openAppStore', arguments);
  	},

    isSchemeAvailable: function (name, callback) {
  		sendMessage('device.isSchemeAvailable', arguments);
  	},

    isPackageAvailable: function (name, callback) {
  		sendMessage('device.isPackageAvailable', arguments);
    },

    call: function (number, callback) {
  		sendMessage('device.call', arguments);
    },

  	composeSms: function (recipients, message, callback) {
  		sendMessage('device.composeSms', arguments);
    },

  	composeEmail: function (options, callback) {
  		sendMessage('device.composeEmail', arguments);
    },

    openMap: function (address, callback) {
      sendMessage('device.openMap', arguments);
    },

    getLocation: function (callback) {
      sendMessage('device.getLocation', arguments);
    },

    openInBrowser: function (url, callback) {
      sendMessage('device.openInBrowser', arguments);
  	}

  };

  MMJS.media = {

    isSourceTypeAvailable: function (sourceType, callback) {
      sendMessage('media.isSourceTypeAvailable', arguments);
    },

    getAvailableSourceTypes: function (callback) {
      sendMessage('media.getAvailableSourceTypes', arguments);
  	},

    getPictureFromPhotoLibrary: function (size, callback) {
      sendMessage('media.getPictureFromPhotoLibrary', arguments);
    },

    openCamera: function (preferredCamera, size, callback) {
      sendMessage('media.openCamera', arguments);
    },

    savePictureToPhotoLibrary: function (url, name, description, callback) {
      sendMessage('media.savePictureToPhotoLibrary', arguments);
  	}
  };

  MMJS.calendar = {
    addEvent: function (options, callback) {
      sendMessage('calendar.addEvent', arguments);
    },
    addReminder: function (options, callback) {
      sendMessage('calendar.addReminder', arguments);
    }
  };

  MMJS.notification = {
    vibrate: function (pattern, onStart, onFinish) {
      sendMessage('notification.vibrate', arguments);
    }
  };

  /**
   * Proxies MMJS method <code>sendMessage</code> to rich media library for handling.
   *
   * @private
   * @param {string} method The MRAID method to call.
   * @param {...*} [params] The method's parameters.
  */
  function sendMessage() {

    var params = Array.prototype.slice.call(arguments);
    var method = params.shift(); // Remove the first one.
    params = params[0];
    for (var i = 0, len = params.length; i < len; i++) {
      var getType = {};
      if (params[i] && getType.toString.call(params[i]) === '[object Function]') {
        var id = new Date().getTime();
        mmjsCallbacks[id] = params[i];
        params[i] = {
          callbackId: id
        };
      }
    }
    var messageObj = {
      cmd: CMD_TYPE_MMJS,
      msg: {
        method: method,
        params: params
      }
    };
    if (window.ADTECH.sendMessage) {
      var messageStr = JSON.stringify(messageObj);
      window.ADTECH.sendMessage(messageStr, '*');
  	} else {
      // DEV MODE
      console.log('[MMJS]: ' + method, params);
  	}
  }

  window.addEventListener('message', function(evt) {
  	var data = {};
    try {
      data = JSON.parse(evt.data);
  	} catch (e) {
      return;
  	}
    if (data.cmd && data.cmd == CMD_TYPE_MMJS) {
      var msg = data.msg;
      var params = Object.keys(msg.params).map(function(k) { return msg.params[k] });
      var callbackId = msg.callbackId;
      if (callbackId) {
        mmjsCallbacks[callbackId].apply(this, params);
        mmjsCallbacks[callbackId] = null;
  		}
  	}
  });

  window.MMJS = MMJS;

  /****
  ***** MMJS Bridge script END 
  ****/

  console.log('end of initCore');

  return new Promise(function(resolve, reject) {
    if (window.PXL) {
      resolve('initCore worked');
    } else {
      reject(Error('initCore broke'));
    }
  });
}

//
/*
 
adapted from MDN

set(name, value[, end[, path[, domain[, secure]]]])
get(name)
remove(name[, path], domain)
has(name)
keys()

*/
;
(function(mod,config){
	
	function isAvailable() {
		try {
			_set('lb_testCookie', '1');
			if (_get('lb_testCookie') !== '1') {
				return false;
			} else {
				_remove('lb_testCookie');
				return true;
			}

		} catch (e) {
			_PXL.module('console').log('$lb::cookies::isAvailable failed: ' + e);
		}

		return false;
	}

	
	function _get(sKey) {
	    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	}
	
	function _set(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
	    var sExpires = "";
	    if (vEnd) {
	      switch (vEnd.constructor) {
	        case Number:
	          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
	          break;
	        case String:
	          sExpires = "; expires=" + vEnd;
	          break;
	        case Date:
	          sExpires = "; expires=" + vEnd.toUTCString();
	          break;
	      }
	    }
	    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	    return true;
	  }
	
	function _remove(sKey, sPath, sDomain) {
	    if (!sKey || !_has(sKey)) { return false; }
	    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
	    return true;
	}
	
	function _has(sKey) {
	    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
	
	function _keys() {
	    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
	    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
	    return aKeys;
	}
	
	mod.get = _get;
	mod.set = _set;
	mod.remove = _remove;
	mod.keys = _keys;
	mod.isAvailable = isAvailable;
	
})(_PXL.module('cookies'), {context:this}); // needed by auto expand
//

;
(function(mod) {

	//testing if the storage function is available, returns boolean
	function isAvailable() {
		
		try {
			if (typeof (Storage) !== "undefined") {
				// do nothing
			} else {
				return false;
			}

			localStorage.setItem('lb_lsTestItem', '1');
			if (localStorage.getItem('lb_lsTestItem') !== '1') {
				return false;
			} else {
				localStorage.removeItem('lb_lsTestItem');
				return true;
			}
		} catch (e) {
			_PXL.module('console').log('$lb::storage::isAvailable failed: '+e);
		}
		
		return false;
	}
	
	function set(name, val, endtime) {
		var obj = {};
		obj.name = name;
		obj.val = val;
		obj.endtime = endtime;
		localStorage.setItem(name,JSON.stringify(obj));
		return true;
	}
	
	function get(name) {
		var item = localStorage.getItem(name);
		if (!item) return null;
		var obj = JSON.parse(item);
		if (!obj.endtime) return obj.val;
		if (new Date(obj.endtime) > new Date()) {
			return obj.val;
		} else {
			remove(name);
			return null;
		}
	}
	
	function getEndtime(name) {
		var item = localStorage.getItem(name);
		if (!item) return null;
		var obj = JSON.parse(item);
		if (obj.endtime === null) return null;
		return new Date(obj.endtime);
	}
	
	function setEndtime(name,endtime) {
		var item = localStorage.getItem(name);
		if (!item) return false;
		var obj = JSON.parse(item);
		set(name,obj.val,endtime)
		return true;
	}
	
	function remove(name) {
		return localStorage.removeItem(name);		
	}

	mod.isAvailable = isAvailable;
	mod.set = set;
	mod.get = get;
	mod.remove = remove;
	mod.getEndtime = getEndtime;
	mod.setEndtime = setEndtime;

})(_PXL.module('storage'));

 // needed by auto expand
//

;
(function(mod){

	mod.getDoExpand = function() {

        var autoExpand = ADTECH.getContent('Auto Expand');

        if (!autoExpand.Auto_Expand_Enabled) {
          return false;
        }

        //if expand is enabled in cms and we are in a preview environment, then expand
        if (ADTECH.adConfig.preview && autoExpand.Auto_Expand_Enabled) {
           console.log("forced autoExpand while in preview");
           return true;
        }

        //if expand is enabled and the 'per day' has been set to 0, then expand
        if ((parseInt(autoExpand.Auto_Expand_Frequency) === 0 || isNaN(parseInt(autoExpand.Auto_Expand_Frequency))) && autoExpand.Auto_Expand_Enabled ) {
           return true;
        }

        //if (adData.topHost === 'ads.pictela.com' && autoExpand.Auto_Expand_Enabled) return true;
        console.log('cookies available = '+_PXL.module('cookies').isAvailable());
        console.log('storage available = '+_PXL.module('storage').isAvailable());

        var doExpand = false;
        var expTimes;
        var endtime;

        try {
            if (_PXL.module('cookies').isAvailable()) {

                expTimes = _PXL.module('cookies').get('expand_frequency');
                console.log('expTimes = '+expTimes);
                if (expTimes === null) {
                    //if no cookies found, then set the cookie for the first time.
                    expTimes = 0;
                    var d = new Date();
                    endtime = d.setDate(d.getDate()+1);
                    _PXL.module('cookies').set('expand_frequency', '0', endtime);
                    //save the cookie's expire time
                    _PXL.module('cookies').set('expand_frequency_endtime', JSON.stringify(endtime));
                } else {
                    expTimes = parseInt(expTimes);
                    endtime = new Date(JSON.parse(_PXL.module('cookies').get('expand_frequency_endtime')));
                }

                console.log('autoExpand.Auto_Expand_Frequency = '+autoExpand.Auto_Expand_Frequency);
                if (parseInt(autoExpand.Auto_Expand_Frequency) > expTimes) {
                    doExpand = true;
                    expTimes++;
                    _PXL.module('cookies').set('expand_frequency', ''+expTimes, endtime);
                }

            } else if (_PXL.module('storage').isAvailable()) {
                expTimes = _PXL.module('storage').get('expand_frequency');
                if (expTimes === null) {
                        //if no expTimes found, then set the storage data for the first time.
                        expTimes = 0;
                        var d = new Date();
                        endtime = d.setDate(d.getDate()+1);
                        _PXL.module('storage').set('expand_frequency', 0, endtime);
                    } else {
                        expTimes = parseInt(expTimes);
                        endtime = _PXL.module('storage').getEndtime('expand_frequency');
                    }

                    if (parseInt(autoExpand.Auto_Expand_Frequency) > expTimes) {
                        doExpand = true;
                        expTimes++;
                        _PXL.module('storage').set('expand_frequency', ''+expTimes, endtime);
                    }

                }

            } catch (e) {
              console.log('Failed to access cookies or storage: '+e);
            }

        return doExpand;
    }


})(_PXL.module('auto_expand'));

this._PXL = this._PXL || {};

(function(module) {
  'use strict';

  module.utils = module.utils || {};
  module.utils.filetype = module.utils.filetype || {};

  var _isImage = function(filename) {
    try {
      return (/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(filename);
    } catch(e) {
      console.log('Error: _isImage: ', e);
    }
  };
  var _isHtml = function(filename) {
    try {
      return (/\.(html|htm)$/i).test(filename);
    } catch(e) {
      console.log('Error: _isHtml: ', e);
    }
  };
  var _isInclude = function(filename) {
    try {
      return (/\.(txt)$/i).test(filename);
    } catch(e) {
      console.log('Error: _isInclude: ', e);
    }
  };

  module.utils.filetype = {
	isImage: _isImage,
	isHtml: _isHtml,
  isInclude: _isInclude
  };

  return module;
})(_PXL);
 // needed by content layers
this._PXL = this._PXL || {};

(function (module) {
  'use strict';

  module.utils = module.utils || {};
  module.utils.parseCSS = module.utils.parseCSS || {};

  var _parseCSSValue = function (cssValue) {
    // This parses CSS values that are expected to have units, e.g. px em %.
    // Do NOT use for unitless css props, namely: line-height, zIndex, & font-weight
    if (_haltValueParse(cssValue)) {
      return cssValue;
    }
    try {
      cssValue = (cssValue).toString();
      var _digit = cssValue.match(/[\d|\.]+/g);
      // Checks css for valid units, defaults to px
      var _unit = cssValue.match(/px|%|em|rem|vh|vw|vmin|vmax/) || 'px';
      var _parsed = _digit + _unit;
      return _parsed;
    } catch (e) {
      console.log(e);
      console.log(cssValue);
      return cssValue;
    }
  };
  var _haltValueParse = function (val) {
    var _exactMatch = ['auto', 0, '0', null, ''].filter(equality);
    var _contains = ['calc', '!important', '-'].filter(stringContains);

    function equality(arrVal) {
      if (val === arrVal) {
        return arrVal;
      }
    }

    function stringContains(arrVal) {
      if (val.toString().match(arrVal)) {
        return arrVal;
      }
    }
    if (_exactMatch.length || _contains.length) {
      return true;
    }
  };
  var _haltPropParse = function (prop) {
    // Do not attempt to add units to zIndex, etc, bc unitless integers are appropriate
    var _exactMatch = ['', 'zIndex', 'lineHeight', 'fontWeight'].filter(equality);
    function equality(arrProp) {
      if (prop === arrProp) {
        return arrProp;
      }
    }
  };
  var _parseCSSObject = function (cssObj) {
    var result = {};
    for (var i in cssObj) {
      // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
      if (cssObj.hasOwnProperty(i)) {
        var cssProp = i;
        var cssValue = cssObj[i];
        // console.log(cssProp, cssValue);
        if (!_haltPropParse(cssProp) && cssValue) {
          result[cssProp] = _parseCSSValue(cssValue);
        } else if (cssValue) {
          result[cssProp] = cssValue;
        }
      }
    }
    return result;
  };
  module.utils.parseCSS = {
    value: _parseCSSValue,
    obj: _parseCSSObject
  };

  return module;

})(_PXL);
 // needed by content layers
// requires FileType, ParseCSS utils
// requires PXLonIframeLoadInjectApi() frm pxlapi.js

this._PXL = this._PXL || {};

(function (module) {
	'use strict';

	module.utils = module.utils || {};
	module.utils.contentBuilder = module.utils.contentBuilder || {};

	var _buildBaseFile = function (mainFile, parentElem) {
		if (!module.utils.filetype) {
			console.warn('Required filetype dependency is missing. Aborting.');
			return;
		}
		var _mainFile = mainFile;
		var _parentElem = parentElem;
		var _resultElem;
    var _resultPromise;
    if (!_mainFile) {
      console.warn('Missing main file for ' + parentElem);
      _resultPromise = Promise.resolve(null);
      return _resultPromise;
    }

		if (module.utils.filetype.isHtml(_mainFile)) {
			_resultElem = _createIframe(_mainFile);
		}
		if (module.utils.filetype.isImage(_mainFile)) {
			_resultElem = _createBgImageDiv(_mainFile);
		}
    if (module.utils.filetype.isInclude(_mainFile)) {
			_resultElem = _createHtmlFragment(_mainFile);
		}
		_resultElem.classList.add('base-layer', 'layer');
		_parentElem.appendChild(_resultElem);

    _resultPromise = Promise.resolve(_resultElem);
    return _resultPromise;
	};

	var _buildLayers = function (layersArray, parentElem, collectionName) {
		var _layers = layersArray;
		var _parentElem = parentElem;
    var _collection = collectionName;
		var _docFrag = document.createDocumentFragment();
    var _resultPromise;
    var _newLayers;

		if (_isCollectionEmpty(_layers)) {
      _newLayers = [];
      _resultPromise = Promise.resolve(_newLayers);
			return _resultPromise;
		}
		_newLayers = _layers.map(function(item, index) {
			return new Promise(function (resolve, reject) {
				var _builtLayer = _buildNewLayer(item, index, _collection);
				if (_builtLayer instanceof Element) {
					resolve(_builtLayer);
				} else {
					reject(Error('New layer is not DOM element. Something broke.'));
				}
			});
		});

		Promise.all(_newLayers)
		.then(function(builtLayers) {
			// console.log('/////////'); console.dir(builtLayers);
			builtLayers.forEach(function(layerToAppend) {
				_docFrag.appendChild(layerToAppend);
			});
			_parentElem.appendChild(_docFrag);
		})
		.catch(function(err){
			console.log(err);
		});

    _resultPromise = Promise.resolve(_newLayers);
    return _resultPromise;
	};

	var _createIframe = function(src) {
		var _src = src;
    var iframeWrapper = document.createElement('div');
    iframeWrapper.classList.add('iframe-wrapper');
		var iframe = document.createElement('iframe');
		iframe.src = _src;
		iframe.width = '100%';
		iframe.height = '100%';
		iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('scrolling', 'no');
		iframe.setAttribute('frameborder', '0');
		iframe.classList.add('iframe-generated');
    PXLonIframeLoadInjectApi(iframe); // needed for events
    iframeWrapper.appendChild(iframe);
		return iframeWrapper;
	};

  var _createHtmlFragment = function(src) {
		var _src = src;
		var htmlDiv = document.createElement('div');
		htmlDiv.classList.add('htmldiv-generated');
    $.ajax({
      method: "GET",
      url: _src,
      dataType: "html"
    })
    .done(function(data) {
      // console.log(data);
      htmlDiv.innerHTML = data;
    });
		return htmlDiv;
	};

	var _createBgImageDiv = function(src) {
		var _src = src;
		var imgDiv = document.createElement('div');
		imgDiv.style.backgroundImage = 'url('+_src+')';
		imgDiv.style.backgroundRepeat = 'no-repeat';
		imgDiv.style.backgroundSize = 'contain';
		imgDiv.classList.add('bgimg-generated');
		return imgDiv;
	};

	var _createHotSpotDiv = function() {
		var hotspotDiv = document.createElement('div');
		hotspotDiv.classList.add('hotspot-generated');
		return hotspotDiv;
	};

	var _isCollectionEmpty = function(layersCollection) {
		// 1CP collections can never be truly empty.
		// even when empty, there is 1 child with default values.
		// so we must test to determine whether this is "real" content.
		var _collection = layersCollection;

		// these are subject to change
		var _fileUploadSetting = 'image_file';
		var _clickActionSetting = 'click_action';
		var _clickActionNullValue = 'none';

		// No file upload could mean "invisible hotspot".
		// But invisible hotspots MUST have an interactive element.
		// This test should be sufficient.
		if ((_collection.length === 1) && (_collection[0][_fileUploadSetting] === '')
			&& (_collection[0][_clickActionSetting] === _clickActionNullValue)) {
      console.log('Collection is empty:');
      console.log(_collection);
			return true;
		} else {
			return false;
		}
	};

  var _applyCss = function(elem, cssObj) {
    var parsedCss = module.utils.parseCSS.obj(cssObj);
    for (var i in parsedCss) {
      // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
      if (parsedCss.hasOwnProperty(i)) {
        var cssProp = i;
        var cssValue = parsedCss[i];
        if (cssValue) {
          elem.style[cssProp] = cssValue;
        }
      }
    }
  };

  var _applyClickHandlers = function(elem, settings) {
    var clickAction = settings.clickAction; // none || expand || collapse || click_url (clickthrough or js)
    var clickPayload = settings.clickPayload;
    var clickJs = /^(?:javascript:)/.test(clickPayload);
    var clickUrl = !clickJs;
		var clickFunc;
    var clickJsPayload;
    var clickUrlPayload;
    if ((clickAction === 'click_url') && clickPayload) {
      if (clickJs) {
        clickAction = 'js_eval';
        clickJsPayload = clickPayload.split('javascript:')[1];
      }
      if (clickUrl) {
        clickAction = 'clickthrough';
        clickUrlPayload = clickPayload;
      }
    }

    var clickMeta = {
      trackingId: settings.contentId,
      collectionName: settings.collection,
      url: clickUrlPayload,
      js: clickJsPayload
    };

    switch (clickAction) {
      case 'clickthrough':
        clickFunc = 'clickthrough';
        break;
      case 'collapse':
        clickFunc = 'collapse';
        break;
      case 'expand':
        clickFunc = 'expand';
        break;
      case 'js_eval':
        clickFunc = 'js_eval';
        break;
      case 'none':
        break;
    }
    // console.log(clickAction); console.log(clickFunc);

    if (clickFunc) {
      elem.classList.add('clickable');
      // TODO remove jquery dependency
      $(elem).on('click', function () {
        $.event.trigger(clickFunc, clickMeta);
      });
    }
  };

	var _buildNewLayer = function(item, index, collection) {
		// console.log('*********'); console.dir(item); console.log(collection);
		var layerElem;
    var layerSettings = {
      file: item.image_file,
      collection: collection,
      contentId: item['Tracking Id'],
      clickAction: item.click_action,
      clickPayload: item.click_url,
      rawCss: {
        height: item.height,
        width: item.width,
        left: item.left,
        top: item.top,
        bottom: item.bottom,
        right: item.right
      }
    };

    // transformations
		if (layerSettings.file) {
			layerElem = _createBgImageDiv(layerSettings.file);
		} else {
			layerElem = _createHotSpotDiv();
		}
		layerElem.classList.add('layer');
		layerElem.classList.add('collection-index-' + index);

    _applyCss(layerElem, layerSettings.rawCss);

    _applyClickHandlers(layerElem, layerSettings);

		return layerElem;
	};

  module.utils.contentBuilder = {
    createBase: _buildBaseFile,
    createLayers: _buildLayers
  };

	return module;
})(_PXL);

// expanded_area dependencies: _PXL utils, content builder, jquery/$,
// globals from core_lite: ADTECH, settings, Adchoices_settings, setupAdchoices()
//NOTE This is also main content for Interstitial

(function (mod) {
   // public!
  var _expandedArea = {};
  _expandedArea.el = null;
  _expandedArea.idToApply = 'expanded-area';
  _expandedArea.state = null;

  // private
  //// jqueryObjs
  var $core;
  var $coreWrapperOuter;
  var $coreWrapperInner;
  var $expandedArea;
  var $portraitContent;
  var $landscapeContent;

  //// Adtech settings
  var _contentSettings = {
    portrait: {},
    landscape: {}
  };
  var _expandBg;
  var _expandDirection = 'down';
  var _expandSize;
  var _isFullscreen = false;
  var _isScaleLayoutDimensions = false;
  var _isLayoutDimensions = false;
  var _screenWidth;
  var _screenWidthPortrait;
  var _screenHeight;
  var _screenHeightPortrait;
  var _maxScaledW;
  var _maxScaledH;
  var _layoutPanelOriginalHeight;
  var _layoutPanelOriginalWidth;
  var _aspectRatio;
  var _scaleMax;

  //// configurable classnames
  var _portraitClass = 'portrait';
  var _landscapeClass = 'landscape';
  var _genericExpandLayersClass = 'expanded-area-layer';
  var _expandTypeClass = '';
  var _fullscreenClass = 'fullscreen';
  var _scaleClass = 'scale';
  var _layoutPanaelClass = 'layout-panel';

  //// stuffs to build and how to build it
  var _orientation = {
    current: {
      className: null, // landscape or portrait
      useThisCollection: null // landscape or portrait
    },
    landscape: {
      isSupported: true, // both required for now
      isCurrentOrientation: null,
      layers: {
        baseLayer: {
          el: null,
          idToApply: 'landscape-base-layer'
        },
        collectionLayers: [],
        layersClass: 'landscape-area-layer',
        contentBuilt: null,
        },
      container : {
        el: null,
        idToApply: 'landscape-area-layers'
      }
    },
    portrait: {
      isSupported: true, // both required for now
      isCurrentOrientation: null,
      layers: {
        baseLayer: {
          el: null,
          idToApply: 'portrait-base-layer'
        },
        collectionLayers: [],
        layersClass: 'portrait-area-layer',
        contentBuilt: null,
      },
      container : {
        el: null,
        idToApply: 'portrait-area-layers'
      }
    }
  };

  mod.getExpandedArea = function () {
    return _expandedArea;
  };

  _expandedArea.initialize = function () {
    console.log('expandedArea :: init');

    _contentSettings.portrait.base = ADTECH.getContent('expand_content_portrait_main_file').main_file;
    _contentSettings.portrait.layers = ADTECH.getContent('Expanded Content - Portrait');
    _contentSettings.portrait.collectionName = 'Expanded Content - Portrait';
    _contentSettings.landscape.base = ADTECH.getContent('expand_content_landscape_main_file').main_file;
    _contentSettings.landscape.layers = ADTECH.getContent('Expanded Content - Landscape');
    _contentSettings.landscape.collectionName = 'Expanded Content - Landscape';
    _expandBg = ADTECH.getContent('format_singleton_settings').expand_letterbox_css;
    _expandSize = ADTECH.getContent('format_singleton_settings').expand_size;

    switch (_expandSize) {
      case 'Fullscreen':
        _isFullscreen = true;
        _expandTypeClass = _fullscreenClass;
        break;
      case 'Scale layout panel':
        _isScaleLayoutDimensions = true;
        _expandTypeClass =  _scaleClass;
        _setScaleData();
        break;
      case 'Use layout panel':
        _isLayoutDimensions = true;
        _expandTypeClass = _layoutPanaelClass;
        break;
    }

    $expandedArea = $('<div/>', {
      id: _expandedArea.idToApply
    });
    _expandedArea.el = $expandedArea[0];
    _expandedArea.el.style.background = _expandBg;
    $coreWrapperOuter = $('<div/>', {
      id: 'core-wrapper-outer'
    });
    $coreWrapperInner = $('<div/>', {
      id: 'core-wrapper-inner'
    });
    $core = $('<div/>', {
      id: 'core',
      class: _expandTypeClass
    });
    $portraitContent = $('<div/>', {
      id: _orientation.portrait.container.idToApply
    });
    _orientation.portrait.container.el = $portraitContent[0];
    $landscapeContent = $('<div/>', {
      id: _orientation.landscape.container.idToApply
    });
    _orientation.landscape.container.el = $landscapeContent[0];

    $core.append($portraitContent, $landscapeContent);
    $coreWrapperInner.append($core);
    $coreWrapperOuter.append($coreWrapperInner);
    $expandedArea.append($coreWrapperOuter);
    $('body').append($expandedArea);


    return new Promise(function (resolve, reject) {
      if ($.contains(document.body, _expandedArea.el)) {
        resolve('Expanded area: Stuff worked!');
      } else {
        reject(Error('Expanded area: It broke'));
      }
    });
  };

  _expandedArea.interstitialImmediateExpand = function () {
    // specific to interstitial, which is expanded immediately, not from user engagement w/ a banner
    console.log("isInterstitial show Expanded content expanded_area.js ");
    _expandedArea.show();
  };

  _expandedArea.hide = function (callback) {
    _expandedArea.state = 'closed';

    if (inMRAIDContainer) {
      //spare the fading if in mraid
      console.log('===============================>expanded area :: hide');
      $expandedArea.hide();
      if (typeof callback === 'function') {
        callback();
      }
    } else {
      $expandedArea.fadeOut('fast', callback);
    }

    _expandedArea.hideExpandedContent();

  };

  _expandedArea.show = function (callback) {
    console.log('expandedArea.show');
    _expandedArea.state = 'open';
    _expandedArea.showExpandedContent();
    $expandedArea.fadeIn('fast', callback);

  };

  _expandedArea.showExpandedContent = function () {
    var useWhich = _orientation.current.useThisCollection;
    var isThisBuilt = _orientation[useWhich].layers.contentBuilt;
    var contentSettings = _contentSettings[useWhich];
    if (_expandedArea.state !== 'open') {
      return;
    }
    if (!isThisBuilt) {
      _orientation[useWhich].layers.contentBuilt = true;
      _buildExpandContent(contentSettings, useWhich)
      .then(function() {
        _showExpandContentLayer();
      });
    } else {
      _showExpandContentLayer();
    }
  };

  _expandedArea.hideExpandedContent = function () {
    _hideExpandContentLayers();
  };

  _expandedArea.setOrientation = function(orientation) {
    console.log('_expandedArea.setOrientation', orientation);
    // should only be called for first orientation or changed orientation
    // logic check for that is in controller
    _orientation.current.className = orientation;

    document.body.setAttribute('data-orientation', _orientation.current.className);

    if (_orientation.current.className === _portraitClass) {
      _orientation.portrait.isCurrentOrientation = true;
      _orientation.landscape.isCurrentOrientation = false;
    }
    if (_orientation.current.className === _landscapeClass) {
      _orientation.portrait.isCurrentOrientation = false;
      _orientation.landscape.isCurrentOrientation = true;
    }

    _onResize(); // TODO refactor so we're calling this as little as possible
    _setExpandContentType()
    .then(_expandedArea.showExpandedContent); //won't show if collapsed, no worries

    return new Promise(function (resolve, reject) {
      if ((_orientation.current.className === _portraitClass) || (_orientation.current.className === _landscapeClass)) {
        resolve('Expanded area: Orientation set');
      } else {
        reject(Error('Expanded area: Orientation error'));
      }
    });

  };

  _expandedArea.setScreenSize = function (width, height) {
    //console.log('_expandedArea.setScreenSize: width, height: ', width, height);
    //called from controller
    var previousWidth = _screenWidth;
    var previousHeight = _screenHeight;

    _screenWidth = width;
    _screenHeight = height;

    if (!previousWidth || !previousHeight) {
      console.log('First size event!');
      _screenWidthPortrait = Math.min(_screenWidth, _screenHeight);
      _screenHeightPortrait = Math.max(_screenWidth, _screenHeight);
      _setMaxDims();
    }

    if (previousWidth !== _screenWidth || previousHeight !== _screenHeight) {
      _screenWidthPortrait = Math.min(_screenWidth, _screenHeight);
      _screenHeightPortrait = Math.max(_screenWidth, _screenHeight);
      _setMaxDims();
      _onResize();
    }
  };

  function _onResize() {
    console.log("_onResize:  _screenWidth, _screenHeight", _screenWidth, _screenHeight);
    if (_isScaleLayoutDimensions) {
      _recalculateScaledLayout();
    }
  }

  function _setExpandContentType() {
    if (_orientation.landscape.isSupported && _orientation.landscape.isCurrentOrientation) {
      _orientation.current.useThisCollection = _landscapeClass;
    } else {
      _orientation.current.useThisCollection = _portraitClass;
    }
    console.log('new orientation content in use: ', _orientation.current.useThisCollection);
    return new Promise(function (resolve) {
      resolve(_orientation.current.useThisCollection);
    });
  }

  function _setScaleData() {
    if (!_isScaleLayoutDimensions) {
      return;
    }
    _layoutPanelOriginalHeight = ADTECH.adConfig.assetContainers.main.contentHeight;
    _layoutPanelOriginalWidth = ADTECH.adConfig.assetContainers.main.contentWidth;
    // _scaleMax = (typeof _expandSettings['Expand scale max'] === 'number') ? _expandSettings['Expand scale max'] : false;
    _aspectRatio = _layoutPanelOriginalWidth / _layoutPanelOriginalHeight;
    _setMaxDims();
  }

  function _setMaxDims() {
    if (!_screenWidth || !_screenHeight || !_screenWidthPortrait || !_screenHeightPortrait) {
      // TODO clean up this logic it's confusing but race conditions are real
      return;
    }
    if (_scaleMax) {
      _maxScaledW = Math.min(_scaleMax * _layoutPanelOriginalWidth, _screenWidthPortrait);
      _maxScaledH =  Math.min(_scaleMax * _layoutPanelOriginalHeight, _screenHeightPortrait);
    } else {
      _maxScaledW = _screenWidthPortrait;
      _maxScaledH = _screenHeightPortrait;
    }
    // console.log("_maxScaledW, _maxScaledH"); console.log(_maxScaledW, _maxScaledH);
  }

  function _buildExpandContent(contentSettings, orientationGroup) {
    console.log("MOB _buildExpandContent");
    console.dir(contentSettings);console.log(orientationGroup);
    var _resultPromise;
    var parentElem = _orientation[orientationGroup].container.el;
    var baseLayerPromise = _PXL.utils.contentBuilder.createBase(contentSettings.base, parentElem);
    var otherLayersPromise = _PXL.utils.contentBuilder.createLayers(contentSettings.layers, parentElem, contentSettings.collectionName);

    var addBaseCSSHooks = function(elem) {
      _orientation[orientationGroup].layers.baseLayer.el = elem;
      elem.id = _orientation[orientationGroup].layers.baseLayer.idToApply;
      elem.classList.add(_genericExpandLayersClass);
      elem.classList.add(_orientation[orientationGroup].layers.layersClass);
    };

    var addLayerCSSHooks = function(elem) {
      _orientation[orientationGroup].layers.collectionLayers.push(elem);
      elem.classList.add(_orientation[orientationGroup].layers.layersClass);
      elem.classList.add(_genericExpandLayersClass);
    };

    baseLayerPromise
    .then(function(result) {
        addBaseCSSHooks(result);
    })
    .catch(function(err){ console.log(err); });

    otherLayersPromise
    .then(function(promisesResultsArray) {
      // does not err even if layers collection is empty
      promisesResultsArray.forEach(function(resultPromise) {
        resultPromise.then(function(layerElem) {
          addLayerCSSHooks(layerElem);
        });
      });
    })
    .catch(function(err){ console.log(err); });

    _resultPromise = Promise.all([baseLayerPromise, otherLayersPromise])
    .then(function() {
      _orientation[orientationGroup].layers.contentBuilt = true;
    })
    .catch(function(err){ console.log(err); });
    return _resultPromise;
  }

  function _showExpandContentLayer() {
    if (_expandedArea.state !== 'open') {
      return;
    }
    var $activeExpandSelector;
    var $inactiveExpandSelector;

    if (_orientation.current.useThisCollection === _landscapeClass) {
      $activeExpandSelector = $(_orientation.landscape.container.el);
      $inactiveExpandSelector = $(_orientation.portrait.container.el);
    } else {
      $activeExpandSelector = $(_orientation.portrait.container.el);
      $inactiveExpandSelector = $(_orientation.landscape.container.el);
    }
    $inactiveExpandSelector.hide();
    $activeExpandSelector.show();
  }

  function _hideExpandContentLayers() {
    $expandedArea.hide();
  }

  function _recalculateScaledLayout() {
    // for setting Expand Size: Scale Layout Panel. aka _isScaleLayoutDimensions must be true
    if (!_layoutPanelOriginalHeight || !_layoutPanelOriginalWidth || !_screenHeight || !_screenWidth || !_maxScaledH || !_maxScaledW) {
      return;
    }
    var switchLayoutWidth;
    var switchLayoutHeight;
    var switchScreenWidth;
    var switchScreenHeight;
    var switchMaxW;
    var switchMaxH;

    var maxW;
    var maxH;
    var widthBasis;
    var heightBasis;
    var cssHeight;
    var cssWidth;
    var scaleValue;

    if (_orientation.landscape.isCurrentOrientation) {
      console.log('Is landscape');
      //landscape flipflops W & H settings
      switchScreenWidth = _screenHeight;
      switchScreenHeight = _screenWidth;
      switchLayoutWidth = _layoutPanelOriginalHeight;
      switchLayoutHeight = _layoutPanelOriginalWidth;
      switchMaxW = _maxScaledH;
      switchMaxH = _maxScaledW;
    } else {
      console.log('Is not landscape');
      switchScreenWidth = _screenWidth;
      switchScreenHeight = _screenHeight;
      switchLayoutWidth = _layoutPanelOriginalWidth;
      switchLayoutHeight = _layoutPanelOriginalHeight;
      switchMaxW = _maxScaledW;
      switchMaxH = _maxScaledH;
    }

    maxW = Math.min(switchMaxW, _screenWidth);
    maxH = Math.min(switchMaxH, _screenHeight);

    widthBasis = maxW / switchLayoutWidth;
    heightBasis = maxH  / switchLayoutHeight;
    scaleValue = Math.min(widthBasis, heightBasis);

    var newHeight, newWidth, xTranslate, yTranslate;
    newHeight = switchLayoutHeight;
    newWidth =  switchLayoutWidth ;

    if (newWidth > _screenWidth) {
      xTranslate = (_screenWidth - newWidth)/2/scaleValue;
    } else {
      xTranslate = 0;
    }
    if (newHeight > _screenHeight) {
      yTranslate = (_screenHeight - newHeight)/2/scaleValue;
    } else {
      yTranslate = 0;
    }

   cssHeight = newHeight + 'px';
   cssWidth = newWidth  + 'px';

   $core.css({
      'height': cssHeight,
      'width': cssWidth,
      'transform': 'scale('+ scaleValue + ')' + ' ' + 'translateX(' + xTranslate  + 'px)' + 'translateY(' + yTranslate  + 'px)'
    });

  }
})(_PXL.module('expanded_area'));

// globals: isInterstitial from coreExpandableRichMediaMobile.js

(function (mod) {

  var _controller = {};

  var _expandSettings;

  var _expandSize = {
    'isFullscreen': false,
    'isScaleLayoutDimensions': false,
    'isLayoutDimensions': false
  };

  var _autoExpandSettings;
  var _contractTO;

  var _lastKnownOrientation;
  var _portraitClass = 'portrait';
  var _landscapeClass = 'landscape';
  var _initialOrientationSet = false;
  var _userExpandFirstTime = true;

  var expandedArea;
  var bannerArea;

  mod.getController = function () {
    return _controller;
  }

  _controller.initialize = function (opts) {
    console.log('=============================> contrl :: initialize :: opts', opts);

    expandedArea = opts.expandedArea;

    if (!isInterstitial) {
      bannerArea = opts.bannerArea;
      _autoExpandSettings = ADTECH.getContent('Auto Expand');
    }

    _expandSettings = ADTECH.getContent('format_singleton_settings').expand_size;
    // console.log('_autoExpandSettings:');console.dir(_autoExpandSettings);

    switch (_expandSettings) {
      case 'Fullscreen':
        _expandSize.isFullscreen = true;
        break;
      case 'Scale layout panel':
        _expandSize.isScaleLayoutDimensions = true;
        break;
      case 'Use layout panel':
        _expandSize.isLayoutDimensions = true;
        break;
    }

    //without this, in microsoft apps, swiping won't work
    if (inMRAIDContainer && mraidVersion.split('.')[0] === '1') {
      $('body').css({
        'touch-action': 'none'
      });
    }

    $ccf = _PXL.module('call_crossframe');
    $ccf.setId('expandable');
    $ccf.listen();
    $ccf.call('customAd', 'setExpandSize', _expandSize);

    $ccf.addFunc('mainSize', _mainSize);
    $ccf.addFunc('setOrientation', _setOrientation);

    console.log('try to call customAd triggerWindowSize at: ' + Date.now() );
    $ccf.call('customAd', 'triggerWindowSize');
    $ccf.call('customAd', 'triggerWindowOrientation');

    //inapp hack when in mraid, iOS, the iframe is bigger than window size
    //therefore get the main side from customAd to override 100% height
    if (inMRAIDContainer) {
      $ccf.addFunc('windowSize', function (width, height) {
        $(expandedArea.el).css({
          'width': '100%',
          'height': height
        });
      });
    }
    ADTECH.addEventListener('Initial orientation set', function() {
        console.log('event: Initial orientation set');
        if (isInterstitial) {
          expandedArea.setOrientation(_lastKnownOrientation)
          .then(function() {
            expandedArea.interstitialImmediateExpand();
          });
        } else {
          expandedArea.setOrientation(_lastKnownOrientation);

          var doExpand = _PXL.module('auto_expand').getDoExpand();
          console.log('=============================> contrl :: initialize :: doExpand ', doExpand);

          if (doExpand) {
            _controller.expand(function () {
              _setupAutoContract();
            }, true);
          }
        }
    });
    ADTECH.addEventListener('Orientation change', function() {
        console.log('event: Orientation change event');
        expandedArea.setOrientation(_lastKnownOrientation);
    });
    ADTECH.addEventListener('Portrait start', function() {
      	console.log('event: Portrait start event');
        if (expandedArea.state == 'open' && _lastKnownOrientation === _portraitClass) {
          console.log("event: Orientation Change to Portrait");
          ADTECH.event("Orientation Change to Portrait");
        }
    });
    ADTECH.addEventListener('Landscape start', function() {
      	console.log('event: Landscape start event');
        if (expandedArea.state == 'open' && _lastKnownOrientation === _landscapeClass) {
          console.log("event: Orientation Change to Landscape");
          ADTECH.event("Orientation Change to Landscape");
        }
    });
    ADTECH.addEventListener('Portrait stop', function() {
      console.log('event: Portrait stop event');
    });
    ADTECH.addEventListener('Landscape stop', function() {
      console.log('event: Landscape stop event');
    });

    $(document).on('expanded_close_click', function () {
      if (!isInterstitial) {
        //inapp hack: mraid 1.0 version has issues with 'close'
        if (inMRAIDContainer && mraidVersion.split('.')[0] === '1') {
          $ccf.call('customAd', 'mraidClose');
        }
        _controller.contract();
      } else {
        //ADTECH.event("mraidClose");
        $ccf.call('customAd', 'mraidClose');
      }
    });

    $(document).on('clickthrough', function (event, meta) {
      var collection = meta.collectionName;
      var eventMeta = {
        'Tracking Id': meta.trackingId,
        'Clickthrough': meta.url
      };
      // console.log(eventMeta);console.log(collection);
      ADTECH.contentClick(collection, 'click_url', eventMeta);
    });

    $(document).on('collapse', function (event, meta) {
      var collection = meta.collectionName;
      var eventMeta = {
        'Tracking Id': meta.trackingId
      };
      ADTECH.event('Collapse');
      ADTECH.contentEvent(collection, 'Collapse', eventMeta);
      $.event.trigger("expanded_close_click");
    });

    $(document).on('expand', function (event, meta) {
      var collection = meta.collectionName;
      var eventMeta = {
        'Tracking Id': meta.trackingId
      };
      ADTECH.contentEvent(collection, 'Expand', eventMeta);
      _fireExpandOrientationEvent();
      _controller.expand();
    });

    $(document).on('js_eval', function (event, meta) {
      var collection = meta.collectionName;
      var js = meta.js;
      var eventMeta = {
        'Tracking Id': meta.trackingId,
        'Eval js': js
      };
      ADTECH.contentEvent(collection, 'Custom Action', eventMeta);
      try {
       $.globalEval(js);
      } catch(e) {
        console.log(e);
      }
    });

    if (inMRAIDContainer) {

      //using this event to detect the upper right 'invisible' app close button, and call contract
      mraid.addEventListener('stateChange', function (event) {
        console.log('===============================>mraid stateChange', event);
        if (event.state === 'default') {
          _controller.contract();
        }
      });
    }

    return new Promise(function (resolve, reject) {
      if ($ccf.getId() === 'expandable') {
        resolve('Controller init worked');
      } else {
        reject(Error('Controller init broke'));
      }
    });
  };

  _controller.contract = function (callback, auto) {

    ADTECH.dispatchEvent("mycontract");
    //using this event to stop videos in media gallery

    if (inMRAIDContainer) {
      ADTECH.event("hide");
    }

    expandedArea.hide(function () {

      ADTECH.contract();

      if (_expandSize.isFullscreen || _expandSize.isScaleLayoutDimensions) {
        $ccf.call('customAd', 'fullpageContract');
      } else {
        //setting z-index to default
        $ccf.call('customAd', 'zBack');
      }
      if (!isInterstitial) {
        bannerArea.show(callback);
      }
    });
  };

  _controller.expand = function (callback, auto) {
    console.log('======================> contrl :: expand :: auto ', auto);

    if (typeof auto !== 'undefined' && auto) {
      ADTECH.event("Auto Expand");
    } else if (_userExpandFirstTime) {
      ADTECH.event("Initial Expand");
      _userExpandFirstTime = false;
    } else {
      ADTECH.event("Initial Expand");
      ADTECH.event("Re-expand");
    }
  };

  _controller.getOrientation = function () {
    return _lastKnownOrientation;
  };

  function _setupAutoContract() {
    if(_autoExpandSettings.Auto_Expand_Timeout > 0) {
        _contractTO = setTimeout(function(){
            _controller.contract(null,true);
        }, _autoExpandSettings.Auto_Expand_Timeout*1000);

        if(!_autoExpandSettings.Auto_Expand_Timeout_Locked) {
            ADTECH.addEventListener('interactiveEvent', function(){
                console.log('======================> contrl :: interactiveEvent');
                clearTimeout(_contractTO);
            });
        }
    }
  }

  function _mainSize(width, height) {
    console.log("controller.js _mainSize", width, height);
    expandedArea.setScreenSize(width, height);
  }

  function _setOrientation(orientationString) {
    console.log('old orientation was: ', _lastKnownOrientation);
    console.log('setting orientation to: ', orientationString);
    _lastKnownOrientation = orientationString;
    if (_initialOrientationSet) {
      console.log('dispatchEvent: Orientation change');
      ADTECH.dispatchEvent('Orientation change');
      if ( _lastKnownOrientation === _portraitClass) {
        ADTECH.dispatchEvent('Landscape stop');
        ADTECH.dispatchEvent('Portrait start');
      }
      if (_lastKnownOrientation === _landscapeClass) {
        ADTECH.dispatchEvent('Landscape start');
        ADTECH.dispatchEvent('Portrait stop');
      }
    } else {
        _initialOrientationSet = true;
        console.log('dispatchEvent: Initial orientation set');
        ADTECH.dispatchEvent('Initial orientation set');
    }
  }

  function _fireExpandOrientationEvent() {
    if (_lastKnownOrientation === _portraitClass) {
      console.log('event: Expand in Portrait');
      ADTECH.event("Expand in Portrait");
    }
    if (_lastKnownOrientation === _landscapeClass) {
      console.log('event: Expand in Landscape');
      ADTECH.event("Expand in Landscape");
    }
  }

})(_PXL.module('expandable_rich_media_mobile_controller'));

var isInterstitial;

isInterstitial = true;


var expandedArea = _PXL.module('expanded_area').getExpandedArea();
var controller = _PXL.module('expandable_rich_media_mobile_controller').getController();

formatInit = function() {
	if(ADTECH.adConfig){
		inMRAIDContainer = (ADTECH.adConfig.mraid) ? true : false;
	}

	if (inMRAIDContainer) {
		mraidVersion = window.mraid.getVersion();
	}

  initCore()

	.then(function(resultsOfinitCore) {
		return Promise.all([ expandedArea.initialize()]);
	})
	.then(function(resultsOfBannerAndExpand) {
		controller.initialize({ 'expandedArea':expandedArea});
	})
  .then(function() {
    ADTECH.event('coreLoaded'); //customAd listens for this
    PXL.expandAd = controller.expand;
    PXL.collapseAd = controller.contract;
    PXL.showModule = function() {
      console.log('PXL.showModule not available in this format.');
      return false;
    };
    PXL.hideModule= function() {
      console.log('PXL.hideModule not available in this format.');
      return false;
    };
    PXL.resizeModule= function() {
      console.log('PXL.resizeModule not available in this format.');
      return false;
    };
    PXL.loadModule= function() {
      console.log('PXL.loadModule not available in this format.');
      return false;
    };
    PXL.getModule= function() {
      console.log('PXL.getModule not available in this format.');
      return false;
    };
    PXL.skipIntro= function() {
      console.log('PXL.skipIntro not available in this format.');
      return false;
    };
    PXL.completeIntro= function() {
      console.log('PXL.completeIntro not available in this format.');
      return false;
    };
    PXL.replayIntro= function() {
      console.log('PXL.replayIntro not available in this format.');
       return false;
    };

  })
	.catch(function(err){ console.log(err); });

};

if (promisesSupported) {
  AdtechReady();
} else {
  console.log('browser does NOT support promises');
  // do polyfill, then call adtech ready init
  _PXL.utils.loadScript(promisePolyfillUrl, AdtechReady);
}

// ADTECH.ready(init); // Moved to format specific init. BIG DIFFERENCE.
