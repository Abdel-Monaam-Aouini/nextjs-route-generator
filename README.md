# Next.js Route Generator

A CLI tool to generate routes for Next.js projects.

## Installation

You can install the CLI globally using npm:

```bash
npm install -g nextjs-route-generator
```

## Usage

To generate a route, use the `next-generate` command followed by the route path. You can also specify which files to create using the flags.

### Generate a Route with All Files

```bash
next-generate "posts/[id]" -p -l -f
```

This will create the following structure:

```
pages/
└── posts/
    └── [id]/
        ├── page.tsx
        ├── layout.tsx
        └── route.ts
```

### Generate a Route with Specific Files

You can specify which files to generate using the flags:
- `-p` for `page.tsx` or `page.jsx`
- `-l` for `layout.tsx` or `layout.jsx`
- `-f` for `route.ts` or `route.js`

For example, to generate only `page.tsx` and `layout.tsx`:

```bash
next-generate "posts/[id]" -p -l
```

This will create the following structure:

```
pages/
└── posts/
    └── [id]/
        ├── page.tsx
        └── layout.tsx
```

### Determining Project Type

The tool automatically determines whether your project is using TypeScript or JavaScript based on the presence of `tsconfig.json` in your project root. It will generate files with appropriate extensions:
- For TypeScript: `.tsx` and `.ts`
- For JavaScript: `.jsx` and `.js`

## License

MIT