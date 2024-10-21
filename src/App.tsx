import React from 'react';
import './App.css'

import ManagePins from './Components/ManagePins/ManagePins'
import PrintPage from './Components/printPage/printPage';
import Footer from './Components/Footer/Footer';

import { Pin } from './types';

function App() {

    const [pins, setPins] = React.useState<Pin[]>([]);

    return (
        <>
            <ManagePins pins={pins} setPins={setPins} />

            <PrintPage pins={pins}/>

            <Footer />
        </>
    )
}

export default App
