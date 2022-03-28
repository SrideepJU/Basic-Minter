import React from 'react';

const NavBar = ({accounts,setAccounts}) => {
    const isConnected = Boolean(accounts[0]);// accounts[0] is gonna be address of the wallet

    async function connectAccount(){
        //when using Metamask it injects window.ethereum in the app
        if(window.ethereum){
            const accounts = await window.ethereum.request ({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);// set the account,hence update the accounts state
        }
    }

    return(
        <div>
            {/* Left Side - Social Media Icons */}
            <div>Facebook</div>
            <div>Twitter</div>
            <div>Email</div>

            {/* Right Side - Sections and Connect */} 
            <div>Mint</div>
            <div>Team</div>
            <div>About</div>

            {/* Connect */}
            {isConnected ?(
                <p>Connected</p>
            ):(
                <button onClick ={connectAccount} >Connect </button>
            )}    
        </div>
    )
}

export default NavBar;
