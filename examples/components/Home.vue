<template>
  <div class="warp">
        <div  v-show="provider === ''">
            <digi-button   type="primary"   @click="handleClickConnect()">Connect</digi-button>
        </div>
        <div  v-show="provider">
            <digi-button   type="warning"   @click="handleClickDisconnect()">Disconnect</digi-button>
        </div>
        <div class="cl-owner">
            {{ownerAddress}}
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

export default {
  name: 'Home',
  data () {
    return {
      ownerAddress: '',
      walletModalModel: '',
      provider: '',
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
        this.ownerAddress = provider.selectedAddress
      }
    },
    async handleClickDisconnect () {
      this.walletModalModel.disconnect(this.provider)
      this.provider = ''
      this.ownerAddress = ''
    }
  }
}
</script>
<style scoped lang="scss">
.cl-owner{
  margin-top: 30px;
}

.warp{
  text-align: center;
}
</style>
