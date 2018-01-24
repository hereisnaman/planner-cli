const fs = require( "fs" );
const path = require( "path" );
const config = require( "./../../config.json" );

module.exports = ( from, to ) => {
  try {
    fs.renameSync( path.join( config.data_base, ...from ), path.join( config.data_base, ...to ) );
  } catch ( err ) {
    console.error( "error: something went wrong." );

    return false;
  }

  return true;
};
