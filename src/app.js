const args = require( "./cli/args.js" );
const add = require( "./containers/add" );
const update = require( "./containers/update" );
const remove = require( "./containers/remove" );

switch ( args._[ 0 ] ) {
  case "add":
    add( args );
    break;
  case "update":
    update( args );
    break;
  case "remove":
    remove( args );
    break;
  default:
    console.error( "Command not found." );
    break;
}
