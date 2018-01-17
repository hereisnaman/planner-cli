const config = require( "../../config.json" );
const org = {
  "type": "string",
  "alias": [ "o" ],
  "describe": "Set organisation name.",
  "default": config.default_org
};

const project = {
  "type": "string",
  "alias": [ "p" ],
  "describe": "Set project name.",
  "default": config.default_project,
  "implies": "org"
};

const task = {
  "type": "string",
  "alias": [ "t" ],
  "describe": "Set task name.",
  "implies": "project"
};

const complete = {
  "type": "boolean",
  "alias": [ "c" ],
  "describe": "Set task status complete.",
  "implies": "task"
};

const incomplete = {
  "type": "boolean",
  "alias": [ "i" ],
  "describe": "Set task status incomplete.",
  "implies": "task"
};

module.exports = {
  org,
  project,
  task,
  complete,
  incomplete
};
