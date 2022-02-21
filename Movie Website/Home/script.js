const navigation = document.querySelector(".navigation");
const navigationContainer = document.querySelector(".navigationContainer");
const menuIconContainer = document.querySelector(".menuIconContainer");
const bannerContainer = document.querySelector(".bannerContainer");
const bannerImg = document.querySelector(".bannerImg img");

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

const today = document.querySelector(".today");
const thisWeek = document.querySelector(".thisWeek");
const selector = document.querySelector(".selector");
const trendingContainer = document.querySelector(".trendingContainer");
const trendingBoxContainer = document.querySelector(".trendingBoxContainer");

const onTV = document.querySelector(".onTV");
const inTheatres = document.querySelector(".inTheatres");
const Selector = document.querySelector(".Selector");
const viewAll = document.querySelector(".viewAll");
const onTVId = document.querySelector("#onTV");
const inTheatresId = document.querySelector("#inTheatres");
const SelectorId = document.querySelector("#Selector");
const viewAllId = document.querySelector("#viewAll");
const nowPlayingContainer = document.querySelector(".nowPlayingContainer");
const nowPlayingBoxContainer = document.querySelector(".nowPlayingBoxContainer");

const viewall = document.querySelector(".viewall");
const upcomingContainer = document.querySelector(".upcomingContainer");
const upcomingBoxContainer = document.querySelector(".upcomingBoxContainer");

const showResultContainer = document.querySelector(".showResultContainer");
const heading = document.querySelector(".heading");
const headingH1 = document.querySelector(".heading h1");
const resultContainer = document.querySelector(".resultContainer");
const resultDetailContainer = document.querySelector(".resultDetailContainer");
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

