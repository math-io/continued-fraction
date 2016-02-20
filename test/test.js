'use strict';

// MODULES //

var abs = require( 'math-abs' );
var tape = require( 'tape' );
var continued_fraction = require( './../lib/' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof continued_fraction, 'function', 'main export is a function' );
	t.end();
});

tape( 'function throws an error if provided an invalid option', function test( t ) {
	t.throws( foo, TypeError, 'invalid options argument' );
	t.throws( bar, TypeError, 'invalid option' );
	t.end();

	function foo() {
		continued_fraction( generator, { 'keep': 12 } );
	}
	function bar() {
		continued_fraction( generator, { 'max_iter': 'no number' } );
	}
	function generator() {
		var i = 0;
		return function() {
			i++;
			return [ i, i ];
		};
	}
});

tape( 'by default, the function evaluates the continued fraction without the leading b_0 term', function test( t ) {
	// Continued fraction for (e-1)^(-1):
	var actual = continued_fraction( generator() );
	var expected = 0.5819767068693261;

	t.ok( abs( actual - expected ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected + '.' );
	t.end();

	function generator() {
		var i = 0;
		return function() {
			i++;
			return [ i, i ];
		};
	}
});

tape( 'if keep option is true, the function evaluates the continued fraction with the leading b_0 term', function test( t ) {
	var actual = continued_fraction( generator1(), { 'keep': true } );
	var expected = 0.6977746579640078;

	t.ok( abs( actual - expected ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected + '.' );

	actual = continued_fraction( generator2(), { 'keep': true } );
	expected = 1.525135276160983;

	t.ok( abs( actual - expected ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected + '.' );

	t.end();

	// Continued fraction for (I_1(2))/(I_0(2)), see http://mathworld.wolfram.com/ContinuedFraction.html:
	function generator1() {
		var b = -1;
		return function() {
			b += 1;
			return [ 1, b ];
		};
	}

	// Continued fraction for sqrt(2/(epi))[erfc(2^(-1/2))]^(-1), see http://mathworld.wolfram.com/ContinuedFraction.html:
	function generator2() {
		var a = -1;
		return function() {
			a += 1;
			return [ a, 1 ];
		};
	}
});
