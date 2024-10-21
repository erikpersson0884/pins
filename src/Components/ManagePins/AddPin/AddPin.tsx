import React from 'react'
import './AddPin.css'

import { Pin } from '../../../types';

interface AddPinProps {
    setPins: React.Dispatch<React.SetStateAction<Pin[]>>;
}

const AddPin: React.FC<AddPinProps> = ({ setPins }) => {

    function handleAddPin(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const newPin: Pin = {
            id: Math.random().toString(36),
            imageUrl: URL.createObjectURL(file),
            createPadding: false,
            amount: 24,
            backgroundColor: null,
        }

        setPins((prev: Pin[]) => [...prev, newPin]);
        e.target.value = ''; // clear the input for future uploads
    }

    function triggerFileInput() {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) fileInput.click();
    }

    return (
        <div>
            <button onClick={triggerFileInput}>Add Pin</button>
            <input id='fileInput' className='hidden' type='file' accept='image/*' onChange={handleAddPin} />
        </div>
    )
}


export default AddPin;
