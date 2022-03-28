import {useState} from 'react';
import {ethers,BigNumber} from 'ethers';
//ethers.js library has pkg that allows us to build dapps easily
import WaifuPunkNFTs from './1_main.json'; // importing the ABI
import { EtherscanProvider } from '@ethersproject/providers';

const WaifuPunkNFTsAddress = "0xef856564eC4BEAd69CaEaE733249F21b6cEE4a44";

const MainMint = ({accounts, setAccounts}) => {
    const [mintAmount,setMintAmount] = useState(1); // created another state
    const isConnected = Boolean(accounts[0]);

    async function handleMint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);// connecting ethers to blockchain
            const signer = provider.getSigner();//signs the txn
            const contract = new ethers.Contract(
                WaifuPunkNFTsAddress,
                WaifuPunkNFTs.abi,
                signer
            );

            try{
                const response = await contract.mint(BigNumber.from(mintAmount));//solidity requires bignum
                console.log('response', response);
            }catch(err){
                console.log("error",err);
            }
        }
    }

    const handleDecrement = () =>{
        if(mintAmount <= 1)return ;
        setMintAmount(mintAmount - 1 ); // handle the button that decreases val
    };

    const handleIncrement = () =>{
        if(mintAmount >= 3)return ;
        setMintAmount(mintAmount + 1 ); 
    };

    //time to return visual JS
    return(
        <div>
            <h1>WaifuPunks</h1>
            <p>It's 2100, the age of Robo Waifus. Go ahead and get yours today!</p>
            {isConnected ?( 
                <div>
                     <div>
                         <button onClick = {handleDecrement}>-</button>
                         <input type="number" value={mintAmount}/>
                         <button onClick = {handleIncrement}>+</button>
                     </div>
                    <button onClick ={handleMint}>Mint Now</button>
                </div>

 
            ) : (
                <p>You must be connected to Mint</p>
            )}
        </div>
    )

}

export default MainMint;
