import React, { useEffect, useState, useCallback } from 'react'
const AwardsPage = () => {
    const awardsPageStyle = {
        textAlign: 'center',
        padding: '20px 0',
    };

    return (
        <div id="awards-page" className="page" style={awardsPageStyle}>
            <h2>Horai Achievement Awards</h2>
            <p>Track your consistency and earn blessings from the ancient goddesses of time, the Horae!</p>

            <div className="awards-grid">
                
                <div className="award-card">
                    <img src="./public/owl.png" alt="Athena's Owl" className="award-image" />
                    <h3>Athena's Strategic Wisdom</h3>
                    <p>The goddess Athena rewards those who demonstrate masterful planning. This award is earned for maintaining a High Priority task completion rate above 95% for 20 consecutive days.</p>
                    <span className="award-status status-locked">Status: Locked</span>
                </div>

                <div className="award-card">
                    <img src="./public/shell.png" alt="Aphrodite's Shell" className="award-image" />
                    <h3>Harmony of Aphrodite</h3>
                    <p>Balance is beauty. Awarded for keeping a flawlessly consistent task record of no delays or changes for 20 consecutive days. A testament to discipline and inner peace.</p>
                    <span className="award-status status-locked">Status: Locked</span>
                </div>

            </div>
        </div>
    );
};

export default AwardsPage;