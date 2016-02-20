'use strict';

// MODULES //

var abs = require( 'math-abs' );
var tape = require( 'tape' );
var continued_fraction_a = require( './../../lib/continued_fraction_a.js' );


// TESTS //

tape( 'if provided a generator function, the function evaluates the corresponding continued fraction', function test( t ) {
	// Continued fraction for (e-1)^(-1):
	var actual = continued_fraction_a( generator(), 1e-16, 1000 );
	var expected = 0.5819767068693261;

	t.ok( abs( actual - expected ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected + '.' );
	t.end();

	function* generator() {
		var i = 0;
		while ( true ) {
			i++;
			yield [ i, i ];
		}
	}
});
