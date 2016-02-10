'use strict';

var continued_fraction = require( './../lib' );
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
