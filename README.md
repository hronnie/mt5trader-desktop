## Create electron executable

1. Go to frontend folder `mt5trader-frontend` and run 
    ```
   npm install --force
   npm run build

2. Copy mt5trader-frontend/out directory to mt5trader-backend directory

3. Create the package with the following command
    ```
    npx electron-packager . Mt5TraderDesktop --platform=win32 --arch=x64 --out=dist --extra-resource=../mt5trader-backend --overwrite