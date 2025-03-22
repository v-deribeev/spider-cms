# TO DO:

1. discuss addition of a reset button to table in case a card has been added by mistake
2. a11y improvements like color contrast
3. useMatchData.js can be changed to a store instead of a composable

# spider-cms

App for representing data for two football teams

# spider-cms

App has been deployed on Netlify and can be tinkered with locally and after merge it would be automatically redeployed on Netlify
can be found @ https://spider-cms.netlify.app/#/

Mock data is available in [useMatchData.js] by commenting out
**// import mockData from '../../mockData.json'**
**import { api } from '../boot/axios.js'**

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

#### Reusable Components:

- `MatchTable.vue` - A comprehensive table component for displaying match data including:

  - Player information (name, position, shirt number)
  - Card tracking system (yellow/red cards)
  - Team-specific styling
  - Loading and error states
  - Accessibility features

- `CustomLabels.vue` - A flexible text component that supports:

  - Multiple HTML elements (p, span, a, div, label)
  - Size variants (small, medium, large)
  - Accessibility labels
  - Consistent typography across the app

- `CustomHeadings.vue` - A heading component for consistent header styling:

  - Multiple heading levels (h1-h6)
  - Size variants
  - Custom typography
  - Accessibility support

- `CommonButton.vue` - A versatile button component with:
  - Multiple variants (primary, secondary, card)
  - Size options (small, medium, large)
  - Loading state
  - Icon support (prepend/append)
  - Accessibility features
  - Disabled state handling

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

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

## Testing

### Unit Tests (Vitest)

1. Run tests:

```bash
npm run test
```

2. Run tests with coverage:

```bash
npm run test:coverage
```

3. Run tests in watch mode:

```bash
npm run test:watch
```

4. Run tests with UI:

```bash
npm run test:ui
```

## Project Structure

```
src/
  ├── components/     # Reusable Vue components
  ├── composables/    # Vue composables
  ├── pages/         # Page components
  ├── i18n/          # Internationalization
  └── test/          # Test utilities
```

## Contributing

1. Create a feature branch
2. Write tests for new features
3. Ensure all tests pass
4. Submit a pull request
