// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GovernanceToken is ERC20 {
    address public admin;

    constructor() ERC20("GovernanceToken", "GOV") {
        admin = msg.sender;
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Mint 1 million tokens to the admin
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == admin, "Only admin can mint");
        _mint(to, amount);
    }
}