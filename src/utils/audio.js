const SORRY_MESSAGE = new Audio("./audio/sorry-message.mp3");
const REGEX_REPLACER = /,|\.|!|\?/g;

export const playSound = (sound, word, vocabularyPlaybackRate = 1.0) => {
  if (sound) {
    sound.pause();
  }

  const fileName = word
    .toLowerCase()
    .replaceAll(REGEX_REPLACER, "")
    .replaceAll(" ", "-");

  sound = new Audio(`./audio/${fileName}.mp3`);
  sound.playbackRate = vocabularyPlaybackRate;
  sound.play().catch(() => {
    sound = SORRY_MESSAGE;
    sound.play();
  });
  return sound;
};
