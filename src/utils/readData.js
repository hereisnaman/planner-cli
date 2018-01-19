const fs = require( "fs" );
const path = require( "path" );
const config = require( "./../../config.json" );

module.exports = ( dir, defaults ) => {
  let file;

  try {
    file = JSON.parse( fs.readFileSync( path.join( config.data_base, ...dir ), { "flag": "a+" } ) );
  } catch ( err ) {
    fs.writeFileSync( path.join( config.data_base, ...dir ), JSON.stringify( defaults || {} ), { "flag": "w+" } );
    file = defaults || {};
  }

  return file;
};
