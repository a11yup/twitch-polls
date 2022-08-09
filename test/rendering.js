import { expect } from "chai";
import globalJsdom from "global-jsdom";
import { handleMessage } from "../main.js";

const TAGS = {
  username: "thelegumeduprix",
  badges: {
    broadcaster: "1",
  },
};

const INITIAL_POLL_STATE = {
  active: false,
  visible: false,
  title: "Poll",
  options: {},
  userVotes: {},
};

describe.only("rendering", function () {
  this.beforeEach(function () {
    const html = `<!DOCTYPE html>
    <html lang="en">
      <body>
        <div class="container">
          <div class="poll"></div>
        </div>
      </body>
    </html>`;
    globalJsdom(html);
  });

  it("works", function () {
    expect(document.querySelector(".poll")).to.be.ok;

    handleMessage(TAGS, "!poll", { ...INITIAL_POLL_STATE });

    expect(document.querySelector(".poll-title")).to.be.ok;
  });
});
