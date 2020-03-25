const connection = require('../database/connection');
module.exports = {
    async home(req, res) {
        const ong_id = req.headers.athorization;

        const incidents = await connection('incidents').where('ong_id', ong_id).select('*');
        
 
        return res.json(incidents);
    }
}