const navigation = document.querySelector(".navigation");
const navigationContainer = document.querySelector(".navigationContainer");
const menuIconContainer = document.querySelector(".menuIconContainer");

const sideBarContainer = document.querySelector(".sideBarContainer");
const closeBtn = document.querySelector(".closeBtn");
const sideBarMovieMenuContainer = document.querySelector(".sideBarMovieMenuContainer");
const sideBarTvshowMenuContainer = document.querySelector(".sideBarTvshowMenuContainer");
const sideBarPeopleMenuContainer = document.querySelector(".sideBarPeopleMenuContainer");
const sideBarLoginMenuContainer = document.querySelector(".sideBarLoginMenuContainer");
const sideBarMenu = document.querySelector(".sideBarMenu");

const searchBox = document.querySelector(".searchBox");
const searchInput = document.querySelector(".searchInput");
const searchList = document.querySelector(".searchList");

const showResultContainer = document.querySelector(".showResultContainer");
const heading = document.querySelector(".heading");
const headingH1 = document.querySelector(".heading h1");
const movieContainer = document.querySelector(".movieContainer");
const movieDetailContainer = document.querySelector(".movieDetailContainer");
const castContainer = document.querySelector(".castContainer");
const recommendContainer = document.querySelector(".recommendContainer");
const personDetailContainer = document.querySelector(".personDetailContainer");
const knownForContainer = document.querySelector(".knownForContainer");

const pageNumber = document.querySelector(".pageNumber");
const prev = document.querySelector(".prev");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const numbers = document.querySelector(".numbers");
const dot = document.querySelector(".dot");
const last = document.querySelector(".last");
const next = document.querySelector(".next");

const back = document.querySelector(".back");
const footer = document.querySelector("footer");
const copyright = document.querySelector(".copyright");

// Sticky navigation bar when scroll
window.addEventListener("scroll", () => {
    navigationContainer.classList.toggle("sticky", window.scrollY > 0);
});

// Show and hide sidebar menu
menuIconContainer.addEventListener("click", () => {
    sideBarContainer.style.left = "0";
    back.style.display = "none";
});
closeBtn.addEventListener("click", () => {
    sideBarContainer.style.left = "-70%";
    back.style.display = "block";
});
sideBarMovieMenuContainer.addEventListener("click", () => {
    if(sideBarTvshowMenuContainer.classList.contains("clicked") || sideBarPeopleMenuContainer.classList.contains("clicked") || sideBarLoginMenuContainer.classList.contains("clicked")){
        sideBarTvshowMenuContainer.classList.remove("clicked");
        sideBarPeopleMenuContainer.classList.remove("clicked");
        sideBarLoginMenuContainer.classList.remove("clicked");
    }
    sideBarMovieMenuContainer.classList.toggle("clicked");
});
sideBarTvshowMenuContainer.addEventListener("click", () => {
    if(sideBarMovieMenuContainer.classList.contains("clicked") || sideBarPeopleMenuContainer.classList.contains("clicked") || sideBarLoginMenuContainer.classList.contains("clicked")){
        sideBarMovieMenuContainer.classList.remove("clicked");
        sideBarPeopleMenuContainer.classList.remove("clicked");
        sideBarLoginMenuContainer.classList.remove("clicked");
    }
    sideBarTvshowMenuContainer.classList.toggle("clicked");
});
sideBarPeopleMenuContainer.addEventListener("click", () => {
    if(sideBarTvshowMenuContainer.classList.contains("clicked") || sideBarMovieMenuContainer.classList.contains("clicked") || sideBarLoginMenuContainer.classList.contains("clicked")){
        sideBarTvshowMenuContainer.classList.remove("clicked");
        sideBarMovieMenuContainer.classList.remove("clicked");
        sideBarLoginMenuContainer.classList.remove("clicked");
    }
    sideBarPeopleMenuContainer.classList.toggle("clicked");
});
sideBarLoginMenuContainer.addEventListener("click", () => {
    if(sideBarTvshowMenuContainer.classList.contains("clicked") || sideBarMovieMenuContainer.classList.contains("clicked") || sideBarPeopleMenuContainer.classList.contains("clicked")){
        sideBarTvshowMenuContainer.classList.remove("clicked");
        sideBarMovieMenuContainer.classList.remove("clicked");
        sideBarPeopleMenuContainer.classList.remove("clicked");
    }
    sideBarLoginMenuContainer.classList.toggle("clicked");
});

// Search list show and hide effect
searchInput.addEventListener("focus", () => {
    searchBox.classList.add("active");
});
window.addEventListener("click", (event) => {
    if(event.target.className === "searchInput"){
        return;
    };
    searchBox.classList.remove("active");
});

let array = [ { mediaType: "", tmdbId: "", searchText: "" } ];
let lastIndex;

// Show movies on body
const url = "https://api.themoviedb.org/3/movie/popular?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=1";
const imgpath = "https://image.tmdb.org/t/p/w1280";

