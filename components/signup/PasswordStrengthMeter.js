import { useState, useEffect } from 'react';

const PasswordStrengthMeter = ({ passwordScore }) => {
    const changeMeterColor = () => {
        switch (passwordScore) {
            case 25:
                return 'red';
            case 50:
                return 'orange';
            case 75:
                return 'yellow';
            case 100:
                return 'green';
            default:
                return 'none';
        }
    }

    const changeStyle = () => ({
        background: changeMeterColor(),
        width: `${passwordScore}%`
    })

    const createPasswordLabel = () => {
        switch (passwordScore) {
            case 0: 
                return 'very weak'
            case 25:
                return 'weak';
            case 50:
                return 'fair';
            case 75:
                return 'good';
            case 100:
                return 'strong';
            default:
                return 'none';
        }
    }

    return (
        <>
            <div className="w-full bg-gray-200 h-1">
                <div className="h-1" style={changeStyle()}></div>
            </div>
            <p>{createPasswordLabel()}</p>
        </>
    )
}

export default PasswordStrengthMeter;