if (typeof console == "undefined") {
    window.console = {
        log: function() {}
    };
}

var myadHook = null;
myHook2 = null;
myAdConfig = null;
var myResize = null;
var $helper;

//records console messages before console becomes available.
myMraidLog = "";

formatType = "Expandable_rich_media_mobile";


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


this._PXL = this._PXL || {};

(function(module) {
  'use strict';

  module.utils = module.utils || {};
  module.utils.debounce = module.utils.debounce || {};

  var _set = function(func, wait, immediate) {
    try {
      	var timeout;
		return function() {
			var context = this,
				args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait || 200);
			if (callNow) { 
				func.apply(context, args);
			}
		}; 
    } catch(e) {
      console.log('Error: debounce _set: ', e); 
    }
  };

  module.utils.debounce = {
  	set: _set
  };

  return module;

})(_PXL);


//
;
console.log("MOB inview code");
(function(mod) {

	var _inviewDetector = {};
	var _advert;
	var _container;

	var _interval;

	var _isInview;



	mod.getInviewDetector = function() {

		return _inviewDetector;
	}

	_inviewDetector.initialize = function (opts) {

		_advert = opts.advert;
		//check for globle adhook, in case advert is not passed in via opt
		if (typeof adhook !== 'undefined') {
		  _advert = adhook.advert;
		}
		//_targetWindow = opts.targetWindow;
		_container = opts.container;

		_adConfig = opts.adConfig || {};

		_isInlineInterstitial = opts.isInlineInterstitial || false;

		_inviewFactor = (typeof opts.inviewFactor !== 'undefined') ? opts.inviewFactor : 0.5; //value between 0 and 1 or array of 2 values

		_intervalTime = opts.intervalTime || 500;

		_delayStart = opts.delayStart || 0;
		_checkDelayIndex = 0;

		if (_inviewFactor instanceof Array) {
			_inviewFactorTop = _inviewFactor[0];
			_inviewFactorBottom = _inviewFactor[1];
		} else {
			_inviewFactorTop = _inviewFactorBottom = _inviewFactor;
		}

		try {
			window.top.document.addEventListener("touchmove",_checkInView);
			window.top.document.addEventListener("scroll",_checkInView);
			
			window.top.document.addEventListener("deviceorientation",function deviceOrientation(e){ADTECH.event('callCrossFrame',{alpha:e.alpha,beta:e.beta,gamma:e.gamma});});
			/* this may be needed in future
			window.top.document.addEventListener("resize",_checkInViewDelay);
			window.top.document.addEventListener("orientationchange",_checkInViewDelay);
			*/
		} catch(e) {
			console.log("MOB touchmove addEventListener FAILED",e);
		}
		if (_delayStart > 0) {
			setTimeout(function() {
				_inviewDetector.start();
			}, _delayStart);
		} else {
			_inviewDetector.start();
		}
	}
/*
	function _checkInViewDelay() {
		_checkDelayIndex = setTimeout(_checkInView,500);
	}
	*/
	function _checkInView() {
		//console.log("_checkInView");

		try {
			clearTimeout(_checkDelayIndex);
			var inPreview = false;
			var screenContainer = null;
			if (_adConfig.preview) {
				//check if creative is viewed on the preview page with custom preview url, and mobile/tablet preview.
				inPreview = true;
				//if viewed in the preview panel
				var previewIframe = window.top.document.getElementById('preview-iframe');
				var previewContainer;
				
				if (previewIframe) {
					//if viewed in the preview panel
					previewContainer = previewIframe.contentWindow.document.getElementsByClassName('one-device')[0];
				} else {
					//if viewed on the preview page
					previewContainer = window.top.document.getElementsByClassName('one-device')[0];	
				}
				
				if (previewContainer) {
					var previewContainerClassNames = previewContainer.classList.toString();
					screenContainer = previewContainer.getElementsByClassName('one-device__screen')[0];
				}
			}

			var inview = false;
			var offset = _advert.getAssetContainer("main").absTop;
			if (_isInlineInterstitial) {
				if (window.frameElement) {
					offset = window.frameElement.offsetTop;
				}
			}

			//var gt = (offset + _container.offsetTop) -  window.top.innerHeight +  _container.offsetHeight*.5;
			//var lt = (offset + _container.offsetTop) +  _container.offsetHeight*.5;
			var gt = (offset + (_container.offsetHeight * _inviewFactorTop)) - window.top.innerHeight;
			var lt = offset + (_container.offsetHeight * _inviewFactorBottom);
			var sTop = window.top.scrollY;

			if (inPreview && screenContainer) {
				var screenIframe = screenContainer.getElementsByTagName('iframe')[0];
				sTop = screenIframe.contentWindow.scrollY;
				gt = (offset + (_container.offsetHeight * _inviewFactorTop)) - screenIframe.contentWindow.innerHeight;
				lt = offset + (_container.offsetHeight * _inviewFactorBottom);
			}

			if (typeof sTop === 'undefined') {
				sTop = window.top.pageYOffset;
			}

			if (sTop > gt && sTop < lt) {
					inview = true;
			}



			if (typeof(mraid) !== 'undefined') {
				if (mraid.isViewable()) {
					inview = true;
				} else {
					inview = false;
				}	
			}
		} catch(e){
				console.log("MOB inview part 1 error:",e);
		};
		//console.log("MOB inviewDetector SF");
		try {
			//if(inSafeFrame === true) { 
			// code for safe frame in view looking for 20%
			if (window.$sf && $sf.ext) {
				var p = $sf.ext.inViewPercentage();
				console.log("inview safeframe p:",p);
				if(p>20) {
					inview = true;
				} else {
					inview = false;
				}	
            }
		} catch(e){
			console.log("MOB inview part 2 error:",e);
		};

		if (_isInview !== inview) {
			_isInview = inview;
			_inviewDetector.dispatch();
		}
	}
	

	function _getInviewData() {

		var offset = _advert.getAssetContainer("main").absTop;
        var sTop = window.top.scrollY;

        if (_isInlineInterstitial) {
			if (window.frameElement) {
				offset = window.frameElement.offsetTop;
			}
		}


        if (typeof sTop === 'undefined') {
        	sTop = window.top.pageYOffset;
        }

		var scrollDiff = (offset + _container.offsetTop) - sTop;

		var percent;

		if (scrollDiff === 0) {
			percent = 100;
		} else {
			percent = Math.round((_container.offsetHeight - Math.abs(scrollDiff))/_container.offsetHeight*100);
		}

		return {'percent':percent,'scrollDiff':scrollDiff,'scrollTop':sTop, 'isInview':_isInview};

	}

	function _chromeClose() {
		_advert.eventBus.dispatchEvent({'type':'inviewStatusChange','isInview':false});
		console.log("MOB Widow blur")
	}

	_inviewDetector.stop = function() {
		console.log("MOB inviewDetector stop");
		try {
			clearInterval(_interval);
			return true;
		} catch (e) {

		}
		return false;
	}

	_inviewDetector.start = function() {
		console.log("MOB inviewDetector start");
		_inviewDetector.stop();
		_interval = setInterval(_checkInView, _intervalTime);
	}

	_inviewDetector.isInview = function() {
		return _isInview;
	}

	_inviewDetector.dispatch = function() {
		_advert.eventBus.dispatchEvent({'type':'inviewStatusChange','isInview':_isInview});
	}


	function _neverCall() {
		//ADTECH.event('inviewStatusChange');
	}

	_inviewDetector.getInviewData = _getInviewData;


})(_PXL.module('inview_detector'));

