
const ConnectToBurnerConnect = async (options) => {
  options.defaultNetwork = options.defaultNetwork || options.chainId

  const provider = new options.drive(options)

  await provider.enable()

  return provider
}

export default ConnectToBurnerConnect
