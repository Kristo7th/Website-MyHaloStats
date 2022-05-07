const date = new Date();
const dateTag = document.querySelector('#currentYear');
dateTag.textContent = date.getFullYear();

const haloapi_link = `https://autocode.com/halo/`;
const halowaypoint = `https://www.halowaypoint.com/`;
const twitterLink = `https://twitter.com/Kristo7th`;
const discordInvite = `#`;
const githubLink = '#'; 

document.querySelector('#api-link').href = haloapi_link;
document.querySelector('#waypoint-link').href = halowaypoint;
document.querySelector('#twitter-link').href = twitterLink;
document.querySelector('#discord-link').href = discordInvite;
document.querySelector('#github-link').href = githubLink;


function dateConv(value) {
    console.log(value.slice(0, 9));
    return value.slice(0, 9);
}


getHighestRank = async (profile) => {
    //console.log(profile.data.multiplayer.progression.ranks[1].playlists.length);
    let maxRank = 
    {
        rank : 0,
        playlist: '',
        image: ''
    };

    for (let x = 0; x < profile.data.multiplayer.progression.ranks[1].playlists.length; x++) {
        if (maxRank.rank < profile.data.multiplayer.progression.ranks[1].playlists[x].rank)
            {
                maxRank.rank = profile.data.multiplayer.progression.ranks[1].playlists[x].rank;
                maxRank.playlist = profile.data.multiplayer.progression.ranks[1].playlists[x].name;
                maxRank.image = profile.data.multiplayer.progression.ranks[1].playlists[x].image_url;
            }
    }
    return maxRank;
}

getRankProgression = (total, remaining) =>
{
    const threshold = total + remaining;
    return (total / threshold) * 100;
}