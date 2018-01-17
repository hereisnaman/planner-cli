const yargs = require( "yargs" );
const commands = require( "./commands" );

module.exports = yargs
  .command( commands.add )
  .command( commands.update )
  .command( commands.change )
  .command( commands.remove )
  .showHelpOnFail( true )
  .help()
  .demandCommand( 1, "You need one command before moving on." )
  .argv;
