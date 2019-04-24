# locationMapDisplay
DEBUG=locationmapdisplay:* npm start

Project built from express generator for displaying map data in Leaflet, MapBox, and Google Maps.

Breaks out controllers from routes and places them in api sub-directory.

Uses data from a mongodb database with mongoose ODM

Requires a mongodb installation either locally or SAAS platform such as Atlas.

Allows registration of 'location locations' for creation of a collection of Geo Points.

Configured to use dotenv. Create .env file in root directory and add key=value data for database URL and PORT.
Add your own API keys for Mapbox and Google.  

Load locate-demo.html directly into browser for a display of the user location using the browser GeoLocation api.