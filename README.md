# Why Deets?

You probably already know of or heard of other details polyfill solutions. 
I took a look at the alternatives available and was not satisfied with any current solutions. 
I'm not trying to knock the creators, but I'll explain why I wasn't satisfied.

* [Mathias Byen's demo](http://mathiasbynens.be/demo/html5-details-jquery) wasn't working in IE9 for me and
no support for animating the opening and closing of the details element. 
It also uses the verbose way to detect browser support when we are long past Chrome 10 (Chrome 17 is current stable).
* [Manuel Bieh's version](https://github.com/manuelbieh/Details-Polyfill) has no support for animations either, 
does a lot of things I don't like such as rejquerifying elements, at a glance should be lower performance compared to the other solutions, 
no way to polyfill when the element comes from a template
* [Akral's demo](http://akral.bitbucket.org/details-tag/) simply doesn't work in IE7/IE8 and the animation doesn't work in IE9. This was my favorite and had a lot of potential.
* [Termi's solution](https://github.com/termi/Element.details) lacks animation support and proper IE7 support without loads of extras. 
If this was a completely pure solution without all the other files needed to support IE7 it would be great.

Everything I wasn't satisfied with I solved.

# The Deets on Deets
* Supports IE7+, Chrome 12+, FF, Safari (never tested in Opera) and being used in a real product
* Animations that work across all browsers
* Native support without an animation bypasses the polyfill
* Initializes all details elements on load, similar to Manuel Bieh's polyfill, but with the option to manually initialize `.deets()`
* jQuery UI Widget API, `deets('open')`, `deets('close')`, `deets('toggle')`
* Fires `deets.opening`, `deets.opened`, `deets.closing`, `deets.closed` for animated and non-native details
* Uses a single event delegate
* Options can be specified without writing a single line of JavaScript `<details open data-deet='{"speed": 0/"fast"/"slow"}'>` 
(currently only supported for auto-initiliazed details)

## Events
	deets.opening
Fires immediately before the widget internally maintains that the details has opened

	deets.opened
Fires immediately after the animation has completed (if applicable) and after the widget recognizes the details are open 
	
	deets.closing
Fires immediately before the widget internally maintains that the details has closed

	deets.closed
Fires immediately after the animation has completed (if applicable) and after the widget recognizes the details as closed 

## Options
### Speed
Takes either an integer or the string `'slow'`/`'fast'`
#### Examples
`<details open data-deet='{"speed": 0}'>`, `<details open data-deet='{"speed": "fast"}'>`, `<details open data-deet='{"speed": "slow"}'>`, `.deets({speed: 0/'fast'/'slow'})`