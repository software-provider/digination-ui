<template>
  <div class="warp">
        <div v-show="provider === ''">
            <digi-button  class="cl-btu"  type="primary"  @click="handleClickConnect()">Connect</digi-button>
        </div>
        <div v-show="provider">
            <digi-button  class="cl-btu" type="warning"  @click="handleClickDisconnect()">Disconnect</digi-button>
            <digi-button  class="cl-btu" type="warning"  @click="handleClickGetBalanceOf()">GetBalanceOf</digi-button>
        </div>

        <div class="cl-owner">
            {{owner}}
        </div>
        <div class="cl-owner">
            {{balanceOfCount}}
        </div>
  </div>

</template>

<script>

import Bean from '../assets/Bean.gif'

import WalletConnectLogo from '../assets/logos/walletconnect-circle.svg'

import MetaMaskLogo from '../assets/logos/metamask.svg'

import CoinbaseLogo from '../assets/logos/coinbase.svg'

import BlockWalletLogo from '../assets/logos/BlockWallet.png'

import WalletConnectProvider from '@walletconnect/web3-provider'

import detectEthereumProvider from '@metamask/detect-provider'

import CoinbaseWalletSDK from '@coinbase/wallet-sdk'

import Web3 from 'web3'

const CHAINID = 4
const abi = [{ 'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'owner', 'type': 'address' }, { 'indexed': true, 'internalType': 'address', 'name': 'spender', 'type': 'address' }, { 'indexed': false, 'internalType': 'uint256', 'name': 'value', 'type': 'uint256' }], 'name': 'Approval', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'previousOwner', 'type': 'address' }, { 'indexed': true, 'internalType': 'address', 'name': 'newOwner', 'type': 'address' }], 'name': 'OwnershipTransferred', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'from', 'type': 'address' }, { 'indexed': true, 'internalType': 'address', 'name': 'to', 'type': 'address' }, { 'indexed': false, 'internalType': 'uint256', 'name': 'value', 'type': 'uint256' }], 'name': 'Transfer', 'type': 'event' }, { 'inputs': [{ 'internalType': 'address', 'name': 'owner', 'type': 'address' }, { 'internalType': 'address', 'name': 'spender', 'type': 'address' }], 'name': 'allowance', 'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }], 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [{ 'internalType': 'address', 'name': 'spender', 'type': 'address' }, { 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256' }], 'name': 'approve', 'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }], 'stateMutability': 'nonpayable', 'type': 'function' }, { 'inputs': [{ 'internalType': 'address', 'name': 'account', 'type': 'address' }], 'name': 'balanceOf', 'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }], 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [], 'name': 'decimals', 'outputs': [{ 'internalType': 'uint8', 'name': '', 'type': 'uint8' }], 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [{ 'internalType': 'address', 'name': 'spender', 'type': 'address' }, { 'internalType': 'uint256', 'name': 'subtractedValue', 'type': 'uint256' }], 'name': 'decreaseAllowance', 'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }], 'stateMutability': 'nonpayable', 'type': 'function' }, { 'inputs': [{ 'internalType': 'address', 'name': 'spender', 'type': 'address' }, { 'internalType': 'uint256', 'name': 'addedValue', 'type': 'uint256' }], 'name': 'increaseAllowance', 'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }], 'stateMutability': 'nonpayable', 'type': 'function' }, { 'inputs': [{ 'internalType': 'address', 'name': 'to', 'type': 'address' }, { 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256' }], 'name': 'mint', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function' }, { 'inputs': [], 'name': 'name', 'outputs': [{ 'internalType': 'string', 'name': '', 'type': 'string' }], 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [], 'name': 'owner', 'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }], 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [], 'name': 'renounceOwnership', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function' }, { 'inputs': [], 'name': 'symbol', 'outputs': [{ 'internalType': 'string', 'name': '', 'type': 'string' }], 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [], 'name': 'totalSupply', 'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }], 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [{ 'internalType': 'address', 'name': 'to', 'type': 'address' }, { 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256' }], 'name': 'transfer', 'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }], 'stateMutability': 'nonpayable', 'type': 'function' }, { 'inputs': [{ 'internalType': 'address', 'name': 'from', 'type': 'address' }, { 'internalType': 'address', 'name': 'to', 'type': 'address' }, { 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256' }], 'name': 'transferFrom', 'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }], 'stateMutability': 'nonpayable', 'type': 'function' }, { 'inputs': [{ 'internalType': 'address', 'name': 'newOwner', 'type': 'address' }], 'name': 'transferOwnership', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function' }]

export default {
  name: 'Home',
  data () {
    return {
      walletModalModel: '',
      balanceOfCount: 0,
      provider: '',
      contractAdress: '0x8D0CD152eDCE6D3468884AD1ade809ce6A02e53f',
      owner: '',
      providerOptions: {
        logo: Bean,
        maskColor: 'rgb(30, 30, 30, 0.8)',
        bgColor: '#363636',
        borderColor: '#faba30',
        chainId: CHAINID,
        walletOptions: {
          metamask: {
            displayView: {
              logo: MetaMaskLogo,
              name: 'MetaMask'
            },
            options: {
              drive: detectEthereumProvider
            }
          },
          walletconnect: {
            displayView: {
              logo: WalletConnectLogo,
              name: 'WalletConnect'
            },
            options: {
              drive: WalletConnectProvider,
              rpc: {
                1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
                4: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
              },
              chainId: CHAINID,
              bridge: 'https://bridge.walletconnect.org'
            }
          },
          coinbase: {
            displayView: {
              logo: CoinbaseLogo,
              name: 'Coinbase Wallet'
            },
            options: {
              drive: CoinbaseWalletSDK,
              infuraId: '9aa3d95b3bc440fa88ea12eaa4456161',
              chainId: CHAINID,
              appName: 'Digi',
              appLogoUrl: WalletConnectLogo,
              darkMode: false
            }
          },
          blockmallet: {
            displayView: {
              logo: BlockWalletLogo,
              name: 'BlockWallet'
            },
            options: {}
          }
        }
      }
    }
  },
  mounted () {
    this.walletModalModel = new this.$WalletModalModel(this.providerOptions)
    const walletType = sessionStorage.getItem('injected')
    var _this = this
    if (walletType && typeof (walletType) !== 'undefined') {
      setTimeout(function () {
        _this.handleClickConnect()
      }, 1000)
    }
  },
  methods: {
    async handleClickConnect () {
      var provider = await this.walletModalModel.connect()
      if (provider) {
        this.provider = provider
        console.log('provider', provider)
        this.owner = provider.selectedAddress
      }
    },
    async handleClickDisconnect () {
      this.walletModalModel.disconnect(this.provider)
      this.provider = ''
    },
    async handleClickGetBalanceOf () {
      var web3ModelObj = await new this.$Web3Model(this.provider, Web3, CHAINID, this.contractAdress, abi)
      this.balanceOfCount = await web3ModelObj.getBalanceOf(this.owner)
    }
  }
}
</script>
<style scoped lang="scss">
.cl-owner{
  margin-top: 30px;
}
.cl-btu{
  margin-right: 10px;
}
.warp{
  text-align: center;
}
</style>
