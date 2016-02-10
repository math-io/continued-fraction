'use strict';

/**
* NOTE: the original C++ code is from the [Boost library]{http://www.boost.org/doc/libs/1_52_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

//  (C) Copyright John Maddock 2006.
//  Use, modification and distribution are subject to the
//  Boost Software License, Version 1.0. (See accompanying file
//  LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)

// MODULES //

var abs = require( 'math-abs' );


// CONSTANTS //

var TINY = require( 'const-smallest-float32' ).VALUE;


// CONTINUED FRACTION B //

/**
* FUNCTION: continued_fraction_b( generator, factor )
*	Evaluates
*	  b0 +	   a1
*	  ---------------
*	  b1 +	 a2
*		   ----------
*		   b2 +   a3
*				-----
*				b3 + ...
*
* @param {Function} generator - function giving terms of continued fraction expansion
* @param {Number} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {Number} max_iter - maximum number of iterations
* @returns {Number} evaluated expansion
*/
function continued_fraction_b( gen, factor, max_iter ) {
	var isgenerator = typeof gen.next === 'function';
	var f;
	var C;
	var D;
	var delta;
	var v = isgenerator ? gen.next().value : gen();
	f = v[ 1 ];
	if( f === 0 ) {
		f = TINY;
	}
	C = f;
	D = 0;
	if ( isgenerator === true ) {
		do {
			v = gen.next().value;
			if ( v ) {
				D = v[ 1 ] + v[ 0 ] * D;
				if ( D === 0 ) {
					D = TINY;
				}
				C = v[ 1 ] + v[ 0 ] / C;
				if ( C === 0 ) {
					C = TINY;
				}
				D = 1 / D;
				delta = C * D;
				f = f * delta;
			}
		} while( v && ( abs( delta - 1 ) > factor ) && --max_iter );
	} else {
		do {
			v = gen();
			if ( v ) {
				D = v[ 1 ] + v[ 0 ] * D;
				if ( D === 0 ) {
					D = TINY;
				}
				C = v[ 1 ] + v[ 0 ] / C;
				if ( C === 0 ) {
					C = TINY;
				}
				D = 1 / D;
				delta = C * D;
				f = f * delta;
			}
		} while( v && ( abs( delta - 1 ) > factor ) && --max_iter );
	}
	return f;
} // end FUNCTION continued_fraction_b()


// EXPORTS //

module.exports = continued_fraction_b;
