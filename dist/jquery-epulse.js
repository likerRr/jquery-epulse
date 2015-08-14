/*
 * ePulse - A Lightweight jQuery Event Pulse Plugin v0.1.0
 * Copyright (c) 2015 Alexey Lizurchik
 * Licensed under the MIT license
 * http://likerrr.mit-license.org/
 */

// CommonJS, AMD or browser globals (had taken from https://github.com/object505/tipso/blob/master/src/tipso.js)
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function($) {
	// TODO automatic determination of containers position and automatically fix pulse appearance, such way 'forceContainerStyles' will be removed
	function ePulse(options, cbBeforeAnimation, cbAfterAnimation) {
		var $visualizer = $('<div class="event-pulser">'),
			defaults = {
				speed: 'fast',
				size: 'medium',
				bgColor: '#fff100',
				event: 'click',
				autoDelete: true,
				reverseOpacity: false,
				forceContainerStyles: false
			},
			_visualizerStyles,
			_d = 0,
			_r = 0;

		if (arguments.length == 2) {
			if ($.isFunction(options) && $.isFunction(cbBeforeAnimation)) {
				cbAfterAnimation = cbBeforeAnimation;
				cbBeforeAnimation = options;
				options = {};
			}
		}
		options = $.extend(defaults, options);

		options.animationTime =
			(options.speed == 'fast') ? 500 :
				(options.speed == 'slow') ? 1000 :
					($.isNumeric(parseInt(options.speed), 10)) ? options.speed : 0;

		options.diameter =
			(options.size == 'small') ? 100 :
				(options.size == 'medium') ? 200 :
					(options.size == 'large') ? 400 :
						($.type(options.size) == 'string') ? parseInt(options.size, 10) : options.size;

		initVariables();

		// add basic styles and append to body
		_visualizerStyles = {
			position: 'absolute',
			top: 0,
			left: 0,
			display: 'none',
			opacity: options.reverseOpacity ? 0 : 1,
			background: options.bgColor,
			width: 0,
			height: 0,
			borderRadius: _d
		};
		$visualizer.css(_visualizerStyles);

		if (this instanceof $) {
			this.on(options.event, function(e) {
				e.stopPropagation();
				var $this = $(this),
					$visualizerClone = $visualizer.clone(),
					left, top;

				if (options.forceContainerStyles) {
					fixContainerStyles($this);
				}
				left = e.pageX - $this.offset().left - parseInt($this.css('border-left-width'), 10);
				top = e.pageY - $this.offset().top - parseInt($this.css('border-top'), 10);

				$visualizerClone.appendTo($this);
				animate($visualizerClone, left, top, e);
			});

			return this;
		} else {
			return function(x, y) {
				var a = $visualizer.clone();
				if (options.container instanceof $) {
					if (options.forceContainerStyles) {
						fixContainerStyles(options.container);
					}
					a.appendTo(options.container);
				} else {
					a.appendTo($('body'));
				}
				animate(a, x, y);
			}
		}

		/**
		 * Fix styles to stay inside container
		 * @param $container
		 * @returns {*}
		 */
		function fixContainerStyles($container) {
			return $container.css({
				overflow: 'hidden',
				position: 'relative'
			});
		}

		/**
		 * Init variables for each step loop
		 */
		function initVariables() {
			// calculate diameter
			if ($.isArray(options.diameter)) {
				_d = Math.floor(Math.random() * options.diameter[1]) + options.diameter[0];
			} else {
				_d = options.diameter;
			}
			// calculate radius
			_r = Math.ceil(_d / 2);
		}

		/**
		 * Start animation
		 * @param $circle
		 * @param x
		 * @param y
		 * @param [e]
		 */
		function animate($circle, x, y, e) {
			initVariables();

			// correct position before appearance
			$circle
				.css({
					top: y,
					left: x
				})
				.show();

			if ($.isFunction(cbBeforeAnimation)) {
				cbBeforeAnimation.call($circle);
			}
			$circle.animate({
				opacity: options.reverseOpacity ? 1 : 0,
				width: _d,
				height: _d,
				borderRadius: _d,
				top: y - _r,
				left: x - _r
			}, options.animationTime, function() {
				if ($.isFunction(cbAfterAnimation)) {
					cbAfterAnimation.call($circle, isEvent(e) ? e : undefined);
				}
				if (options.autoDelete) {
					// default behaviour
					$circle.remove();
				}
			});
		}

		/**
		 * Is jQuery event
		 * @param e
		 * @returns {boolean}
		 */
		function isEvent(e) {
			return e instanceof $.Event;
		}
	}

	$.extend({ePulse: ePulse});
	$.fn.ePulse = ePulse;

}));
