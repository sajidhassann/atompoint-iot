rm -rf app
mkdir app
cp -r realtime-dashboard-backend/ app/
mkdir app/src/client
cd realtime-dashboard-frontend
npm i
rm -rf dist
npm run build
cd ..
cp -r realtime-dashboard-frontend/dist/ app/src/client/
cp -r dockerfiles/ app/