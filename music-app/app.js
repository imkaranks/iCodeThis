(function () {
  const $audio = document.getElementById('audio-player');
  const $albums = document.getElementById('albums');
  const $prevBtn = document.getElementById('prev-btn');
  const $nextBtn = document.getElementById('next-btn');
  const $songsContent = document.getElementById('songs-content');
  const $songsProgressMini = document.getElementById('song-progress-mini');
  const $songsProgressLarge = document.getElementById('song-progress-large');
  const $playerMini = document.getElementById('player-mini');
  const $playerLarge = document.getElementById('player-large');
  const $playerExit = document.getElementById('player-exit');
  const $songsTitleMini = document.getElementById('song-title-mini');
  const $songsTitleLarge = document.getElementById('song-title-large');
  const $songsImageMini = document.getElementById('song-image-mini');
  const $songsImageLarge = document.getElementById('song-image-large');
  const $songsArtistMini = document.getElementById('song-artist-mini');
  const $songsArtistLarge = document.getElementById('song-artist-large');
  const $current = document.getElementById('current');
  const $duration = document.getElementById('duration');
  const $playBtn = document.getElementById('play-btn');
  const $pauseBtn = document.getElementById('pause-btn');
  const $toggleBtn = document.getElementById('toggle');
  const $forwardBtn = document.getElementById('forward');
  const $backwardBtn = document.getElementById('backward');
  const $lowVolumeBtn = document.getElementById('low-volume-btn');
  const $highVolumeBtn = document.getElementById('high-volume-btn');
  const $volumeSlider = document.getElementById('volume');
  let current = 0;
  const songs = [
    {
      title: 'Kangaroo',
      artist: 'NBSP',
      imgURL: 'https://images.unsplash.com/photo-1528728935509-22fb14722a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29uZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60',
      songURL: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3'
    },
    {
      title: 'Sevish',
      artist: 'NBSP',
      imgURL: 'https://images.unsplash.com/photo-1528728935509-22fb14722a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29uZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60',
      songURL: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3'
    },
    {
      title: 'Theme 01',
      artist: 'NBSP',
      imgURL: 'https://images.unsplash.com/photo-1528728935509-22fb14722a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29uZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60',
      songURL: 'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3'
    },
    {
      title: 'Paza Moduless',
      artist: 'NBSP',
      imgURL: 'https://images.unsplash.com/photo-1528728935509-22fb14722a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29uZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60',
      songURL: 'http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3'
    }
  ];

  function render() {
    loadSongs();

    $prevBtn.onclick = function () {
      $albums.scrollLeft -= 240;
    }

    $nextBtn.onclick = function () {
      $albums.scrollLeft += 240;
    }

    $lowVolumeBtn.onclick = function () {
      if ($volumeSlider.value > 5) {
        $volumeSlider.value -= 5;
        $volumeSlider.setAttribute('style', `--volume: ${$volumeSlider.value}%`);
        $audio.volume = $volumeSlider.value / 100;
      }
    }

    $highVolumeBtn.onclick = function () {
      if ($volumeSlider.value < 95) {
        $volumeSlider.value += 5;
        $volumeSlider.setAttribute('style', `--volume: ${$volumeSlider.value}%`);
        $audio.volume = $volumeSlider.value / 100;
      }
    }

    $audio.ontimeupdate = function () {
      const progress = ($audio.currentTime / $audio.duration) * 100;
      $songsProgressMini.setAttribute('style', `--progress: ${progress}%`);
      $songsProgressLarge.setAttribute('style', `--progress: ${progress}%`);
      $current.textContent = formatTime(`${progress}`);
      $duration.textContent = formatTime(`${$audio.duration}`);
    }

    $audio.onended = goForward;

    $playBtn.addEventListener('click', () => {
      if ($audio.paused) {
        $audio.play();
      }
    });

    $pauseBtn.addEventListener('click', () => {
      const $icon = $toggleBtn.querySelector('.fa-solid');
      $audio.pause();
      $icon.classList.remove('fa-pause');
      $icon.classList.add('fa-play');
    });

    $toggleBtn.addEventListener('click', () => {
      const $icon = $toggleBtn.querySelector('.fa-solid');
      if ($audio.paused) {
        $icon.classList.remove('fa-play');
        $icon.classList.add('fa-pause');
        $audio.play()
      } else {
        $icon.classList.remove('fa-pause');
        $icon.classList.add('fa-play');
        $audio.pause()
      }
    });

    $playerMini.addEventListener('click', () => {
      $playerLarge.classList.remove('translate-y-full');
      $playerLarge.classList.add('translate-y-0');
    });

    $playerExit.addEventListener('click', () => {
      $playerLarge.classList.add('translate-y-full');
      $playerLarge.classList.remove('translate-y-0');
    });

    $forwardBtn.addEventListener('click', goForward);

    $backwardBtn.addEventListener('click', goBackward);

    $volumeSlider.addEventListener('input', (event) => {
      const $target = event.target;
      const { value } = $target;
      $target.setAttribute('style', `--volume: ${value}%`);
      $audio.volume = value / 100;
    })
  }

  function loadSongs() {
    songs.forEach((song, index) => {
      $songsContent.appendChild(createSong(song, index));
    })
  }

  function createSong(song, index) {
    const $song = document.createElement('div');
    $song.className = "relative flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-primary-800/50 before:content-[''] before:absolute before:left-4 before:right-4 before:bottom-0 before:h-[1px] before:bg-accent-dark/20";
    $song.onclick = () => {
      current = index;
      play(index);
    };
    $song.innerHTML = `
    <img src="${song.imgURL}" class="w-10 h-10 rounded-full object-cover" alt="">
    <div class="flex-1">
      <h3 class="text-sm text-accent-light leading-none">${song.title}</h3>
      <p class="text-xs leading-none">${song.artist}</p>
    </div>
    <button class="text-[#F66059] transition-all ease hover:text-white">
      <span class="sr-only">Add to playlist</span>
      <i class="fa-solid fa-plus" aria-hidden="true"></i>
    </button>`;
    return $song;
  }

  function play(index) {
    $audio.setAttribute("src", songs[index].songURL);
    $audio.play();
    updateDetails();
  }

  function formatTime(string) {
    var sec_num = parseInt(string, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
  }

  function updateDetails() {
    const { title, artist, imgURL } = songs[current];
    $songsTitleMini.textContent = title;
    $songsTitleLarge.textContent = title;
    $songsArtistMini.textContent = artist;
    $songsArtistLarge.textContent = artist;
    $songsImageMini.src = imgURL;
    $songsImageLarge.src = imgURL;
  }

  function goForward() {
    if (current < songs.length - 1) {
      current++;
    } else {
      current = 0;
    }
    play(current);
  }

  function goBackward() {
    if (current > 0) {
      current--;
    } else {
      current = songs.length;
    }
    play(current);
  }

  render();
})();