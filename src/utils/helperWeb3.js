const Web3 = require('web3');
const web3 = new Web3('https://bsc-dataseed.binance.org/');
const contractAbi = require('./contractAbi.json');
const contractAddress = '0xfE9549bb13Bf62dB64860eDbcdBEbC094D78e3F5';
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const helperHoldersCounts = async () => {
  const holders = await contract.methods
    .balanceOf(contractAddress) // dirección del contrato
    .call()

  console.log(`El token tiene ${holders} holders.`)

  return 1000
}

const helperHoldersList = async () => {
  // Obtener el número de decimales del token
  const decimals = await tokenContract.methods
    .decimals()
    .call();

  // Calcular el total de tokens emitidos
  const totalTokens = await tokenContract.methods
    .totalSupply()
    .call();

  // Recorrer todas las direcciones posibles que pueden tener tokens
  for (let i = 0; i < totalTokens; i++) {
    const balance = await tokenContract.methods
      .balanceOf(web3.utils.toChecksumAddress(`0x${i.toString().padStart(40, '0')}`))
      .call();
    if (balance > 0) {
      console.log(`La dirección 0x${i.toString().padStart(40, '0')} tiene un saldo de ${balance / 10 ** decimals} tokens.`);
    }
  }

  return 1000
}

module.exports = {
  helperHoldersCounts
}