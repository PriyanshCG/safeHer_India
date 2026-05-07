import React from 'react';
import Button from '../Common/Button';

export default function SubmitButton({ children, onClick, disabled }) {
    return (
        <Button
            type="submit"
            variant="primary"
            className="w-full mt-4 h-[48px] flex justify-center items-center shadow-md active:translate-y-0.5"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}
