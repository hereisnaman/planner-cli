const _ = require( "lodash" );
const moment = require( "moment" );
const readData = require( "./../utils/readData" );
const writeData = require( "./../utils/writeData" );
const makeDir = require( "./../utils/makeDir" );
const renameDir = require( "./../utils/renameDir" );

const setOrgName = ( args ) => {
  let organisations = readData( [ "organisations.json" ], [] );
  const orgIndex = _.findIndex( organisations, ( org ) => org.name === args.org );
  const orgExists = _.find( organisations, ( org ) => org.name === args.name );

  if ( orgExists ) {
    console.error( `error: ${args.name} organisation already exist.` );
  } else if ( orgIndex < 0 ) {
    console.error( `error: ${args.org} organisation does not exist.` );
    console.info( "Add a new organisation using\n\n    add --org <name>\n" );
  } else {
    organisations[ orgIndex ].name = args.name;
    let updateDefault = true;

    if ( organisations[ orgIndex ].default ) {
      let defaults = readData( [ "defaults.json" ] );

      defaults.org.name = args.name;
      updateDefault = writeData( [ "defaults.json" ], defaults );
    }
    const success = updateDefault && renameDir( [ args.org ], [ args.name ] ) && writeData( [ "organisations.json" ], organisations );

    if ( success ) {
      console.log( `Updated ${args.org} organisation to ${args.name}` );
    }
  }
};
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
    if ( args.project ) {

    } else if ( args.task ) {
      
    } else if ( !args.name ) {
      console.error( "error: Missing organisation new name." );
      console.info( "Update organisation name using\n\n    update --org <name> --name <new name>\n" );
    } else {
      setOrgName( args );
    }
  } else if ( args[ "default-org" ] ) {
    setDefaultOrg( args );
  } else {
    console.error( "error: Missing organisation name." );
    console.info( "Add a new organisation using\n\n    add --org <name>\n" );
    console.info( "or set default organisation name\n\n    update --default-org <name>\n" );
  }
};