/********************************************************************
framePreviewCheck module: for check if the creative is viewed
in the mobile/table frame on the preview page
********************************************************************/
this._PXL = this._PXL || {};

(function(module) {
  'use strict';

  module.utils = module.utils || {};
  module.utils.framePreviewCheck = module.utils.framePreviewCheck || {};
  module.utils.getMockFrame = module.utils.getMockFrame || {};
  module.utils.getMockScreen = module.utils.getMockScreen || {};
  // screen = div
  // frame = iframe, child of screen

  var _iframeClass = 'one-device__iframe';
  var _screenDivClass = 'one-device__screen';
  var _previewContainerClass = 'one-device';
  var _previewIframeId = 'preview-iframe';

  var _getMockScreen = function(adConfig) {
    var screenContainer;
    if (adConfig.preview) {
      //if viewed in the preview panel
      var previewIframe = window.top.document.getElementById(_previewIframeId);
      var previewContainer;
      if (previewIframe) {
          //if viewed in the preview panel
          previewContainer = previewIframe.contentWindow.document.getElementsByClassName(_previewContainerClass)[0];
      } else {
          //if viewed on the preview page
          previewContainer = window.top.document.getElementsByClassName(_previewContainerClass)[0];
      }

      if (previewContainer) {
          screenContainer = previewContainer.getElementsByClassName(_screenDivClass)[0];
          if (screenContainer) {
              return screenContainer;
          }
      }
    }
    return false;
  };

  var _check = function(adConfig) {
    if (_getMockScreen(adConfig)) {
      return true;
    }
    return false;
  };

  var _getMockFrame = function(adConfig) {
    var screenContainer = _getMockScreen(adConfig);
    if (screenContainer) {
      return screenContainer.querySelector('.' + _iframeClass);
    }
    return false;
  };

  module.utils.framePreviewCheck = _check;
  module.utils.getMockFrame = _getMockFrame;
  module.utils.getMockScreen = _getMockScreen;

  return module;
})(_PXL);

