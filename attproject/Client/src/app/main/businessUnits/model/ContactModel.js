import _ from '@lodash';

const ContactModel = (data) =>
    _.defaults(data || {}, {
        name: '',
    });

export default ContactModel;
