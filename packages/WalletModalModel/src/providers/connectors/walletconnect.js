import { getChainId } from "../../tools";

const ConnectToWalletConnect = async (
  options
) => {
  return await new Promise((resolve, reject) => {
    (async () => {
      let bridge = "https://bridge.walletconnect.org";
      let qrcode = true;
      let infuraId = "";
      let rpc = undefined;
      let chainId = 1;
      let qrcodeModalOptions = undefined;

      if (options) {
        bridge = options.bridge || bridge;
        qrcode = typeof options.qrcode !== "undefined" ? options.qrcode : qrcode;
        infuraId = options.infuraId || "";
        rpc = options.rpc || undefined;
        chainId =
          options.network && getChainId(options.network) ? getChainId(options.network) : 1;
        qrcodeModalOptions = options.qrcodeModalOptions || undefined;
      }

      const provider = new options.drive({
        bridge,
        qrcode,
        infuraId,
        rpc,
        chainId,
        qrcodeModalOptions
      });
      try {
        await provider.enable();
        resolve(provider);
      } catch (e) {
        reject(e);
      }
    })().catch((e) => {
      reject("error:", e)
    });
  });
};

export default ConnectToWalletConnect;
