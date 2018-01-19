const _ = require( "lodash" );
const moment = require( "moment" );
const readData = require( "./../utils/readData" );
const writeData = require( "./../utils/writeData" );
const makeDir = require( "./../utils/makeDir" );

const addTask = ( args, org, project ) => {
  let tasks = readData( [ org.name, project ? project.name : "", "tasks.json" ], [] );
  let tasksIndex = _.findIndex( tasks, ( item ) => item.name === args.task );
  let task;

  if ( tasksIndex < 0 ) {
    let id, deadline, status;

    id = ( _.last( tasks ) && _.last( tasks ).id + 1 ) || 0;
    deadline = args.deadline ? moment().date( args.deadline[ 0 ] ).month( args.deadline[ 1 ] ).year( args.deadline[ 2 ] ) : "not set";
    status = args.complete ? "complete" : "incomplete";

    task = {
      "id": id,
      "name": args.task,
      "deadline": deadline,
      "status": status
    };

    tasks.push( task );
    let success = writeData( [ org.name, project ? project.name : "", "tasks.json" ], tasks );

    if ( success ) {
      console.log( `Created a new task: ${args.task}` );
    }
  } else {
    console.error( "error: task already exists." );
  }

};

const addProject = ( args, org ) => {
  let projects = readData( [ org.name, "projects.json" ], [] );
  let projectIndex = _.findIndex( projects, ( item ) => item.name === args.project );
  let project;

  if ( projectIndex < 0 ) {
    // project does not exists
    let id = ( _.last( projects ) && _.last( projects ).id + 1 ) || 0;

    project = {
      "id": id,
      "name": args.project
    };
    projects.push( project );
    let success = makeDir( [ org.name, args.project ] ) && writeData( [ org.name, args.project, "tasks.json" ], [] ) && writeData( [ org.name, "projects.json" ], projects );

    if ( success ) {
      console.log( `Created a new project: ${args.project}` );
    }
  } else {
    project = projects[ projectIndex ];
  }

  if ( args.task ) {
    addTask( args, org, project );
  } else if ( projectIndex >= 0 ) {
    console.error( "error: project already exists." );
  }

};

const addOrg = ( args ) => {
  let organisations = readData( [ "organisations.json" ], [] );
  let orgIndex = _.findIndex( organisations, ( item ) => item.name === args.org );
  let org;

  if ( orgIndex < 0 ) {
    // org does not exists
    let id = ( _.last( organisations ) && _.last( organisations ).id + 1 ) || 0;

    org = {
      "id": id,
      "name": args.org
    };
    organisations.push( org );

    let success = makeDir( [ args.org ] ) && writeData( [ args.org, "projects.json" ], [] ) && writeData( [ org.name, "tasks.json" ], [] ) && writeData( [ "organisations.json" ], organisations );

    if ( success ) {
      console.log( `Created a new organisation: ${args.org}` );
    }
  } else {
    org = organisations[ orgIndex ];
  }

  if ( args.project ) {
    addProject( args, org );
  } else if ( args.task ) {
    addTask( args, org );
  } else if ( orgIndex >= 0 ) {
    console.error( "error: organisation already exists." );
  }

};

module.exports = ( args ) => {
  if ( args.org ) {
    addOrg( args );
  } else {
    console.error( "error: Missing organisation name." );
    console.info( "Add a new organisation using\n\n    add -org <name>\n" );
    console.info( "or set default organisation name\n\n    update --default-org <name>\n" );
  }
};
