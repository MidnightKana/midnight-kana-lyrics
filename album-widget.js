(function () {
  const ROOT_ID = "mkAlbumWidget";
  const root = document.getElementById(ROOT_ID);
  if (!root) return;

  const LYRICS_URL = root.getAttribute("data-lyrics-url");

  root.classList.add("mk-album-widget");

  const style = document.createElement("style");
  style.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800&display=swap');

.mk-album-widget,
.mk-album-widget * {
  box-sizing: border-box;
}

.mk-album-widget {
  width: 100%;
  color: #ffffff;
  font-family: Inter, "Inter", sans-serif;
}

.mk-tracklist {
  position: relative;
  width: min(820px, 100%);
  margin: 0 auto;
  padding: 30px;
  overflow: hidden;
  border: 1px solid rgba(255, 54, 202, 0.48);
  border-radius: 26px;
  background:
    linear-gradient(90deg, rgba(255, 45, 198, 0.08) 1px, transparent 1px),
    linear-gradient(180deg, rgba(71, 157, 255, 0.055) 1px, transparent 1px),
    radial-gradient(circle at 15% 0%, rgba(255, 42, 184, 0.28), transparent 35%),
    radial-gradient(circle at 86% 100%, rgba(36, 164, 255, 0.22), transparent 34%),
    linear-gradient(145deg, rgba(5, 3, 13, 0.98), rgba(17, 8, 32, 0.94) 58%, rgba(4, 3, 10, 0.98));
  background-size:
    34px 34px,
    34px 34px,
    auto,
    auto,
    auto;
  box-shadow:
    0 0 34px rgba(255, 42, 184, 0.18),
    0 0 70px rgba(46, 139, 255, 0.08),
    inset 0 0 38px rgba(255, 255, 255, 0.025);
}

.mk-panel-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.08) 46%, transparent 52%),
    repeating-linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.035) 0px,
      rgba(255, 255, 255, 0.035) 1px,
      transparent 1px,
      transparent 8px
    );
  opacity: 0.25;
  mix-blend-mode: screen;
}

.mk-header {
  position: relative;
  z-index: 1;
  margin-bottom: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.mk-kicker,
.mk-blade-kicker {
  margin: 0 0 10px 0;
  color: rgba(255, 95, 220, 0.94);
  font-family: Inter, "Inter", sans-serif;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.mk-tracklist h3 {
  margin: 0;
  color: #ffffff;
  font-family: Orbitron, Inter, "Inter", sans-serif;
  font-size: clamp(1.65rem, 4vw, 2.45rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  text-shadow:
    0 0 12px rgba(255, 54, 202, 0.42),
    0 0 28px rgba(52, 160, 255, 0.22);
}

.mk-subtitle {
  margin: 12px 0 0 0;
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.mk-track-grid {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 12px;
}

.mk-loading {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 1rem;
}

.mk-song {
  position: relative;
  display: block !important;
  width: 100%;
  min-height: 68px;
  padding: 18px 22px !important;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 6px 18px 6px 18px;
  background:
    linear-gradient(90deg, rgba(255, 45, 198, 0.14), transparent 36%),
    rgba(255, 255, 255, 0.045);
  color: rgba(255, 255, 255, 0.97) !important;
  text-align: left !important;
  font-family: Inter, "Inter", sans-serif !important;
  font-size: 1.28rem !important;
  font-weight: 750 !important;
  letter-spacing: 0.02em;
  line-height: 1.2 !important;
  white-space: nowrap !important;
  text-overflow: ellipsis;
  cursor: pointer;
  transition:
    transform 0.16s ease,
    border-color 0.16s ease,
    background 0.16s ease,
    box-shadow 0.16s ease;
}

.mk-song::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 3px;
  background: linear-gradient(180deg, #ff2fc7, #5aa7ff);
  box-shadow: 0 0 16px rgba(255, 47, 199, 0.8);
}

.mk-song::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.07) 48%, transparent 54%);
  transform: translateX(-120%);
  transition: transform 0.3s ease;
  pointer-events: none;
}

.mk-song:hover {
  transform: translateX(6px);
  border-color: rgba(255, 65, 210, 0.62);
  background:
    linear-gradient(90deg, rgba(255, 45, 198, 0.2), rgba(74, 155, 255, 0.07) 70%),
    rgba(255, 255, 255, 0.065);
  box-shadow:
    0 0 20px rgba(255, 45, 198, 0.17),
    inset 0 0 20px rgba(255, 255, 255, 0.025);
}

.mk-song:hover::after {
  transform: translateX(120%);
}

.mk-track-number {
  color: rgba(255, 154, 234, 0.98);
  font-family: Orbitron, Inter, "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-shadow: 0 0 10px rgba(255, 47, 199, 0.65);
}

.mk-track-title {
  color: rgba(255, 255, 255, 0.97);
  font-size: 1.28rem;
  font-weight: 750;
}

.mk-overlay {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 70% 20%, rgba(255, 47, 199, 0.16), transparent 28%),
    rgba(0, 0, 0, 0.72);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 9998;
}

