'use strict';

// MODULES //

var abs = require( 'math-abs' );
var tape = require( 'tape' );
var continued_fraction_b = require( './../../lib/continued_fraction_b.js' );


// TESTS //

tape( 'if provided a generator function, the function evaluates the corresponding continued fraction', function test( t ) {
	var actual = continued_fraction_b( generator1(), 1e-16, 1000 );
	var expected = 0.6977746579640078;

	t.ok( abs( actual - expected ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected + '.' );

	actual = continued_fraction_b( generator2(), 1e-16, 1000 );
	expected = 1.525135276160983;

	t.ok( abs( actual - expected ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected + '.' );

	t.end();

	// Continued fraction for (I_1(2))/(I_0(2)), see http://mathworld.wolfram.com/ContinuedFraction.html:
	function* generator1() {
		var b = 0;
		yield [ 1, b ];
		while ( true ) {
			b += 1;
			yield [ 1, b ];
		}
	}

	// Continued fraction for sqrt(2/(epi))[erfc(2^(-1/2))]^(-1), see http://mathworld.wolfram.com/ContinuedFraction.html:
	function* generator2() {
		var a = 0;
		yield [ a, 1 ];
		while ( true ) {
			a += 1;
			yield [ a, 1 ];
		}
	}
});
