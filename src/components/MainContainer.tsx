import React from 'react';

const MainContainer = ({children}) => {
    return (
        <div className={'main-container'}>
            <div className={'logo'}/>
            <div className={'authorize-container'}>
                {children}
            </div>
        </div>
    );
};

export default MainContainer;