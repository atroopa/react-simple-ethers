import { ethers } from 'ethers';
import React, {useState} from 'react';
import SimpleStore_abi from "./SimpleStore_abi.json";
import { providers } from 'ethers';

const SimpleStore = () => {

    const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

    const [errorMessage, setErrorMessage]             = useState(null);
    const [defaultAccount , setDefaultAccount]        = useState(null);
    const [connectButtonText, setConnectButtonText]   = useState('Connect Wallet');
    const [currentContractVal, setCurrentContractVal] = useState(null);
    const [provider , setProvider]                    = useState(null);
    const [signer , setSigner]                        = useState(null);
    const [contract, setContract]                     = useState(null);


    const connectWalletHandler = () => {
        if (window.ethereum){
            window.ethereum.request({method: 'eth_requestAccounts'})
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
        updateEthers();
    }


    const updateEthers = () => {
        let tempProvider = new ethers.providers.web3Provider(window.ethereum);
        setProvider(tempProvider);

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        let tempContract = new ethers.Contract(contractAddress, SimpleStore_abi, tempSigner);
        setContract(tempContract);
    }


    return (
        <div className='flex flex-col items-center py-11'>
            <h3 className='text-2xl font-bold'>{"Get/Set interaction witch contract"}</h3>
            <button className="my-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-full"onClick={connectWalletHandler}>
                {connectButtonText}
            </button>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Address: {defaultAccount}
            </h3>


            {errorMessage}

        </div>
    );
};

export default SimpleStore;