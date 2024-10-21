import React from 'react'
import './PinDiv.css'

import { Pin } from '../../../types';

interface CreatePinDivProps {
    pin: Pin;
    setPins: React.Dispatch<React.SetStateAction<Pin[]>>;
    deletePin: () => void;
}

const PinDiv: React.FC<CreatePinDivProps> = ({ pin, setPins, deletePin }) => {

    const [imageUrl, setImageUrl] = React.useState<string>(pin.imageUrl);
    const [createPadding, setCreatePadding] = React.useState<boolean>(pin.createPadding);
    const [backgroundColor, setBackgroundColor] = React.useState<string>(pin.backgroundColor || "inherit");
    const [amount, setAmount] = React.useState<number>(pin.amount);

    React.useEffect(() => {
        setPins((prevPins: Pin[]) => prevPins.map(p => {
            if (p === pin) {
                return {
                    ...p,
                    createPadding,
                    backgroundColor,
                    amount,
                    imageUrl
                }
            }
            return p
        }))
    }, [createPadding, backgroundColor, amount, imageUrl])



    return (
        <div className='pinDiv'>    
            <div className='uploadImageDiv'>
                <input 
                    type="file" 
                    id={`imageUrlInput ${pin.id}`} 
                    name="imageUrl" 
                    accept="image/*" 
                    style={{display: 'none'}} 
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setImageUrl(URL.createObjectURL(file));
                    }}
                />
                <div
                    className={`previewPin ${createPadding ? 'paddedPin' : 'prePaddedPin'}`} 
                    style={{ 
                        backgroundColor: backgroundColor
                    }}
                    onClick={() => document.getElementById(`imageUrlInput ${pin.id}`)?.click()}
                >
                    <div className='previewPinImage'
                        style={{ 
                            backgroundColor: backgroundColor,
                            backgroundImage: `url(${imageUrl})`,
                        }}
                    >
                    </div>
                </div>    
            </div>

            <hr />

            <div className='settingsDiv'>
                <h1>Settings</h1>

                <div className='inputDiv'>
                <input 
                    className='amountInput'
                    type="text" 
                    id={`amount ${pin.id}`} 
                    name="amount" 
                    value={amount} 
                    onChange={(e) => {
                        const newValue = e.target.value;

                        if (/^\d{0,2}$/.test(newValue)) {
                            setAmount(Number(newValue));
                        }
                    }} 
                />
                    <label htmlFor={`amount ${pin.id}`}>Number of pins</label>

                </div>

                <div className='inputDiv'>
                    <img
                        id={`createPadding ${pin.id}`}
                        className='createPaddingInput'
                        src={pin.createPadding?"images/checkboxChecked.svg" : "images/checkbox.svg"} 
                        alt="Pin" 
                        onClick={() => setCreatePadding(!pin.createPadding)} 
                    />

                    <label htmlFor={`createPadding ${pin.id}`} >Create Padding</label>
                </div>

                <div className='inputDiv'>
                <div 
                    className='openBackgroundColorButton' 
                    style={{backgroundColor: backgroundColor}}
                    onClick={() => document.getElementById(`backgroundColorInput ${pin.id}`)?.click()}
                />

                <input 
                    className='backgroundColorInput'
                    type="color" 
                    id={`backgroundColorInput ${pin.id}`} 
                    name={`backgroundColorInput ${pin.id}`} 
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                />

                <label htmlFor={`backgroundColorInput ${pin.id}`} >Background Color</label>
            </div>

                <p className='backgroundColorDisclaimer'>
                    NOTE: To actually print with background color, you have to turn it on or off in the print tab
                </p>
            </div>

            <button className='deleteButton' onClick={deletePin}>
                <img src="images/delete.svg" alt="Delete" />
            </button>
        </div>
    )
}

export default PinDiv