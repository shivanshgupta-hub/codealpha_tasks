// --- DOM Elements ---
const audio = document.getElementById('audio');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volume-bar');
const playlistEl = document.getElementById('playlist');

// --- Playlist Data ---
const songs = [
    {
        title: "Acoustic Breeze",
        artist: "Benjamin Tissot",
        src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3"
    },
    {
        title: "Creative Minds",
        artist: "Benjamin Tissot",
        src: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3"
    },
    {
        title: "Happy Rock",
        artist: "Benjamin Tissot",
        src: "https://www.bensound.com/bensound-music/bensound-happyrock.mp3"
    }
];

// --- State Variables ---
let songIndex = 0;
let isPlaying = false;

// --- Initialization ---
function initPlayer() {
    loadSong(songs[songIndex]);
    renderPlaylist();
}

// --- Core Functions ---
function loadSong(song) {
    titleEl.innerText = song.title;
    artistEl.innerText = song.artist;
    audio.src = song.src;
    highlightPlaylist();
}

function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1; // Loop to the end
    }
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0; // Loop to the start
    }
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

// --- Time & Progress Functions ---
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    
    // Update text
    currentTimeEl.innerText = formatTime(currentTime);
    if (duration) durationEl.innerText = formatTime(duration);
    
    // Update bar
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent || 0;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// --- Playlist (Bonus) ---
function renderPlaylist() {
    playlistEl.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });
        playlistEl.appendChild(li);
    });
    highlightPlaylist();
}

function highlightPlaylist() {
    const allItems = playlistEl.querySelectorAll('li');
    allItems.forEach((item, index) => {
        if (index === songIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// --- Event Listeners ---
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Progress and Time
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', () => {
    durationEl.innerText = formatTime(audio.duration);
});
progressBar.addEventListener('click', setProgress);

// Volume Control
volumeBar.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Autoplay (Bonus: Move to next song when current one ends)
audio.addEventListener('ended', nextSong);

// Start the app
initPlayer();