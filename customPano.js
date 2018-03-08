ADTECH.require(['SmartVideoPlayer'], init);

var _settings;
var _popups;
var _videoPlayers = [];
var baseurl;
var videoUrl;
var mp3url;
var jsurl;
var gyrourl;
var VIDEO_LENGTH = 25000;
var quarter = 0;
var quartileTimer;
var paused = false;

var config = {
  xml: null,
  target: 'pano',
  html5: 'only',
  mobilescale: 1,
  localfallback: 'none'
};

window.pano = {
  needTouch: function() {},
  gotTouch: function() {},
  loaded: function() {},
  play: function() {
    quartileTracking();
  },
  pause: function() {},
  complete: function() {
    document.getElementById('replay').style.display = 'block';
  },
  onerror: function() {},
  pan: function() {
    ADTECH.event('360: Pan');
    if (paused) {
      videoPlay();
    }
  },
  gyrounavailable: function() {}
};

function init() {
  window.addEventListener('touchmove', function onTouchMove(e) {
    e.preventDefault();
  });
  baseURL = String(ADTECH.getFileUrl('krpano.js')).replace('krpano.js', '');
  jsurl = baseURL + 'videoplayer.js';
  gyrourl = baseURL + 'gyro.js';

  config.onready = self.krpanoReady;
  document.getElementById('threeSixty').innerHTML =
    '<div id="pano"style="width:100%;height:100%;"></div>';
  embedpano(config);

  // ADTECH.event('proxyDeviceOrientation');
  // ADTECH.event('proxyDeviceMotion');
  ADTECH.addEventListener(
    'proxyDeviceOrientation',
    proxyDeviceOrientationHandler
  );
  ADTECH.addEventListener('proxyDeviceMotion', proxyDeviceMotionHandler);

  _settings = ADTECH.getContent(
    '360 Pano: Popups',
    '[{"image":"echo_overlay.png", "url":"http://www.vivint.com/"},{"image":"huffpostPopup.png", "url":"https://www.oath.com/brands/huffpost/"},{"image":"panel_overlay.png", "url":"http://www.vivint.com/"},{"image":"nest_overlay.png", "url":"http://www.vivint.com/"}]'
  );
  _popups = document.getElementsByClassName('popup');

  Array.prototype.forEach.call(_popups, setupPopup);
}

function setupPopup(item, index) {
  //insert background image
  item.setAttribute('index', index);
  item.style.backgroundImage = 'url(' + _settings[index].image + ')';

  //create player
  // var videoContainer = document.createElement('div');
  // item.appendChild(videoContainer);
  // videoContainer.id = 'video-' + index;
  // videoContainer.className = 'video';
  // _videoPlayers[index] = ADTECH.modules.SmartVideoPlayer.createPlayer({
  //   container: videoContainer.id,
  //   width: videoContainer.offsetWidth,
  //   height: videoContainer.offsetHeight,
  //   content: '360 Pano: Popups',
  //   contentItem: _settings[index],
  //   poster: _settings[index].poster,
  //   src: {
  //     mp4: _settings[index].video
  //   },
  //   autoplay: false
  // });

  // ADD INTRO OVERLAY HERE!!
  item.style.display = 'none';

  item.getElementsByClassName('close')[0].addEventListener('click', function() {
    hidePopup(item, index);
  });
  item
    .getElementsByClassName('popupClick')[0]
    .addEventListener('click', function() {
      handlePopupClickthrough(item, index);
    });
}

function proxyDeviceOrientationHandler(event) {
  var deviceEvent = event.meta;
  var event = new Event('deviceorientation');
  event.absolute = deviceEvent.absolute;
  event.gamma = deviceEvent.gamma;
  event.beta = deviceEvent.beta;
  event.alpha = deviceEvent.alpha;
  event.timeStamp = deviceEvent.timeStamp;
  window.dispatchEvent(event);
}

function proxyDeviceMotionHandler(event) {
  return;
  var deviceEvent = event.meta;
  var event = new Event('devicemotion');
  event.acceleration = deviceEvent.acceleration;
  event.accelerationIncludingGravity = deviceEvent.accelerationIncludingGravity;
  event.rotationRate = deviceEvent.rotationRate;
  window.dispatchEvent(event);
}

