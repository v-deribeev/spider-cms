# TO DO:

1. add localization via vue-i18n
2. add tests
3. discuss addition of a reset button to table in case a card has been added by mistake
4. a11y improvements like color contrast

# spider-cms

App for representing data for two football teams

# spider-cms

App has been deployed on Netlify and can be tinkered with locally and after merge it would be automatically redeployed on Netlify
can be found @ https://spider-cms.netlify.app/#/

Mock data is available in [IndexPage.vue] by commenting out
**// import mockData from '../../mockData.json'**
**// Object.assign(matchData, mockData.result)**

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

#### Reusable Components:

MatchTable.vue - handles data rendering of matches incl. player pos, name, shirt-number, card tracking, stadium and referee name
CustomLabels.vue - used to handle text in the app, use cases include <a>, <p>, <span> and more
CustomHeadings.vue - used to handle headings with custom typography and styling
CustomButton.vue - used to handle buttons in various styles

quasar.variables.scss - here you can add necessary CSS variables
app.scss - adding global classes or styling elements globally.

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
