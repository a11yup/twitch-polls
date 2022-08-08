import { getWinningOptions } from "../computations.js";
import { expect } from "chai";

let pollState;

describe("getWinningOptions()", function () {
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

    it("returns an empty array", function () {
      const winningOptions = getWinningOptions(pollState);
      expect(winningOptions).to.eql([]);
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

    it("returns all options as the winning options", function () {
      const winningOptions = getWinningOptions(pollState);
      expect(winningOptions).to.eql(["1", "2"]);
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

    it("returns both options as the winning option", function () {
      const winningOptions = getWinningOptions(pollState);
      expect(winningOptions).to.eql(["1", "2"]);
    });
  });

  describe("when there are three options and one vote each", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " ", 3: " " },
        userVotes: { user1: "1", user2: "2", user3: "3" },
      };
    });

    it("returns all three options as the winning option", function () {
      const winningOptions = getWinningOptions(pollState);
      expect(winningOptions).to.eql(["1", "2", "3"]);
    });
  });

  describe("when there are three options and one clear winner", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " ", 3: " " },
        userVotes: { user1: "2", user2: "3", user3: "3" },
      };
    });

    it("returns the single winning option", function () {
      const winningOptions = getWinningOptions(pollState);
      expect(winningOptions).to.eql(["3"]);
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

    it("returns the single winning option", function () {
      const winningOptions = getWinningOptions(pollState);
      expect(winningOptions).to.eql(["2"]);
    });
  });
});
