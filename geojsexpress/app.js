/**
 * Module dependencies.
 */
 
var pg = require('pg');
var express = require('express')
  , http = require('http')
  , bodyParser = require('body-parser')
  , errorHandler = require('errorhandler')
  , methodOverride = require('method-override');

var app = express(); 
var server = http.createServer(app);
 
// Configuration
 
  app.set('views', __dirname + '/views');
  app.use(bodyParser);
  app.use(methodOverride);
  app.use(express.static(__dirname + '/public'));
  if (process.env.NODE_ENV === 'development') {
  	// only use in development
  	app.use(errorhandler())
} 

app.set('view options', {
  layout: false
});
 
// Use hamljs for HAML views
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
 
// Routes
app.get('/', function(req, res){
  res.render('index', {
  });
});
 
app.post('/RetrieveCadastre', function(req, res){
    RetrieveCadastre(req.body, res);
});
 
// RetrieveCadastre
function RetrieveCadastre(bounds, res){
 
    var connString = 'tcp://spatial:spatial@s18038098.onlinehome-server.info';
 
    pg.connect(connString, function(err, client) {
 
        var sql = 'select ST_AsGeoJSON(geog) as shape ';
        sql = sql + 'from waetherdb.wetterdaten';
        sql = sql + 'where geog && ST_GeogFromText(\'SRID=4326;POLYGON(($1 $2,$3 $4,$5 $6,$7 $8,$9 $10))\') ';
        sql = sql + 'and ST_Intersects(geog, ST_GeogFromText(\'SRID=4326;POLYGON(($11 $12,$13 $14,$15 $16,$17 $18,$19 $20))\'));';
        
        var vals = [bounds._southWest.lng, bounds._southWest.lat, bounds._northEast.lng, bounds._southWest.lat, bounds._northEast.lng, bounds._northEast.lat, bounds._southWest.lng, bounds._northEast.lat, bounds._southWest.lng, bounds._southWest.lat];
        var vals = vals.concat(vals);
        
        client.query(sql, vals, function(err, result) {
            var featureCollection = new FeatureCollection();
 
            for (i = 0; i < result.rows.length; i++)
            {
                featureCollection.features[i] = JSON.parse(result.rows[i].shape);
            }
 
            res.send(featureCollection);
        });
    });
}
 
// GeoJSON Feature Collection
function FeatureCollection(){
    this.type = 'FeatureCollection';
    this.features = new Array();
}
 
app.listen(3000);
