export default class Web3Model {
  /**
   * @param {*} providObj
   * @param {*} web3Obj
   * @param {*} chainId
   * @param {*} Abi
   */
  constructor (providObj, web3Obj, chainId = 1, contract = null, abi = null) {
    this.providObj = providObj
    this.web3Obj = web3Obj
    this.chainId = chainId
    this.contract = contract
    this.abi = abi
    this.web3 = new this.web3Obj(providObj)
    if (abi && contract) {
      this.myContract = new this.web3.eth.Contract(abi, contract)
    }
    this.gasLimit = 60000
  }

  // static async getInstance () {
  //   return Promise.resolve(new MyStorage())
  // }
  async run () {
    return 'run'
  }

  // BASE FUNCTION
  async sendTransaction (from, to, value) {
    return await this.web3Obj.eth.sendTransaction({
      from: from,
      to: to,
      value: value
    })
  }

  async sign (messages) {
    const accounts = await this.web3.eth.getAccounts()
    console.log(accounts)
    return await this.web3.eth.sign(this.web3.utils.sha3(messages), accounts[0])
  }

  async getAccounts () {
    const accounts = await this.web3.eth.getAccounts()
    console.log(accounts)
    return accounts[0]
  }

  async personalSign (messages, password) {
    const accounts = await this.web3.eth.getAccounts()
    return await this.web3.eth.personal.sign(this.web3.utils.utf8ToHex(messages), accounts[0], password)
  }

  async personalAcRecover (messages, signed) {
    return await this.web3.eth.personal.ecRecover(messages, signed)
  }

  async signTypedData (msgParams) {
    const accounts = await this.web3.eth.getAccounts()
    return await this.signMsg(accounts[0], msgParams)
  }

  async signMsg (account, msgParams) {
    return await new Promise((resolve, reject) => {
      (async () => {
        var params = [account, msgParams]
        await this.web3.currentProvider.sendAsync({
          method: 'eth_signTypedData_v4',
          params: params,
          from: account
        }, function (err, result) {
          if (err) return reject(err)
          if (result.error) {
            return reject(result.error.message)
          }
          resolve(result.result)
        })
      })().catch((e) => {
        reject('error:', e)
      })
    })
  }

  // ERC20 BASE FUNCTION OPTION
  async getTotalSupply () {
    return await this.myContract.methods.totalSupply().call({ from: this.contract })
  }

  async getBalanceOf (account) {
    return await this.myContract.methods.balanceOf(account).call({ from: this.contract })
  }

  async getAllowance (owner, spender) {
    return await this.myContract.methods.allowance(owner, spender).call({ from: this.contract })
  }

  async transfer (account, toAddress, count) {
    // this.web3Obj.utils.toHex(count)
    return await this.myContract.methods.transfer(toAddress, count).send({ from: account })
  }

  async mint (account, count) {
    return await this.myContract.methods.mint(account, count).send({ from: account })
  }

  async approve (spenderAddress, count) {
    return await this.myContract.methods.approve(spenderAddress, count).send({ from: spenderAddress })
  }

  async transferFrom (fromAddress, toAddress, count) {
    return await this.myContract.methods.transferFrom(fromAddress, toAddress, count).send({ from: fromAddress })
  }

  //  claim
  async claim (tokenContractAddress, amount, nonce, sig, fromAddress) {
    // console.log(tokenContractAddress, amount, nonce, sig, fromAddress)
    return await this.myContract.methods.claim(tokenContractAddress, amount, nonce, sig).send({ from: fromAddress })
  }
  // ERC721 BASEF FUNCTION OPTION

  // ERC1155 BASEF FUNCTION OPTION

  // check Current network
  async checkCurrentNetwork (contractChainId) {
    const netId = await this.web3.eth.net.getId()
    if (contractChainId === netId) {
      return true
    } else {
      return false
    }
  }

  async checkIsMetaMask (provider, chainId) {
    if (typeof (await provider.isMetaMask) !== 'undefined' && await provider.isMetaMask === true) {
      return await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: this.web3.utils.toHex(chainId)
          }
        ]
      }).then(() => {
        return true
      }).catch((err) => {
        if (err.code === 4902) {
          if (this.addNetwork(this.chainId)) {
            this.checkCurrentNetwork()
          }
        } else {
          return false
        }
      })
    } else {
      return false
    }
  }

  // add network
  async addNetwork (chainId) {
    const networkMap = {
      POLYGON_MAINNET: {
        chainId: chainId,
        chainName: 'Matic(Polygon) Mainnet',
        nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/']
      },
      MUMBAI_TESTNET: {
        chainId: chainId,
        chainName: 'Matic(Polygon) Mumbai Testnet',
        nativeCurrency: { name: 'tMATIC', symbol: 'tMATIC', decimals: 18 },
        rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/']
      }
    }
    var CONF
    if (chainId === this.web3Obj.utils.toHex(80001)) {
      CONF = networkMap.MUMBAI_TESTNET
    } else {
      CONF = networkMap.POLYGON_MAINNET
    }

    return await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [CONF]
    }).then(() => {
      return true
    }).catch(() => {
      return false
    })
  }
}