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
        }
    }

    prev() {
        if (this.current.prev) {
            this.current = this.current.prev;
        }
    }
}

const playlist = new Playlist();

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

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("song-title");
function loadSong(node) {
    audio.src = node.song.src;
    cover.src = node.song.cover;

    // Update text
    title.innerHTML = `
        <span>${node.song.title}</span>
        <span>${node.song.title}</span>
    `;
    //Reset
    title.style.animation = "none";     // stop animation
    title.offsetHeight;                 // force reflow
    title.style.animation = null;       // restart animation
}

//PLAY & PAUSE 
function playPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

//Next
function nextSong() {
    playlist.next();
    loadSong(playlist.current);
    audio.play();
}

//PREVIOUS
function prevSong() {
    playlist.prev();
    loadSong(playlist.current);
    audio.play();
}
//INITIAL LOAD
loadSong(playlist.current);