function krpanoReady(krpano) {
  window.krpano = krpano;
  var baseURL = String(ADTECH.getFileUrl('krpano.js')).replace('krpano.js', '');
  var xml =
    '<krpano basedir="' +
    baseURL +
    '/">' +
    '<plugin ' +
    'name="gyro" ' +
    'devices="html5" ' +
    'keep="true" ' +
    'url="' +
    gyrourl +
    '" ' +
    'enabled="true" ' +
    'camroll="true" ' +
    'friction="0.0" ' +
    'touch_mode="full" ' +
    'sensor_mode="1" ' +
    'autocalibration="false" ' +
    'onunavailable="js(pano.gyrounavailable())" ' +
    '/>' +
    '<events onenterfullscreen="" onmouseup="js(pano.pan())"/>' +
    '<image>' +
    '<cube url="pano_%s.jpg" />' +
    '</image>' +
    // '<hotspot onclick="js(handleClickthrough())" distort="true" enabled="true" handcursor="true" name="cta1" borderwidth="0" fillcolor="0x000000" fillalpha="0">' +
    // '<point ath="85" atv="135" />' +
    // '<point ath="-85" atv="135" />' +
    // '<point ath="80" atv="45" />' +
    // '<point ath="-80" atv="45" />' +
    // '</hotspot>' +
    '<hotspot onclick="js(handleClickthrough())" distort="true" enabled="true" handcursor="true" name="cta2" borderwidth="1" fillcolor="0x000000" fillalpha="0">' +
    '<point ath="-20" atv="-110" />' +
    '<point ath="50" atv="-105" />' +
    '<point ath="-30" atv="-70" />' +
    '<point ath="20" atv="-70" />' +
    '</hotspot>' +
    '<hotspot onclick="js(showPopup(0))" distort="false" enabled="true" handcursor="true" name="spot1" borderwidth="1" fillcolor="0x000000" fillalpha="0">' +
    '<point ath="-102" atv="-6" />' +
    '<point ath="-86" atv="-6" />' +
    '<point ath="-86" atv="10" />' +
    '<point ath="-102" atv="10" />' +
    '</hotspot>' +
    '<hotspot onclick="js(showPopup(2))" distort="false" enabled="true" handcursor="true" name="spot2" borderwidth="1" fillcolor="0x000000" fillalpha="0">' +
    '<point ath="60" atv="-17" />' +
    '<point ath="80" atv="-17" />' +
    '<point ath="80" atv="4" />' +
    '<point ath="60" atv="4" />' +
    '</hotspot>' +
    '<hotspot onclick="js(showPopup(3))" distort="false" enabled="true" handcursor="true" name="spot3" borderwidth="1" fillcolor="0x000000" fillalpha="0">' +
    '<point ath="155" atv="-11" />' +
    '<point ath="167" atv="-11" />' +
    '<point ath="167" atv="2" />' +
    '<point ath="155" atv="2" />' +
    '</hotspot>' +
    '<hotspot onclick="js(showPopup(1))" distort="false" enabled="true" handcursor="true" name="spot4" borderwidth="1" fillcolor="0x000000" fillalpha="0">' +
    '<point ath="193" atv="-20" />' +
    '<point ath="228" atv="-20" />' +
    '<point ath="228" atv="20" />' +
    '<point ath="193" atv="20" />' +
    '</hotspot>' +
    '<control ' +
    'touchzoom="false" ' +
    'mousefovchange="0.0" ' +
    '/>' +
    '</krpano>';
  krpano.call('loadxml(' + xml + ');');
}

function showPopup(id) {
  popup = document.getElementById(String('popup-' + String(id)));
  popup.style.display = 'block';
  ADTECH.contentEvent('360 Pano: Popups', 'Show', _settings[Number(id)]);
}

function hidePopup(popup, id) {
  popup.style.display = 'none';
  ADTECH.contentEvent('360 Pano: Popups', 'Hide', _settings[Number(id)]);
}

function handleClickthrough(popup) {
  ADTECH.click('Logo', 'http://www.vivint.com');
}

function handlePopupClickthrough(popup, id) {
  ADTECH.contentClick('360 Pano: Popups', 'url', _settings[id]);
}
