# another-todo-app

Live at [Surge](http://another-todo-app.surge.sh/)

## Setup

Add Firebase config in `/src/config/firebase.js`
```
import * as firebase from "firebase";

// Get config from Firebase
const config = {};

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

```

Install dependencies and build
```
yarn install
yarn build
```

Deploy with Surge
```
// Change domain to something else
surge --domain another-todo-app.surge.sh
```
