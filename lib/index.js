'use strict';

// MODULES //

var validate = require( './validate.js' );


// FUNCTIONS //

var continued_fraction_a = require( './continued_fraction_a.js' );
var continued_fraction_b = require( './continued_fraction_b.js' );


// CONTINUED FRACTION //

/**
* FUNCTION: continued_fraction( generator, opts )
*	Evaluates the continued fraction approximation for the supplied series generator.
*
* @param {Function} generator - function returning terms of continued fraction expansion
* @param {Object} [opts] - function options
* @param {Number} [opts.max_iter=1000] - maximum number of iterations
* @param {Number} [opts.tolerance=1e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {Boolean} [opts.keep=false] - whether to keep the leading b term
* @returns {Number} value of continued fraction
*/
function continued_fraction( generator, options ) {
	var opts = {};
	var err;
	var eps;
	var max_iter;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	eps = opts.tolerance || 1e-16;
	max_iter = opts.max_iter || 1000;

	if ( opts.keep ) {
		return continued_fraction_b( generator, eps, max_iter );
	}
	return continued_fraction_a( generator, eps, max_iter );
} // end FUNCTION continued_fraction()


// EXPORTS //

module.exports = continued_fraction;
