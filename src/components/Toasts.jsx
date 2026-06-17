"use client";

import toast, { Toaster } from "react-hot-toast";

export function AppToaster() {
    return (
        <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
                style: {
                    borderRadius: "8px",
                    background: "#080616",
                    color: "#fff",
                    border: "1px solid #162E93",
                },
            }}
        />
    );
}

export const showToastError = (message) => {
    toast.error(message, {
        icon: '❌',
        style: {
            borderRadius: '8px',
            background: '#080616',
            color: '#fff',
            border: '1px solid #162E93',
        },
    });
};

export const showToastSuccess = (message) => {
    toast.success(message, {
        icon: '✅',
        style: {
            borderRadius: '8px',
            background: '#080616',
            color: '#fff',
            border: '1px solid #162E93',
        },
    });
};