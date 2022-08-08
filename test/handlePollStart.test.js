import { handlePollStart } from "../main.js";
import { expect } from "chai";

let pollState;

describe("handlePollStart()", function () {
  describe("when no current poll is active or visible", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
      };
    });

    it('keeps the default title "Poll"', function () {
      expect(pollState.title).to.equal("Poll");
      const newState = handlePollStart(`!poll`, pollState);
      expect(newState.title).to.equal("Poll");
    });

    it(`starts a poll when message is: !poll`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll`, pollState);
      expect(newState.active).to.be.true;
    });

    it(`starts a poll when message is: !poll 3`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll 3`, pollState);
      expect(newState.active).to.be.true;
    });

    it.skip(`does not start a poll when message is: !poll 1`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll 1`, pollState);
      expect(newState.active).to.be.false;
    });

    it(`does not start a poll when message is: !poll 10`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll 10`, pollState);
      expect(newState.active).to.be.false;
    });

    it(`starts a poll when message is: !poll "q" "a" "b"`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll "q" "a" "b"`, pollState);
      expect(newState.active).to.be.true;
    });

    it(`starts a poll when message is: !poll "" "a" "b"`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll "" "a" "b"`, pollState);
      expect(newState.active).to.be.true;
    });

    it(`does not start a poll when message is: !poll "" "" "b"`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll "" "" "b"`, pollState);
      expect(newState.active).to.be.false;
    });

    it(`does not start a poll when message is: !poll "q" "a"`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll "q" "a"`, pollState);
      expect(newState.active).to.be.false;
    });

    it(`does not start a poll when message is: !poll "q"`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll "q"`, pollState);
      expect(newState.active).to.be.false;
    });

    it(`does not start a poll when message is: !poll ""`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll ""`, pollState);
      expect(newState.active).to.be.false;
    });

    it(`does not start a poll when message is: !poll q" "a"`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll q" "a"`, pollState);
      expect(newState.active).to.be.false;
    });

    describe(`when receiving the message: !poll`, function () {
      it("sets the poll state to active, visible and with two options", function () {
        const newState = handlePollStart(`!poll`, pollState);

        expect(newState).to.eql({
          active: true,
          visible: true,
          title: "Poll",
          options: { 1: " ", 2: " " },
          userVotes: {},
        });
      });
    });

    describe(`when receiving the message: !poll 2`, function () {
      it("sets the poll state to active, visible and with two options", function () {
        const newState = handlePollStart("!poll 2", pollState);

        expect(newState).to.eql({
          active: true,
          visible: true,
          title: "Poll",
          options: { 1: " ", 2: " " },
          userVotes: {},
        });
      });
    });

    describe(`when receiving the message: !poll 9`, function () {
      it("sets the poll state to active, visible and with nine options", function () {
        const newState = handlePollStart("!poll 9", pollState);

        expect(newState).to.eql({
          active: true,
          visible: true,
          title: "Poll",
          options: {
            1: " ",
            2: " ",
            3: " ",
            4: " ",
            5: " ",
            6: " ",
            7: " ",
            8: " ",
            9: " ",
          },
          userVotes: {},
        });
      });
    });
  });
});