(function (mod) {

  var _helper = {};
  var _adhook;
  var _advert;
  var _default = {};
  var _expandSize = {
    'isFullscreen': false,
    'isScaleLayoutDimensions': false,
    'isLayoutDimensions': false
  };

  var _mainDiv;
  var _iframe;
  var _targetWindow;
  var _parent;
  var _adConfig;

  var _lastOrientation;

  var _expanded = false;

  _expanded = true;

  var _contractedHeight;
  var _contractedWidth;

  var $ccf;

  var _mockScreen; //used for adtech preview modes
  var _mockFrame; //used for adtech preview modes
  var _debugArray = [];

  mod.getHelper = function () {
    return _helper;
  }

  _helper.initialize = function (opts) {

    console.log('--------===============================>helper :: initialize');
    console.log(Date.now());
    _advert = opts.advert;
    _adhook = opts.adhook;
    _targetWindow = opts.targetWindow;
    _adConfig = opts.adConfig;
    _mockScreen = _PXL.utils.getMockScreen(_adConfig);
    _mockFrame = _PXL.utils.getMockFrame(_adConfig);

    $ccf = _PXL.module('call_crossframe');
    mod.$ccf = $ccf;
    _helper.$ccf = $ccf;

    $ccf.setAdvert(_advert);
    $ccf.setId('customAd');
    $ccf.listen();

    $ccf.addFunc('fullpageExpand', _helper.fullpageExpand);
    $ccf.addFunc('fullpageContract', _helper.fullpageContract);
    $ccf.addFunc('zTop', _helper.zTop);
    $ccf.addFunc('zBack', _helper.zBack);

    $ccf.addFunc('mraidExpand', _mraidExpand);
    $ccf.addFunc('mraidClose', _mraidClose);

    $ccf.addFunc('triggerWindowSize', _sendWindowSize);
    $ccf.addFunc('triggerWindowOrientation', _checkScreenOrientation);
    $ccf.addFunc('setExpandSize', _setExpandSize);

    _contractedHeight = _adConfig.assetContainers.main.contractedHeight;
    _contractedWidth = _adConfig.assetContainers.main.contractedWidth;

    var mainDiv = _advert.getAssetContainer('main').div;
    var parentDiv = mainDiv.parentNode; // container
    //inapp hack to address: android huff po app white border issue with banner
    if (typeof (mraid) !== "undefined") {
      parentDiv.style.left = '0px';
      parentDiv.style.top = '0px';
      parentDiv.style.position = 'absolute';
      mraid.addEventListener("sizeChange", _onMraidResize);
    } else {
      mainDiv.style.left = '0'; // needed for landscape
      if (_mockFrame) {
        // console.log('_mockFrame: ', _mockFrame);
        _mockFrame.contentWindow.addEventListener('resize', _PXL.utils.debounce.set(_onResize));
      } else {
        window.top.addEventListener('resize', _PXL.utils.debounce.set(_onResize));
      }
    }
    // clip needed for proper loading in landscape
    mainDiv.style.clip = "rect(0 " +_contractedWidth + "px " + _contractedHeight + "px 0)";
    parentDiv.style.overflow = 'hidden';

    console.log('End helper init: ' + Date.now());

    _helper.fullpageExpand();

  };

  function _mraidExpand() {
    try {
      mraid.expand();
    } catch (e) {
      console.log('--------===============================>customAd helper :: _mraidExpand error: ' + e);
    }
  }

  function _mraidClose() {
    try {
      mraid.close();
    } catch (e) {
      console.log('--------===============================>customAd helper :: _mraidClose MAY NOT BE IN MRAID ');
      var anchorDiv = _advert.getAssetContainer('main').anchorDiv;
      anchorDiv.style.display = "none";
      _advert.eventBus.dispatchEvent('myhide');
      console.log('--------===============================>customAd helper :: _mraidClose error: ' + e);
    }
  }

  function _updateFullpageSize() {
    console.log("_updateFullpageSize:_mockScreen:", _mockScreen);
    _parent.style.overflow = '';

    if (_mockScreen) {
      //hack to make the fullscreen display nicely in preview mode
      console.log("mock phone _updateFullpageSize: _mockScreen.offsetWidth", _mockScreen.offsetWidth + 'px');
      _mainDiv.style.width = _mockScreen.offsetWidth + 'px';
      _mainDiv.style.height = _mockScreen.offsetHeight + 'px';
      console.log("mock phone _updateFullpageSize: _mockScreen.offsetWidth", _mockScreen.offsetHeight + 'px');
      _iframe.style.width = _mockScreen.offsetWidth + 'px';
      _iframe.style.height = _mockScreen.offsetHeight + 'px';
    } else if (typeof (mraid) !== "undefined") {
      var mraidSizeObj = window.mraid.getCurrentPosition();
      _mainDiv.style.width = mraidSizeObj.width + 'px';
      _mainDiv.style.height = mraidSizeObj.height + 'px';
      _iframe.style.width = mraidSizeObj.width + 'px';
      _iframe.style.height = mraidSizeObj.height + 'px';
      console.log("inapp _updateFullpageSize: window.mraid.getCurrentPosition() width / height ", mraidSizeObj.width + 'px ' + mraidSizeObj.height + 'px');
    } else {
      console.log('not mock phone');
      _mainDiv.style.width = window.top.innerWidth + 'px';
      _mainDiv.style.height = window.top.innerHeight + 'px';
      //using absolute numbers here because of iOS device bugs
      _iframe.style.width = window.top.innerWidth + 'px';
      _iframe.style.height = window.top.innerHeight + 'px';
      console.log("_updateFullpageSize: window.top.innerHeight / innerWidth ", window.top.innerHeight + 'px ' + window.top.innerWidth + 'px');
    }
  }

  function _onResize() {
    console.log('onResize called');
    if ((_expandSize.isFullscreen || _expandSize.isScaleLayoutDimensions) && _expanded) {
      _updateFullpageSize();
    }
    _checkScreenOrientation();
    _sendWindowSize();
  }

  myResize = _onResize;

  function _onMraidResize() {
    console.log('_onMraidResize');
    _onResize();
  }

  function _sendWindowSize() {
    var sendHeight,
      sendWidth;

    console.log('send window size');
    console.log('_adConfig.preview', _adConfig.preview); console.log('_mockScreen', _mockScreen);

    if (_mockScreen) {
      //console.log('send mock size');
      sendWidth = _mockScreen.offsetWidth;
      sendHeight = _mockScreen.offsetHeight;
    } else if (typeof (mraid) !== "undefined") {
      console.log('send mraid size');
      var mraidSizeObj = window.mraid.getCurrentPosition();
      sendWidth = mraidSizeObj.width;
      sendHeight = mraidSizeObj.height;
    }
    else {
      //console.log('send default size');console.log('window.top.innerWidth: ', window.top.innerWidth);//console.log('window.top.innerHeight', window.top.innerHeight);
      sendWidth = window.top.innerWidth;
      sendHeight = window.top.innerHeight;
    }
    //console.log('sendWidth: ',sendWidth, ' sendHeight: ', sendHeight);
    $ccf.call('expandable', 'mainSize', sendWidth, sendHeight);
  }

  function _checkScreenOrientation() {
    var orientation,
      portraitString = 'portrait',
      landscapeString = 'landscape',
      tempHeight,
      tempWidth;

    if (_mockScreen) {
      tempWidth = _mockScreen.offsetWidth;
      tempHeight = _mockScreen.offsetHeight;
    } else if (typeof (mraid) !== "undefined") {
      var mraidSizeObj = window.mraid.getScreenSize();
      tempWidth = mraidSizeObj.width;
      tempHeight = mraidSizeObj.height;
    } else {
      tempWidth = window.top.innerWidth;
      tempHeight = window.top.innerHeight;
    }

    if ( tempWidth > tempHeight) {
      orientation = landscapeString;
    } else {
      // assume portrait when width===height
      orientation = portraitString;
    }

    if (orientation !== _lastOrientation) {
      _sendScreenOrientation(orientation);
    }
    _lastOrientation = orientation;
  }

  function _sendScreenOrientation(orientation) {
    var msg = '_sendscreenOrientation: ' + orientation;
    console.log(msg);
    _debugArray.push(msg);
    $ccf.call('expandable', 'setOrientation', orientation);
  };

  function _setExpandSize(optionsObj) {
    //console.dir(optionsObj);
    _expandSize = optionsObj;
  }

  function _getDefaultSettings() {
    console.log('get default settings');
    _mainDiv = _advert.getAssetContainer('main').div;
    _iframe = _mainDiv.childNodes[0];
    _parent = _mainDiv.parentNode;

    _default['mainStyle'] = {};
    _default['parentStyle'] = {};
    _default['windowStyle'] = {};
    _default['iframeStyle'] = {};

    if (typeof (mraid) !== 'undefined') {
      _default['mainStyle']['width'] = _contractedWidth + 'px';
      _default['mainStyle']['height'] =  _contractedHeight + 'px';
      _default['iframeStyle']['width'] = _contractedWidth + 'px';
      _default['iframeStyle']['height'] =   _contractedHeight + 'px';
      var msg = {
        "adConfig.assetContainers.main.contractedWidth": _contractedWidth,
        "adConfig.assetContainers.main.contractedHeight": _contractedHeight,
        'default in mraid called at': Date.now()
      };
      _debugArray.push(msg);
    } else {
      _default['mainStyle']['width'] = _mainDiv.style.width;
      _default['mainStyle']['height'] = _mainDiv.style.height;
      _default['iframeStyle']['width'] = _iframe.width + 'px';
      _default['iframeStyle']['height'] = _iframe.height + 'px';
      console.log('default mainDiv height: ' + _mainDiv.style.height );
      console.log('default iframe height: ' + _iframe.height );
    }
    _default['mainStyle']['position'] = _mainDiv.style.position;
    _default['mainStyle']['top'] = _mainDiv.style.top;
    _default['mainStyle']['left'] = _mainDiv.style.left;
    _default['parentStyle']['zIndex'] = _parent.style.zIndex;
    _default['parentStyle']['overflow'] = _parent.style.overflow;
    _default['windowStyle']['overflow'] = window.top.document.body.style.overflow;

    if (_mainDiv.style.clip == undefined || _mainDiv.style.clip == '') {
      console.log("MOB mainDiv.style.clip: undefined");
      _default['mainStyle']['clip'] = "rect(0px " + _default['mainStyle']['width'] + " " + _default['mainStyle']['height'] + " 0px)";
    } else {
      console.log("MOB mainDiv.style.clip: other");
      console.log("MOB mainDiv.style.clip =='' ", _mainDiv.style.clip == "");
      _default['mainStyle']['clip'] = _mainDiv.style.clip;
    }
    var someDate = Date.now();
    var helperMraid = {
      "default called at": someDate,
      "_default['iframeStyle']['width']": _default['iframeStyle']['width'],
      "_default['iframeStyle']['height']": _default['iframeStyle']['height'],
      "_default['mainStyle']['width']": _default['mainStyle']['width'],
      "_default['mainStyle']['height']":  _default['mainStyle']['height']
    };
    _debugArray.push(helperMraid);
  }

  _helper.fullpageContract = function () {
    console.log('--------===============================>helper :: fullpageContract ' +   new Date() );
    _expanded = false;
    _mainDiv.classList.remove('fullpageclip');
    _mainDiv.style.clip = _default['mainStyle']['clip'];
    try {
      var _domain = _adConfig.targetDomain;
      if((_domain.indexOf("huffpost")!= -1||(_domain.indexOf("engadget")!= -1)) && is_iOS()) {
        var x = _targetWindow.document.getElementsByClassName("advertisement mobileweb_top treated")[0];
				if(_domain.indexOf("engadget")!= -1) {
        	x = _targetWindow.document.getElementsByClassName("i-nav_drawer_slide@tp-__panel relative z-0")[0];
				}
        x.style.cssText = original_csstext_huffposthack;
      }
    } catch(e) {console.log("MOB _helper.fullpageExpand error:",e)};
    _mainDiv.style.width = _default['mainStyle']['width'];
    _mainDiv.style.height = _default['mainStyle']['height'];
    _mainDiv.style.position = _default['mainStyle']['position'];
    _mainDiv.style.top = _default['mainStyle']['top'];
    _mainDiv.style.left = _default['mainStyle']['left'];
    _parent.style.zIndex = _default['parentStyle']['zIndex'];
    _parent.style.overflow = _default['parentStyle']['overflow'];

    //HACK  for MM SDK android  have to make banner narrower then portrait view
    _parent.style.width = _parent_style_width;
    //HACK END

    window.top.document.body.style.overflow = _default['windowStyle']['overflow'];
    _iframe.style.width = _default['iframeStyle']['width'];
    _iframe.style.height = _default['iframeStyle']['height'];


    console.log('fullpageContract iframe height: ' + _default['iframeStyle']['height']);
    console.log('fullpageContract _mainDiv height: ' + _default['mainStyle']['height']);
  }

  _helper.fullpageExpand = function () {
    try {
      var _domain = _adConfig.targetDomain;
      if((_domain.indexOf("huffpost")!= -1||(_domain.indexOf("engadget")!= -1))  && is_iOS()) {
        var x = _targetWindow.document.getElementsByClassName("advertisement mobileweb_top treated")[0];
				if(_domain.indexOf("engadget")!= -1) {
        	x = _targetWindow.document.getElementsByClassName("i-nav_drawer_slide@tp-__panel relative z-0")[0];
				}
				console.log("MOB x:", x)
        original_csstext_huffposthack = x.style.cssText;
        x.style.cssText += "z-index: 555555555555555; position: fixed;";

      }
    } catch(e) {console.log("MOB _helper.fullpageExpand error:",e)};
    console.log('--------===============================>helper :: fullpageExpand');
    console.log('--------===============================>helper :: fullpageExpand win.top.w', window.top.innerWidth);
    console.log('--------===============================>helper :: fullpageExpand win.top.h', window.top.innerHeight);

    _expanded = true;

    if (typeof _mainDiv === 'undefined') {
      _getDefaultSettings();
    }
    if (typeof mraid !== 'undefined') {
      _parent.style.overflow = _default['windowStyle']['overflow'];
    }
    console.log('--------===============================>helper :: fullpageExpand part2', window.top.innerHeight);
    _mainDiv.style.position = "fixed";
    _mainDiv.style.top = "0px";
    _mainDiv.style.left = "0px";
    _parent.style.zIndex = "9999999999";
    //HACK  for MM SDK android  have to make banner narrower then portrait view
    _parent_style_width = _parent.style.width;
    _parent.style.width = "320px";
    //HACK end

    window.top.document.body.style.overflow = 'hidden';
    _mainDiv.classList.add('fullpageclip');

    console.log('--------===============================>helper :: fullpageExpand part3', window.top.innerHeight);
    _updateFullpageSize();

    console.log('--------===============================>helper :: fullpageExpand part4', window.top.innerHeight);

  }

  _helper.zTop = function () {
    console.log('--------===============================>helper :: zTop');
    //set the ad z index to top most on the publisher's page
    if (typeof _mainDiv === 'undefined') {
      _getDefaultSettings();
    }
    _parent.style.zIndex = "9999999999";
  };

  _helper.zBack = function () {
    //set the ad z index back to default
    _parent.style.zIndex = _default['parentStyle']['zIndex'];
  };

  _helper.debug = function() {
    console.log(_debugArray);
    // use with $helper.debug()
  };

  _helper.coreLoadedEvent = function() {
    // console.log('$helper: run some core loaded func');
  };

})(_PXL.module('customAd_helper'));

