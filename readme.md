# Electron Typescript React Sample App

I ran

```
npx create-react-app view --typescript
```

to make the typescript portion of the app

It's best to have the CRA contained so the tsconfig doesn't interfere, and it conforms to the CRA conventions.

- In src/main.ts, you can change the isDevMode to test dev and prod builds.
- Always run tsc after making changes to .ts files, or have a shell with tsc -W to watch
- Everything is done from project root.

### To run in dev mode:

Firstly, in a shell, run

```
npm run react-start
```

to start the react local server

Then in another shell, run

```
npm start
```

to open the electron app, which should load the localhost on port 3000, which is the default react port.

### To run in prod mode,

in src/main.ts change

```
const isDevEnv = true
```

then transpile with

```
tsc
```

then build with

```
npm run build
```

then run with

```
npm start
```

### Output

Open dev tools in the electron app, and check the console. You should see the IPC message has come through from the main process to the renderer (which is written in view/src/App.tsx). This should be enough info to get you fully started with an Electron app in Typescript and React.
