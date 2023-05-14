import React, {useState} from 'react';

const SimpleStore = () => {

    //errorMessage = 'new Value';
    //setErrorMessage('new value');

    const [errorMessage, setErrorMessage]             = useState(null);
    const [defaultAccount , setDefaultAccount]        = useState(null);
    const [connectButtonText, setConnectButtonText]   = useState('Connect Wallet');
    const [currentContractVal, setCurrentContractVal] = useState(null);
    const [provider , setProvider]                    = useState(null);
    const [signer , setSigner]                        = useState(null);
    const [contrsct, setContrsct]                     = useState(null);

    const connectWalletHandler = () => {
        if (window.ethereum){
            window.ethereum.request({methos: 'eth_requestAccounts'})
                .then(result => {
                    accountChangeHandler(result[0]);
                    setConnectButtonText("Wallet Connected");
                })

        }else{
            setErrorMessage("need To Install MetaMask");
        }
    }

    const accountChangeHandler = (newAccount) => {
        setDefaultAccount(newAccount);
    }

    return (
        <div className='flex flex-col items-center py-11'>
            <h3 className='text-2xl font-bold'>{"Get/Set interaction witch contract"}</h3>
            <button class="my-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-full"onClick={connectWalletHandler}>
                {connectButtonText}
            </button>
            <h3 className='text-2xl'> Address: {defaultAccount}</h3>

            {errorMessage}

        </div>
    );
};

export default SimpleStore;