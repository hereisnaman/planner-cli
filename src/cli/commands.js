const { org, project, task, complete, incomplete } = require( "./options" );

const add = {
  "command": "add",
  "alias": [ "a" ],
  "describe": "Add a new organisation, project or task",
  "builder": {
    org,
    project,
    task,
    complete,
    incomplete
  }
};

module.exports = {
  add
};
