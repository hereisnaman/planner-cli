const {
  org,
  project,
  task,
  deadline,
  complete,
  incomplete
} = require( "./options" );

const add = {
  "command": "add",
  "alias": [ "a" ],
  "describe": "Add a new organisation, project or task",
  "builder": {
    org,
    project,
    task,
    deadline,
    complete,
    incomplete
  }
};

module.exports = {
  add
};
