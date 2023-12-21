const { Pool } = require('pg');

class ExportService {
    constructor() {
        this._pool = new Pool();
    }

    async exportPlaylist(userId) {
        const query = {
            text: `SELECT playlist.* FROM playlist
            LEFT JOIN playlist_song ON playlist_song."playlistId" = playlist.id
            WHERE playlist."ownerId" = $1`,
            values: [userId],
        }

        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = ExportService;