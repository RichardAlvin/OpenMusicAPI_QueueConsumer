const { Pool } = require('pg');

class ExportService {
    constructor() {
        this._pool = new Pool();
    }

    async exportPlaylist(playlistId) {
        const queryPlaylist = {
            text: `SELECT playlist.* FROM playlist
            WHERE playlist.id = $1`,
            values: [playlistId],
        };
        const resultPlaylist = await this._pool.query(queryPlaylist);

        if (resultPlaylist.rows.length === 0) {
            const playlistData = {
                playlist: [],
            };
            return playlistData;
        }

        const querySong = {
            text: `SELECT song.* FROM playlist_song
            LEFT JOIN song ON song."id" = playlist_song."songId"
            WHERE playlist_song."playlistId" = $1`,
            values: [playlistId],
        };
        const resultSong = await this._pool.query(querySong);

        const playlistData = {
            playlist: {
                id: resultPlaylist.rows[0].id,
                name: resultPlaylist.rows[0].name,
                songs: resultSong.rows.map((song) => ({
                    id: song.id,
                    title: song.title,
                    performer: song.performer,
                })),
            },
        };

        return playlistData;
    }
}

module.exports = ExportService;
