import _ from '@lodash';

const ContactModel = (data) =>
    _.defaults(data || {}, {
        name: '',
        url: ''
    });

export default ContactModel;
