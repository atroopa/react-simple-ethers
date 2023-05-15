import { ethers }        from 'ethers';
import React, {useState} from 'react';
import SimpleStore_abi   from "./SimpleStore_abi.json";


const SimpleStore = () => {

    const contractAddress                             = '0xe8cfe115152c4325e348a54140d7a765f4c36582';
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


    const updateEthers = async () => {
        let tempProvider = new ethers.BrowserProvider(window.ethereum)
        setProvider(tempProvider);

        let tempSigner = await tempProvider.getSigner();
        setSigner(tempSigner);

        let tempContract = new ethers.Contract(contractAddress, SimpleStore_abi, tempSigner);
        setContract(tempContract);
    }

    const getCurrentVal = async () => {
        let val = await contract.get();
        setCurrentContractVal(val);
    }

    const setHandler = event => {
        event.preventDefault();
        contract.set(event.target.setText.value);
    }

    return (
        <div className='flex flex-col items-center py-11'>
            <h3 className='text-2xl font-bold  text-slate-200'>{"Get/Set interaction witch contract"}</h3>
            <button className="my-10 
                               bg-gradient-to-r 
                               from-purple-400 
                               via-pink-500 
                               to-red-500  
                               font-bold 
                               py-2 
                               px-4 
                               rounded-full
                               text-slate-200" onClick={connectWalletHandler}>
                               {connectButtonText}
            </button>
            <h3 className="text-2xl 
                           font-bold 
                           bg-gradient-to-r 
                           from-purple-400 
                           via-pink-500 
                           to-red-500 
                           bg-clip-text 
                           
                           text-transparent">

                           Address: {defaultAccount}
            </h3>

            <form className='flex space-x-5 items-center' onSubmit={setHandler}>
                <input className="w-1/3
                                  h-1/5 
                                  px-4 
                                  py-2 
                                  border 
                                  border-gray-500 
                                  outline-none 
                                  focus:border-gray-800
                                  bg-slate-400
                                  text-white
                                  " id='setText' type='text'/>

                <button className='my-10 
                                   bg-gradient-to-r 
                                   from-gray-400 
                                   via-pink-500 
                                   to-gray-900 
                                   text-slate-200
                                   font-bold 
                                   py-2 
                                   px-4 
                                   rounded-full' type={"submit"}> Update Contract </button>
            </form>

            <button className="my-10 
                               bg-gradient-to-r 
                               from-red-700 
                               via-orange-500 
                               to-yellow-500 
                               text-slate-200 font-bold py-2 px-4 rounded-full" 
                               onClick={getCurrentVal}>
                Get Current Val
            </button>

            <div className='text-slate-200 font-bold text-5xl py-8'>
                {currentContractVal}    
            </div> 
            <div className='text-red-500 text-2xl py-8'>
                {errorMessage}
            </div>

        </div>
    );
};

export default SimpleStore;