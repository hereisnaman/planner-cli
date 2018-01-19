const {
  org,
  project,
  task,
  name,
  deadline,
  complete,
  incomplete,
  defaultOrg
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
    org,
    project,
    task,
    name,
    deadline,
    complete,
    incomplete,
    "default-org": defaultOrg
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
  remove
};
