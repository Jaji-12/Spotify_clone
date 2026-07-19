/* ==========================================================================
   SPOTIFY PERFORMANCE-OPTIMIZED AUDIO RUNTIME SYSTEM
   ========================================================================== */
console.log("Engine Bootstrapped");

// 1. & 2. HARDWARE DOM BINDING & VERIFIED STREAMING TARGET ARRAYS
let currentSongIndex = 0;

const songs = [
    {
        title: "Static Rainstorm",
        artist: "White Noise Unit",
        src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=dreams-110734.mp3",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80"
    },
    {
        title: "Electric Horizon",
        artist: "Cyber Waves",
        src: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946498ab43.mp3?filename=future-bass-117997.mp3",
        cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=300&q=80"
    },
    {
        title: "Neon Skyline",
        artist: "Retro Pulse",
        src: "https://cdn.pixabay.com/download/audio/2022/01/26/audio_d0c6ff11ca.mp3",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80"
    },
    {
        title: "Midnight Echo",
        artist: "Nova Dreams",
        src: "https://cdn.pixabay.com/download/audio/2023/05/14/audio_34b2cf0a12.mp3",
        cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&q=80"
    },
    {
        title: "Lo-Fi Midnight",
        artist: "Dream Circuit",
        src: "https://cdn.pixabay.com/download/audio/2022/11/22/audio_feb376db18.mp3",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&q=80"
    }
];

