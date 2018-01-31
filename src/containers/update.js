const _ = require( "lodash" );
const moment = require( "moment" );
const readData = require( "./../utils/readData" );
const writeData = require( "./../utils/writeData" );
const makeDir = require( "./../utils/makeDir" );
const renameDir = require( "./../utils/renameDir" );

const updateTask = ( args ) => {
  const tasks = readData( [ args.org, ...( args.project ? [ args.project, "tasks.json" ] : [ "tasks.json" ] ) ], [] );
  const taskIndex = _.findIndex( tasks, ( task ) => task.id === args.task );

  if ( taskIndex > -1 ) {
    let task = tasks[ taskIndex ];

    if ( args.name ) {
      task.name = args.name;
    }

    if ( args.incomplete ) {
      task.status = "incomplete";
    }

    if ( args.complete ) {
      task.status = "complete";
    }

    if ( args.deadline ) {
      task.deadline = args.deadline ? moment().date( args.deadline[ 0 ] ).month( args.deadline[ 1 ] ).year( args.deadline[ 2 ] ) : "not set";
    }

    tasks[ taskIndex ] = task;

    const success = writeData( [ args.org, ...( args.project ? [ args.project, args.task ] : [ args.task ] ) ], tasks );

    if ( success ) {
      console.log( `Updated ${args.org}/${args.project || ""} task ${args.task}\n` );
    }
  } else {
    console.error( `error: Task with ID: ${args.task} not found.` );
    console.info( "Add a new task using\n\n    add --org <name> --project <name> --task <name>\n" );
    console.info( "Update task using\n\n    update --org <name> --project <name> --task <id> --name <new name>\n" );
  }
};

const updateProject = ( args ) => {
  if ( args.task ) {
    updateTask( args );
  } else if ( !args.name ) {
    console.error( "error: Missing project new name." );
    console.info( "Update project name using\n\n    update --org <name> --project <name> --name <new name>\n" );
  } else {
    let projects = readData( [ args.name, "projects.json" ], [] );
    const projectIndex = _.findIndex( projects, ( project ) => project.name === args.project );

    if ( projectIndex > -1 ) {
      projects[ projectIndex ].name = args.name;
      const success = writeData( [ args.name, "projects.json" ], projects );

      if ( success ) {
        console.log( `Updated ${args.project} project to ${args.name}` );
      }
    } else {
      console.error( `error: ${args.org}/${args.project} project does not exist.` );
      console.info( "Add a new project using\n\n    add --org <name> --project <name>\n" );
      console.info( "Update project using\n\n    update --org <name> --project <name> --name <new name>\n" );
    }
  }
};

const updateOrg = ( args ) => {
  if ( args.project ) {
    updateProject( args );
  } else if ( args.task ) {
    updateTask( args );
  } else if ( !args.name ) {
    console.error( "error: Missing organisation new name." );
    console.info( "Update organisation name using\n\n    update --org <name> --name <new name>\n" );
  } else {
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
    updateOrg( args );
  } else if ( args[ "default-org" ] ) {
    setDefaultOrg( args );
  } else {
    console.error( "error: Missing organisation name." );
    console.info( "Add a new organisation using\n\n    add --org <name>\n" );
    console.info( "or set default organisation name\n\n    update --default-org <name>\n" );
  }
};
