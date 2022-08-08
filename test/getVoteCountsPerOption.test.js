import { getVoteCountsPerOption } from "../computations.js";
import { expect } from "chai";

let pollState;

describe("getVoteCountsPerOption()", function () {
  describe("when there are no options", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
      };
    });

    it("returns an empty object", function () {
      const voteCountsPerOption = getVoteCountsPerOption(pollState);
      expect(voteCountsPerOption).to.eql({});
    });
  });

  describe("when there are options, but zero votes", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: {},
      };
    });

    it("returns zero vote counts for all options", function () {
      const voteCountsPerOption = getVoteCountsPerOption(pollState);
      expect(voteCountsPerOption).to.eql({
        1: 0,
        2: 0,
      });
    });
  });

  describe("when there are two options and one vote each", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "1", user2: "2" },
      };
    });

    it("returns one vote count for each option", function () {
      const voteCountsPerOption = getVoteCountsPerOption(pollState);
      expect(voteCountsPerOption).to.eql({
        1: 1,
        2: 1,
      });
    });
  });

  describe("when there are two options and two votes for the second option", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "2", user2: "2" },
      };
    });

    it("returns a vote count of two for the second option and zero for the first", function () {
      const voteCountsPerOption = getVoteCountsPerOption(pollState);
      expect(voteCountsPerOption).to.eql({
        1: 0,
        2: 2,
      });
    });
  });

  describe("when there are two options and two votes for the second option and one annuled vote", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "2", user2: "2", user3: "0" },
      };
    });

    it("returns a vote count of two for the second option and zero for the first", function () {
      const voteCountsPerOption = getVoteCountsPerOption(pollState);
      expect(voteCountsPerOption).to.eql({
        1: 0,
        2: 2,
      });
    });
  });
});
