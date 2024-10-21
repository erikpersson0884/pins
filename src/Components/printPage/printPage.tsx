import React from "react";
import "./printPage.css";

import { Pin } from "../../types";

const printPage: React.FC<{pins: Pin[]}> = ({pins}) => {

    let pinsToPrint = pins?.flatMap((pin, index) => {
        return Array.from({ length: pin.amount }, (_, i) => (
            <div 
                key={`${index}-${i}`} 
                className="pinContainer"
                style={{backgroundColor: pin.backgroundColor || 'transparent'}}
            >
                <img className={`pin ${pin.createPadding? "paddedPin" : "prePaddedPin "}`} src={pin.imageUrl} alt='pinImage' />
            </div>
        ));
    });

    return (
        pins &&
        <article className='printPage hiddenOnScreen'>
            {pinsToPrint && pinsToPrint.reduce((acc: JSX.Element[], pin: any, index: number) => {
                if (index % 4 === 0) {
                    acc.push(<section key={`row-${index}`} className='row'>{[]}</section>);
                }
                acc[acc.length - 1].props.children.push(pin);
                return acc;
            }, [])}
        </article>
    )
}

export default printPage;
