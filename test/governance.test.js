const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GovernanceToken", function () {
  it("Should mint initial tokens to the admin", async function () {
    const [admin] = await ethers.getSigners();

    const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
    const governanceToken = await GovernanceToken.deploy();
    await governanceToken.deployed();

    const adminBalance = await governanceToken.balanceOf(admin.address);
    expect(adminBalance).to.equal(ethers.utils.parseEther("1000000"));
  });

  it("Should allow admin to mint new tokens", async function () {
    const [admin, otherAccount] = await ethers.getSigners();

    const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
    const governanceToken = await GovernanceToken.deploy();
    await governanceToken.deployed();

    await governanceToken.mint(otherAccount.address, ethers.utils.parseEther("100"));
    const otherBalance = await governanceToken.balanceOf(otherAccount.address);
    expect(otherBalance).to.equal(ethers.utils.parseEther("100"));
  });
});