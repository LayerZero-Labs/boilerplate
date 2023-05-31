// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// this is a MOCK
contract MockERC20 is ERC20 {
    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
        // mint 1M to deployer
        _mint(msg.sender, 1_000_000 * 10**decimals());
    }

    function mint(address _to, uint _amount) public {
        _mint(_to, _amount);
    }

    function decimals() public pure override returns (uint8){
        return 18;
    }
}