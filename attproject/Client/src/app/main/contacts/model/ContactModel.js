import _ from '@lodash';

const ContactModel = (data) =>
    _.defaults(data || {}, {
        name: '',
        email: '',
        password: '',
        role: '',
        units: [],
    });

export default ContactModel;
