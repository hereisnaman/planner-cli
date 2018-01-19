const org = {
  "type": "string",
  "alias": [ "o" ],
  "describe": "Set organisation name."
};

const project = {
  "type": "string",
  "alias": [ "p" ],
  "describe": "Set project name."
};

const task = {
  "type": "string",
  "alias": [ "t" ],
  "describe": "Set task name."
};

const name = {
  "type": "string",
  "alias": [ "n" ],
  "describe": "Set name."
};

const deadline = {
  "type": "array",
  "alias": [ "d" ],
  "describe": "Set task deadline dd mm yyyy.",
  "implies": "task"
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

const defaultOrg = {
  "type": "string",
  "describe": "Set default organisation."
};

module.exports = {
  org,
  project,
  task,
  name,
  deadline,
  complete,
  incomplete,
  defaultOrg
};
