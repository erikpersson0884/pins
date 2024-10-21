import React from "react";
import "./ManagePins.css";

import PinDiv from './PinDiv/PinDiv';
import AddPin from './AddPin/AddPin';

import { Pin } from "../../types";

interface ManagePinsProps {
    pins: Pin[],
    setPins: React.Dispatch<React.SetStateAction<Pin[]>>;
}

const ManagePins: React.FC<ManagePinsProps> = ({ pins, setPins }) => {

    function deletePin(pin: Pin) {
        setPins(pins.filter(p => p.id !== pin.id));
    }

    return (
        <div className='managePins hiddenOnPrint'>
            <h1>Pins</h1>

            <hr />
            
            {pins.length > 0 ? (
                pins.map((pin) => (
                    <PinDiv key={pin.id} pin={pin} setPins={setPins} deletePin={() => deletePin(pin)} />
                ))
            ) : (
                <p>No pins yet</p>
            )}

            <div className="actionButtons">
                <AddPin setPins={setPins} />
                <button className="printButton" onClick={() => window.print()}>Print</button>
            </div>
        </div>
    )
}

export default ManagePins;
