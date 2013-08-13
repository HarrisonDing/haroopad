var gui = require('nw.gui'),
    win = gui.Window.get();

window.parent = win.parent;

//fixed text.js error on node-webkit
require.nodeRequire = require;

/**
 * require.js 환경 설정
 */
requirejs.config({
  baseUrl: 'js/preferences',
  waitSeconds: 30,
  locale: 'ko-kr',
  paths: {
    // tpl: '../../tpl',
    vendors: '../vendors',
    store: '../vendors/store',
    keyboard: '../vendors/keymage'
  },
  config: {
    text: {
      env: 'xhr'
    }
  }
});

requirejs.onError = function (e) {
  alert('Oops! preferences is crash :-(');
};

requirejs([
    'keyboard',
    'tabs/General',
    'tabs/Editor',
    'tabs/Viewer',
    'tabs/Code',
    'tabs/Markdown',
    'tabs/Helper',
    'tabs/About'
  ], function(HotKey, General, Editor, Viewer, Code, Markdown, Helper, About) {

    $('.switch').bootstrapSwitch();
    
    HotKey('esc', function() {
      win.close();
    });

    win.show();
    win.focus();
});