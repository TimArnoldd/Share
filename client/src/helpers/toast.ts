import { createToast } from 'mosha-vue-toastify';

export function toastInfo(message: string, description?: string) {
    createToast({
        title: message,
        description: description,
    }, {
        showIcon: true,
        type: 'info',
        position: 'bottom-right',
        timeout: 5000,
        toastBackgroundColor: '#01d5ff'
    })
}

export function toastSuccess(message: string, description?: string) {
    createToast({
        title: message,
        description: description,
    }, {
        showIcon: true,
        type: 'success',
        position: 'bottom-right',
        timeout: 5000,
        toastBackgroundColor: '#8ae801'
    })
}

export function toastWarning(message: string, description?: string) {
    createToast({
        title: message,
        description: description,
    }, {
        showIcon: true,
        type: 'warning',
        position: 'bottom-right',
        timeout: 5000,
        toastBackgroundColor: '#ffbb00'
    })
}

export function toastError(message: string, description?: string) {
    createToast({
        title: message,
        description: description,
    }, {
        showIcon: true,
        type: 'danger',
        position: 'bottom-right',
        timeout: 10000,
        toastBackgroundColor: '#ff0359'
    })
}