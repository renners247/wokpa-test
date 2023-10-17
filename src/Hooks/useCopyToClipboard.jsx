import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

const useCopyToClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback((text) => {
        if (typeof text === 'string' && text.trim() !== '') {
            navigator.clipboard.writeText(text).then(() => {
                setIsCopied(true);

                // Show a toast notification when text is copied
                toast.success('Text copied to clipboard', {
                    position: 'top-center',
                    autoClose: 2000, // Auto close the notification after 2 seconds
                    hideProgressBar: true,
                });

                setTimeout(() => setIsCopied(false), 2000); // Reset the "copied" state after 2 seconds
            });
        }
    }, []);

    return { isCopied, copyToClipboard };
};

export default useCopyToClipboard;
