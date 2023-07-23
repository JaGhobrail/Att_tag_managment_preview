/**
 * Authorization Roles
 */


// case SUPER_ADMIN = 'SUPER_ADMIN';
// case UNIT_ADMIN = 'UNIT_ADMIN';
// case INVESTIGATOR = 'INVESTIGATOR';
// case REVIWER = 'REVIWER';
// case PARTNER = 'PARTNER';
// case USER = 'USER';

const authRoles = {
    SUPER_ADMIN: ['SUPER_ADMIN'],
    UNIT_ADMIN: ['SUPER_ADMIN', 'UNIT_ADMIN'],
    INVESTIGATOR: ['SUPER_ADMIN', 'UNIT_ADMIN', 'INVESTIGATOR'],
    onlyGuest: [],
};

// const authRoles = {
//     admin: ['admin'],
//     staff: ['admin', 'staff'],
//     user: ['admin', 'staff', 'user'],
//     onlyGuest: [],
// };


export default authRoles;
