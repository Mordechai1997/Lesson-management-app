import { toast } from 'react-toastify';

const customToast = {
    success(msg, options = {}) {
        return toast.success(msg, {
            ...options,
            className: 'toast-success-container toast-success-container-after',
            background: '#34A853',
        });
    },
    error(msg, options = {}) {
        return toast.error(msg, {
            ...options,
            className: 'toast-error-container toast-error-container-after',
            background: '#EE0022',
        });
    },
    info(msg, options = {}) {
        return toast.info(msg, {
            ...options,
            className: 'toast-info-container toast-info-container-after',
            background: '#07F',
        });
    },
};


export default customToast;