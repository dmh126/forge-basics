const express = require('express');

const ForgeSDK = require('forge-apis');
const FORGE_CLIENT_ID = '' , FORGE_CLIENT_SECRET = '';
const oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, [
  'viewables:read',
], true);

const app = express();

app.use('/three', express.static(__dirname + '/three'));

app.use('/forge', express.static(__dirname + '/forge'));

app.get('/token', (req, res) => {
  oAuth2TwoLegged.authenticate().then(function(credentials){
    res.status(200).json(credentials)
  }, function(err){
    res.status(500).json({ok: false});
  });
})

app.listen(3000, () => console.log('App listening on port 3000!'));