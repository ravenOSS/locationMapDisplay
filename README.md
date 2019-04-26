# locationMapDisplay
DEBUG=locationmapdisplay:* npm start OR DEBUG=locationmapdisplay:* nodemon start (requires clobal install of nodemon)

Project built from express generator for displaying map data in Leaflet, MapBox, and Google Maps. Contrasts raster and vector tile.

Breaks out controllers from routes and places them in api sub-directory.

Uses data from a mongodb database with mongoose ODM

Requires a mongodb installation either locally or SAAS platform such as Atlas. Sign up for a free Atlas account or another provider. UN & PW have to be added to Atlas url in .env. Example.env provided as guide. Use URL from your account.

Allows registration of 'locations' for creation of a collection of Geo Points. Use the 'Create-Location' link.

Configured to use dotenv. Create .env file in root directory and add key=value data for database URL and PORT.
Register for Mapbox and Google free accounts and add your own API keys.  

Open locate-demo.html directly into browser for a display of the user location using the browser GeoLocation api. Displays user location.