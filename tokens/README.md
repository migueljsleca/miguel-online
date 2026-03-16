# Figma Tokens Export

Source file:
- `Untitled`
- file key: `kuGYQC6xBKoEXKHywUwTwp`

Exported collections:
- `primitives`
- `theme`

Resolved values:

| Token | Light | Dark |
| --- | --- | --- |
| `background` | `#FAFCFD` | `#101010` |
| `foreground` | `#101010` | `#FAFCFD` |
| `accent` | `#E54613` | `#E54613` |
| `opacity` | `#1010108C` | `#FAFCFD8C` |
| `tileBg` | `#FBFCFD` | `#303030` |
| `tileStroke` | `#F1F3F4` | `#2A2A2A` |
| `tileFill` | `#7C7D7E` | `#939495` |

Primitives:

| Token | Value |
| --- | --- |
| `white` | `#FAFCFD` |
| `black` | `#101010` |
| `accent` | `#E54613` |

Recommended Next.js usage:

1. Import `tokens/figma-theme.css` from your global stylesheet.
2. Toggle the `dark` class on `<html>` or `<body>`.
3. For Tailwind v4, use the `@theme inline` block already included in `tokens/figma-theme.css`.
4. For Tailwind v3, spread `tailwindThemeColors` from `tokens/tailwind-theme.ts` into `theme.extend.colors`.
5. Use classes like `bg-background`, `text-foreground`, and `text-accent`.

Example:

```tsx
export default function Page() {
  return (
    <main className="bg-background text-foreground">
      <button className="rounded-full bg-accent px-4 py-2 text-white">
        Action
      </button>
      <p className="text-opacity">Secondary copy</p>
    </main>
  );
}
```
