class Node {
    constructor(song) {
        this.song = song;
        this.next = null;
        this.prev = null;
    }
}

class Playlist {
    constructor() {
        this.head = null;
        this.current = null;
    }

    add(song) {
        const newNode = new Node(song);

        if (!this.head) {
            this.head = newNode;
            this.current = newNode;
        } else {
            let temp = this.head;
            while (temp.next) {
                temp = temp.next;
            }
            temp.next = newNode;
            newNode.prev = temp;
        }
    }

    next() {
        if (this.current.next) {
            this.current = this.current.next;
        } else {
            //  loop back to first song
            this.current = this.head;
        }
    }

    prev() {
        if (this.current.prev) {
            this.current = this.current.prev;
        }
    }
}

const playlist = new Playlist();

// SONGS
playlist.add({
    title: "Itni si baat hain | Azhaar",
    src: "Songs/song1.mp3",
    cover: "song_cover/cover1.jpg"
});

playlist.add({
    title: "Sadi Gali | Ayushman Khurana",
    src: "Songs/song2.mp3",
    cover: "song_cover/cover2.jpg"
});

playlist.add({
    title: "Te Amo | Papon",
    src: "Songs/song3.mp3",
    cover: "song_cover/cover3.jpg"
});

playlist.add({
    title: "Zehnaseeb | Hasee toh Phasee",
    src: "Songs/song4.mp3",
    cover: "song_cover/cover4.webp"
});

playlist.add({
    title: "Mere Bina | Crook",
    src: "Songs/song5.mp3",
    cover: "song_cover/cover5.jpg"
});

playlist.add({
    title: "Chahun Main Yaa Na | Aashiqui 2",
    src: "Songs/song6.mp3",
    cover: "song_cover/cover6.jpg"
});

//  ELEMENTS
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("song-title");
const playBtn = document.getElementById("play-btn");

//  AUTOPLAY NEXT SONG
audio.addEventListener("ended", nextSong);

// PLAY / PAUSE 
audio.addEventListener("play", () => {
    playBtn.innerText = "⏸";
    cover.classList.add("playing");
});

audio.addEventListener("pause", () => {
    playBtn.innerText = "▶";
    cover.classList.remove("playing");
});

// LOAD SONG
function loadSong(node) {
    audio.src = node.song.src;
    cover.src = node.song.cover;

    title.innerHTML = `
        <span>${node.song.title}</span>
        <span>${node.song.title}</span>
    `;

    //  Reset scrolling animation
    title.style.animation = "none";
    title.offsetHeight;
    title.style.animation = "";
}

// PLAY / PAUSE
function playPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// NEXT
function nextSong() {
    playlist.next();
    loadSong(playlist.current);
    audio.play();
}

//  PREVIOUS
function prevSong() {
    playlist.prev();
    loadSong(playlist.current);
    audio.play();
}

// INITIAL LOAD
loadSong(playlist.current);

// 🎚PROGRESS BAR

const progress = document.querySelector(".progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// UPDATE PROGRESS
audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;

    if (duration) {
        const percent = (currentTime / duration) * 100;
        progress.style.width = percent + "%";

        currentTimeEl.innerText = formatTime(currentTime);
        durationEl.innerText = formatTime(duration);
    }
});

// SEEK
function seek(e) {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}

// TIME FORMAT
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
}
