import { filterValidUserVotes } from "../computations.js";
import { expect } from "chai";

let pollState;

describe("filterValidUserVotes()", function () {
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

    it("returns an empty user votes object", function () {
      const filteredUserVotes = filterValidUserVotes(pollState);
      expect(filteredUserVotes).to.eql({});
    });
  });

  describe("when there are 2 options and one of three users annulled the vote", function () {
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
      const filteredUserVotes = filterValidUserVotes(pollState);
      expect(filteredUserVotes).to.eql({
        user1: "1",
        user2: "2",
      });
    });
  });
});
