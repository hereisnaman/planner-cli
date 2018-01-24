const _ = require( "lodash" );
const moment = require( "moment" );
const readData = require( "./../utils/readData" );
const writeData = require( "./../utils/writeData" );
const makeDir = require( "./../utils/makeDir" );

const setDefaultOrg = ( args ) => {
  let organisations = readData( [ "organisations.json" ], [] );
  const defaultOrg = args[ "default-org" ];
  let defaults = readData( [ "defaults.json" ], {} );
  const orgIndex = _.findIndex( organisations, ( org ) => org.name === defaultOrg );
  const defaultOrgIndex = defaults.org ? _.findIndex( organisations, ( org ) => org.name === defaults.org.name ) : -1;

  if ( orgIndex > -1 ) {
    if ( defaultOrgIndex > -1 && organisations[ orgIndex ].name !== organisations[ defaultOrgIndex ].name ) {
      organisations[ defaultOrgIndex ].default = false;
    }

    organisations[ orgIndex ].default = true;
    defaults.org = organisations[ orgIndex ];

    writeData( [ "organisations.json" ], organisations );
  } else {
    let id = ( _.last( organisations ) && _.last( organisations ).id + 1 ) || 0;
    let org = { id, "name": defaultOrg, "default": true };

    organisations.push( org );
    if ( defaultOrgIndex > -1 ) {
      organisations[ defaultOrgIndex ].default = false;
    }
    defaults.org = org;
    let success = makeDir( [ defaultOrg ] ) && writeData( [ defaultOrg, "projects.json" ], [] ) && writeData( [ defaultOrg, "tasks.json" ], [] ) && writeData( [ "organisations.json" ], organisations );

    if ( success ) {
      console.log( `Created a new organisation: ${defaultOrg}` );
    }
  }

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