.mk-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

.mk-blade {
  position: fixed;
  top: 0;
  right: 0;
  width: 50vw;
  visibility: hidden;
  opacity: 0;
  min-width: 360px;
  max-width: none;
  height: 100vh;
  padding: 42px 34px;
  overflow-y: auto;
  border-left: 1px solid rgba(255, 54, 202, 0.62);
  background:
    linear-gradient(90deg, rgba(255, 45, 198, 0.08) 1px, transparent 1px),
    linear-gradient(180deg, rgba(71, 157, 255, 0.05) 1px, transparent 1px),
    radial-gradient(circle at top right, rgba(255, 45, 198, 0.26), transparent 34%),
    radial-gradient(circle at bottom left, rgba(66, 158, 255, 0.2), transparent 36%),
    linear-gradient(180deg, #05030b, #140621 56%, #030208);
  background-size:
    32px 32px,
    32px 32px,
    auto,
    auto,
    auto;
  box-shadow:
    -24px 0 70px rgba(255, 45, 198, 0.22),
    inset 0 0 42px rgba(255, 255, 255, 0.025);
  transform: translateX(105%);
  transition:
  transform 0.28s ease,
  opacity 0.18s ease,
  visibility 0s linear 0.28s;
  z-index: 9999;
  font-family: Inter, "Inter", sans-serif;
}

.mk-blade.open {
  transform: translateX(0);
  visibility: visible;
  opacity: 1;
  transition:
    transform 0.28s ease,
    opacity 0.18s ease,
    visibility 0s linear 0s;
}

.mk-close {
  position: absolute;
  top: 18px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 86, 218, 0.42);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.26);
  color: #ffffff;
  font-size: 25px;
  line-height: 1;
  font-family: Inter, "Inter", sans-serif;
  cursor: pointer;
  box-shadow: 0 0 18px rgba(255, 45, 198, 0.12);
  transition: background 0.16s ease, border-color 0.16s ease, transform 0.16s ease;
}

.mk-close:hover {
  transform: rotate(90deg);
  background: rgba(255, 45, 198, 0.15);
  border-color: rgba(255, 86, 218, 0.72);
}

.mk-blade h3 {
  margin: 0;
  padding-right: 46px;
  color: #ffffff;
  font-family: Orbitron, Inter, "Inter", sans-serif;
  font-size: clamp(1.55rem, 3vw, 2.25rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: 0.025em;
  text-transform: uppercase;
  text-shadow:
    0 0 14px rgba(255, 54, 202, 0.38),
    0 0 26px rgba(74, 155, 255, 0.2);
}

.mk-divider {
  width: 100%;
  height: 1px;
  margin: 24px 0 26px 0;
  background: linear-gradient(90deg, rgba(255, 54, 202, 0.9), rgba(74, 155, 255, 0.45), transparent);
  box-shadow: 0 0 18px rgba(255, 54, 202, 0.3);
}

.mk-blade pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: Inter, "Inter", sans-serif;
  line-height: 1.35;
  font-size: 1rem;
  font-weight: 420;
  color: rgba(255, 255, 255, 0.88);
}

