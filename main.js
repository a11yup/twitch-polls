const POLL_SIMPLE_DETECTION_PATTERN = /^!poll$/;
const POLL_NUMBER_DETECTION_PATTERN = /^!poll \d$/;
const POLL_QUOTED_PARAMETER_DETECTION_PATTERN =
  /^!poll( "[^"]*")( "[^"]+"){2,}$/;
const POLL_TITLE_DETECTION_PATTERN = /^!polltitle( "[^"]+")$/;

const POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN = /"([^"]*)"/g;
const POLL_POSITION_DETECTION_PATTERN =
  /^!poll_tl$|!poll_tr$|!poll_br$|!poll_bl$/;

const pollState = {
  active: false,
  visible: false,
  title: "Poll",
  options: {},
  userVotes: {},
};

const POSITION_MAP = {
  tl: "top-left",
  tr: "top-right",
  br: "bottom-right",
  bl: "bottom-left",
};

function createPollDisplay() {
  pollState.visible = true;

  const pollElement = document.querySelector(".poll");

  pollElement.style = "visibility: visible;";

  const titleElement = document.createElement("h1");
  titleElement.id = "poll-title";
  titleElement.className = "poll-title";
  titleElement.innerHTML = pollState.title;
  pollElement.append(titleElement);

  Object.entries(pollState.options).forEach(([key, value]) => {
    const option = document.createElement("div");
    option.id = `option-${key}`;
    option.className = "option";

    const optionText = document.createElement("div");
    optionText.innerHTML = `<div class="option-number">${key}</div> ${value}: <span class="percentage">0% (0)</span>`;

    const progressBarContainer = document.createElement("div");
    progressBarContainer.setAttribute("id", `progress-bar-container-${key}`);
    progressBarContainer.className = "progress-bar-container";

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.setAttribute("id", `progress-bar-${key}`);

    progressBarContainer.append(progressBar);
    option.append(optionText);
    option.append(progressBarContainer);
    pollElement.append(option);
  });
}

function updatePollDisplay(finished = false) {
  const titleElement = document.getElementById("poll-title");
  titleElement.innerHTML = pollState.title;

  const userVotesClean = Object.entries(pollState.userVotes).reduce(
    (result, [user, vote]) => {
      if (vote !== "0") {
        result[user] = vote;
      }
      return result;
    },
    {}
  );

  const voteCount = Object.values(userVotesClean).length;

  const pointsObject = Object.values(userVotesClean).reduce(
    (result, userVote) => {
      result[userVote]
        ? (result[userVote] = result[userVote] + 1)
        : (result[userVote] = 1);
      return result;
    },
    {}
  );

  Object.entries(pollState.options).forEach(([key, value]) => {
    const percentageElement = document.querySelector(
      `#option-${key} .percentage`
    );
    const progressBar = document.querySelector(`#progress-bar-${key}`);

    const percentage =
      voteCount === 0
        ? 0
        : Math.round(((pointsObject[key] || 0) / voteCount) * 100);

    progressBar.style.width = percentage + "%";
    percentageElement.innerHTML = `${percentage}% (${pointsObject[key] || 0})`;
  });

  if (finished) {
    let winningOptions = [];
    let winningPoints = 0;
    Object.entries(pointsObject).forEach(([option, points]) => {
      if (points == winningPoints) {
        winningPoints = points;
        winningOptions.push(option);
      } else if (points > winningPoints) {
        winningPoints = points;
        winningOptions = [option];
      }
    });

    if (winningOptions.length === 0) {
      Object.keys(pollState.options).forEach((option) => {
        const optionElement = document.getElementById(`option-${option}`);
        optionElement.classList.add("no-votes");
      });
    } else if (winningOptions.length === 1) {
      const optionElement = document.getElementById(
        `option-${winningOptions[0]}`
      );

      optionElement.classList.add("winning-option");
      optionElement.classList.add("animate__animated");
      optionElement.classList.add("animate__bounceIn");
    } else if (winningOptions.length > 1) {
      winningOptions.forEach((winningOption) => {
        const optionElement = document.getElementById(
          `option-${winningOption}`
        );

        optionElement.classList.add("draw-option");
        optionElement.classList.add("animate__animated");
        optionElement.classList.add("animate__shakeX");
      });
    }
  } else {
    Object.keys(pollState.options).forEach((option) => {
      const optionElement = document.getElementById(`option-${option}`);
      optionElement.className = "option";
    });
  }
}

