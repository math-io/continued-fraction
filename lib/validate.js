'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isNumber = require( 'validate.io-Number-primitive' );
var isBoolean = require( 'validate.io-boolean-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Number} [options.max_iter] - maximum number of iterations
* @param {Number} [options.tolerance] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {Boolean} [options.keep] - whether to keep the leading b term
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'max_iter' ) ) {
		opts.max_iter = options.max_iter;
		if ( !isNumber( opts.max_iter ) ) {
			return new TypeError( 'invalid option. Maximum iterations option must be a number primitive. Option: `' + opts.max_iter + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'tolerance' ) ) {
		opts.tolerance = options.tolerance;
		if ( !isNumber( opts.tolerance ) ) {
			return new TypeError( 'invalid option. Tolerance option must be a number primitive. Option: `' + opts.tolerance + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'keep' ) ) {
		opts.keep = options.keep;
		if ( !isBoolean( opts.keep ) ) {
			return new TypeError( 'invalid option. Keep option must be a boolean primitive. Option: `' + opts.keep + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
