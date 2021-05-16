export const LOGGER_DEFAULT_FIELDS = {
    region: 'BY',
    environment: 'DEV',
    component: 'node'
};

export const LOGGING_LEVELS = {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    VERBOSE: 'verbose',
    DEBUG: 'debug',
    SILLY: 'silly'
};

export const LOGGING_MESSAGES = {
    COMMON_REQUEST_INFO: 'Server receives request',
    COMMON_RESPONSE_MESSAGE: 'Server sends response'
};

export const METHOD_NAMES = {
    GET_USERS: 'getAllUsersHandler',
    GET_USER: 'getUserByIdHandler',
    ADD_USER: 'addUserHandler',
    UPDATE_USER: 'updateUserHandler',
    DELETE_USER: 'removeUserHandler',
    USER_AUTO_SUGGEST: 'getAutoSuggestHandler',
    GET_GROUPS: 'getAllGroupsHandler',
    GET_GROUP: 'getGroupByIdHandler',
    ADD_GROUP: 'addGroupHandler',
    UPDATE_GROUPS: 'updateGroupHandler',
    DELETE_GROUPS: 'removeGroupHandler',
    ADD_USER_TO_GROUP: 'addUserToGroup'
};