const mockPlaylistsMetadata = [
    { id: 100, title: "Top Hits", desc: "Global charts.", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&q=70" },
    { id: 101, title: "Chill Beats", desc: "Warm melodies.", cover: "https://images.unsplash.com/photo-1447855474646-5f824ef7888b?w=150&q=70" },
    { id: 102, title: "Focus Mode", desc: "Minimal techno.", cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&q=70" }
];

const mockArtistsMetadata = [
    { id: 200, name: "The Weeknd", streams: "104M Monthly", cover: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=150&q=70" },
    { id: 201, name: "Taylor Swift", streams: "98M Monthly", cover: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=150&q=70" }
];

const mockPodcastsMetadata = [
    { id: 300, title: "JRE Podcast", desc: "Deep dialogues.", cover: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=150&q=70" }
];

// WAIT FOR ALL CORE REGISTRIES TO COMPLETE PARSE LOOP BEFORE BOOTING
document.addEventListener("DOMContentLoaded", () => {

    /* --- HARDWARE INTERNAL CONFIGURATION STATE --- */
    const audio = document.getElementById("audio-player");
    let isPlaying = false;
    let shuffleRandomizerEnabled = false;
    let loopRepeatEnabled = false;
    let structuralHardwareMuteState = false;
    let cachedActiveMixerVolume = 1; // Defaulting to maximum capacity to ensure hardware clarity
    let likedSongsDatabaseSet = new Set();
    let contextMenuActiveTargetId = null;

    /* --- SECURE ELEMENT SELECTORS MAPPING --- */
    const playBtn = document.getElementById("btn-master-playback");
    const nextBtn = document.getElementById("btn-next-track");
    const prevBtn = document.getElementById("btn-prev-track");
    const shuffleBtn = document.getElementById("btn-shuffle");
    const repeatBtn = document.getElementById("btn-repeat");
    
    const timelineSliderInput = document.getElementById("timeline-range-hardware");
    const timelineFillBar = document.getElementById("timeline-fill-bar");
    const timelineThumbNode = document.getElementById("timeline-thumb-node");
    
    const volumeSlider = document.getElementById("volume-range-hardware");
    const volumeFillBar = document.getElementById("volume-fill-bar");
    const volumeThumbNode = document.getElementById("volume-thumb-node");
    const volumeIconButton = document.getElementById("btn-volume-icon");
    
    const activeTrackHeartToggle = document.getElementById("player-heart-toggle");
    const globalSearchInputNode = document.getElementById("global-search-input");
    const mainScrollCanvasArea = document.getElementById("main-scroll-canvas");
    const customRightClickContextMenu = document.getElementById("custom-context-menu");
    const nowPlayingFooterPanel = document.querySelector(".now-playing-panel");
    const stickyHeaderBar = document.getElementById("sticky-header");

    const navHomeBtn = document.getElementById("nav-btn-home");
    const navSearchBtn = document.getElementById("nav-btn-search");
    const mobileNavHome = document.getElementById("mobile-nav-home");
    const mobileNavSearch = document.getElementById("mobile-nav-search");
    const mobileNavLibrary = document.getElementById("mobile-nav-library");
    
    const searchClearBtn = document.getElementById("search-clear-btn");
    const subLinkCreatePlaylist = document.getElementById("sub-link-create-playlist");
    const subLinkLikedSongs = document.getElementById("sub-link-liked-songs");
    const subLinkEpisodes = document.getElementById("sub-link-episodes");
    const sidebarCreatePlaylistBtn = document.getElementById("sidebar-create-playlist-btn");

    function initApplicationEngine() {
        executeGreetingTimestampEvaluation();
        deployAppSkeletonStatePlaceholders();
        restoreSavedStateClientProfiles();
        
        audio.addEventListener("timeupdate", handleProgressTimelineTracking);
        audio.addEventListener("loadedmetadata", synchroniseDurationMetaValues);
        audio.addEventListener("ended", evaluateTrackCycleCompletionPath);
        
        if(timelineSliderInput) timelineSliderInput.addEventListener("input", executeTimelineManualSeek);
        if(volumeSlider) volumeSlider.addEventListener("input", executeVolumeManualMix);
        
        if(mainScrollCanvasArea) mainScrollCanvasArea.addEventListener("scroll", processWindowCanvasOpacityTransition);
        document.addEventListener("contextmenu", deployCustomRightClickOverlay);
        document.addEventListener("click", () => { if(customRightClickContextMenu) customRightClickContextMenu.style.display = "none"; });

        if(playBtn) playBtn.addEventListener("click", togglePlaybackStateExecution);
        if(nextBtn) nextBtn.addEventListener("click", executeForwardTrackSkipNavigation);
        if(prevBtn) prevBtn.addEventListener("click", executeBackwardTrackSkipNavigation);
        if(shuffleBtn) shuffleBtn.addEventListener("click", toggleEngineShuffleMode);
        if(repeatBtn) repeatBtn.addEventListener("click", toggleEngineRepeatMode);
        if(volumeIconButton) volumeIconButton.addEventListener("click", toggleHardwareMuteState);
        if(activeTrackHeartToggle) activeTrackHeartToggle.addEventListener("click", toggleCurrentTrackLikeRegistryState);
        
        if(navHomeBtn) navHomeBtn.addEventListener("click", () => changeAppInterfaceTab("home"));
        if(navSearchBtn) navSearchBtn.addEventListener("click", () => changeAppInterfaceTab("search"));
        if(mobileNavHome) mobileNavHome.addEventListener("click", () => changeAppInterfaceTab("home"));
        if(mobileNavSearch) mobileNavSearch.addEventListener("click", () => changeAppInterfaceTab("search"));
        if(mobileNavLibrary) mobileNavLibrary.addEventListener("click", filterMusicViewByLikedSongs);
        
        if(globalSearchInputNode) globalSearchInputNode.addEventListener("input", (e) => executeRealTimeLibraryFiltering(e.target.value));
        if(searchClearBtn) searchClearBtn.addEventListener("click", clearSearchInputEngine);
        
        if(subLinkCreatePlaylist) subLinkCreatePlaylist.addEventListener("click", createNewCustomPlaylistLink);
        if(subLinkLikedSongs) subLinkLikedSongs.addEventListener("click", filterMusicViewByLikedSongs);
        if(subLinkEpisodes) subLinkEpisodes.addEventListener("click", () => showToast("Loading Saved Podcasts..."));
        if(sidebarCreatePlaylistBtn) sidebarCreatePlaylistBtn.addEventListener("click", () => showToast("Playlist Builder Active"));

        const ctxPlay = document.getElementById("ctx-play-trigger");
        if(ctxPlay) ctxPlay.addEventListener("click", handleContextPlay);
        const fullscreenUtilityBtn = document.getElementById("utility-fullscreen-btn");
        if(fullscreenUtilityBtn) fullscreenUtilityBtn.addEventListener("click", toggleFullscreenDisplayViewMode);

        loadSong(currentSongIndex);
        if(volumeSlider && volumeFillBar && volumeThumbNode) synchronizeSliderUIVisuals(volumeSlider, volumeFillBar, volumeThumbNode);
        
        executePrimaryLayoutDataRender();
        
        setTimeout(() => {
            executeDeferredShelvesDataRender();
            enforceGlobalImageFallbackValidation();
            bindPlayButtonsEngine(); // Audio routing setup complete
        }, 600);
    }

    function restoreSavedStateClientProfiles() {
        const savedSong = localStorage.getItem("currentSong");
        if (savedSong !== null) {
            currentSongIndex = Math.min(Math.max(0, Number(savedSong)), songs.length - 1);
        }
        const savedVolume = localStorage.getItem("spotify_clone_volume");
        if (savedVolume !== null && volumeSlider) {
            cachedActiveMixerVolume = parseFloat(savedVolume);
            audio.volume = cachedActiveMixerVolume;
            volumeSlider.value = cachedActiveMixerVolume;
        } else {
            audio.volume = cachedActiveMixerVolume;
        }

        let favorites = JSON.parse(localStorage.getItem("favorites")) || {};
        likedSongsDatabaseSet = new Set();
        Object.keys(favorites).forEach(key => {
            if (favorites[key]) likedSongsDatabaseSet.add(parseInt(key));
        });
    }

    /* ==========================================================================
       8. SECURE SAFEST AUDIO LIFECYCLE PLAY EXECUTION PATHWAY
       ========================================================================== */
    async function playSong(index) {
        try {
            audio.pause();
            currentSongIndex = index;
            
            // 4. PREVENT BROWSER AUTOPLAY BLOCKS BY DISABLING MUTED COERCION
            audio.src = songs[index].src;
            audio.muted = false; 
            audio.volume = cachedActiveMixerVolume;
            
            audio.load();
            
            // 6. EXPLICIT PLAY BACK WITH PROMISE CAPTURE LIFECYCLE
            await audio.play();
            
            isPlaying = true;
            if(playBtn) playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            if(nowPlayingFooterPanel) nowPlayingFooterPanel.classList.add("track-is-active-now");
            localStorage.setItem("currentSong", currentSongIndex);
            
            // 12. DYNAMIC CARD BORDER & OVERLAY HIGHLIGHT ENFORCEMENT
            updatePlayingCardHighlight(index);
            synchroniseSidebarPlayingIndicatorState();
            synchroniseTrackUIDisplayMetadata(songs[index]);

            console.log("Playing:", songs[index].title);
        } catch (err) {
            // 7. HANDLE BROWSER NOTALLOWEDERROR OR ABORTERROR
            console.log("Audio Execution Failed: ", err);
            showToast("Playback blocked. Intermediary action required.");
        }
    }

    function synchroniseTrackUIDisplayMetadata(songObj) {
        const songTitleNode = document.querySelector(".song-title");
        const artistNameNode = document.querySelector(".artist-name");
        const albumCoverNode = document.querySelector(".album-cover");

        if(songTitleNode) songTitleNode.textContent = songObj.title;
        if(artistNameNode) artistNameNode.textContent = songObj.artist;
        if(albumCoverNode) albumCoverNode.src = songObj.cover;
    }

    // 12. TRACK CARD ACTIVE LOOKUP RESETTERS
    function updatePlayingCardHighlight(index) {
        document.querySelectorAll(".standard-media-card").forEach(card => {
            card.classList.remove("playing");
        });
        
        // Find specific target element references mapping by context ID attributes
        const activeCards = document.querySelectorAll(`.standard-media-card[data-context-id="${index}"]`);
        activeCards.forEach(card => card.classList.add("playing"));
    }

    function loadSong(index) {
        if (index < 0 || index >= songs.length) return;
        currentSongIndex = index;
        const song = songs[currentSongIndex];

        audio.src = song.src;
        synchroniseTrackUIDisplayMetadata(song);
        
        if(timelineSliderInput) timelineSliderInput.value = 0;
        if(timelineFillBar) timelineFillBar.style.width = "0%";
        if(timelineThumbNode) timelineThumbNode.style.left = "0%";
        
        const timeElapsedNode = document.getElementById("lbl-time-elapsed");
        if(timeElapsedNode) timeElapsedNode.innerText = "0:00";

        if(activeTrackHeartToggle) {
            if (likedSongsDatabaseSet.has(currentSongIndex)) {
                activeTrackHeartToggle.innerHTML = '<i class="fa-solid fa-heart"></i>';
                activeTrackHeartToggle.className = "meta-action-btn hearted-active";
            } else {
                activeTrackHeartToggle.innerHTML = '<i class="fa-regular fa-heart"></i>';
                activeTrackHeartToggle.className = "meta-action-btn";
            }
        }
    }

    // 3. & 11. BIND PLAYBACK LISTENERS AND WIRE SIGNALS THROUGH SECURE WRAPPER
    function bindPlayButtonsEngine() {
        // Intercept global runtime dynamically injected element arrays
        document.body.addEventListener("click", (e) => {
            const playCardBtn = e.target.closest(".play-card-btn");
            if (playCardBtn) {
                e.stopPropagation();
                const parentCard = playCardBtn.closest("[data-context-id]");
                if (parentCard) {
                    const idx = parseInt(parentCard.getAttribute("data-context-id"));
                    if (!isNaN(idx)) {
                        playSong(idx);
                        showToast(`Playing: ${songs[idx].title}`);
                    }
                }
            }
        });
    }

    async function togglePlaybackStateExecution() {
        if (!isPlaying) {
            try {
                audio.muted = false;
                await audio.play();
                isPlaying = true;
                if(playBtn) playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                if(nowPlayingFooterPanel) nowPlayingFooterPanel.classList.add("track-is-active-now");
            } catch(e) {
                // If audio src initialization is incomplete, fall back to current array track
                playSong(currentSongIndex);
            }
        } else {
            audio.pause();
            isPlaying = false;
            if(playBtn) playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            if(nowPlayingFooterPanel) nowPlayingFooterPanel.classList.remove("track-is-active-now");
        }
    }

    function executeForwardTrackSkipNavigation() {
        if (shuffleRandomizerEnabled) {
            let randomIndex = Math.floor(Math.random() * songs.length);
            playSong(randomIndex);
        } else {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            playSong(currentSongIndex);
        }
    }

    function executeBackwardTrackSkipNavigation() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    }

    function evaluateTrackCycleCompletionPath() {
        if (loopRepeatEnabled) {
            audio.currentTime = 0;
            audio.play().catch(() => {});
        } else {
            executeForwardTrackSkipNavigation();
        }
    }

    function handleProgressTimelineTracking() {
        if (!audio.duration || !timelineSliderInput) return;
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        timelineSliderInput.value = progressPercent;
        
        if(timelineFillBar) timelineFillBar.style.width = `${progressPercent}%`;
        if(timelineThumbNode) timelineThumbNode.style.left = `${progressPercent}%`;
        
        const elapsedLabel = document.getElementById("lbl-time-elapsed");
        if(elapsedLabel) elapsedLabel.innerText = convertSecondsToReadableClockLayout(audio.currentTime);
    }

    function executeTimelineManualSeek() {
        if (!audio.duration || !timelineSliderInput) return;
        audio.currentTime = (timelineSliderInput.value / 100) * audio.duration;
    }

    function executeVolumeManualMix() {
        if(!volumeSlider) return;
        audio.volume = volumeSlider.value;
        cachedActiveMixerVolume = volumeSlider.value;
        localStorage.setItem("spotify_clone_volume", cachedActiveMixerVolume);
        
        if(volumeFillBar) volumeFillBar.style.width = `${volumeSlider.value * 100}%`;
        if(volumeThumbNode) volumeThumbNode.style.left = `${volumeSlider.value * 100}%`;
        
        structuralHardwareMuteState = (parseFloat(volumeSlider.value) === 0);
        synchroniseHardwareVolumeIconDisplayState(volumeSlider.value);
    }

    function synchronizeSliderUIVisuals(sliderNode, fillBarNode, thumbNode) {
        if(!sliderNode || !fillBarNode || !thumbNode) return;
        const rawRatio = sliderNode.value / (sliderNode.max || 1);
        fillBarNode.style.width = `${rawRatio * 100}%`;
        thumbNode.style.left = `${rawRatio * 100}%`;
    }

    function synchroniseDurationMetaValues() {
        const totalTimeLabel = document.getElementById("lbl-time-total");
        if(totalTimeLabel) totalTimeLabel.innerText = convertSecondsToReadableClockLayout(audio.duration);
    }

    function convertSecondsToReadableClockLayout(rawSeconds) {
        const minutes = Math.floor(rawSeconds / 60);
        let seconds = Math.floor(rawSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function synchroniseHardwareVolumeIconDisplayState(volumeRatio) {
        if(!volumeIconButton) return;
        if (volumeRatio == 0) volumeIconButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        else if (volumeRatio < 0.45) volumeIconButton.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
        else volumeIconButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }

    function toggleEngineShuffleMode() {
        shuffleRandomizerEnabled = !shuffleRandomizerEnabled;
        if(shuffleBtn) shuffleBtn.classList.toggle("active-indicator", shuffleRandomizerEnabled);
    }

    function toggleEngineRepeatMode() {
        loopRepeatEnabled = !loopRepeatEnabled;
        if(repeatBtn) repeatBtn.classList.toggle("active-indicator", loopRepeatEnabled);
    }

    function toggleHardwareMuteState() {
        if(!volumeSlider) return;
        if (structuralHardwareMuteState) {
            audio.volume = cachedActiveMixerVolume > 0 ? cachedActiveMixerVolume : 0.5;
            volumeSlider.value = audio.volume;
            structuralHardwareMuteState = false;
        } else {
            audio.volume = 0;
            volumeSlider.value = 0;
            structuralHardwareMuteState = true;
        }
        synchronizeSliderUIVisuals(volumeSlider, volumeFillBar, volumeThumbNode);
        synchroniseHardwareVolumeIconDisplayState(volumeSlider.value);
    }

    function toggleCurrentTrackLikeRegistryState() {
        if(!activeTrackHeartToggle) return;
        executeFavoriteRegistryToggleLogic(currentSongIndex);
    }

    function executeFavoriteRegistryToggleLogic(songGlobalIndex) {
        const targetState = !likedSongsDatabaseSet.has(songGlobalIndex);
        
        if (targetState) {
            likedSongsDatabaseSet.add(songGlobalIndex);
            showToast("Added to Favorites ❤️");
        } else {
            likedSongsDatabaseSet.delete(songGlobalIndex);
            showToast("Removed from Favorites");
        }

        saveFavorite(songGlobalIndex, targetState);

        document.querySelectorAll(`.card-fav-trigger-node-${songGlobalIndex}`).forEach(btn => {
            btn.classList.toggle("active", targetState);
            const subIcon = btn.querySelector("i");
            if(subIcon) subIcon.className = targetState ? "fa-solid fa-heart" : "fa-regular fa-heart";
        });

        if (songGlobalIndex === currentSongIndex && activeTrackHeartToggle) {
            if(targetState) {
                activeTrackHeartToggle.innerHTML = '<i class="fa-solid fa-heart"></i>';
                activeTrackHeartToggle.className = "meta-action-btn hearted-active";
            } else {
                activeTrackHeartToggle.innerHTML = '<i class="fa-regular fa-heart"></i>';
                activeTrackHeartToggle.className = "meta-action-btn";
            }
        }
    }

    function saveFavorite(index, status) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || {};
        favorites[index] = status;
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    function synchroniseSidebarPlayingIndicatorState() {
        document.querySelectorAll(".playlist-row-node").forEach(node => node.classList.remove("active-highlight"));
        const targetedRowItem = document.getElementById(`sidebar-node-item-${currentSongIndex + 100}`);
        if (targetedRowItem) targetedRowItem.classList.add("active-highlight");
    }

    function changeAppInterfaceTab(tabTargetId) {
        if(navHomeBtn) navHomeBtn.classList.toggle("active", tabTargetId === "home");
        if(navSearchBtn) navSearchBtn.classList.toggle("active", tabTargetId === "search");
        
        if(mobileNavHome) mobileNavHome.className = tabTargetId === "home" ? "mobile-hud-actionactive" : "mobile-hud-action";
        if(mobileNavSearch) mobileNavSearch.className = tabTargetId === "search" ? "mobile-hud-actionactive" : "mobile-hud-action";
        
        const searchNavbarBox = document.getElementById("search-bar-global-wrapper");
        const catalogShelvesStackContainer = document.getElementById("standard-shelves-container-stack");
        const primaryHeroGreetingSection = document.getElementById("greeting-hero-block");
        const dynamicSearchOutputViewSection = document.getElementById("search-results-section");

        if (tabTargetId === "search") {
            if(searchNavbarBox) searchNavbarBox.classList.add("visible-flex");
            if(catalogShelvesStackContainer) catalogShelvesStackContainer.classList.add("hidden-element-view");
            if(primaryHeroGreetingSection) primaryHeroGreetingSection.classList.add("hidden-element-view");
            if(dynamicSearchOutputViewSection) dynamicSearchOutputViewSection.classList.remove("hidden-element-view");
            if(globalSearchInputNode) {
                globalSearchInputNode.focus();
                executeRealTimeLibraryFiltering(globalSearchInputNode.value);
            }
        } else {
            if(searchNavbarBox) searchNavbarBox.classList.remove("visible-flex");
            if(catalogShelvesStackContainer) catalogShelvesStackContainer.classList.remove("hidden-element-view");
            if(primaryHeroGreetingSection) primaryHeroGreetingSection.classList.remove("hidden-element-view");
            if(dynamicSearchOutputViewSection) dynamicSearchOutputViewSection.classList.add("hidden-element-view");
        }
    }

    function executeRealTimeLibraryFiltering(queryString) {
        const resultsContainerGrid = document.getElementById("search-results-target");
        if(!resultsContainerGrid) return;
        resultsContainerGrid.innerHTML = "";
        
        if (queryString.trim() === "") {
            if(searchClearBtn) searchClearBtn.style.display = "none";
            songs.forEach((track, idx) => {
                appendCardToContainer(resultsContainerGrid, idx, track.title, track.artist, track.cover, false, idx);
            });
            return;
        }

        if(searchClearBtn) searchClearBtn.style.display = "block";
        const normaliseQuery = queryString.toLowerCase();

        songs.forEach((track, idx) => {
            if (track.title.toLowerCase().includes(normaliseQuery) || track.artist.toLowerCase().includes(normaliseQuery)) {
                appendCardToContainer(resultsContainerGrid, idx, track.title, track.artist, track.cover, false, idx);
            }
        });
    }

    function clearSearchInputEngine() {
        if(globalSearchInputNode) {
            globalSearchInputNode.value = "";
            executeRealTimeLibraryFiltering("");
            globalSearchInputNode.focus();
        }
    }

    function filterMusicViewByLikedSongs() {
        changeAppInterfaceTab("search");
        const resultsGrid = document.getElementById("search-results-target");
        if(!resultsGrid) return;
        resultsGrid.innerHTML = "";

        if (likedSongsDatabaseSet.size === 0) {
            resultsGrid.innerHTML = `<p class="text-muted" style="grid-column: 1/-1; padding: 20px 0; font-size:13px;">Your Library has no Liked records cached.</p>`;
            return;
        }

        songs.forEach((track, idx) => {
            if (likedSongsDatabaseSet.has(idx)) {
                appendCardToContainer(resultsGrid, idx, track.title, track.artist, track.cover, false, idx);
            }
        });
    }

    function createNewCustomPlaylistLink() { showToast("Created New Playlist Blueprint"); }
    function showToast(message) {
        const toast = document.querySelector(".toast");
        if(!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => { toast.classList.remove("show"); }, 1800);
    }

    function processWindowCanvasOpacityTransition() {
        if(!mainScrollCanvasArea || !stickyHeaderBar) return;
        if (mainScrollCanvasArea.scrollTop > 40) stickyHeaderBar.classList.add("scrolled-navbar-state");
        else stickyHeaderBar.classList.remove("scrolled-navbar-state");
    }

    function deployCustomRightClickOverlay(mouseEvent) {
        const targetedCardItem = mouseEvent.target.closest(".standard-media-card, .greeting-matrix-node, .playlist-row-node");
        if (!targetedCardItem || !customRightClickContextMenu) return;

        mouseEvent.preventDefault();
        contextMenuActiveTargetId = targetedCardItem.getAttribute("data-context-id");

        customRightClickContextMenu.style.top = `${mouseEvent.clientY}px`;
        customRightClickContextMenu.style.left = `${mouseEvent.clientX}px`;
        customRightClickContextMenu.style.display = "block";
    }

    function handleContextPlay() {
        if (contextMenuActiveTargetId !== null) {
            playSong(parseInt(contextMenuActiveTargetId) % songs.length);
        }
    }

    function toggleFullscreenDisplayViewMode() {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen();
    }

    function deployAppSkeletonStatePlaceholders() {
        const defaultTargets = ["shelf-recent-target", "shelf-trending-target", "shelf-artists-target", "shelf-curated-target", "shelf-charts-target", "shelf-podcasts-target", "shelf-releases-target"];
        defaultTargets.forEach(targetId => {
            const domTarget = document.getElementById(targetId);
            if (domTarget) {
                domTarget.innerHTML = Array(3).fill(0).map(() => `
                    <div class="skeleton-card-wireframe">
                        <div class="skeleton-box skeleton-image"></div>
                        <div class="skeleton-box skeleton-title"></div>
                    </div>
                `).join("");
            }
        });
    }

    function executeGreetingTimestampEvaluation() {
        const currentHourIndex = new Date().getHours();
        const anchorTextNode = document.getElementById("greeting-text-node");
        if(!anchorTextNode) return;
        if (currentHourIndex < 12) anchorTextNode.innerText = "Good Morning";
        else if (currentHourIndex < 18) anchorTextNode.innerText = "Good Afternoon";
        else anchorTextNode.innerText = "Good Evening";
    }

    function enforceGlobalImageFallbackValidation() {
        document.querySelectorAll("img").forEach(img => {
            img.onerror = () => { img.src = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&q=70"; };
        });
    }

    function executePrimaryLayoutDataRender() {
        const targetSidebarStack = document.getElementById("sidebar-playlists-target");
        const targetGreetingMatrix = document.getElementById("greeting-matrix-target");
        const targetRecentShelf = document.getElementById("shelf-recent-target");

        if(targetSidebarStack) targetSidebarStack.innerHTML = "";
        if(targetGreetingMatrix) targetGreetingMatrix.innerHTML = "";
        if(targetRecentShelf) targetRecentShelf.innerHTML = "";

        mockPlaylistsMetadata.forEach((pl, idx) => {
            if(targetSidebarStack) {
                const itemRow = document.createElement("div");
                itemRow.className = "playlist-row-node";
                itemRow.id = `sidebar-node-item-${idx + 100}`;
                itemRow.innerHTML = `
                    <img src="${pl.cover}" alt="Row Artwork" width="44" height="44" loading="lazy">
                    <div class="playlist-row-metadata">
                        <h4>${pl.title}</h4>
                        <p>Playlist • Spotify Studio</p>
                    </div>
                `;
                itemRow.addEventListener("click", () => playSong(idx % songs.length));
                targetSidebarStack.appendChild(itemRow);
            }

            if(targetGreetingMatrix) {
                const matrixNode = document.createElement("div");
                matrixNode.className = "greeting-matrix-node";
                matrixNode.setAttribute("data-context-id", idx);
                matrixNode.innerHTML = `
                    <img src="${pl.cover}" alt="Artwork" width="64" height="64" loading="lazy">
                    <span>${pl.title}</span>
                    <div class="hover-play-trigger"><i class="fa-solid fa-play"></i></div>
                `;
                matrixNode.addEventListener("click", () => playSong(idx % songs.length));
                targetGreetingMatrix.appendChild(matrixNode);
            }
        });

        songs.forEach((track, idx) => {
            if(targetRecentShelf && idx < 3) appendCardToContainer(targetRecentShelf, idx, track.title, track.artist, track.cover, false, idx);
        });
    }

    function executeDeferredShelvesDataRender() {
        const targetTrendingShelf = document.getElementById("shelf-trending-target");
        const targetArtistsShelf = document.getElementById("shelf-artists-target");
        const targetCuratedShelf = document.getElementById("shelf-curated-target");
        const targetChartsShelf = document.getElementById("shelf-charts-target");
        const targetPodcastsShelf = document.getElementById("shelf-podcasts-target");
        const targetReleasesShelf = document.getElementById("shelf-releases-target");

        const nodesList = [targetTrendingShelf, targetArtistsShelf, targetCuratedShelf, targetChartsShelf, targetPodcastsShelf, targetReleasesShelf];
        nodesList.forEach(node => { if(node) node.innerHTML = ""; });

        songs.forEach((track, idx) => {
            if(targetTrendingShelf && idx < 4) appendCardToContainer(targetTrendingShelf, idx, track.title, track.artist, track.cover, false, idx);
            if(targetCuratedShelf && idx > 1) appendCardToContainer(targetCuratedShelf, idx, track.title, track.artist, track.cover, false, idx);
            if(targetChartsShelf && idx < 3) appendCardToContainer(targetChartsShelf, idx, track.title, track.artist, track.cover, false, idx);
            if(targetReleasesShelf && idx > 2) appendCardToContainer(targetReleasesShelf, idx, track.title, track.artist, track.cover, false, idx);
        });

        mockPodcastsMetadata.forEach((pd, idx) => {
            if(targetPodcastsShelf) {
                appendCardToContainer(targetPodcastsShelf, idx, pd.title, pd.desc, pd.cover, false, "", () => {
                    showToast("Streaming Podcast Framework...");
                });
            }
        });

        mockArtistsMetadata.forEach((art, idx) => {
            if(targetArtistsShelf) {
                const artistCard = document.createElement("div");
                artistCard.className = "standard-media-card circular-artist-layout";
                artistCard.setAttribute("data-context-id", (idx + 10));
                artistCard.innerHTML = `
                    <div class="card-artwork-frame">
                        <img src="${art.cover}" alt="Artist" width="150" height="150" loading="lazy">
                    </div>
                    <h3>${art.name}</h3>
                    <p>${art.streams}</p>
                    <div class="card-buttons">
                        <button class="play-card-btn"><i class="fa-solid fa-play"></i></button>
                    </div>
                `;
                artistCard.querySelector(".play-card-btn").addEventListener("click", (e) => {
                    e.stopPropagation();
                    playSong(idx % songs.length);
                });
                targetArtistsShelf.appendChild(artistCard);
            }
        });
    }

    function appendCardToContainer(containerNode, id, title, descriptor, coverSrc, isCircularLayout = false, contextId = "", explicitCallback = null) {
        if(!containerNode) return;
        const cardNode = document.createElement("div");
        cardNode.className = `standard-media-card ${isCircularLayout ? "circular-artist-layout" : ""}`;
        if(contextId !== "") cardNode.setAttribute("data-context-id", contextId);
        
        const isCurrentlyLiked = likedSongsDatabaseSet.has(id);

        cardNode.innerHTML = `
            <div class="card-artwork-frame">
                <img src="${coverSrc}" alt="Thumbnail" width="150" height="150" loading="lazy">
            </div>
            <h3>${title}</h3>
            <p>${descriptor}</p>
            <div class="card-buttons">
                <button class="play-card-btn"><i class="fa-solid fa-play"></i></button>
                <button class="favorite-btn card-fav-trigger-node-${id} ${isCurrentlyLiked ? 'active' : ''}">
                    <i class="${isCurrentlyLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
                </button>
            </div>
        `;

        const coreFavToggleBtn = cardNode.querySelector(".favorite-btn");
        
        if (explicitCallback) {
            cardNode.addEventListener("click", explicitCallback);
        } else {
            cardNode.addEventListener("click", () => playSong(id));
        }

        if(coreFavToggleBtn) {
            coreFavToggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                executeFavoriteRegistryToggleLogic(id);
            });
        }
        containerNode.appendChild(cardNode);
    }

    initApplicationEngine();
});

/* ==========================================================================
   INSTANT DOCK DISMISSAL FAKE-FAST SEQUENCER
   ========================================================================== */
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader-wrapper");
    if (loader) {
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});