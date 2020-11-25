# perpusin
Simple desktop app using Electronjs, Reactjs, Expressjs, and Postgresql

## Prerequisite

- ``node 14.x`` or latest
- Install [pkg](https://github.com/vercel/pkg) to packing your server into executable file
``` bash
# npm
npm i -g pkg

# if you prefer yarn
yarn add -g pkg

#after that, install the dependencies in the /client and /server using yarn
yarn
```
- Install PostgreSql locally
- Change ``.env.example`` into ``.env`` at ``/server`` and fill in with your Postgre config

## Usage

You can customize ``pkg`` and ``electron`` config depend on your machine or requirements.
``` bash
# /client
yarn electron-pack # build the React app

# /server
pkg . # build the server
```
Electron docs: https://www.electronjs.org/docs </br>
Electron Builder, build tool for Electron: https://github.com/electron-userland/electron-builder </br>
pkg docs: https://github.com/vercel/pkg

##
Maintained under MIT license by [Kalwabed Rizki](https://kawari.space)