const showMovies = async (url) => {
    const response = await fetch(url);
    const responseData = await response.json();

    const movies = responseData.results;

    if(responseData.total_pages >= 500){
        lastIndex = 500;
        last.innerHTML = lastIndex;
    }else{
        lastIndex = responseData.total_pages;
        last.innerHTML = lastIndex;
    }

    for (let i = 0; i < movies.length; i++) {
        const movieBox = document.createElement("div");
        movieBox.classList.add("movieBox");
        movieBox.setAttribute("movie-id",`${movies[i].id}`);

        let moviePoster = movies[i].poster_path;
        if(moviePoster != null){
            moviePoster = imgpath + moviePoster;
        }else{
            moviePoster = "../../images/image_not_found.png"
        }

        let day, month, year, date;
        if(movies[i].release_date === undefined){
            day = "";
            month = "";
            year = "";

            date = month + " " + day + ", " + year;
        }
        else{
            day = (movies[i].release_date).substring(8,10);
            month = (movies[i].release_date).substring(5,7);
            year = (movies[i].release_date).substring(0,4);
            if(month === "01"){month = "Jan"}
            else if(month === "02"){month = "Feb"}
            else if(month === "03"){month = "Mar"}
            else if(month === "04"){month = "Apr"}
            else if(month === "05"){month = "May"}
            else if(month === "06"){month = "Jun"}
            else if(month === "07"){month = "Jul"}
            else if(month === "08"){month = "Aug"}
            else if(month === "09"){month = "Sep"}
            else if(month === "10"){month = "Oct"}
            else if(month === "11"){month = "Nov"}
            else if(month === "12"){month = "Dec"};

            date = month + " " + day + ", " + year;
        };

        let ratingDisplay;
        if(movies[i].vote_average === undefined || movies[i].vote_average === 0){
            ratingDisplay = "none";
        }else{
            ratingDisplay = "flex";
        };

        movieBox.innerHTML = `
            <div class="movieImg">
                <img src="${moviePoster}">
            </div>
            <div class="movieText">
                <h3>${movies[i].title}</h3>
                <div class="movieInfo">
                    <p>${date}</p>
                    <div style="display: ${ratingDisplay};" class="rating">
                        <span class="${ratingColor(movies[i].vote_average)}">${movies[i].vote_average}</span>
                        <img src="../../images/IMDb-icon.png" alt="">
                    </div>
                </div>
            </div>
        `;
        movieContainer.append(movieBox);

        const movieImg = movieBox.querySelector(".movieImg");
        movieImg.addEventListener("click", () => {
            showMovieDetails("movie",movies[i].id);
            const object = { mediaType: "movie", tmdbId: `${movies[i].id}`, searchText: "" };
            array.push(object);
        });

        const movieTextH3 = movieBox.querySelector(".movieText h3");
        movieTextH3.addEventListener("click", () => {
            showMovieDetails("movie",movies[i].id);
            const object = { mediaType: "movie", tmdbId: `${movies[i].id}`, searchText: "" };
            array.push(object);
        });
    };
};
showMovies(url);

const ratingColor = (vote) => {
    if(vote >= 8){
        return "green";
    } else if(vote >= 5){
        return "orange";
    } else {
        return "red";
    }
};

// Show serach list items
const showSearchListItem = async (searchText) => {
    if(searchText.length === 0){
        return;
    };
    const url = `https://api.themoviedb.org/3/search/movie?&api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}`;
    const response = await fetch(url);
    const responseData = await response.json();
    
    const movies = responseData.results;

    for(let i = 0; i < movies.length; i++){
        const searchListItem = document.createElement("a");
        searchListItem.classList.add("searchListItem");
        searchListItem.setAttribute("movie-id", `${movies[i].id}`);

        let moviePoster = movies[i].poster_path;
        if(moviePoster != null){
            moviePoster = imgpath + moviePoster;
        }else{
            moviePoster = "../../images/image_not_found.png"
        };

        let releaseDate;
        if(movies[i].release_date === undefined){
            releaseDate = "";
        }else{
            releaseDate = movies[i].release_date.substring(0,4);
        };

        searchListItem.innerHTML = `
            <div class="searchItemImg">
                <img src="${moviePoster}">
            </div>
            <div class="searchItemInfo">
                <h3>${movies[i].title}</h3>
                <p>${releaseDate}</p>
            </div>
        `;
        searchList.append(searchListItem);

        // Show movie details when click
        searchListItem.addEventListener("click", async () => {
            searchInput.value = "";
            searchList.innerHTML = "";
            showMovieDetails("movie", movies[i].id);
            const object = { mediaType: "movie", tmdbId: `${movies[i].id}`, searchText: "" };
            array.push(object);
        });
    };
};
searchInput.addEventListener("keyup", (event) => {
    const searchText = event.target.value.toLowerCase();
    if(searchText.length > 0){
        searchBox.classList.add("active");
    };
    if(searchText.length === 0){
        searchBox.classList.remove("active");
    };
    showSearchListItem(searchText);
    searchList.innerHTML = "";
});

