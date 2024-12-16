// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DAO {
    struct Proposal {
        string description;
        uint256 voteCount;
        bool executed;
        mapping(address => bool) voters;
    }

    IERC20 public governanceToken;
    Proposal[] public proposals;

    constructor(address _governanceToken) {
        governanceToken = IERC20(_governanceToken);
    }

    function createProposal(string calldata description) external {
        Proposal storage newProposal = proposals.push();
        newProposal.description = description;
    }

    function vote(uint256 proposalIndex) external {
        Proposal storage proposal = proposals[proposalIndex];
        require(!proposal.voters[msg.sender], "Already voted");

        uint256 balance = governanceToken.balanceOf(msg.sender);
        require(balance > 0, "Must own tokens to vote");

        proposal.voteCount += balance;
        proposal.voters[msg.sender] = true;
    }

    function executeProposal(uint256 proposalIndex) external {
        Proposal storage proposal = proposals[proposalIndex];
        require(!proposal.executed, "Proposal already executed");
        require(proposal.voteCount > 0, "Proposal has no votes");

        proposal.executed = true;
        // Logic for executing the proposal can be added here
    }

    function getProposal(uint256 proposalIndex) external view returns (string memory description, uint256 voteCount, bool executed) {
        Proposal storage proposal = proposals[proposalIndex];
        return (proposal.description, proposal.voteCount, proposal.executed);
    }
}