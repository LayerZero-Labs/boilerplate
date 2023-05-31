const LZ_ENDPOINTS = require("@layerzerolabs/lz-sdk");
const TESTNET_DEPLOY_CONFIG = require("../constants/oftWithFeeConfig/deployConfig.json");

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    console.log(`>>> your address: ${deployer}`)

    const name = TESTNET_DEPLOY_CONFIG["ExampleOFTWithFee"].tokenName;
    const symbol = TESTNET_DEPLOY_CONFIG["ExampleOFTWithFee"].tokenSymbol;
    const sharedDecimals = TESTNET_DEPLOY_CONFIG["ExampleOFTWithFee"].sharedDecimals;
    const lzEndpointAddress = LZ_ENDPOINTS.LZ_ADDRESS[hre.network.name]
    console.log({name, symbol, sharedDecimals, lzEndpointAddress})

    await deploy("ExampleOFTWithFee", {
        from: deployer,
        args: [name, symbol, sharedDecimals, lzEndpointAddress],
        log: true,
        waitConfirmations: 1,
        skipIfAlreadyDeployed: true
    })
}

module.exports.tags = ["ExampleOFTWithFee"]