function removePollDisplay() {
  const pollElement = document.querySelector(".poll");
  pollElement.innerHTML = "";
  pollElement.style = "visibility: hidden";
}

function updatePollPosition(message) {
  const positionSuffix = message.split("_")[1];
  const containerElement = document.querySelector(".container");
  const newPositionClassName = POSITION_MAP[positionSuffix];

  containerElement.classList.remove(
    "top-left",
    "top-right",
    "bottom-right",
    "bottom-left"
  );
  containerElement.classList.add(newPositionClassName);
}

function handlePollCommands(channel, tags, message, self) {
  if (!tags.badges?.broadcaster) return;

  if (POLL_POSITION_DETECTION_PATTERN.test(message)) {
    updatePollPosition(message);
    return;
  }

  if (
    (POLL_SIMPLE_DETECTION_PATTERN.test(message) ||
      POLL_NUMBER_DETECTION_PATTERN.test(message) ||
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN.test(message)) &&
    !pollState.visible &&
    !pollState.active
  ) {
    pollState.active = true;
    pollState.userVotes = {};
    pollState.options = {};
    pollState.title = "Poll";

    if (POLL_SIMPLE_DETECTION_PATTERN.test(message)) {
      for (let index = 1; index <= 2; index++) {
        pollState.options[index] = " ";
      }
    } else if (POLL_NUMBER_DETECTION_PATTERN.test(message)) {
      const number = message.match(/!poll (\d)/)?.[1];

      if (number) {
        for (let index = 1; index <= number; index++) {
          pollState.options[index] = " ";
        }
      }
    } else if (POLL_QUOTED_PARAMETER_DETECTION_PATTERN.test(message)) {
      const options = [
        ...message.matchAll(POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN),
      ].map((match) => match[1]);

      const title = options.shift();
      pollState.title = title || "Poll";

      options.forEach((option, index) => {
        pollState.options[index + 1] = option;
      });
    }

    createPollDisplay();

    return;
  }

  if (POLL_TITLE_DETECTION_PATTERN.test(message) && pollState.active) {
    const options = message.match(POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN);

    const title = options.shift().replaceAll('"', "");
    pollState.title = title;

    updatePollDisplay();

    return;
  }

  if (message.match(/^!pollstop/g) && pollState.active) {
    pollState.active = false;
    updatePollDisplay(true);

    return;
  }

  if (
    message.match(/^!pollresume/g) &&
    pollState.visible &&
    !pollState.active
  ) {
    pollState.active = true;
    updatePollDisplay(false);

    return;
  }

  if (message.match(/^!pollend/g)) {
    pollState.active = false;
    pollState.visible = false;
    removePollDisplay();

    return;
  }
}

function handlePollVotes(channel, tags, message, self) {
  if (pollState.active && message.match(/^\d$/g)) {
    const voteNumber = message.match(/^(\d)$/g)?.[0];
    if (voteNumber && (pollState.options[voteNumber] || voteNumber === "0")) {
      pollState.userVotes[tags.username] = voteNumber;
      updatePollDisplay();
    }
  }
}

function setup() {
  const queryParameters = new URLSearchParams(window.location.search);

  const POSITION_CODE = queryParameters.get("position");
  let positionClassName = "top-left";

  if (POSITION_CODE && POSITION_MAP[POSITION_CODE]) {
    positionClassName = POSITION_MAP[POSITION_CODE];
  }

  document.querySelector(".container").classList.add(positionClassName);

  const CHANNEL_NAME = queryParameters.get("channel");
  const client = tmi.Client({
    channels: [CHANNEL_NAME],
  });

  client.connect();
  client.on("message", handlePollCommands);
  client.on("message", handlePollVotes);
}

document.addEventListener("DOMContentLoaded", setup);
