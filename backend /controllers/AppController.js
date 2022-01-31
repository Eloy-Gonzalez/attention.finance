const axios = require('axios');

module.exports = {
  balance: async (req, res) => {
    try {
      const { address = '' } = req.body;
      const response = await axios.get(`https://escscan.elaphant.app/api?module=account&action=balancemulti&address=${address}`);
      return res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err });
    }
  }
};