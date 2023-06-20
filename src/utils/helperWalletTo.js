const Web3 = require("web3");
const web3 = new Web3();

const helperWalletToSponsorCode = (wallet, size) => {
  const hash = web3.utils.sha3(wallet);
  const hashBytes = web3.utils.hexToBytes(hash);
  const hashBytesSize = hashBytes.slice(0, size);
  const hashFixed = web3.utils.bytesToHex(hashBytesSize);
  return hashFixed.slice(2, 18)
}

module.exports = {
  helperWalletToSponsorCode
}