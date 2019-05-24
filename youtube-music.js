'use strict';

var INFO =
[
    "plugin",
    {
        name: "youtube-music", version: "0.1",
        href: "http://github.com/amacfie/penta-youtube-music",
        summary: "Add commands to control YouTube Music",
        xmlns: "dactyl"
    },
    ["author", { email: "amacfie@sent.com" }, "Andrew MacFie"],
    ["license", { href: "http://opensource.org/licenses/mit-license.php" }, "MIT"],
    ["project", { name: "Pentadactyl", "min-version": "1.0" }],
    [
        "p", {},
        "This plugin provides commands for controlling a YouTube Music player in any tab.",
        ["item", {},
            ["spec", {}, ":mpl"],
            ["description", {}, "Play"]
        ],
        ["item", {},
            ["spec", {}, ":mpa"],
            ["description", {}, "Pause"]
        ],
        ["item", {},
            ["spec", {}, ":mn"],
            ["description", {}, "Next"]
        ],
        ["item", {},
            ["spec", {}, ":mp"],
            ["description", {}, "Previous"]
        ],
        ["item", {},
            ["spec", {}, ":ml"],
            ["description", {}, "Like"]
        ],
        ["item", {},
            ["spec", {}, ":md"],
            ["description", {}, "Dislike"]
        ]
    ]
];

(function () {
  var debug = false;

  if (debug) {
    //console is the browser console
    //https://developer.mozilla.org/en-US/docs/Tools/Browser_Console
    console.log('Loaded');
  }

  var runScript = function(source) {
    var s = Services.wm.getEnumerator('navigator:browser');
    while (s.hasMoreElements()) {
      var tabs = s.getNext().gBrowser.browsers;
      tabs.some(function (tab) {
        var d = tab.contentDocument;
        if (d.location.href.includes('music.youtube.com')) {
          var s = d.createElement('script');
          s.innerHTML = source;
          d.body.appendChild(s);
          return true;
        }
      });
    }
  };

  group.commands.add(
    ['mpl'],
    'Play (YouTube Music)',
    function () {
      var source = `
        document.getElementById('movie_player').playVideo();
      `;
      runScript(source);
    }
  );
  group.commands.add(
    ['mpa'],
    'Pause (YouTube Music)',
    function () {
      var source = `
        document.getElementById('movie_player').pauseVideo();
      `;
      runScript(source);
    }
  );
  group.commands.add(
    ['mn'],
    'Next song (YouTube Music)',
    function () {
      var source = `
        document.getElementById('movie_player').nextVideo();
      `;
      runScript(source);
    }
  );
  group.commands.add(
    ['mp'],
    'Previous soung (YouTube Music)',
    function () {
      var source = `
        document.getElementById('movie_player').previousVideo();
      `;
      runScript(source);
    }
  );
  group.commands.add(
    ['ml'],
    'Like song (YouTube Music)',
    function () {
      var source = `
        var e = document.createEvent('MouseEvents');
        e.initMouseEvent(
          'click', true, true, window, 0, 0, 0, 0, 0, false, false, false,
          false, 0, null);
        document.getElementsByClassName('like')[0].dispatchEvent(e);
      `;
      runScript(source);
    }
  );
  group.commands.add(
    ['md'],
    'Dislike song (YouTube Music)',
    function () {
      var source = `
        var e = document.createEvent('MouseEvents');
        e.initMouseEvent(
          'click', true, true, window, 0, 0, 0, 0, 0, false, false, false,
          false, 0, null);
        document.getElementsByClassName('dislike')[0].dispatchEvent(e);
      `;
      runScript(source);
    }
  );

})();

