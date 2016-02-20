'use strict';

// MODULES //

var abs = require( 'math-abs' );
var tape = require( 'tape' );
var continued_fraction_a = require( './../lib/continued_fraction_a.js' );


// VARIABLES //

var hasGeneratorsSupport = require( 'detect-generator-support' )();


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof continued_fraction_a, 'function', 'main export is a function' );
	t.end();
});

// Run generator function tests if environment supports `function*()`...

if ( hasGeneratorsSupport ) {
	require( './es2015/test.continued_fraction_a.generator.js' );
}

tape( 'if provided a closure function, the function evaluates the corresponding continued fraction', function test( t ) {
	// Continued fraction for (e-1)^(-1):
	var actual = continued_fraction_a( generator(), 1e-16, 1000 );
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