// Random banner background image
const showBannerImg = async () => {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
    const response = await fetch(url);
    const responseData = await response.json();
    const results = responseData.results;

    const randomNumber = Math.floor(Math.random() * results.length);
    const tmdbId = results[randomNumber].id;
    const mediaType = results[randomNumber].media_type;
    
    let tmdbUrl;
    if(mediaType === "movie"){
        tmdbUrl = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
    }else if(mediaType === "tv"){
        tmdbUrl = `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
    };
    const tmdbResponse = await fetch(tmdbUrl);
    const tmdbResponseData = await tmdbResponse.json();

    bannerImg.src = "https://image.tmdb.org/t/p/w1280" + tmdbResponseData.backdrop_path;
};
showBannerImg();

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

// Selector background effect
today.addEventListener("click", () => {
    selector.style.left = `0px`;
    selector.style.width = today.clientWidth + 34 + "px";

    trendingBoxContainer.innerHTML = "";
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
    showTrending(url);
});
thisWeek.addEventListener("click", () => {
    selector.style.left = today.clientWidth + 34 + "px";
    selector.style.width = thisWeek.clientWidth + 34 + "px";

    trendingBoxContainer.innerHTML = "";
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
    showTrending(url);
});
onTV.addEventListener("click", () => {
    Selector.style.left = `0px`;
    Selector.style.width = onTV.clientWidth + 34 + "px";

    nowPlayingBoxContainer.innerHTML = "";
    nowPlayingBoxContainer.setAttribute("media-type", "tv");
    const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=1`;
    showNowPlaying(url);
});
inTheatres.addEventListener("click", () => {
    Selector.style.left = onTV.clientWidth + 34 + "px";
    Selector.style.width = inTheatres.clientWidth + 34 + "px";

    nowPlayingBoxContainer.innerHTML = "";
    nowPlayingBoxContainer.setAttribute("media-type", "movie");
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=1`;
    showNowPlaying(url);
});
viewAll.addEventListener("click", () => {
    if(Selector.style.left === "" || Selector.style.left === `0px`){
        viewAll.href = `TV Shows/on tv/index.html`;
    };
    if(Selector.style.left === (onTV.clientWidth + 40 + "px")){
        viewAll.href = `Movies/in theatres/index.html`;
    }
});
onTVId.addEventListener("click", () => {
    SelectorId.style.left = `0px`;
    SelectorId.style.width = onTVId.clientWidth + 34 + "px";

    nowPlayingBoxContainer.innerHTML = "";
    nowPlayingBoxContainer.setAttribute("media-type", "tv");
    const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=1`;
    showNowPlaying(url);
});
inTheatresId.addEventListener("click", () => {
    SelectorId.style.left = onTVId.clientWidth + 34 + "px";
    SelectorId.style.width = inTheatresId.clientWidth + 34 + "px";

    nowPlayingBoxContainer.innerHTML = "";
    nowPlayingBoxContainer.setAttribute("media-type", "movie");
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=1`;
    showNowPlaying(url);
});
viewAllId.addEventListener("click", () => {
    if(SelectorId.style.left === "" || SelectorId.style.left === `0px`){
        viewAllId.href = `TV Shows/on tv/index.html`;
    };
    if(SelectorId.style.left === (onTVId.clientWidth + 40 + "px")){
        viewAllId.href = `Movies/in theatres/index.html`;
    }
});

let array = [ {mediaType: "", tmdbId: "", searchText: ""} ];

// Show movies on body
const imgpath = "https://image.tmdb.org/t/p/w1280";
const showMovies = async (url) => {
    const response = await fetch(url);
    const responseData = await response.json();

    const results = responseData.results;

    for (let i = 0; i < results.length; i++) {
        const movieBox = document.createElement("div");
        movieBox.classList.add("movieBox");
        movieBox.setAttribute("tmdbId",`${results[i].id}`);
        movieBox.setAttribute("media-type", `${results[i].media_type}`);

        let name;
        if(results[i].title === undefined){
            name = results[i].name;
        };
        if(results[i].name === undefined){
            name = results[i].title;
        };

        let moviePoster;
        if(results[i].poster_path === null){
            moviePoster = "images/image_not_found.png"
        }else{
            moviePoster = imgpath + results[i].poster_path;
        };
        if(results[i].poster_path === undefined){
            moviePoster = imgpath + results[i].profile_path;
        };
        if(results[i].profile_path === null){
            moviePoster = "images/image_not_found.png"
        };

        let role = results[i].known_for_department;
        if(role === "Acting"){
            role = "Actor";
        } else if(role === "Directing"){
            role = "Director";
        }else if(role === "Writing"){
            role = "Writer";
        }else if(role === "Production"){
            role = "Producer";
        }else if(role === "Editing"){
            role = "Editor";
        };

        let knownFor;
        if(results[i].known_for != undefined && results[i].known_for.length === 0){
            knownFor = "";
        }
        else if(results[i].known_for != undefined && results[i].known_for[0].title === undefined){
            knownFor = results[i].known_for[0].name;
        }
        else if(results[i].known_for != undefined && results[i].known_for[0].name === undefined){
            knownFor = results[i].known_for[0].title;
        }

        let day, month, year, date;
        if(results[i].release_date === undefined && results[i].first_air_date === undefined && results[i].known_for != undefined){
            date = role + ", " + knownFor;
        }
        else if(results[i].release_date === undefined && results[i].first_air_date === undefined && results[i].known_for === undefined){
            date = "";
        }
        else if(results[i].release_date === undefined){
            day = (results[i].first_air_date).substring(8,10);
            month = (results[i].first_air_date).substring(5,7);
            year = (results[i].first_air_date).substring(0,4);
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
        else if(results[i].first_air_date === undefined){
            day = (results[i].release_date).substring(8,10);
            month = (results[i].release_date).substring(5,7);
            year = (results[i].release_date).substring(0,4);
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
        if(results[i].vote_average === undefined || results[i].vote_average === 0){
            ratingDisplay = "none";
        }else{
            ratingDisplay = "flex";
        };

        movieBox.innerHTML = `
            <div class="movieImg">
                <img src="${moviePoster}">
            </div>
            <div class="movieText">
                <h3>${name}</h3>
                <div class="movieInfo">
                    <p>${date}</p>
                    <div style="display: ${ratingDisplay};" class="rating">
                        <span class="${ratingColor(results[i].vote_average)}">${results[i].vote_average}</span>
                        <img src="images/IMDb-icon.png">
                    </div>
                </div>
            </div>
        `;
        resultContainer.append(movieBox);

        const movieImg = movieBox.querySelector(".movieImg");
        movieImg.addEventListener("click", () => {
            if(results[i].media_type === "person"){
                showPersonDetails(results[i].id);
                const object = { mediaType: `${results[i].media_type}`, tmdbId: `${results[i].id}`, searchText: "" };
                array.push(object);
            }else if(results[i].media_type === "movie" || results[i].media_type === "tv"){
                showMovieDetails(results[i].media_type, results[i].id);
                const object = { mediaType: `${results[i].media_type}`, tmdbId: `${results[i].id}`, searchText: "" };
                array.push(object);
            };
        });

        const movieTextH3 = movieBox.querySelector(".movieText h3");
        movieTextH3.addEventListener("click", () => {
            if(results[i].media_type === "person"){
                showPersonDetails(results[i].id);
                const object = { mediaType: `${results[i].media_type}`, tmdbId: `${results[i].id}`, searchText: "" };
                array.push(object);
            }else if(results[i].media_type === "movie" || results[i].media_type === "tv"){
                showMovieDetails(results[i].media_type, results[i].id);
                const object = { mediaType: `${results[i].media_type}`, tmdbId: `${results[i].id}`, searchText: "" };
                array.push(object);
            };
        });
    };

    back.style.display = "block";
};

// Show trending
const trendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=845e81600d9d504ee9e6e2f1b08dee9f`;
const showTrending = async (url) => {
    const response = await fetch(url);
    const responseData = await response.json();

    const results = responseData.results;

    for(let i = 0; i < results.length; i++){
        const resultBox = document.createElement("div");
        resultBox.classList.add("resultBox");
        resultBox.setAttribute("tmdbId",`${results[i].id}`);
        resultBox.setAttribute("media-type", `${results[i].media_type}`);

        let moviePoster;
        if(results[i].poster_path === null){
            moviePoster = "images/image_not_found.png"
        }else{
            moviePoster = imgpath + results[i].poster_path;
        };

        let name;
        if(results[i].title === undefined){
            name = results[i].name;
        };
        if(results[i].name === undefined){
            name = results[i].title;
        };

        let day, month, year, date;
        if(results[i].release_date === undefined){
            day = (results[i].first_air_date).substring(8,10);
            month = (results[i].first_air_date).substring(5,7);
            year = (results[i].first_air_date).substring(0,4);
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
        else if(results[i].first_air_date === undefined){
            day = (results[i].release_date).substring(8,10);
            month = (results[i].release_date).substring(5,7);
            year = (results[i].release_date).substring(0,4);
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

        resultBox.innerHTML = `
            <div class="resultImg">
                <img src="${moviePoster}">
            </div>
            <div class="resultText">
                <h3>${name}</h3>
                <div class="resultInfo">
                    <p>${date}</p>
                    <div class="rating">
                        <span class="${ratingColor(results[i].vote_average)}">${results[i].vote_average}</span>
                        <img src="images/IMDb-icon.png">
                    </div>
                </div>
            </div>
        `;
        trendingBoxContainer.append(resultBox);

        const resultImg = resultBox.querySelector(".resultImg");
        resultImg.addEventListener("click", () => {
            showMovieDetails(results[i].media_type, results[i].id);
            const object = { mediaType: `${results[i].media_type}`, tmdbId: `${results[i].id}`, searchText: "" };
            array.push(object);
        });

        const resultTextH3 = resultBox.querySelector(".resultText h3");
        resultTextH3.addEventListener("click", () => {
            showMovieDetails(results[i].media_type, results[i].id);
            const object = { mediaType: `${results[i].media_type}`, tmdbId: `${results[i].id}`, searchText: "" };
            array.push(object);
        });
    };
};
showTrending(trendingUrl);

// Show now playing
const nowPlayingUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=1`;
const showNowPlaying = async (url) => {
    const response = await fetch(url);
    const responseData = await response.json();

    const results = responseData.results;

    for(let i = 0; i < results.length; i++){
        const resultBox = document.createElement("div");
        resultBox.classList.add("resultBox");
        resultBox.setAttribute("tmdbId",`${results[i].id}`);
        if(nowPlayingBoxContainer.getAttribute("media-type") === "tv"){
            resultBox.setAttribute("media-type", "tv");
        }else if(nowPlayingBoxContainer.getAttribute("media-type") === "movie"){
            resultBox.setAttribute("media-type", "movie");
        };

        let moviePoster;
        if(results[i].poster_path === null){
            moviePoster = "images/image_not_found.png"
        }else{
            moviePoster = imgpath + results[i].poster_path;
        };

        let name;
        if(results[i].title === undefined){
            name = results[i].name;
        };
        if(results[i].name === undefined){
            name = results[i].title;
        };

        let day, month, year, date;
        if(results[i].release_date === undefined){
            day = (results[i].first_air_date).substring(8,10);
            month = (results[i].first_air_date).substring(5,7);
            year = (results[i].first_air_date).substring(0,4);
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
        else if(results[i].first_air_date === undefined){
            day = (results[i].release_date).substring(8,10);
            month = (results[i].release_date).substring(5,7);
            year = (results[i].release_date).substring(0,4);
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

        resultBox.innerHTML = `
            <div class="resultImg">
                <img src="${moviePoster}">
            </div>
            <div class="resultText">
                <h3>${name}</h3>
                <div class="resultInfo">
                    <p>${date}</p>
                    <div class="rating">
                        <span class="${ratingColor(results[i].vote_average)}">${results[i].vote_average}</span>
                        <img src="images/IMDb-icon.png">
                    </div>
                </div>
            </div>
        `;
        nowPlayingBoxContainer.append(resultBox);

        const resultImg = resultBox.querySelector(".resultImg");
        resultImg.addEventListener("click", () => {
            showMovieDetails(resultBox.getAttribute("media-type"), results[i].id);
            const object = { mediaType: `${resultBox.getAttribute("media-type")}`, tmdbId: `${results[i].id}`, searchText: "" };
            array.push(object);
        });

        const resultTextH3 = resultBox.querySelector(".resultText h3");
        resultTextH3.addEventListener("click", () => {
            showMovieDetails(resultBox.getAttribute("media-type"), results[i].id);
            const object = { mediaType: `${resultBox.getAttribute("media-type")}`, tmdbId: `${results[i].id}`, searchText: "" };
            array.push(object);
        });
    };
};
showNowPlaying(nowPlayingUrl);
nowPlayingBoxContainer.setAttribute("media-type", "tv");

// Show upcoming
const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=845e81600d9d504ee9e6e2f1b08dee9f&page=1`;
const showUpcoming = async (url) => {
    const response = await fetch(url);
    const responseData = await response.json();

    const results = responseData.results;

    for(let i = 0; i < results.length; i++){
        const resultBox = document.createElement("div");
        resultBox.classList.add("resultBox");
        resultBox.setAttribute("tmdbId",`${results[i].id}`);
        resultBox.setAttribute("media-type", "movie");

        let moviePoster;
        if(results[i].poster_path === null){
            moviePoster = "images/image_not_found.png"
        }else{
            moviePoster = imgpath + results[i].poster_path;
        };

        let name;
        if(results[i].title === undefined){
            name = results[i].name;
        };
        if(results[i].name === undefined){
            name = results[i].title;
        };

        let day, month, year, date;
        if(results[i].release_date === undefined){
            day = (results[i].first_air_date).substring(8,10);
            month = (results[i].first_air_date).substring(5,7);
            year = (results[i].first_air_date).substring(0,4);
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
        else if(results[i].first_air_date === undefined){
            day = (results[i].release_date).substring(8,10);
            month = (results[i].release_date).substring(5,7);
            year = (results[i].release_date).substring(0,4);
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

        resultBox.innerHTML = `
            <div class="resultImg">
                <img src="${moviePoster}">
            </div>
            <div class="resultText">
                <h3>${name}</h3>
                <div class="resultInfo">
                    <p>${date}</p>
                    <div class="rating">
                        <span class="${ratingColor(results[i].vote_average)}">${results[i].vote_average}</span>
                        <img src="images/IMDb-icon.png">
                    </div>
                </div>
            </div>
        `;
        upcomingBoxContainer.append(resultBox);

        const resultImg = resultBox.querySelector(".resultImg");
        resultImg.addEventListener("click", () => {
            showMovieDetails(resultBox.getAttribute("media-type"), results[i].id);
            const object = { mediaType: `${resultBox.getAttribute("media-type")}`, tmdbId: `${results[i].id}`, searchText: "" };
            array.push(object);
        });

        const resultTextH3 = resultBox.querySelector(".resultText h3");
        resultTextH3.addEventListener("click", () => {
            showMovieDetails(resultBox.getAttribute("media-type"), results[i].id);
            const object = { mediaType: `${resultBox.getAttribute("media-type")}`, tmdbId: `${results[i].id}`, searchText: "" };
            array.push(object);
        });
    };
};
showUpcoming(upcomingUrl);

// movie rating color
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
searchInput.addEventListener("keyup", (event) => {
    const searchText = event.target.value.toLowerCase();
    if(searchText.length > 0){
        searchBox.classList.add("active");
    };
    if(searchText.length === 0){
        searchBox.classList.remove("active");
    };
    showSearchListItem(searchText, event.key);
    searchList.innerHTML = "";
});
const showSearchListItem = async (searchText) => {
    if(searchText.length === 0){
        return;
    };
    const url = `https://api.themoviedb.org/3/search/multi?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}`;
    const response = await fetch(url);
    const responseData = await response.json();
    
    const results = responseData.results;

    for(let i = 0; i < results.length; i++){
        const searchListItem = document.createElement("div");
        searchListItem.classList.add("searchListItem");
        searchListItem.setAttribute("tmdbId", `${results[i].id}`);
        searchListItem.setAttribute("media-type", `${results[i].media_type}`);

        let name;
        if(results[i].title === undefined){
            name = results[i].name;
        };
        if(results[i].name === undefined){
            name = results[i].title;
        };

        let moviePoster;
        if(results[i].poster_path === null){
            moviePoster = "images/image_not_found.png"
        }else{
            moviePoster = imgpath + results[i].poster_path;
        };
        if(results[i].poster_path === undefined){
            moviePoster = imgpath + results[i].profile_path;
        };
        if(results[i].profile_path === null){
            moviePoster = "images/image_not_found.png"
        };

        let role = results[i].known_for_department;
        if(role === "Acting"){
            role = "Actor";
        } else if(role === "Directing"){
            role = "Director";
        }else if(role === "Writing"){
            role = "Writer";
        }else if(role === "Production"){
            role = "Producer";
        }else if(role === "Editing"){
            role = "Editor";
        };

        let knownFor;
        if(results[i].known_for != undefined && results[i].known_for.length === 0){
            knownFor = "";
        }
        else if(results[i].release_date === undefined && results[i].first_air_date === undefined && results[i].known_for === undefined){
            date = "";
        }
        else if(results[i].known_for != undefined && results[i].known_for[0].title === undefined){
            knownFor = results[i].known_for[0].name;
        }
        else if(results[i].known_for != undefined && results[i].known_for[0].name === undefined){
            knownFor = results[i].known_for[0].title;
        };

        let movieDate;
        if(results[i].release_date === undefined && results[i].first_air_date === undefined && results[i].known_for != undefined){
            movieDate = role + ", " + knownFor;
        }else if(results[i].release_date === undefined){
            movieDate = (results[i].first_air_date).substring(0,4);
        }else if(results[i].first_air_date === undefined){
            movieDate = (results[i].release_date).substring(0,4);
        };

        searchListItem.innerHTML = `
            <div class="searchItemImg">
                <img src="${moviePoster}">
            </div>
            <div class="searchItemInfo">
                <h3>${name}</h3>
                <p>${movieDate}</p>
            </div>
        `;
        searchList.append(searchListItem);

        // Show movie details when click
        searchListItem.addEventListener("click", async () => {
            searchInput.value = "";
            searchList.innerHTML = "";
            if(results[i].media_type === "person"){
                showPersonDetails(results[i].id);
                const object = { mediaType: `${results[i].media_type}`, tmdbId: `${results[i].id}`, searchText: "" };
                array.push(object);
            }else if(results[i].media_type === "movie" || results[i].media_type === "tv"){
                showMovieDetails(results[i].media_type, results[i].id);
                const object = { mediaType: `${results[i].media_type}`, tmdbId: `${results[i].id}`, searchText: "" };
                array.push(object);
            };
        });
    };
};

// Show search results on body when submit
searchBox.addEventListener("submit",(event) => {
    event.preventDefault();
    showSearchResult(searchInput);
});
const showSearchResult = (input) => {
    const searchText = input.value.toLowerCase();

    if(searchText === ""){
        return;
    };

    searchList.innerHTML = "";
    resultContainer.innerHTML = "";
    trendingBoxContainer.innerHTML = "";
    nowPlayingBoxContainer.innerHTML = "";
    upcomingBoxContainer.innerHTML = "";
    resultDetailContainer.innerHTML = "";
    castContainer.innerHTML = "";
    recommendContainer.innerHTML = "";
    personDetailContainer.innerHTML = "";
    knownForContainer.innerHTML = "";

    bannerContainer.style.display = "none";
    showResultContainer.style.display = "block";
    trendingContainer.style.display = "none";
    nowPlayingContainer.style.display = "none";
    upcomingContainer.style.display = "none";
    resultDetailContainer.style.display = "none";
    castContainer.style.display = "none";
    recommendContainer.style.display = "none";
    personDetailContainer.style.display = "none";
    knownForContainer.style.display = "none";

    back.style.display = "block";
    footer.style.backgroundColor = "#080808";
    copyright.style.color = "white";

    headingH1.innerHTML = `Search Results for "${searchText}"`;

    resultContainer.setAttribute("search-text", `${searchText}`);

    const url = `https://api.themoviedb.org/3/search/multi?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}`;
    if(searchText){
        input.value = "";
        showMovies(url);
        const object = { mediaType: "", tmdbId: "", searchText: `${searchText}` };
        array.push(object);
    };

    showMoreSearchResult(searchText);
};

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
    const imdbUrl = `https://imdb-api.com/en/API/Title/k_cxf90bab/${imdbId}`; // k_z2l7joxd
    const imdbResponse = await fetch(imdbUrl);
    const imdbResponseData = await imdbResponse.json();

    const youTubeUrl = `https://imdb-api.com/en/API/YouTubeTrailer/k_cxf90bab/${imdbId}`; // k_z2l7joxd
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
    
    resultContainer.innerHTML = "";
    trendingBoxContainer.innerHTML = "";
    nowPlayingBoxContainer.innerHTML = "";
    upcomingBoxContainer.innerHTML = "";
    castContainer.innerHTML = "";
    recommendContainer.innerHTML = "";
    personDetailContainer.innerHTML = "";
    knownForContainer.innerHTML = "";

    bannerContainer.style.display = "none";
    showResultContainer.style.display = "none";
    trendingContainer.style.display = "none";
    nowPlayingContainer.style.display = "none";
    upcomingContainer.style.display = "none";
    resultDetailContainer.style.display = "block";
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

    resultDetailContainer.innerHTML = `
        <div class="movieBackgroundImg">
            <img src="${imgpath + tmdbResponseData.backdrop_path}">
        </div>       
        <div class="movieDetailsContainer">
            <img class="moviePosterImg" src="${imgpath + tmdbResponseData.poster_path}">

            <div class="movieDetails">
                <h2>${imdbResponseData.fullTitle}</h2>
                <div class="movieInfomation">
                    <span> ${contentRating} </span>  
                    <span>${tmdbResponseData.vote_average}<img src="images/IMDb-icon.png"></span>
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
    const watchBtn = resultDetailContainer.querySelector(".watchBtn");
    const videoPopupContainer = resultDetailContainer.querySelector(".videoPopupContainer");
    const closeBtn = resultDetailContainer.querySelector(".closeBtn");
    const iframe = resultDetailContainer.querySelector("iframe");
    const movieDetailsContainer = resultDetailContainer.querySelector(".movieDetailsContainer");
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
            castProfile = "images/image_not_found.png"
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
            moviePoster = "images/image_not_found.png"
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
                        <img src="images/IMDb-icon.png">
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
    
    resultContainer.innerHTML = "";
    trendingBoxContainer.innerHTML = "";
    nowPlayingBoxContainer.innerHTML = "";
    upcomingBoxContainer.innerHTML = "";
    resultDetailContainer.innerHTML = "";
    castContainer.innerHTML = "";
    recommendContainer.innerHTML = "";
    knownForContainer.innerHTML = "";

    bannerContainer.style.display = "none";
    showResultContainer.style.display = "none";
    trendingContainer.style.display = "none";
    nowPlayingContainer.style.display = "none";
    upcomingContainer.style.display = "none";
    resultDetailContainer.style.display = "none";
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
        resultContainer.innerHTML = "";
        resultDetailContainer.innerHTML = "";
        castContainer.innerHTML = "";
        recommendContainer.innerHTML = "";
        personDetailContainer.innerHTML = "";
        knownForContainer.innerHTML = "";
    
        bannerContainer.style.display = "block";
        trendingContainer.style.display = "block";
        nowPlayingContainer.style.display = "block";
        upcomingContainer.style.display = "block";        
        showResultContainer.style.display = "none";
        resultDetailContainer.style.display = "none";
        castContainer.style.display = "none";
        recommendContainer.style.display = "none";
        personDetailContainer.style.display = "none";
        knownForContainer.style.display = "none";

        back.style.display = "none";
        footer.style.backgroundColor = "#080808";
        copyright.style.color = "white";

        showTrending(trendingUrl);
        showNowPlaying(nowPlayingUrl);
        showUpcoming(upcomingUrl);

        array.pop();
    }

    else if(array[array.length-2].mediaType === "" && array[array.length-2].tmdbId === ""){

        searchList.innerHTML = "";
        resultContainer.innerHTML = "";
        trendingBoxContainer.innerHTML = "";
        nowPlayingBoxContainer.innerHTML = "";
        upcomingBoxContainer.innerHTML = "";
        resultDetailContainer.innerHTML = "";
        castContainer.innerHTML = "";
        recommendContainer.innerHTML = "";
        personDetailContainer.innerHTML = "";
        knownForContainer.innerHTML = "";
    
        bannerContainer.style.display = "none";
        showResultContainer.style.display = "block";
        trendingContainer.style.display = "none";
        nowPlayingContainer.style.display = "none";
        upcomingContainer.style.display = "none";
        resultDetailContainer.style.display = "none";
        castContainer.style.display = "none";
        recommendContainer.style.display = "none";
        personDetailContainer.style.display = "none";
        knownForContainer.style.display = "none";
    
        headingH1.innerHTML = `Search Results for "${array[array.length-2].searchText}"`;

        const url = `https://api.themoviedb.org/3/search/multi?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${array[array.length-2].searchText}`;
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
let lastIndex;
const showMoreSearchResult = async (searchText) => {
    const searchResultUrl = `https://api.themoviedb.org/3/search/multi?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=1`;
    const searchResultResponse = await fetch(searchResultUrl);
    const searchResultResponseData = await searchResultResponse.json();

    lastIndex = searchResultResponseData.total_pages;
    last.innerHTML = lastIndex;

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

    resultContainer.innerHTML = "";
    const searchText = resultContainer.getAttribute("search-text");
    const url = `https://api.themoviedb.org/3/search/multi?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=${index}`;
    showMovies(url);
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

    resultContainer.innerHTML = "";
    const searchText = resultContainer.getAttribute("search-text");
    const url = `https://api.themoviedb.org/3/search/multi?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=${index}`;
    showMovies(url);
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
   
    resultContainer.innerHTML = "";
    const searchText = resultContainer.getAttribute("search-text");
    const url = `https://api.themoviedb.org/3/search/multi?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=${index}`;
    showMovies(url);
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
   
    resultContainer.innerHTML = "";
    const searchText = resultContainer.getAttribute("search-text");
    const url = `https://api.themoviedb.org/3/search/multi?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=${index}`;
    showMovies(url);
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
   
    resultContainer.innerHTML = "";
    const searchText = resultContainer.getAttribute("search-text");
    const url = `https://api.themoviedb.org/3/search/multi?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=${index}`;
    showMovies(url);
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
   
    resultContainer.innerHTML = "";
    const searchText = resultContainer.getAttribute("search-text");
    const url = `https://api.themoviedb.org/3/search/multi?api_key=845e81600d9d504ee9e6e2f1b08dee9f&query=${searchText}&page=${index}`;
    showMovies(url);
});