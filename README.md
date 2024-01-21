# Deployment Instructions 📝

Replace `firebaseConfig` in `realtime-dashboard-frontend/src/App.jsx` with your firebase project details.

Add `serviceAccountKey.json` file under `realtime-dashboard-backend/src/config` directory.

Replace `databaseURL` in `realtime-dashboard-backend/src/config/firebaseConfig.js` with your database url.

Run `make-app.sh` file to generate deployable app under directory `app`.

Goto `app` directory and build docker image or run `docker compose up --build`.

# Deployment Platform

I have deployed this app on `https://railway.app` <a href="https://railway.app" target="_blank">go-to-railway</a> using docker image. The platform uses `linux/amd64` as os/platform.

App link: `https://iot-atompoint-production.up.railway.app` <a href="https://iot-atompoint-production.up.railway.app" target="_blank">go-to-app</a>.

You can find the docker image used in the production at `https://hub.docker.com/r/sajidhassann/atompoint-iot` <a href="https://hub.docker.com/r/sajidhassann/atompoint-iot" target="_blank">go-to-image</a>.
