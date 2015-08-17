# ePulse
Lightweight(1.7kb) jQuery plugin for creating ripple effects on event occurrence

# Install

## npm

If you use build system that supports CommonJS or AMD modules, then install through `npm`

`npm install jquery-epulse`

Then include in your *.js file
```javascript
require('jquery-epulse');
```

## bower
In future releases

## manual

For manual installation you can download one of the latest [release](https://github.com/likerRr/jquery-epulse/releases) or clone this repo:

`git clone https://github.com/likerRr/jquery-epulse.git`

Then just include plugin in your html
```html
<script src="/dist/jquery-epulse.min.js"></script>
```
There are 3 different versions available for including:
- `/dist/dev.jquery-epulse.min.js` - contains minified code and sourcemap for developing purposes
- `/dist/jquery-epulse.min.js` - minified, ready for production version
- `/dist/jquery-epulse.js` - built from source version

# How to
ePulse is jQuery plugin, so you can use it like other jQuery functions. So, here is simple ripple effect on button example:
```css
button {
  // for proper work, position must be either relative or absolute
  position: relative;
  overflow: hidden;
  // simple button styles
  background: #9C27B0;
	color: white;
	padding: 5px;
	border: transparent;
}
```
```html
<button>I'm a button</button>
```
```javascript
$("button").ePulse({bgColor: 'rgba(225, 190, 231, 0.5)', event: 'mousedown'});
```

# [Demo](https://likerrr.github.io/jquery-epulse/)

# LICENSE
http://likerrr.mit-license.org
