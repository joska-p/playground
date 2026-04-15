## Error Type
Build Error

## Error Message
Module not found: Can't resolve '../../styles.css'

## Build Output
./packages/mosaic-maker/dist/components/Mosaic-maker/Mosaic-maker.js:8:1
Module not found: Can't resolve '../../styles.css'
   6 | const Mosaic_display_1 = require("./Mosaic-display");
   7 | const Controls_1 = require("./controls/Controls");
>  8 | require("../../styles.css");
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
   9 | function MosaicMaker() {
  10 |     return ((0, jsx_runtime_1.jsx)(Mosaic_context_1.MosaicMak...
  11 | }

Import trace:
  Server Component:
    ./packages/mosaic-maker/dist/components/Mosaic-maker/Mosaic-maker.js
    ./packages/mosaic-maker/dist/index.js
    ./apps/web/app/page.tsx

https://nextjs.org/docs/messages/module-not-found

Next.js version: 16.2.0 (Turbopack)
