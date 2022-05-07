class HaloMCC extends HaloAPI {
    constructor() {
        super();
    }
    API_ServiceRecord_Response = async (profile) => {
        const config = { params: { gamertag: profile } };
        const response = await axios.get(this.serviceRecordAPI, config);
        return response.data;
    }
    API_Appearance_Response = async (profile) => {
        const config = { params: { gamertag: profile } };
        const response = await axios.get(this.appearanceAPI, config);
        return response.data;
    }
    API_PlayerHistory_Response = async (userProfile) => {
        const config = { params: { gamertag: userProfile } };
        const response = await axios.get(this.playerHistoryAPI, config);
        return response.data;
    }
}

class HaloMCC_ServiceRecord {
    constructor() {
        this.serviceRecord = new HaloMCC();
    }

    async ServiceRecord_Overview(profile) {
        const response = await this.serviceRecord.API_ServiceRecord_Response(profile);

        const result_kills = response.data.multiplayer.core.summary.kills;
        const result_deaths = response.data.multiplayer.core.summary.deaths;
        const result_assists = response.data.multiplayer.core.summary.assists;
        const result_kda = response.data.multiplayer.core.kdr.toPrecision(3);
        const result_totalGames = response.data.multiplayer.core.matches_played;
        const result_totalWins = response.data.multiplayer.core.breakdowns.matches.wins;
        const result_totalLoss = response.data.multiplayer.core.breakdowns.matches.losses;
        const result_winRate = response.data.multiplayer.core.win_rate.toPrecision(3);
        const result_total_time = response.data.time_played.human;
        const result_playerName = response.additional.gamertag;


        const t_kills = document.querySelector('#player-kills');
        const t_deaths = document.querySelector('#player-deaths');
        const t_assists = document.querySelector('#player-assists');
        const t_kda = document.querySelector('#player-kda');
        const t_totalGames = document.querySelector('#player-total-games');
        const t_totalWins = document.querySelector('#player-total-wins');
        const t_totalLoss = document.querySelector('#player-total-loss');
        const t_winRate = document.querySelector('#player-win-rate');
        const t_total_time = document.querySelector('#player-total-time');
        const t_playerName = document.querySelector('#player-name');


        t_kills.textContent = result_kills;
        t_deaths.textContent = result_deaths;
        t_assists.textContent = result_assists;
        t_kda.textContent = result_kda;
        t_totalGames.textContent = result_totalGames;
        t_totalWins.textContent = result_totalWins;
        t_totalLoss.textContent = result_totalLoss;
        t_winRate.textContent = result_winRate;
        t_total_time.textContent = result_total_time;
        t_playerName.textContent = result_playerName;
    }

    async ServiceRecord_Progression(profile) {
        const response = await this.serviceRecord.API_ServiceRecord_Response(profile);
        const result_rank = response.data.multiplayer.progression.xp.rank.title;
        const result_rankImage = response.data.multiplayer.progression.xp.rank.image_url;
        //const result_tour = response.data.multiplayer.progression.xp.rank.tour;

        const t_rank = document.querySelector('#rank-value');
        const t_rankImage = document.querySelector('#rank-image');
        //const t_tour = document.querySelector('#tour-value');

        t_rank.textContent = result_rank;
        t_rankImage.src = result_rankImage;
        // t_tour.textContent = result_tour;
    }
    async ServiceRecord_RankPlaylist_Max(profile) {
        const response = await this.serviceRecord.API_ServiceRecord_Response(profile);
        const maxRank = await getHighestRank(response);
        
        const t_rank = document.querySelector('#rank-playlist-image');
        const t_playlist = document.querySelector('#rank-playlist-value');

        t_rank.src = maxRank.image;
        t_playlist.textContent = maxRank.playlist;
    }

    async ServiceRecord_SocialRank_Progression(profile)
    {
        const response = await this.serviceRecord.API_ServiceRecord_Response(profile);
        const result_xp_total = response.data.multiplayer.progression.xp.total;
        const result_xp_remaining = response.data.multiplayer.progression.xp.remaining;

        const t_progressionBar = document.querySelector('#rank-progression');
        
        t_progressionBar.style.width = `${getRankProgression(result_xp_total, result_xp_remaining)}%`;
        t_progressionBar.textContent = `${getRankProgression(result_xp_total,result_xp_remaining).toPrecision(4)}%`;
    }
}

class HaloMCC_Appearance {
    constructor() {
        this.appearance = new HaloMCC();
    }
    async Appearance_Overview(profile) {
        const response = await this.appearance.API_Appearance_Response(profile);

        const result_avatar = response.data.avatar_url;
        const t_avatar = document.querySelector('#avatar');
        t_avatar.src = result_avatar;
    }
    async Appearance_Gamertag(profile) {
        const response = await this.appearance.API_Appearance_Response(profile);
        console.log(response.additional.gamertag)
        return response.additional.gamertag;
    }
}


class HaloMCC_History {
    constructor() {
        this.history = new HaloMCC();
    }
    async History_Overview(profile) {
        const response = await this.history.API_PlayerHistory_Response(profile);

        for (let x = 0; x < 3; x++) {
            const gameMap = response.data[x].details.map.name;
            const gameType = response.data[x].details.category.name;
            const gameKills = response.data[x].player.stats.core.summary.kills;
            const gameDeaths = response.data[x].player.stats.core.summary.deaths;
            const gameAssists = response.data[x].player.stats.core.summary.assists;
            const gameKD = response.data[x].player.stats.core.kdr;
            const gameScore = response.data[x].player.stats.points;
            const outcome = response.data[x].player.stats.outcome;
            const day = response.data[x].played_at;
            const duration = response.data[x].duration.human;

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
    async History_Backgrounds_Overview(profile) {
        const response = await this.history.API_PlayerHistory_Response(profile);

        // response.data[0].details.map.name
        for (let x = 0; x < 3; x++) {
            let history = document.querySelector(`#halo-history-map${x}`);
            for (let y = 0, isFound = false; y < mcc_maps.length & isFound == false; y++)
                if (response.data[x].details.map.name == mcc_maps[y].name) {
                    history.src = mcc_maps[y].image;
                    isFound = true;
                }
        }
    }
}

const test_service = new HaloMCC_ServiceRecord();
const test_history = new HaloMCC_History();
const test_appearance = new HaloMCC_Appearance();
const p_search_find = document.querySelector('#player-searched');

const btnSearchPlayer = document.querySelector('#search-player-button');
try
{
    btnSearchPlayer.addEventListener('click', async function (e) {
        e.preventDefault();
        const form = document.querySelector('#search-player-form');
        const profile = form.elements.nameSearch.value;

        if(profile == null || profile.trim() == '')
            throw  alert("You must enter a gamertag. Ex: Captain Tickle Me Toes");
    
        test_service.ServiceRecord_Overview(profile);
        test_service.ServiceRecord_Progression(profile);
        test_service.ServiceRecord_RankPlaylist_Max(profile);
        test_service.ServiceRecord_SocialRank_Progression(profile);
    
        test_history.History_Overview(profile);
        test_history.History_Backgrounds_Overview(profile);
    
        test_appearance.Appearance_Overview(profile);
        setTimeout(() => {
            p_search_find.classList.remove('d-none');
        },3000);
    })
}
catch(e)
{   

}
