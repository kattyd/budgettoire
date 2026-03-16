// import { useEffect, useState } from 'react';
// import minus from "../assets/minus.png"
// import plus from "../assets/plus.png"
// import './Action.css'

// function Action() {
// return (
// <div className="action-row">
//     <div className="action">
//         <div className="card-a">
//             <label>
//                 <img src={plus}/>
//                 <p>income</p>
//             </label>
//         </div>
//         <div className="card-b">
//             <label>
//                 <img src={minus}/>
//                 income
//             </label>
//         </div>
//         <div className="card-c">
//             <label>income</label>
//         </div>
//     </div>
// </div>
//     )
// }

// export default Action;

import React from 'react';
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
import './Action.css';

// I added an 'onActionClick' prop so we can eventually wire these up to your form!
function Action({ onActionClick }) {
    return (
        <div className="action-container">
            <div className="action-card" onClick={() => onActionClick('income')}>
                <div className="icon-wrapper icon-green">
                    <img src={plus} alt="Add income" />
                </div>
                <div className="action-text">
                    <h4>Add income</h4>
                    <p>Create an income manually</p>
                </div>
            </div>

            <div className="action-card" onClick={() => onActionClick('expense')}>
                <div className="icon-wrapper icon-red">
                    <img src={minus} alt="Add expense" />
                </div>
                <div className="action-text">
                    <h4>Add expense</h4>
                    <p>Create an expense manually</p>
                </div>
            </div>

            <div className="action-card">
                {/* You'll need to export your purple transfer icon from Figma and import it here */}
                <div className="icon-wrapper icon-purple">
                    <span>⇄</span> 
                </div>
                <div className="action-text">
                    <h4>Create budget</h4>
                    <p>Select the amount and make a transfer</p>
                </div>
            </div>
        </div>
    );
}

export default Action;
