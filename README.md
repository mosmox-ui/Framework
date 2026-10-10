# @mosmox-ui/framework

React UI components for Mosmox UI.

The package exports the Framework components from one package entry point and includes the Framework theme stylesheet.

## Installation

```bash
npm install @mosmox-ui/framework
```

The package requires React 18 or newer and React DOM 18 or newer as peer dependencies. The icon components used by the Framework are provided by `@mosmox-ui/icons`.

## Usage

Import components from `@mosmox-ui/framework` and import the stylesheet once in the application entry point:

```tsx
import { Button, Input } from '@mosmox-ui/framework';
import '@mosmox-ui/framework/styles.css';

export function Example() {
  return (
    <div>
      <Input label="Name" placeholder="Enter a name" />
      <Button>Save</Button>
    </div>
  );
}
```

## Exported components

The package entry point exports the components and public types from the Framework source, including foundations, form controls, feedback and status components, navigation and selection components, content and media components, and overlays.

The exported component names include `Button`, `Input`, `InputNumber`, `InputPassword`, `InputOTP`, `InputMask`, `InputCurrency`, `ColorPicker`, `Select`, `AutoComplete`, `Textarea`, `Checkbox`, `Radio`, `RadioCard`, `Slider`, `Switch`, `SwitchCard`, `Form`, `Dialog`, `Drawer`, `FileUpload`, `Table`, `Tabs`, `Accordion`, `Menu`, `NavigationMenu`, `Sidebar`, `Tooltip`, `Card`, `Image`, `Avatar`, `Calendar`, `Pagination`, `Progress`, `Spinner`, `Skeleton`, `Alert`, `AlertInline`, `Banner`, `Badge`, `Tag`, `ToastNotification`, `CodeBlock`, `CodeDiff`, `List`, `SortableList`, `Carousel`, `VideoPlayer`, `AudioPlayer`, `Timeline`, `ChangeLog`, `Layout`, `Grid`, `Space`, `Masonry`, `Text`, `Link`, `Divider`, `Label`, `KeyboardShortcut`, `ThemeSwitcher`, `ResizablePanels`, `Lightbox`, `Toolbar`, `ProfileMenu`, `ContextMenu`, `ConfirmationDialog`, `CookieBanner`, `PricingTable`, `ActivityFeed`, `InfiniteScroll`, and `ScrollArea`.

The complete public export list is defined in `packages/ui/src/index.ts` in the GitHub repository.

## Configuration

`ConfigProvider` supplies shared theme values and component defaults:

```tsx
import { Button, ConfigProvider } from '@mosmox-ui/framework';
import '@mosmox-ui/framework/styles.css';

export function App() {
  return (
    <ConfigProvider>
      <Button>Continue</Button>
    </ConfigProvider>
  );
}
```

The Framework also exports `ThemeConfig` and the component configuration types for TypeScript users.

## TypeScript

Component props and public API types are exported from the same package entry point:

```tsx
import type { ButtonProps, InputProps } from '@mosmox-ui/framework';
```

## Source development

The source repository keeps UI components in `packages/ui` and shared theme tokens in `packages/theme`.

```bash
npm install
npm run typecheck
npm run build
```

## Links

- [GitHub repository](https://github.com/mosmox-ui/Framework)
- [npm package](https://www.npmjs.com/package/@mosmox-ui/framework)
