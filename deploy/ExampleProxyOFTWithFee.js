const LZ_ENDPOINTS = require("@layerzerolabs/lz-sdk");
const {CHAIN_STAGE, ChainStage, ChainKey} = require("@layerzerolabs/lz-sdk");
const TESTNET_DEPLOY_CONFIG = require("../constants/oftWithFeeConfig/deployConfig.json");

// if deploying on mainnet replace chain and address of token you want to proxy
const PROXY_TOKEN_ADDRESS = {
    [ChainStage.AVALANCHE]: "0x0000000000000000000000000000000000000000",
}

// our test proxy contract will deploy on fuji
const NETWORKS = [ChainKey.AVALANCHE, ChainKey.FUJI, ChainKey.FUJI_SANDBOX, "hardhat"]

module.exports = async function ({ deployments, getNamedAccounts }) {
    if(!NETWORKS.includes(hre.network.name)) {
        throw new Error(`Can only deploy ExampleProxyOFTWithFee on ${NETWORKS}`)
    }

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    console.log(`>>> your address: ${deployer}`)

    const sharedDecimals = TESTNET_DEPLOY_CONFIG["ExampleOFTWithFee"].sharedDecimals;
    console.log(`LZ_ENDPOINTS.LZ_ADDRESS[${hre.network.name}]: " ${LZ_ENDPOINTS.LZ_ADDRESS[hre.network.name]}`)
    const lzEndpointAddress = LZ_ENDPOINTS.LZ_ADDRESS[hre.network.name]

    const stage = CHAIN_STAGE[hre.network.name]
    let tokenAddress = PROXY_TOKEN_ADDRESS[stage] || (await deployments.get("MockERC20")).address
    // console.log({tokenAddress, sharedDecimals, lzEndpointAddress})

    await deploy("ExampleProxyOFTWithFee", {
        from: deployer,
        args: [tokenAddress, sharedDecimals, lzEndpointAddress],
        log: true,
        waitConfirmations: 1,
        skipIfAlreadyDeployed: true
    })
}

function getDependencies() {
    if (hre.network.name === "hardhat" || CHAIN_STAGE[hre.network.name] === ChainStage.TESTNET || CHAIN_STAGE[hre.network.name] === ChainStage.TESTNET_SANDBOX) {
        return ["MockERC20"]
    }
}
module.exports.dependencies = getDependencies()
module.exports.tags = ["ExampleProxyOFTWithFee"]