// Show search movies on body when submit
searchBox.addEventListener("submit",(event) => {
    event.preventDefault();

    const searchText = searchInput.value.toLowerCase();

    searchList.innerHTML = "";
    movieContainer.innerHTML = "";
    movieDetailContainer.innerHTML = "";
    castContainer.innerHTML = "";
    recommendContainer.innerHTML = "";
    personDetailContainer.innerHTML = "";
    knownForContainer.innerHTML = "";

    showResultContainer.style.display = "block";
    movieDetailContainer.style.display = "none";
    castContainer.style.display = "none";
    recommendContainer.style.display = "none";
    personDetailContainer.style.display = "none";
    knownForContainer.style.display = "none";

    back.style.display = "block";
    footer.style.backgroundColor = "#080808";
    copyright.style.color = "white";

    if(showResultContainer.style.display === "none"){
        showResultContainer.style.display = "block";
    };

    headingH1.innerHTML = `Search Results for "${searchText}"`;

    movieContainer.setAttribute("search-text", `${searchText}`);

    const url = `https://api.themoviedb.org/3/search/movie?&api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}`;
    if(searchText){
        searchInput.value = "";
        showMovies(url);
        const object = { mediaType: "", tmdbId: "", searchText: `${searchText}` };
        array.push(object);
    };

    showMoreSearchResult(searchText);
});

