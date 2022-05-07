const serviceRecordAPI = `https://halo.api.stdlib.com/mcc@0.2.0/player/stats/service-record/summary`;
const appearanceAPI = `https://halo.api.stdlib.com/mcc@0.2.0/player/appearance/`;
const playerHistoryAPI = `https://halo.api.stdlib.com/mcc@0.2.0/player/stats/matches/list/`;

// Dummy API
const personalService = `https://halo.api.stdlib.com/mcc@0.2.0/player/stats/service-record/summary/?gamertag=Yaksha 7th`;

const API_ServiceRecord_Response = async (userProfile) => {
    const config = { params: { gamertag: userProfile } };
    const response = await axios.get(serviceRecordAPI, config);
    return response.data;
}

const API_Appearance_Response = async (userProfile) => {
    const config = { params: { gamertag: userProfile } };
    const response = await axios.get(appearanceAPI, config);
    return response.data;
}

const API_PlayerHistory_Response = async (userProfile) => {
    const config = { params: { gamertag: userProfile } };
    const response = await axios.get(playerHistoryAPI, config);
    return response.data;
}

// Player Stats Response
const serviceRecord_Wins_Response = async (userProfile) => {
    const response = await API_ServiceRecord_Response(userProfile);
    console.log(response.multiplayer.core.breakdowns.matches.wins);
}


// Get Player Stats

const getPlayerKills = (player) => {
    return player.data.multiplayer.core.summary.kills;
}

const getPlayerDeaths = (player) => {
    return player.data.multiplayer.core.summary.deaths;
}

const getPlayerAssists = (player) => {
    return player.data.multiplayer.core.summary.assists;
}

const getPlayerAvatar = (player) => {
    return player.avatar_url;
}

// Change HTML elements

const addHTMLText_Stats = (player) => {
    const result_kills = player.data.multiplayer.core.summary.kills;
    const result_deaths = player.data.multiplayer.core.summary.deaths;
    const result_assists = player.data.multiplayer.core.summary.assists;
    const result_kda = player.data.multiplayer.core.kdr.toPrecision(3);
    const result_totalGames = player.data.multiplayer.core.matches_played;
    const result_totalWins = player.data.multiplayer.core.breakdowns.matches.wins;
    const result_totalLoss = player.data.multiplayer.core.breakdowns.matches.losses;
    const result_winRate = player.data.multiplayer.core.win_rate.toPrecision(3);


    const t_kills = document.querySelector('#player-kills');
    const t_deaths = document.querySelector('#player-deaths');
    const t_assists = document.querySelector('#player-assists');
    const t_kda = document.querySelector('#player-kda');
    const t_totalGames = document.querySelector('#player-total-games');
    const t_totalWins = document.querySelector('#player-total-wins');
    const t_totalLoss = document.querySelector('#player-total-loss');
    const t_winRate = document.querySelector('#player-win-rate');


    t_kills.textContent = result_kills;
    t_deaths.textContent = result_deaths;
    t_assists.textContent = result_assists;
    t_kda.textContent = result_kda;
    t_totalGames.textContent = result_totalGames;
    t_totalWins.textContent = result_totalWins;
    t_totalLoss.textContent = result_totalLoss;
    t_winRate.textContent = result_winRate;
}

const addHTMLImages_Avatar = (player) => {

    //Get Player Avatar
    const result_avatar = player.data.avatar_url;
    const t_avatar = document.querySelector('#avatar');
    t_avatar.src = result_avatar;

    //Get gametypes icons
    const slayerImage = 0;
}

const addHTMLHistory_BackgroundImage = (player) => {
    // Not all maps included
    // Only some Halo 3 map (im lazy and it will take a long time to add ALL the games in the collection. NOPE!)
    // This is also just a personal project, the idea needs to work.

    const halo3_map_pit = `https://halo.wiki.gallery/images/2/2a/H3_ThePit.jpg`;
    const halo3_map_midship = `https://halo.wiki.gallery/images/f/ff/H3ODST_Heretic_env-01.jpg`;
    const halo3_map_guardian = `https://halo.wiki.gallery/images/3/3d/H3_MP_Guardian_Env4.jpg`;

    const t_map_0 = document.querySelector('#halo-history-map0');
    const t_map_1 = document.querySelector('#halo-history-map1');
    const t_map_2 = document.querySelector('#halo-history-map2');


    let isMap = false;

    for (let x = 0; x < 3 && isMap == false; x++) {
        if (player.data[x].details.map.name == 'The Pit') {
            t_map_0.src = halo3_map_pit;
            isMap = true;
        }
        else if (player.data[x].details.map.name == 'Midship') {
            t_map_0.src = halo3_map_midship;
            isMap = true;
        }
        else if (player.data[x].details.map.name == 'Guardian') {
            t_map_0.src = halo3_map_guardian;
            isMap = true;
        }
    }
}

const addHTMLHistory_Text = (player) => {
    for (let x = 0; x < 3; x++) {
        const gameMap = player.data[x].details.map.name;
        const gameType = player.data[x].details.category.name;
        const gameKills = player.data[x].player.stats.core.summary.kills;
        const gameDeaths = player.data[x].player.stats.core.summary.deaths;
        const gameAssists = player.data[x].player.stats.core.summary.assists;
        const gameKD = player.data[x].player.stats.core.kdr;
        const gameScore = player.data[x].player.stats.points;
        const outcome = player.data[x].player.stats.outcome;
        const day = player.data[x].played_at;
        const duration = player.data[x].duration.human;

        const t_gameMap = document.querySelector(`#history-map-title${x}`);
        const t_gameType = document.querySelector(`#history-map-gametype${x}`);
        const t_kills = document.querySelector(`#history-kills${x}`);
        const t_deaths = document.querySelector(`#history-deaths${x}`);
        const t_assists = document.querySelector(`#history-assists${x}`);
        const t_kd = document.querySelector(`#history-kd${x}`);
        const t_score = document.querySelector(`#history-score${x}`);
        const t_outcome = document.querySelector(`#history-game-state${x}`);
        const t_duration = document.querySelector(`#history-duration${x}`);
        const t_day = document.querySelector(`#history-day${x}`);


        t_gameMap.textContent = gameMap;
        t_gameType.textContent = gameType;
        t_kills.textContent = gameKills;
        t_deaths.textContent = gameDeaths;
        t_assists.textContent = gameAssists;
        t_kd.textContent = gameKD.toPrecision(2);
        t_score.textContent = gameScore;
        t_outcome.textContent = outcome;
        t_duration.textContent = duration;
        t_day.textContent = dateConv(day);

    }
}

// Events
const btnSearchPlayer = document.querySelector('#search-player-button');
btnSearchPlayer.addEventListener('click', async function (e) {
    e.preventDefault();

    const form = document.querySelector('#search-player-form');
    const querySearch = form.elements.nameSearch.value;
    const response_service = await API_ServiceRecord_Response(querySearch);
    const response_appearance = await API_Appearance_Response(querySearch);
    const response_history = await API_PlayerHistory_Response(querySearch);

    addHTMLText_Stats(response_service);
    addHTMLImages_Avatar(response_appearance);
    addHTMLHistory_Text(response_history);
    addHTMLHistory_BackgroundImage(response_history);


    // Testing Functions

})

/* function dateConv(value) {
    console.log(value.slice(0, 9));
    return value.slice(0, 9);
} */


// Weird tests
const slayerImage_TEST = (player) => {
    const slayerImage = player.data[0].details.game.image_url;
    console.log(slayerImage);
    const testingImage = document.querySelector('#testing-image');
    testingImage.src = slayerImage;
}