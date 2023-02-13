export class ethersModel {
    /**
     * @param {*} providObj 
     * @param {*} ethersObj 
     * @param {*} chainId 
     * @param {*} Abi 
     */
    constructor(providObj, ethersObj, chainId, Abi) {  
        this.providObj = providObj;
        this.ethersObj = ethersObj;
        this.chainId = chainId;
        this.Abi = Abi;
    }

    run(){
        console.log('run')
    }

    // ERC20 BASE FUNCTION OPTION

    getTotalSupply(){

    }
    
    getBalanceOf(account){
        console.log(account)
    }

    transfer(toAddress, amount){
        console.log(toAddress)
        console.log(amount)
    }
    
    allowance(owner, spender){
        console.log(owner)
        console.log(spender)
    }

    approve(spender, amount){
        console.log(spender)
        console.log(amount)
    }
    
    transferFrom(fromAddress, toAddress, amount){
        console.log(fromAddress)
        console.log(toAddress)
        console.log(amount)
    }
    
    // ERC721 BASEF FUNCTION OPTION


    // ERC1155 BASEF FUNCTION OPTION

}