(function(adConfig) {
  myAdConfig = adConfig;

  // RMJS-ALT
  var kvLat = '_ADDCP(lat:x)_';
  var kvLong = '_ADDCP(long:y)_';
  adConfig.geoData = adConfig.geoData || {};
  adConfig.geoData.kvLat = kvLat;
  adConfig.geoData.kvLong = kvLong;
  adConfig.pageUrlData = { localDoc: document.location };
  if( window.parent && window.parent.document.location ) adConfig.pageUrlData.parentDoc = window.parent.document.location;
  // END RMJS-ALT

  adConfig.overrides = adConfig.overrides || {};
  adConfig.overrides["engagementThreshold"] = 3000;
  adConfig.assetContainers.main.isMultiDirectionalExpand = true;

  var requiresBreakout = false;
  if (!adConfig.overrides || adConfig.overrides.displayWindowTarget != self) {
    for (var id in adConfig.assetContainers) {
      if (adConfig.assetContainers.hasOwnProperty(id)) {
        var container = adConfig.assetContainers[id];
        if (container.type != 'inlineDiv' || container.isExpandable) {
          requiresBreakout = true;
          break;
        }
      }
    }
  }

  if (adConfig.overrides && adConfig.overrides.displayWindowTarget) {
    var displayWindowTarget = adConfig.overrides.displayWindowTarget;
    displayWindowTarget = (typeof adtechIframeHashArray != 'undefined' && self != top) ?
        displayWindowTarget.parent : displayWindowTarget;
  } else {
    var calculatedTarget = null;
    var currentWindow = parent;
    while (currentWindow != undefined) {
      try {
        var targetDoc = currentWindow.document;
        if (targetDoc) {
          calculatedTarget = currentWindow;
        }
      } catch(e) {}
      currentWindow = (currentWindow == top) ? null : currentWindow.parent;
    }
    var displayWindowTarget = calculatedTarget || top;
  }

  var targetIsFriendly = false;
  try {
    var targetDoc = displayWindowTarget.document;
    if (targetDoc) {
      targetIsFriendly = true;
    }
  } catch(e) {}

  var targetWindow = (requiresBreakout && (self != top && targetIsFriendly)) ?
          displayWindowTarget : self;

  targetWindow.com = targetWindow.com || {};
  targetWindow.com.adtech = targetWindow.com.adtech || {};
  var theCurrentDomain = targetWindow.location.host.toLowerCase();
  console.log("theCurrentDomain:",theCurrentDomain);
  adConfig.targetDomain = "unknown";
  try {
    adConfig.targetDomain = targetWindow.location.hostname
  } catch(e){};

  if(theCurrentDomain.indexOf("aol.com") > -1  ) {
    // this hack is to set the zIndex to go under the top Menubar on AOL
    //AOL changes their site often so can be removed in the future if not needed or breaks things

    var main = adConfig.assetContainers.main;
    if(main.zIndex > 999) adConfig.assetContainers.main.zIndex = 999;
  }

  if (_PXL.utils.framePreviewCheck(adConfig)) {
    // Custom CSS overrides
    var target = targetWindow.document;
    var scrollCSS = '::-webkit-scrollbar {display: none; width: 0;}';
    scrollCSS += '* {-webkit-overflow-scrolling: touch;}';
    var targetHead = target.head;
    var newPreviewStyle = target.createElement('style');
    newPreviewStyle.id = 'scrollbar-buster-hack';
    newPreviewStyle.appendChild(target.createTextNode(scrollCSS));
    targetHead.append(newPreviewStyle);
  };

  /*
  ====================================================================
  BEGIN baking in mraid
  ====================================================================
  */

  //global vars needed, used in other closures
  parentViewport = null;
  setViewport = null;

  is_iOS =  function() {
      return navigator.userAgent.match(/like Mac OS X/i);
  };
  is_Android_4 = function() {
      return navigator.userAgent.match(/Android 4/i);
  };
  is_Android_4_4_2 = function() {
      return navigator.userAgent.match(/Android 4.4.2/i);
  };
  is_Android = function() {
      return navigator.userAgent.match(/Android/i);
  };

  //global vars needed, used in other closures
  myMraid = false
  myMraidVersion = '-1.0';

  if (typeof(mraid) != "undefined") {
      myMraid = true;
      myMraidVersion = window.mraid.getVersion();

      // fix non clickable area bug on iOS
      // if (is_iOS()) {
      //     adConfig.assetContainers.main.contentHeight = 500;
      // }
      // this was breaking new simp expandable
  }

  console.log("adConfig_assetContainers", adConfig.assetContainers["float"]);
  if(adConfig.assetContainers) {
      console.log("adConfig.assetContainers", adConfig.assetContainers);
      if(adConfig.assetContainers["float"]) {
         console.log("adConfig_assetContainers_float", adConfig.assetContainers["float"]);
         if(is_Android_4_4_2() && myMraid) {
          adConfig.assetContainers["float"].renderEvent = "serve";
         }
      }
  }

  //console.log("myMraid",myMraid, window.mraid);
  var requiresBreakout = true;
  if (!adConfig.overrides || adConfig.overrides.displayWindowTarget != self) {
      for (var id in adConfig.assetContainers) {
          if (adConfig.assetContainers.hasOwnProperty(id)) {
              var container = adConfig.assetContainers[id];
              if (container.type != 'inlineDiv' || container.isExpandable) {
                  requiresBreakout = true;
                  break;
              }
          }
      }
  }

  if (adConfig.overrides && adConfig.overrides.displayWindowTarget) {
      var displayWindowTarget = adConfig.overrides.displayWindowTarget;
      displayWindowTarget = (typeof adtechIframeHashArray != 'undefined' && self != top) ?
      displayWindowTarget.parent : displayWindowTarget;
  } else {
      var calculatedTarget = null;
      var currentWindow = parent;
      while (currentWindow != undefined) {
          try {
              var targetDoc = currentWindow.document;
              if (targetDoc) {
                  calculatedTarget = currentWindow;
              }
          } catch (e) {}
          currentWindow = (currentWindow == top) ? null : currentWindow.parent;
      }
      var displayWindowTarget = calculatedTarget || top;
  }

  var targetIsFriendly = false;
  try {
      var targetDoc = displayWindowTarget.document;
      if (targetDoc) {
          targetIsFriendly = true;
      }
  } catch (e) {}

  var targetWindow = (requiresBreakout && (self != top && targetIsFriendly)) ?
  displayWindowTarget : self;

  targetWindow.com = targetWindow.com || {};
  targetWindow.com.adtech = targetWindow.com.adtech || {};

  var _AdSettings = adConfig['contentProperties']["AdSettings"];
  if(_AdSettings["Enable Weinre"] == true){
      injectWeine(_AdSettings["Weinre Key"],"customAd", targetWindow);
  }

  //assign viewport value
  if (is_iOS() || is_Android()) {
      var viewport = targetWindow.document.querySelector('meta[name=viewport]');
      if (viewport === null){
          var head = document.getElementsByTagName('head')[0];
          viewport = document.createElement('meta');
          viewport.setAttribute('name', 'viewport');
          head.appendChild(viewport);
          parentViewport = "";
          setViewport = "user-scalable=no";
      }else{
          parentViewport = targetWindow.document.querySelector("meta[name=viewport]").getAttribute("content");
          setViewport = parentViewport + ", user-scalable=no";
      }
  }

  /*
  ====================================================================
  END baking in mraid
  ====================================================================
  */

  targetWindow.com.adtech.AdtechCustomAd$AD_ID$ = function() {
    // Custom code class constructor.
  };

  targetWindow.com.adtech.AdtechCustomAd$AD_ID$.prototype = {
    /**
     * mraid error override
     */
     		 preInit: function(advert) {
     			 if(myMraid) {
     				 targetWindow.document.body.style.margin = 0;
     				 // PP-6477 temp fix for millennial media sdk 4.x on android which throws fatal error using our own close button
     				 // to be fixed premanently in a future rmlib release
     				 targetWindow.com.adtech.AdManagerMRAID_$VERSION$.prototype.MRAIDErrorHandler = function(message, action) {
     					 return;
     				 };

     				mraid.addEventListener('stateChange',function(event){
               console.log('++++++++++++++++++++++++++++++++>mraid stateChange',event);
     			});
     				try{
     					// another hack around the hack of a project MMSDK.
     					// the SDK reports incorrect sizes the interstials for the first couple seconds after mraid READY

     					mraid.addEventListener("ready", function() {
     						myMraidLog += " Ready        "
     						myResize();
     						myMraidLog += " Ready  after resize";
     						setTimeout(function(){   
     						   myMraidLog += " Timeout Ready        "
     						   myResize();
     						   myMraidLog += " Timeout Ready  after resize";
     					   },1000); 
     					   setTimeout(function(){   
     						   myMraidLog += " Timeout Ready        "
     						   myResize();
     						   myMraidLog += " Timeout Ready  after resize";
     					   },2000);
     					   setTimeout(function(){   
     						   myMraidLog += " Timeout Ready        "
     						   myResize();
     						   myMraidLog += " Timeout Ready  after resize";
     					   },3000);
     				   });
     				} catch(e){}; 
     			 }
     		 },

    /**
     * Entry point method.
     *
     * Automatically invoked by the rich media library when the library API is
     * available to use, and the Advert instance has been instantiated.
     */
    init: function(advert) {
      console.log("init start");
      if (!advert.richView) {
        // The backup client can not render the rich version of the advert.
        return;
      }
      this.advert = advert;
      targetWindow.myAdvert = this.advert;
      myadHook = this;

      // A few useful things to help you get started. Please delete as necessary!
      this.utils = targetWindow.com.adtech.Utils_$VERSION$;
      this.globalEventBus = targetWindow.adtechAdManager_$VERSION$.globalEventBus;
      this.richMediaEvent = targetWindow.com.adtech.RichMediaEvent_$VERSION$;
      try {
        //allowing fullscreen in browsers
        window.frameElement.setAttribute("allowfullscreen", "true");
        window.frameElement.setAttribute("mozallowfullscreen","true");
        window.frameElement.setAttribute("webkitallowfullscreen","true");
      } catch(e) {
        console.log("force fullscreen fail");
      };

      // advert.eventBus.addEventListener('show',
      //     this.utils.createClosure(this, this.showHandler));
      advert.eventBus.addEventListener('hide',
          this.utils.createClosure(this, this.hideHandler));
      advert.eventBus.addEventListener('mraidOpen',
          this.utils.createClosure(this, this.mraidOpen));
      advert.eventBus.addEventListener('injectNativeHtml',
          this.utils.createClosure(this, this.injectNativeHtmlEventHandler));
      advert.eventBus.addEventListener('hideAddressBar',
          this.utils.createClosure(this, this.hideAddressBar));
      advert.eventBus.addEventListener('mraidEval',
          this.utils.createClosure(this, this.mraidEval));

      /*
       *This is how you listen for your custom events.
       * ADTECH.close() is actually just an alias of ADTECH.event('close').
       */
      advert.eventBus.addEventListener('close', this.utils.createClosure(this, this.closeHandler));

      advert.eventBus.addEventListener('coreLoaded', this.utils.createClosure(this, this.coreLoaded));


     	if (this.globalEventBus.pageLoaded) {
      	this.pageLoadHandler();
      } else {
      	this.globalEventBus.addEventListener(this.richMediaEvent.PAGE_LOAD,
        this.utils.createClosure(this, this.pageLoadHandler));
      }

      $helper = _PXL.module('customAd_helper').getHelper();
      $helper.initialize({
        'adhook':this,
        'advert':this.advert,
        'adConfig':adConfig,
        'targetWindow':targetWindow
      });

      this.negateClipping();

      this.setupMmjsHandler();

      console.log("customAd init end");
    },
    /*********************************************************
     *
     * Create your instance methods below.
     *
     * Please remember not to add a trailing comma to you last
     * method - IE will not like that!
     *
     *********************************************************/

    /*
      * Handles MMJS postMessage dispatched from ad and then calls relevant MM SDK API
      */
    setupMmjsHandler: function() {
      var CMD_TYPE_MMJS = 'CMD_MMJS';
      var _this = this;
      if (typeof targetWindow.MMJS != 'undefined') {
        targetWindow.addEventListener('message', function(evt) {
          var data = {};
          try {
            data = JSON.parse(evt.data);
          } catch (e) {
            return;
          }
          if (data.cmd && data.cmd == CMD_TYPE_MMJS) {
            var msg = data.msg;
            var params = Object.keys(msg.params).map(function(k) {
              return msg.params[k]
            });
            for (var i = 0, len = params.length; i < len; i++) {
              if (params[i].callbackId) {
                params[i] = wrapper(params[i].callbackId);
              }
            }
            callMMJS(msg.method, params);
          }
        });
      }

      function wrapper(id) {
        return function() {
          var params = Array.prototype.slice.call(arguments);
          var messageObj = {
            cmd: CMD_TYPE_MMJS,
            msg: {
              callbackId: id,
              params: params
            }
          };
          var messageStr = JSON.stringify(messageObj);
          _this.advert.getAssetContainer('main').content.sendMessage(messageStr);
        };
      }

      function callMMJS(method, params) {
        method.split('.').reduce(index, targetWindow.MMJS).apply(this, params);
      }

      function index(obj,i) {
        return obj[i];
      }
    },
    negateClipping: function() {
      //this adds a style to negate clipping. old way of getting default values
      //and writing them to style obj doesn't always work
      var styleNode = document.createElement('style');
      styleNode.type = "text/css";
      var clipStyle = '.fullpageclip {clip: auto !important;}';
      var styleText = document.createTextNode(clipStyle);
      styleNode.appendChild(styleText);
      targetWindow.document.getElementsByTagName('head')[0].appendChild(styleNode);
    },

    specialEventHandler: function(event) {
      this.advert.thirdPartyPixelLog(event.meta.link);
    },
    closeHandler: function() {
      /*
       * This will get invoked when the close event has been dispatched by any one
       * of your ad units.
       */
    },
    coreLoaded: function() {
      // Core can listen for events from customAd now.
      if ($helper) {$helper.coreLoadedEvent();}
    },
    pageLoadHandler: function() {
      // The page has now loaded. Feel free to display an awesome advert.
			var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
			this.assignOrientationChangeHandler();
			if (iOS) {
				var self = this;
				var evtBus = this.advert.eventBus;
				
				targetWindow.addEventListener('deviceorientation', function(eventData) {
						var deviceOrientationEvent = new self.richMediaEvent('proxyDeviceOrientation');
						deviceOrientationEvent.meta = {gamma:eventData.gamma, beta: eventData.beta, alpha: eventData.alpha, absolute: eventData.absolute, timeStamp: eventData.timeStamp};
						evtBus.dispatchEvent(deviceOrientationEvent);
					}, false);
				setTimeout(function() {
					self.onOrientationChange();
				}, 1000);
			}
    }, 
		assignOrientationChangeHandler: function() {
			var supportsOrientationChange = "onorientationchange" in window;
      var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
			var _this = this;
      targetWindow.addEventListener(orientationEvent, function() {
        _this.onOrientationChange();
      }, false);
		},
		
		onOrientationChange:function(){
      var floatContainer= this.advert.getAssetContainer('main');
			var viewportDims = this.utils.getViewportDims(this.advert.renderingInFiF);
			var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
			var selectedW = viewportDims.w;
			var selectedH = viewportDims.h;
			if (iOS) {
				selectedW = targetWindow.innerWidth;
				selectedH = targetWindow.innerHeight;
				if (selectedH < 400) { // landscape mobile iOS
					selectedH = targetWindow.innerHeight - 30;
				}
			}
			
			floatContainer.div.style.height = selectedH + 'px';
			floatContainer.div.style.width = selectedW + 'px';
			floatContainer.div.style.clip = 'auto';
			floatContainer.div.children[0].style.height = selectedH + 'px';
			floatContainer.div.children[0].style.width = selectedW + 'px';
			floatContainer.div.children[0].height = selectedH + 'px';
			floatContainer.div.children[0].width = selectedW + 'px';
			// alert(window.scrollY);
			// alert(targetWindow.scrollY);
			setTimeout(function() {
				targetWindow.scrollTo(0, 0);
				window.scrollTo(0, 0);
				//alert('HEWR');
			}, 2300);
			targetWindow.scrollTo(1, 1);
			window.scrollTo(1, 1);
		},
		
		setOrientation: function() {
      var ua = navigator.userAgent.toLowerCase();
      var isAndroid = ua.indexOf('android') > -1;
      if (isAndroid) {
        var elem = targetWindow.document.documentElement;
        if (elem.clientWidth / elem.clientHeight < 1.1) {
          this.winOrientation = this.ORIENTATION_PORTRAIT
        } else {
          this.winOrientation = this.ORIENTATION_LANDSCAPE;
        }
      } else {
        if (targetWindow.orientation === 90 || targetWindow.orientation === -90) {
          this.winOrientation = this.ORIENTATION_LANDSCAPE;
        } else if (targetWindow.orientation == 0 || targetWindow.orientation === 180) {
          this.winOrientation = this.ORIENTATION_PORTRAIT;
        }          
      }
    },
    /*
    ====================================================================
    BEGIN baking in mraid
    ====================================================================*/


    mraidEval: function(event) {
        eval(event.meta.lave); // what is this???
    },

    mraidExpand: function(event) {

    },

    justDidShow: false,

    clearJustDidShow:function() {
       this.justDidShow = false;
    },

    mraidOpen  : function() {
        try {
            console.log("mraidOpen myMraid" + myMraid);
        } catch(e){};
        try {
            console.log("mraidOpen this.justDidShow", this.justDidShow);
        } catch(e){};
        try {
            console.log("mraidOpen justDidShow" , justDidShow);
        } catch(e){};
        if (myMraid && mraid.getState() == "default") {
          mraid.expand();
      }
    },

    showHandler: function() {
        console.log('showHandler');
        this.justDidShow = true;
        setTimeout(this.utils.createClosure(this, this.clearJustDidShow), 1000);
        console.log("showHandler myMraid" + myMraid);
        if (myMraid) {
          // mraid.addEventListener("orientationChange", function(orientation) {
          //   console.log("orientation", orientation, orientation.orientation);
          // });
          // mraid.addEventListener("sizeChange", function(obj) {
          //     console.log("sizeChange w:" + obj.width +"  h:" + obj.height);
          // });
          // console.log("special ShowHandler");
          var anchorDiv = this.advert.getAssetContainer('main').anchorDiv;
          var main_div = this.advert.getAssetContainer('main').div;
          var main_iframe = anchorDiv.getElementsByTagName('iframe')[0];
          anchorDiv.parentNode.style.height = "100%";
          anchorDiv.style.height = "100%";
          main_div.style.height = "100%";
          main_iframe.style.height = "100%";
        } else {
          if (is_iOS() || is_Android()) {
            //set parent container to no scalable on mobile web
            targetWindow.document.querySelector("meta[name=viewport]").setAttribute("content", setViewport);
          }
        }
        this.hiddenMOB = false;
        console.log('this.hiddenMOB = false');
    },

    hideHandler: function() {
      try {
         if (myMraid) {
           var mraidTempState = mraid.getState();
           console.log(mraidTempState);
              if (mraidTempState !== 'default') {
                console.log('calling mraid close second time');
                mraid.close();
              }
          } else {
              console.log('myMraid else: ' + myMraid);
              if (is_iOS() || is_Android()) {
                  //set parent container back to the default viewport on mobile web
                  targetWindow.document.querySelector("meta[name=viewport]").setAttribute("content", parentViewport);
                  // dont know why we still need this - Trex 7/10/17
              }
          }
          this.advert.eventBus.dispatchEvent('myhide');
          this.hiddenMOB = true;
      } catch(e) {
        console.log('hideHandler errors:');
        console.log(e)
      }

    },

    hideAddressBar: function() {
        f_div = this.advert.getAssetContainer('float').div;
        f_iframe = f_div.getElementsByTagName('iframe')[0];
        try {
            top.window.scrollTo(0, top.window.pageYOffset - 1);
            top.window.scrollTo(0, top.window.pageYOffset + 1);
            f_div.style.zIndex = 2147483647;
        } catch (e) {
            //console.log("hideAddressBar FAILed",e);
        };
    },
    injectNativeHtmlEventHandler: function(event) {

        console.log("injectNativeHtmlEventHandler:", event.meta.html);
        var rand = "_" + Math.floor(Math.random() * 20000);
        event.meta.html = event.meta.html.split('_KEY_key').join(rand);
        var newElement = targetWindow.document.createElement("span");
        newElement.className = "apx-sponsoredmodule";

        newElement.innerHTML = event.meta.html;
        var anchorDiv = this.advert.getAssetContainer('main').anchorDiv;
        anchorDiv.style.height = "0px";
        anchorDiv.style.overflow = "hidden";
        if (top.document != document) {
            try {
                //window.frameElement.style.height = 0;
            } catch (e) {};
        }
        var advertParent = this.advert.getAssetContainer('main').anchorDiv.parentNode;
        advertParent.insertBefore(newElement, advertParent.firstChild);
        var comment = targetWindow.document.createComment("*\nO&O - Text - Sponsored Module (320x115)\n*");
        advertParent.insertBefore(comment, advertParent.firstChild);
        var mythis = this;
        var textAnchor = targetWindow.document.getElementById("bodylink" + rand);
        var imageAnchor = targetWindow.document.getElementById("imagelink" + rand);
        console.log("injectNativeHtmlEventHandlerPert2:", "bodylink" + rand, textAnchor, "imagelink" + rand, imageAnchor, document);
        console.log("injectNativeHtmlEventHandlerPert2:", document == top.document);
        imageAnchor.addEventListener("click", function(e) {
            mythis.imageClicked(mythis);
            e.preventDefault();
        },
        false);
        textAnchor.addEventListener("click", function(e) {
            mythis.textClicked(mythis);
            e.preventDefault();
        },
        false);
    },

    injectNativeHtmlEventHandlerPart2: function(mythis, rand) {

        console.log("injectNativeHtmlEventHandlerPert2:", mythis, rand);

    },

    imageClicked: function(mythis) {
        console.log("imageClicked customAd");
        mythis.advert.eventBus.dispatchEvent('nativeImageClicked');
    },

    textClicked: function(mythis) {
        console.log("textClicked customAd");
        mythis.advert.eventBus.dispatchEvent('nativeTextClicked');
    },

    FakeFunctionEventGen: function() {
        ADTECH.event("nativeImageClicked");
        ADTECH.event("nativeTextClicked");
        ADTECH.event("forcehide");
        ADTECH.event("mraidhide");
        ADTECH.event("boskihide");
    },


    /*
    ====================================================================
    END baking in mraid
    ====================================================================*/

  };

  targetWindow.adtechCallbackInstances = targetWindow.adtechCallbackInstances || [];
  var instanceIndex = targetWindow.adtechCallbackInstances.length;
  targetWindow.adtechCallbackInstances[instanceIndex] =
      new targetWindow.com.adtech.AdtechCustomAd$AD_ID$();

  targetWindow.adtechAdCallbacks = targetWindow.adtechAdCallbacks || {};
  targetWindow.adtechAdCallbacks[adConfig.adServerVars.uid] =
      targetWindow.adtechAdCallbacks[adConfig.adServerVars.uid] || [];
  targetWindow.adtechAdCallbacks[adConfig.adServerVars.uid].push(
      targetWindow.adtechCallbackInstances[instanceIndex]);
})(adtechAdConfig);