import { toastError, toastSuccess } from "./toast";

export async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        toastSuccess('Copied to clipboard');
    } catch (error: any) {
        toastError('Failed to copy to clipboard', error.message);
        console.error('Failed to copy:', error.message);
    }
}