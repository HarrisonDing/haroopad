define([
		// 'core/Plugins'
	], 
	function(/*Plugins*/) {

		var marked = require('marked');
		var renderer = new marked.Renderer();

       	// var loading = '<span class="spinner"></span>';

		// renderer.plugin = function(name, args) {
		// 	var plugin = Plugins[name.toLowerCase()];

		// 	if (!plugin) {
  // 				return '<p>['+ name +':'+ args +']</p>';
		// 	}
			
		// 	return plugin(name, args);
		// }

		renderer.oembed = function(caption, href, props) {
			var key, value, link, tmp = {};

			if (!href) {
				return '';
			}

			props = !props ? '' : props ;

			if (props) {
				props = props.split(';');
				props.forEach(function(prop) {
					prop = prop.split(':');

					if (prop[0] && prop[1]) {
						tmp[prop[0].trim()] = prop[1].trim();
					}
				});
				props = JSON.stringify(tmp);
				props = encodeURIComponent(props);
			}

			link = '<a href="'+ href +'" data-props="'+ props +'" target="_blank">'+ (caption?caption:href) +'</a>';

			return '<p class="oembed">'+ link +'</p>';
		}
	
		renderer.math = function(text, block) {
			if (block) {
				return '<p class="mathjax">$$'
					+ text
					+ '$$</p>';
			} else {
				return '<span class="mathjax">$$$'
					+ text
					+ '$$$</span>';
			}
		}

		renderer.toc = function(content) {
		  return '<p class="toc"></p>';
		}

		return renderer;
});