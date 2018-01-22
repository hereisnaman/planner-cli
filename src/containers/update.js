const _ = require( "lodash" );
const moment = require( "moment" );
const readData = require( "./../utils/readData" );
const writeData = require( "./../utils/writeData" );
const makeDir = require( "./../utils/makeDir" );

const setDefaultOrg = ( args ) => {
  let organisations = readData( [ "organisations.json" ], [] );
  const defaultOrg = args[ "default-org" ];
  const orgExists = _.find( organisations, ( org ) => org.name === defaultOrg );

  if ( !orgExists ) {
    let id = ( _.last( organisations ) && _.last( organisations ).id + 1 ) || 0;

    organisations.push( { id, "name": defaultOrg } );
    let success = makeDir( [ defaultOrg ] ) && writeData( [ defaultOrg, "projects.json" ], [] ) && writeData( [ defaultOrg, "tasks.json" ], [] ) && writeData( [ "organisations.json" ], organisations );

    if ( success ) {
      console.log( `Created a new organisation: ${defaultOrg}` );
    }
  }

  let defaults = readData( [ "defaults.json" ], {} );

  defaults.org = defaultOrg;
  writeData( [ "defaults.json" ], defaults );
  console.log( `Set ${defaultOrg} organisation as default` );
};

module.exports = ( args ) => {

  if ( args.org ) {
    // do something
  } else if ( args[ "default-org" ] ) {
    setDefaultOrg( args );
  } else {
    console.error( "error: Missing organisation name." );
    console.info( "Add a new organisation using\n\n    add -org <name>\n" );
    console.info( "or set default organisation name\n\n    update --default-org <name>\n" );
  }
};
