import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const getIframe = document.querySelector('iframe');
const player = new Player(getIframe);
const storageKey = 'videoplayer-current-time';

const onPlay = function (data) {
  const currentTime = data.seconds;
  localStorage.setItem(storageKey, JSON.stringify(currentTime));
};

player.on('timeupdate', throttle(onPlay, 1000));
// player.on('timeupdate', onPlay);

const savedTime = localStorage.getItem(storageKey);
console.log(savedTime);

if (savedTime) {
  const parsedTime = JSON.parse(savedTime);
  player
    .setCurrentTime(parsedTime)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
