import React, {useState} from 'react';

const SimpleStore = () => {

    const [errorMessage, setErrorMessage]      = useState(null);
    const [defaultAccount , setDefaultAccount] = useState(null);
    const [connectButtonText, setConnectButtonText] = useState(null);

    const connectWalletHandler = () => {

    }

    return (
        <div className='flex flex-col items-center py-11'>
            <h3 className='text-2xl font-bold'>{"Get/Set interaction witch contract"}</h3>
            <button onClick={connectWalletHandler}>{connectButtonText}</button>
        </div>
    );
};

export default SimpleStore;