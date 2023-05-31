const {BigNumber} = require("ethers");
const CHAIN_ID = require("@layerzerolabs/lz-sdk").CHAIN_ID

module.exports = async function (taskArgs, hre) {
    let signers = await ethers.getSigners()
    let owner = signers[0]
    let toAddress = owner.address;
    let qty = BigNumber.from(taskArgs.qty)

    // get remote chain id
    const remoteChainId = CHAIN_ID[taskArgs.targetNetwork]

    // get ExampleOFT contract
    const exampleOFT = await ethers.getContract("ExampleOFT")

    // quote fee with default adapterParams
    let adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 100000])

    let fees = await exampleOFT.estimateSendFee(remoteChainId, toAddress, qty, false, adapterParams)
    console.log(`fees[0] (wei): ${fees[0]} / (eth): ${ethers.utils.formatEther(fees[0])}`)

    tx = await (
        await exampleOFT.sendFrom(
            owner.address,
            remoteChainId,
            toAddress,
            qty,
            owner.address,
            ethers.constants.AddressZero,
            adapterParams,
            { value: fees[0] }
        )
    ).wait()
    console.log(`✅ Message Sent [${hre.network.name}] sendTokens() to OFT @ LZ chainId[${remoteChainId}] token:[${toAddress}]`)
    console.log(` tx: ${tx.transactionHash}`)
    console.log(`* check your address [${owner.address}] on the destination chain, in the ERC20 transaction tab!"`)
}
