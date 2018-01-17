const {
  org,
  project,
  task,
  name,
  deadline,
  complete,
  incomplete,
  defaultOrg,
  defaultProject
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

const update = {
  "command": "update",
  "alias": [ "u" ],
  "describe": "Update task details.",
  "builder": {
    "org": Object.assign( {
      "implies": "task"
    }, org ),
    "project": Object.assign( {
      "implies": "task"
    }, project ),
    task,
    deadline,
    complete,
    incomplete,
    defaultOrg,
    defaultProject
  }
};

const change = {
  "command": "change",
  "alias": [ "c" ],
  "describe": "Change Organisation or Project details.",
  "builder": {
    "org": Object.assign( {
      "implies": "name"
    }, org ),
    "project": Object.assign( {
      "implies": "name"
    }, project ),
    name,
    defaultOrg,
    defaultProject
  }
};

const remove = {
  "command": "remove",
  "alias": [ "r" ],
  "describe": "Remove a organisation, project or task",
  "builder": {
    org,
    project,
    task
  }
};

module.exports = {
  add,
  update,
  change,
  remove
};
