continued-fraction
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Continued fraction approximation][continued-fraction]


## Installation

``` bash
$ npm install math-continued-fraction
```


## Usage

``` javascript
var continued_fraction = require( 'math-continued-fraction' );
```

#### continued_fraction( generator[, opts ] )

Evaluates the continued fraction described by the supplied `generator` argument. `generator` can be either a function which returns an array with two elements, the `a` and `b` terms of the fraction, or an ES6 [Generator object][es6-generator]. By default, the function computes

<div class="equation" align="center" data-raw-text="latex" data-equation="eq:b_0 + \frac{a_1}{b_1+\frac{a_2}{b_2+\frac{a_3}{b_3+\frac{a_4}{b_4}+\ldots}}}">
	<img src="https://cdn.rawgit.com/math-io/continued-fraction/9e7142f8f3d707e4aae18a37258ede8925bc4ae0/docs/img/eqn1.svg" alt="Continued fraction without leading b_0 term">
	<br>
</div>

Using an ES6 [Generator object][es6-generator]:

```javascript
// Continued fraction for (e-1)^(-1):
var gen = generator();
var out = continued_fraction( gen );
// returns ~0.582

function* generator() {
	var i = 0;
	while ( true ) {
		i++;
		yield [ i, i ];
	}
}
```

Alternatively, one can use a closure to achieve the same goal:

```javascript
// Continued fraction for (e-1)^(-1):
var gen = generator()
var out = continued_fraction( gen );
// returns ~0.582

function generator() {
	var i = 0;
	return function() {
		i++;
		return [ i, i ];
	};
}
```

The `function` accepts the following `options`:
*	__max_iter__: integer denoting the maximum number of times the supplied generator object will be called. Default: `1000000`.
*	__tolerance__: number primitive specifying the used tolerance to assess convergence. Default: `1e-16`.
*	__keep__: boolean primitive indicating whether to keep the `b0` term in the continued fraction. Default: `false`.

To evaluate

<div class="equation" align="center" data-raw-text="b_0 + \frac{a_1}{b_1+\frac{a_2}{b_2+\frac{a_3}{b_3+\frac{a_4}{b_4}+\ldots}}}" data-equation="eq:funname">
	<img src="https://cdn.rawgit.com/math-io/continued-fraction/9e7142f8f3d707e4aae18a37258ede8925bc4ae0/docs/img/eqn2.svg" alt="Continued fraction with leading b_0 term">
	<br>
</div>

set the `keep` option to `true`.

```javascript
var out = continued_fraction( generator(), {
	'keep': true
});
// returns ~1.718
```

To change the maximum number of iterations, set the `max_iter` option.

```javascript
var out = continued_fraction( generator(), {
	'max_iter': 10
});
// returns ~0.582
```

The default tolerance of `1e-16` to assess convergence can be changed via the `tolerance` option.

```javascript
var out = continued_fraction( generator(), {
	'tolerance': 1e-1
});
// returns ~0.578
```

## Implementation

The underlying functions used by this module were ported from the [Boost C++ library][boost-library] and use the modified Lentz algorithm.

References:
- Numeric Recipes in C++, W. H. Press et all, chapter 5, p 175 - 179
- Lentz, W.J. 1976, Applied Optics, vol. 15, pp. 668-671.


## Examples

``` javascript
var continued_fraction = require( 'math-continued-fraction' );
var out;

// GOLDEN RATIO //

function* generator() {
	while ( true ) {
		yield [ 1, 1 ];
	}
}

function closure() {
	var ones = [ 1, 1 ];
	return function() {
		return ones;
	};
}

out = continued_fraction( generator(), { keep: true } );
console.log( 'Golden ratio (generator): %d,', out );
out = continued_fraction( closure(), { keep: true } );
console.log( 'Golden ratio (closure): %d', out );

```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-continued-fraction.svg
[npm-url]: https://npmjs.org/package/math-continued-fraction

[build-image]: http://img.shields.io/travis/math-io/continued-fraction/master.svg
[build-url]: https://travis-ci.org/math-io/continued-fraction

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/continued-fraction/master.svg
[coverage-url]: https://codecov.io/github/math-io/continued-fraction?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/continued-fraction.svg
[dependencies-url]: https://david-dm.org/math-io/continued-fraction

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/continued-fraction.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/continued-fraction

[github-issues-image]: http://img.shields.io/github/issues/math-io/continued-fraction.svg
[github-issues-url]: https://github.com/math-io/continued-fraction/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[boost-library]: http://www.boost.org/doc/libs/1_46_1/libs/math/doc/sf_and_dist/html/math_toolkit/toolkit/internals1/cf.html
[continued-fraction]: https://en.wikipedia.org/wiki/Continued_fraction
[es6-generator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
[compute-io]: https://github.com/compute-io
