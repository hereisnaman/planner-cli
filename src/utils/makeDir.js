const fs = require( "fs" );
const path = require( "path" );
const config = require( "./../../config.json" );

module.exports = ( dir ) => {
  try {
    fs.mkdirSync( path.join( config.data_base, ...dir ) );
  } catch ( err ) {
    console.error( "error: something went wrong." );

    return false;
  }

  return true;
};