// Show movie details, casts and recommendations
const showMovieDetails = async (mediaType, tmdbId) => {
    let tmdbUrl;
    if(mediaType === "movie"){
        tmdbUrl = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
    }else if(mediaType === "tv"){
        tmdbUrl = `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
    };
    const tmdbResponse = await fetch(tmdbUrl);
    const tmdbResponseData = await tmdbResponse.json();

    let externalUrl;
    if(mediaType === "movie"){
        externalUrl = `https://api.themoviedb.org/3/movie/${tmdbId}/external_ids?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
    }else if(mediaType === "tv"){
        externalUrl = `https://api.themoviedb.org/3/tv/${tmdbId}/external_ids?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
    };
    const externalResponse = await fetch(externalUrl);
    const externalResponseData = await externalResponse.json();
    
    const imdbId = externalResponseData.imdb_id;
    const imdbUrl = `https://imdb-api.com/en/API/Title/k_cxf90bab/${imdbId}`; //  k_z2l7joxd
    const imdbResponse = await fetch(imdbUrl);
    const imdbResponseData = await imdbResponse.json();

    const youTubeUrl = `https://imdb-api.com/en/API/YouTubeTrailer/k_cxf90bab/${imdbId}`; //  k_z2l7joxd
    const youTubeResponse = await fetch(youTubeUrl);
    const youTubeResponseData = await youTubeResponse.json();

    let castUrl;
    if(mediaType === "movie"){
        castUrl = `https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
    }else if(mediaType === "tv"){
        castUrl = `https://api.themoviedb.org/3/tv/${tmdbId}/credits?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
    };
    const castResponse = await fetch(castUrl);
    const castResponseData = await castResponse.json();

    let recommendUrl;
    if(mediaType === "movie"){
        recommendUrl = `https://api.themoviedb.org/3/movie/${tmdbId}/recommendations?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=1`;
    } else if(mediaType === "tv"){
        recommendUrl = `https://api.themoviedb.org/3/tv/${tmdbId}/recommendations?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=1`;
    };
    const recommendResponse = await fetch(recommendUrl);
    const recommendResponseData = await recommendResponse.json();
    
    movieContainer.innerHTML = "";
    castContainer.innerHTML = "";
    recommendContainer.innerHTML = "";
    personDetailContainer.innerHTML = "";
    knownForContainer.innerHTML = "";

    showResultContainer.style.display = "none";
    movieDetailContainer.style.display = "block";
    castContainer.style.display = "block";
    recommendContainer.style.display = "block";
    personDetailContainer.style.display = "none";
    knownForContainer.style.display = "none";

    back.style.display = "block";
    footer.style.backgroundColor = "#f5eded";
    copyright.style.color = "#3e3636";

    let contentRating;
    if(imdbResponseData.contentRating === null){
        contentRating = "TV-MA";
    }else{
        contentRating = imdbResponseData.contentRating;
    };

    let runtime;
    if(imdbResponseData.runtimeStr === null){
        runtime = "";
    }else{
        runtime = imdbResponseData.runtimeStr;
    };

    let tagline;
    if(imdbResponseData.tagline === null){
        tagline = "";
    }else{
        tagline = imdbResponseData.tagline;
    };

    let directorDisplay;
    if(imdbResponseData.directors === ""){
        directorDisplay = "none";
    }else{
        directorDisplay = "block";
    };

    let writerDisplay;
    if(imdbResponseData.writers === ""){
        writerDisplay = "none";
    }else{
        writerDisplay = "block";
    };

    let awards, iconClass;
    if(imdbResponseData.awards === ""){
        awards = "";
        iconClass = "";
    }else{
        awards = imdbResponseData.awards;
        iconClass = "fas fa-award";
    };

    movieDetailContainer.innerHTML = `
        <div class="movieBackgroundImg">
            <img src="${imgpath + tmdbResponseData.backdrop_path}">
        </div>       
        <div class="movieDetailsContainer">
            <img class="moviePosterImg" src="${imgpath + tmdbResponseData.poster_path}">

            <div class="movieDetails">
                <h2>${imdbResponseData.fullTitle}</h2>
                <div class="movieInfomation">
                    <span> ${contentRating} </span>  
                    <span>${tmdbResponseData.vote_average}<img src="../../images/IMDb-icon.png"></span>
                    <span>${imdbResponseData.releaseDate}</span>
                    <span class="runTime">${runtime}</span>
                    <span class="genres">${imdbResponseData.genres}</span>
                    <span class="RunTime">${runtime}</span>
                </div>
                <span class="watchBtn">Watch Trailer</span>
                <div class="videoPopupContainer">
                    <div class="videoPopup">
                        <div class="close">
                            <span>Play Trailer</span>
                            <i class="material-icons closeBtn">close</i>
                        </div>
                        <div class="video">
                            <iframe src="https://www.youtube.com/embed/${youTubeResponseData.videoId}" autostart="false" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
                <div class="tagLine">
                    <i>${tagline}</i>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    <p>
                        ${imdbResponseData.plot}
                    </p>
                </div>
                <div class="directors" style="display: ${directorDisplay} ;">
                    <strong>Directors &nbsp;&nbsp;</strong>
                    <span>${imdbResponseData.directors}</span>
                </div>
                <div class="writers" style="display: ${writerDisplay} ;">
                    <strong>Writers &nbsp;&nbsp;</strong>
                    <span>${imdbResponseData.writers}</span>
                </div>
                <div class="stars">
                    <strong>Stars &nbsp;&nbsp;</strong>
                    <span>${imdbResponseData.stars}</span>
                </div>
                <div class="language">
                    <strong><i>Language</i> &nbsp;</strong>
                    <span><i>${imdbResponseData.languages}</i></span>
                </div>
                <div class="award">
                    <i class="${iconClass}"></i> &nbsp;
                    <span>${awards}</span>
                </div>
            </div>
        </div>        
    `;

    // Show and hide popup video
    const watchBtn = movieDetailContainer.querySelector(".watchBtn");
    const videoPopupContainer = movieDetailContainer.querySelector(".videoPopupContainer");
    const closeBtn = movieDetailContainer.querySelector(".closeBtn");
    const iframe = movieDetailContainer.querySelector("iframe");
    const movieDetailsContainer = movieDetailContainer.querySelector(".movieDetailsContainer");
    watchBtn.addEventListener("click", () => {
        videoPopupContainer.style.display = "flex";
        movieDetailsContainer.style.zIndex = "11";
        navigationContainer.style.position = "relative";
    });
    closeBtn.addEventListener("click", () => {
        videoPopupContainer.style.display = "none";
        iframe.src = `https://www.youtube.com/embed/${youTubeResponseData.videoId}`;
        movieDetailsContainer.style.zIndex = "1";
        navigationContainer.style.removeProperty("position");
    });

    // Cast
    const casts = castResponseData.cast;

    const castTitle = document.createElement("div");
    castTitle.classList.add("title");
    castTitle.append("Cast");
    
    const castBoxContainer = document.createElement("div");
    castBoxContainer.classList.add("castBoxContainer");

    for(let i = 0; i < casts.length; i++){              
        const castBox = document.createElement("div");
        castBox.classList.add("castBox");
        castBox.setAttribute("tmdbId", `${casts[i].id}`);

        let castProfile = casts[i].profile_path;
        if(castProfile != null){
            castProfile = imgpath + castProfile;
        }else{
            castProfile = "../../images/image_not_found.png"
        }

        castBox.innerHTML = `
            <div class="castImg">
                <img src="${castProfile}">
            </div>
            <div class="castText">
                <h3>${casts[i].original_name}</h3>
                <p>${casts[i].character}</p>
            </div>
        `;

        castBoxContainer.append(castBox);
        castContainer.append(castTitle,castBoxContainer);

        const castImg = castBox.querySelector(".castImg");
        castImg.addEventListener("click", () => {
            showPersonDetails(casts[i].id);
            const object = { mediaType: `person`, tmdbId: `${casts[i].id}`, searchText: "" };
            array.push(object);
        });

        const castTextH3 = castBox.querySelector(".castText h3");
        castTextH3.addEventListener("click", () => {
            showPersonDetails(casts[i].id);
            const object = { mediaType: `person`, tmdbId: `${casts[i].id}`, searchText: "" };
            array.push(object);
        });
    };

    // Recommend movies
    const recommends = recommendResponseData.results;

    const recommendTitle = document.createElement("div");
    recommendTitle.classList.add("title");
    recommendTitle.append("Recommendations");
    
    const recommendBoxContainer = document.createElement("div");
    recommendBoxContainer.classList.add("recommendBoxContainer");

    for(let i = 0; i < recommends.length; i++){
        const recommendBox = document.createElement("div");
        recommendBox.classList.add("recommendBox");
        recommendBox.setAttribute("tmdbId", `${recommends[i].id}`);
        recommendBox.setAttribute("media-type", `${recommends[i].media_type}`);

        let name;
        if(recommends[i].title === undefined){
            name = recommends[i].name;
        };
        if(recommends[i].name === undefined){
            name = recommends[i].title;
        };
        recommendBox.setAttribute("name", `${name}`);

        let moviePoster = recommends[i].poster_path;
        if(moviePoster != null){
            moviePoster = imgpath + moviePoster;
        }else{
            moviePoster = "../../images/image_not_found.png"
        }

        let day, month, year, date;
        if(recommends[i].release_date === undefined){
            day = (recommends[i].first_air_date).substring(8,10);
            month = (recommends[i].first_air_date).substring(5,7);
            year = (recommends[i].first_air_date).substring(0,4);
            if(month === "01"){month = "Jan"}
            else if(month === "02"){month = "Feb"}
            else if(month === "03"){month = "Mar"}
            else if(month === "04"){month = "Apr"}
            else if(month === "05"){month = "May"}
            else if(month === "06"){month = "Jun"}
            else if(month === "07"){month = "Jul"}
            else if(month === "08"){month = "Aug"}
            else if(month === "09"){month = "Sep"}
            else if(month === "10"){month = "Oct"}
            else if(month === "11"){month = "Nov"}
            else if(month === "12"){month = "Dec"};

            date = month + " " + day + ", " + year;
        }
        else if(recommends[i].first_air_date === undefined){
            day = (recommends[i].release_date).substring(8,10);
            month = (recommends[i].release_date).substring(5,7);
            year = (recommends[i].release_date).substring(0,4);
            if(month === "01"){month = "Jan"}
            else if(month === "02"){month = "Feb"}
            else if(month === "03"){month = "Mar"}
            else if(month === "04"){month = "Apr"}
            else if(month === "05"){month = "May"}
            else if(month === "06"){month = "Jun"}
            else if(month === "07"){month = "Jul"}
            else if(month === "08"){month = "Aug"}
            else if(month === "09"){month = "Sep"}
            else if(month === "10"){month = "Oct"}
            else if(month === "11"){month = "Nov"}
            else if(month === "12"){month = "Dec"};

            date = month + " " + day + ", " + year;
        };

        recommendBox.innerHTML = `
            <div class="recommendImg">
                <img src="${moviePoster}">
            </div>
            <div class="recommendText">
                <h3>${name}</h3>
                <div class="recommendInfo">
                    <p>${date}</p>
                    <div class="rating">
                        <span class="${ratingColor(recommends[i].vote_average.toFixed(1))}">
                            ${recommends[i].vote_average.toFixed(1)}
                        </span>
                        <img src="../../images/IMDb-icon.png">
                    </div>
                </div>
            </div>
        `;

        recommendBoxContainer.append(recommendBox);
        recommendContainer.append(recommendTitle, recommendBoxContainer);

        const recommendImg = recommendBox.querySelector(".recommendImg");
        recommendImg.addEventListener("click", () => {
            showMovieDetails(recommends[i].media_type, recommends[i].id);
            const object = { mediaType: `${recommends[i].media_type}`, tmdbId: `${recommends[i].id}`, searchText: "" };
            array.push(object);
        });

        const recommendTextH3 = recommendBox.querySelector(".recommendText h3");
        recommendTextH3.addEventListener("click", () => {
            showMovieDetails(recommends[i].media_type, recommends[i].id);
            const object = { mediaType: `${recommends[i].media_type}`, tmdbId: `${recommends[i].id}`, searchText: "" };
            array.push(object);
        });
    };
};

// Show person details and known for movies
const showPersonDetails = async (tmdbId) => {
    const tmdbUrl = `https://api.themoviedb.org/3/person/${tmdbId}?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
    const tmdbResponse = await fetch(tmdbUrl);
    const tmdbResponseData = await tmdbResponse.json();

    const imdbId = tmdbResponseData.imdb_id;
    const imdbUrl = `https://imdb-api.com/en/API/Name/k_cxf90bab/${imdbId}`;  //  k_z2l7joxd
    const imdbResponse = await fetch(imdbUrl);
    const imdbResponseData = await imdbResponse.json();
    
    movieContainer.innerHTML = "";
    movieDetailContainer.innerHTML = "";
    castContainer.innerHTML = "";
    recommendContainer.innerHTML = "";
    knownForContainer.innerHTML = "";

    showResultContainer.style.display = "none";
    movieDetailContainer.style.display = "none";
    castContainer.style.display = "none";
    recommendContainer.style.display = "none";
    personDetailContainer.style.display = "flex";
    knownForContainer.style.display = "block";

    back.style.display = "block";
    footer.style.backgroundColor = "#f5eded";
    copyright.style.color = "#3e3636";

    let gender;
    if(tmdbResponseData.gender === 1){
        gender = "Female";
    };
    if(tmdbResponseData.gender === 2){
        gender = "Male";
    };

    const date = new Date();
    const current = date.getFullYear().toString();
    const birthday = (tmdbResponseData.birthday).substring(0,4);

    const age = current - birthday;

    personDetailContainer.innerHTML = `  
        <img class="personProfileImg" src="${imgpath + tmdbResponseData.profile_path}">

        <div class="personDetails">
            <h2>${tmdbResponseData.name}</h2>
            <div class="biography">
                <h3>Biography</h3>
                <p>
                    ${tmdbResponseData.biography}
                </p>
            </div>
            <h3 class="personalInfoHeading">Personal Info</h3>
            <div class="personalInfo">
                <div class="role">
                    <strong>Role</strong>
                    <p>${imdbResponseData.role}</p> 
                </div>
                <div class="gender">
                    <strong>Gender</strong>
                    <p>${gender}</p>
                </div>
                <div class="birthday">
                    <strong>Birthday</strong>
                    <p>${tmdbResponseData.birthday} (${age} years old)</p>
                </div>
                <div class="birthplace">
                    <strong>Place of Birth</strong>
                    <p>${tmdbResponseData.place_of_birth}</p>
                </div>
                <div class="award">
                    <strong>Award</strong>
                    <p>${imdbResponseData.awards}</p>
                </div>
            </div>
        </div>
    `;

    // Known for movies
    const knownFor = imdbResponseData.knownFor;

    const knownForTitle = document.createElement("div");
    knownForTitle.classList.add("title");
    knownForTitle.append("Known For");
    
    const knownForBoxContainer = document.createElement("div");
    knownForBoxContainer.classList.add("knownForBoxContainer");

    for(let i = 0; i < knownFor.length; i++){

        const title = knownFor[i].title;
        const tmdbUrl = `https://api.themoviedb.org/3/search/multi?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${title}`;
        const tmdbResponse = await fetch(tmdbUrl);
        const tmdbResponseData = await tmdbResponse.json();

        const knownForBox = document.createElement("div");
        knownForBox.classList.add("knownForBox");
        knownForBox.setAttribute("tmdbid", `${tmdbResponseData.results[0].id}`);
        knownForBox.setAttribute("media-type", `${tmdbResponseData.results[0].media_type}`);

        knownForBox.innerHTML = `
            <div class="knownForImg">
                <img src="${knownFor[i].image}">
            </div>
            <div class="knownForText">
                <h3>${knownFor[i].title}</h3>
                <p>${knownFor[i].role}</p>
                <p>(${knownFor[i].year})</p>
                </div>
            </div>
        `;

        knownForBoxContainer.append(knownForBox);
        knownForContainer.append(knownForTitle, knownForBoxContainer);

        knownForBox.addEventListener("click", () => {
            showMovieDetails(tmdbResponseData.results[0].media_type, tmdbResponseData.results[0].id);
            const object = { mediaType: `${tmdbResponseData.results[0].media_type}`, tmdbId: `${tmdbResponseData.results[0].id}`, searchText: "" };
            array.push(object);
        });
    };
};

// Back one step
back.addEventListener("click", () => {

    if(array[array.length-2].mediaType === "" && array[array.length-2].tmdbId === "" && array[array.length-2].searchText === ""){
        movieContainer.innerHTML = "";
        movieDetailContainer.innerHTML = "";
        castContainer.innerHTML = "";
        recommendContainer.innerHTML = "";
        personDetailContainer.innerHTML = "";
        knownForContainer.innerHTML = "";
    
        showResultContainer.style.display = "block";
        movieDetailContainer.style.display = "none";
        castContainer.style.display = "none";
        recommendContainer.style.display = "none";
        personDetailContainer.style.display = "none";
        knownForContainer.style.display = "none";

        back.style.display = "none";
        footer.style.backgroundColor = "#080808";
        copyright.style.color = "white";

        headingH1.innerHTML = "Popular Movies";

        showMovies(url);
        array.pop();

        index = 1;
        movieContainer.removeAttribute("search-text");

        if(one.classList.contains("active") || two.classList.contains("active") || 
        three.classList.contains("active") || last.classList.contains("active") || numbers.classList.contains("active"))
        {
            two.classList.remove("active");
            three.classList.remove("active");
            numbers.classList.remove("active")
            last.classList.remove("active");
    
            prev.style.display = "none";
            numbers.style.display = "none";
            dot.style.display = "inline";
            next.style.display = "inline";
    
            one.classList.add("active");
        };

        pageNumber.style.display = "flex";
        prev.style.display = "none";
        one.style.display = "inline";
        two.style.display = "inline";
        three.style.display = "inline";
        dot.style.display = "inline";
        numbers.style.display = "none";
        last.style.display = "inline";
        next.style.display = "inline";
    }

    else if(array[array.length-2].mediaType === "" && array[array.length-2].tmdbId === ""){

        searchList.innerHTML = "";
        movieContainer.innerHTML = "";
        movieDetailContainer.innerHTML = "";
        castContainer.innerHTML = "";
        recommendContainer.innerHTML = "";
        personDetailContainer.innerHTML = "";
        knownForContainer.innerHTML = "";
    
        showResultContainer.style.display = "block";
        movieDetailContainer.style.display = "none";
        castContainer.style.display = "none";
        recommendContainer.style.display = "none";
        personDetailContainer.style.display = "none";
        knownForContainer.style.display = "none";
    
        headingH1.innerHTML = `Search Results for "${array[array.length-2].searchText}"`;

        movieContainer.setAttribute("search-text", `${array[array.length-2].searchText}`);

        const url = `https://api.themoviedb.org/3/search/movie?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${array[array.length-2].searchText}`;
        showMovies(url);

        showMoreSearchResult(`${array[array.length-2].searchText}`);

        array.pop();
    }

    else if( (array[array.length-2].mediaType === "movie" || array[array.length-2].mediaType === "tv") && array[array.length-2].searchText === ""){
        showMovieDetails(array[array.length-2].mediaType, array[array.length-2].tmdbId);
        array.pop();
    }
    else if(array[array.length-2].mediaType === "person" && array[array.length-2].searchText === ""){
        showPersonDetails(array[array.length-2].tmdbId)
        array.pop();
    };
}); 

// Show more
let index = 1;

const showMoreSearchResult = async (searchText) => {
    if(searchText){    
        const searchResultUrl = `https://api.themoviedb.org/3/search/movie?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=1`;
        const searchResultResponse = await fetch(searchResultUrl);
        const searchResultResponseData = await searchResultResponse.json();

        lastIndex = searchResultResponseData.total_pages;
        last.innerHTML = lastIndex;
    };

    if(one.classList.contains("active") || two.classList.contains("active") || 
    three.classList.contains("active") || last.classList.contains("active") || numbers.classList.contains("active"))
    {
        two.classList.remove("active");
        three.classList.remove("active");
        numbers.classList.remove("active")
        last.classList.remove("active");

        prev.style.display = "none";
        numbers.style.display = "none";
        dot.style.display = "inline";
        next.style.display = "inline";

        one.classList.add("active");
    };

    if(lastIndex === 1){
        index = 1;
        pageNumber.style.display = "none";
    }else{
        pageNumber.style.display = "flex";
    };

    if(lastIndex === 2){
        index = 1;
        prev.style.display = "none";
        one.style.display = "inline";
        two.style.display = "inline";
        three.style.display = "none";
        numbers.style.display = "none";
        dot.style.display = "none";
        last.style.display = "none";
        next.style.display = "inline";
    };

    if(lastIndex === 3){
        index = 1;
        prev.style.display = "none";
        one.style.display = "inline";
        two.style.display = "inline";
        three.style.display = "inline";
        numbers.style.display = "none";
        dot.style.display = "none";
        last.style.display = "none";
        next.style.display = "inline";
    };

    if(lastIndex === 4){
        index = 1;
        prev.style.display = "none";
        one.style.display = "inline";
        two.style.display = "inline";
        three.style.display = "inline";
        numbers.style.display = "none";
        dot.style.display = "none";
        last.style.display = "inline";
        next.style.display = "inline";
    };

    if(lastIndex >= 5){
        index = 1;
        prev.style.display = "none";
        one.style.display = "inline";
        two.style.display = "inline";
        three.style.display = "inline";
        numbers.style.display = "none";
        dot.style.display = "inline";
        last.style.display = "inline";
        next.style.display = "inline";
    }
};

next.addEventListener("click", () => {
    index += 1;
    numbers.innerHTML = index;
    
    if(index === 2 && one.classList.contains("active")){
        one.classList.remove("active");
        two.classList.add("active");
    };

    if(index === 3 && two.classList.contains("active")){
        two.classList.remove("active");
        three.classList.add("active");
    };
    
    if(index === 4){
        dot.style.display = "none";
        numbers.style.display = "inline";
        numbers.classList.add("active");
        three.classList.remove("active");
    };

    if(index === lastIndex && lastIndex === 2){
        next.style.display = "none";
        numbers.style.display = "none";
        dot.style.display = "none";
    }
    else if(index === lastIndex && lastIndex === 3){
        next.style.display = "none";
        numbers.style.display = "none";
        dot.style.display = "none";
    }
    else if(index === lastIndex && lastIndex === 4){
        next.style.display = "none";
        numbers.style.display = "none";
        dot.style.display = "none";
        three.classList.remove("active");
        last.classList.add("active");
    }
    else if(index === lastIndex){
        numbers.classList.remove("active");
        last.classList.add("active");

        next.style.display = "none";
        numbers.style.display = "none";
        dot.style.display = "inline";
    };

    prev.style.display = "inline";

    movieContainer.innerHTML = "";
    if(movieContainer.getAttribute("search-text") === null){
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=${index}`;
        showMovies(url);
    }else{
        const searchText = movieContainer.getAttribute("search-text");
        const url = `https://api.themoviedb.org/3/search/movie?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=${index}`;
        showMovies(url);
    }
});

prev.addEventListener("click", () => {
    index -= 1;
    numbers.innerHTML = index;

    if(index === 1 && two.classList.contains("active")){
        two.classList.remove("active");
        one.classList.add("active");
        prev.style.display = "none";
    };

    if(index === 2 && three.classList.contains("active")){
        three.classList.remove("active");
        two.classList.add("active");
    };

    if(index === 3 && numbers.classList.contains("active")){
        numbers.classList.remove("active");
        three.classList.add("active");
    };

    if(index < 4 && index === lastIndex - 2){
        numbers.style.display = "none";
        dot.style.display = "none";
    }
    else if(index < 4 && index === lastIndex - 3){
        numbers.style.display = "none";
        dot.style.display = "none";
    }
    else if(index < 4){
        numbers.style.display = "none";
        dot.style.display = "inline";
    };

    if(index === lastIndex - 1 && index === 1){
        dot.style.display = "none";
        numbers.style.display = "none";
        next.style.display = "inline";
    }
    else if(index === lastIndex - 1 && index === 2){
        dot.style.display = "none";
        numbers.style.display = "none";
        next.style.display = "inline";
    }
    else if(index === lastIndex - 1 && index === 3){
        dot.style.display = "none";
        numbers.style.display = "none";
        next.style.display = "inline";
        three.classList.add("active");
        last.classList.remove("active");
    }
    else if(index === lastIndex - 1){
        numbers.classList.add("active");
        last.classList.remove("active");

        dot.style.display = "none";
        numbers.style.display = "inline";
        next.style.display = "inline";
    };

    movieContainer.innerHTML = "";
    if(movieContainer.getAttribute("search-text") === null){
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=${index}`;
        showMovies(url);
    }else{
        const searchText = movieContainer.getAttribute("search-text");
        const url = `https://api.themoviedb.org/3/search/movie?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=${index}`;
        showMovies(url);
    }
});

one.addEventListener("click", () => {
    index = 1;

    if(one.classList.contains("active") || two.classList.contains("active") || 
    three.classList.contains("active") || last.classList.contains("active") || numbers.classList.contains("active"))
    {
        two.classList.remove("active");
        three.classList.remove("active");
        numbers.classList.remove("active")
        last.classList.remove("active");

        prev.style.display = "none";
        numbers.style.display = "none";
        dot.style.display = "inline";
        next.style.display = "inline";

        one.classList.add("active");
    };

    if(lastIndex === 2 || lastIndex === 3 || lastIndex === 4){
        dot.style.display = "none";
        next.style.display = "inline";
    };
   
    movieContainer.innerHTML = "";
    if(movieContainer.getAttribute("search-text") === null){
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=${index}`;
        showMovies(url);
    }else{
        const searchText = movieContainer.getAttribute("search-text");
        const url = `https://api.themoviedb.org/3/search/movie?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=${index}`;
        showMovies(url);
    }
});

two.addEventListener("click", () => {
    index = 2;

    if(one.classList.contains("active") || two.classList.contains("active") || 
    three.classList.contains("active") || last.classList.contains("active") || numbers.classList.contains("active"))
    {
        one.classList.remove("active");
        three.classList.remove("active");
        numbers.classList.remove("active")
        last.classList.remove("active");

        numbers.style.display = "none";
        dot.style.display = "inline";
        next.style.display = "inline";
        prev.style.display = "inline";

        two.classList.add("active");
    };

    if(lastIndex === 2){
        dot.style.display = "none";
        next.style.display = "none";
    };

    if(lastIndex === 3 || lastIndex === 4){
        dot.style.display = "none";
        next.style.display = "inline";
    };
   
    movieContainer.innerHTML = "";
    if(movieContainer.getAttribute("search-text") === null){
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=${index}`;
        showMovies(url);
    }else{
        const searchText = movieContainer.getAttribute("search-text");
        const url = `https://api.themoviedb.org/3/search/movie?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=${index}`;
        showMovies(url);
    }
});

three.addEventListener("click", () => {
    index = 3;

    if(one.classList.contains("active") || two.classList.contains("active") || 
    three.classList.contains("active") || last.classList.contains("active") || numbers.classList.contains("active"))
    {
        one.classList.remove("active");
        two.classList.remove("active");
        numbers.classList.remove("active")
        last.classList.remove("active");

        numbers.style.display = "none";
        dot.style.display = "inline";
        next.style.display = "inline";
        prev.style.display = "inline";

        three.classList.add("active");
    };

    if(lastIndex === 3){
        dot.style.display = "none";
        next.style.display = "none";
    };

    if(lastIndex === 2 || lastIndex === 4){
        dot.style.display = "none";
        next.style.display = "inline";
    };
   
    movieContainer.innerHTML = "";
    if(movieContainer.getAttribute("search-text") === null){
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=${index}`;
        showMovies(url);
    }else{
        const searchText = movieContainer.getAttribute("search-text");
        const url = `https://api.themoviedb.org/3/search/movie?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=${index}`;
        showMovies(url);
    }
});

last.addEventListener("click", () => {
    index = lastIndex;

    if(one.classList.contains("active") || two.classList.contains("active") || 
    three.classList.contains("active") || last.classList.contains("active") || numbers.classList.contains("active"))
    {
        one.classList.remove("active");
        two.classList.remove("active");
        three.classList.remove("active");
        numbers.classList.remove("active")

        numbers.style.display = "none";
        dot.style.display = "inline";
        prev.style.display = "inline";

        last.classList.add("active");
    };

    if(lastIndex === 4){
        dot.style.display = "none";
        next.style.display = "none";
    };

    next.style.display = "none";
   
    movieContainer.innerHTML = "";
    if(movieContainer.getAttribute("search-text") === null){
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=${index}`;
        showMovies(url);
    }else{
        const searchText = movieContainer.getAttribute("search-text");
        const url = `https://api.themoviedb.org/3/search/movie?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=${index}`;
        showMovies(url);
    }
});