@media (max-width: 760px) {
  .mk-tracklist {
    padding: 22px;
    border-radius: 20px;
  }

  .mk-tracklist h3 {
    font-size: clamp(1.35rem, 9vw, 2rem);
  }

  .mk-song {
    min-height: 62px;
    padding: 16px 18px !important;
    font-size: 1.14rem !important;
  }

  .mk-track-number {
    font-size: 0.92rem;
  }

  .mk-track-title {
    font-size: 1.14rem;
  }

  .mk-blade {
    width: 94vw;
    min-width: 0;
    max-width: none;
    padding: 40px 24px;
  }
}
`;

  document.head.appendChild(style);

  root.innerHTML = `
<div class="mk-tracklist">
  <div class="mk-panel-glow"></div>

  <div class="mk-header">
    <p class="mk-kicker">MIDNIGHT KANA // 歌詞</p>
    <h3>${root.getAttribute("data-album-title") || "N5 After Dark"}</h3>
    <p class="mk-subtitle">Select a track to open the lyric blade</p>
  </div>

  <div class="mk-track-grid" id="mkTrackGrid">
    <p class="mk-loading">Loading tracks...</p>
  </div>
</div>

<div class="mk-overlay" id="mkOverlay"></div>

<aside class="mk-blade" id="mkBlade">
  <button class="mk-close" id="mkClose" aria-label="Close lyrics">×</button>

  <p class="mk-blade-kicker">LYRIC BLADE // 歌詞</p>
  <h3 id="mkBladeTitle">Song Title</h3>

  <div class="mk-divider"></div>

  <pre id="mkBladeLyrics">Lyrics go here.</pre>
</aside>
`;

  const grid = document.getElementById("mkTrackGrid");
  const blade = document.getElementById("mkBlade");
  const overlay = document.getElementById("mkOverlay");
  const close = document.getElementById("mkClose");
  const title = document.getElementById("mkBladeTitle");
  const lyrics = document.getElementById("mkBladeLyrics");

  function formatLyrics(songLyrics) {
    if (Array.isArray(songLyrics)) {
      return songLyrics.join("\n");
    }

    return String(songLyrics)
      .replace(/\r\n?/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/\[br\]/gi, "\n")
      .trim();
  }

  function renderTracks(tracks) {
    grid.innerHTML = "";

    tracks.forEach(function (track) {
      const button = document.createElement("button");
      button.className = "mk-song";
      button.type = "button";

      const number = document.createElement("span");
      number.className = "mk-track-number";
      number.textContent = track.number || "";

      const spacer = document.createTextNode("\u00A0\u00A0\u00A0");

      const trackTitle = document.createElement("span");
      trackTitle.className = "mk-track-title";
      trackTitle.textContent = track.title || "Untitled Track";

      button.appendChild(number);
      button.appendChild(spacer);
      button.appendChild(trackTitle);

      button.addEventListener("click", function () {
        openBlade(track.title || "Untitled Track", track.lyrics || "");
      });

      grid.appendChild(button);
    });
  }

function openBlade(songTitle, songLyrics) {
  title.textContent = songTitle;
  lyrics.textContent = formatLyrics(songLyrics);

  blade.scrollTop = 0;
  lyrics.scrollTop = 0;

  blade.classList.add("open");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";

  requestAnimationFrame(function () {
    blade.scrollTop = 0;
    lyrics.scrollTop = 0;
  });
}

  function closeBlade() {
    blade.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  close.addEventListener("click", closeBlade);
  overlay.addEventListener("click", closeBlade);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeBlade();
  });

  fetch(LYRICS_URL + "?v=" + Date.now())
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load lyrics JSON");
      }
      return response.json();
    })
    .then(function (tracks) {
      renderTracks(tracks);
    })
    .catch(function (error) {
      console.error(error);
      grid.innerHTML = '<p class="mk-loading">Track list failed to load.</p>';
    });
})();
