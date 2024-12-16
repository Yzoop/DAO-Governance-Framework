const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DAO", function () {
  it("Should allow creating and voting on proposals", async function () {
    const [admin, voter] = await ethers.getSigners();

    // Deploy GovernanceToken
    const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
    const governanceToken = await GovernanceToken.deploy();
    await governanceToken.deployed();

    // Transfer tokens to voter
    await governanceToken.mint(voter.address, ethers.utils.parseEther("100"));

    // Deploy DAO
    const DAO = await ethers.getContractFactory("DAO");
    const dao = await DAO.deploy(governanceToken.address);
    await dao.deployed();

    // Create a proposal
    await dao.createProposal("Proposal 1");

    // Vote on the proposal
    await governanceToken.connect(voter).approve(dao.address, ethers.utils.parseEther("100"));
    await dao.connect(voter).vote(0);

    const proposal = await dao.getProposal(0);
    expect(proposal.voteCount).to.equal(ethers.utils.parseEther("100"));
  });
});