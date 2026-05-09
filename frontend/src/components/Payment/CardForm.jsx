import React from 'react';
import FormInput from '../Auth/FormInput';

export default function CardForm() {
    return (
        <div className="space-y-4">
            <FormInput id="cardName" label="Name on Card" placeholder="Jane Doe" />
            <FormInput id="cardNumber" label="Card Number" placeholder="0000 0000 0000 0000" />
            <div className="grid grid-cols-2 gap-4">
                <FormInput id="expiry" label="Expiry (MM/YY)" placeholder="12/25" />
                <FormInput id="cvv" label="CVV" placeholder="123" type="password" />
            </div>
        </div>
    );
}
