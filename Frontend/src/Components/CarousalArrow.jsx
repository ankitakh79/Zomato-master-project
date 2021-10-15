import React from 'react';

export const NextArrow = (props) => {
    return (
        <div 
            className={props.className} 
            style={{...props.style, backgroundColor: "#0ab9db"}} 
            onClick={props.onClick}
        />
    );
};
export const PrevArrow = (props) => {
    return (
        <div 
            className={props.className} 
            style={{...props.style, backgroundColor: "#0ab9db"}} 
            onClick={props.onClick}
        />
    );
};

