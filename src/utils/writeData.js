const fs = require( "fs" );
const path = require( "path" );
const config = require( "./../../config.json" );

module.exports = ( dir, data ) => {
  try {
    fs.writeFileSync( path.join( config.data_base, ...dir ), JSON.stringify( data ), { "flag": "w+" } );
  } catch ( err ) {
    console.error( err, "error: something went wrong." );

    return false;
  }

  return true;
};
