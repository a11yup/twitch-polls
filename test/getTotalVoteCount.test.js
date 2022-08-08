import { getTotalVoteCount } from "../computations.js";
import { expect } from "chai";

let pollState;

describe("getTotalVoteCount()", function () {
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

    it("returns 0", function () {
      const totalVoteCount = getTotalVoteCount(pollState);
      expect(totalVoteCount).to.equal(0);
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

    it("returns 0", function () {
      const totalVoteCount = getTotalVoteCount(pollState);
      expect(totalVoteCount).to.equal(0);
    });
  });

  describe("when there are options and 2 votes and one annulled vote", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "1", user2: "2", user3: "0" },
      };
    });

    it("filters out the annulled vote", function () {
      const totalVoteCount = getTotalVoteCount(pollState);
      expect(totalVoteCount).to.equal(2);
    });
  });
});
