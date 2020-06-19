> React template with SSR by using Firebase Cloud Functions

## Get Starter

Make sure you have [`firebase-tools`][firebase-tools] installed

**Install all dependencies**
```
npm i
cd functions/ 
npm i
```

Then ...

**Build functions**

```
cd functions/ 
rm -rf dist/ && NODE_ENV=production npmR build -- --watch 
```

**Build app** 

```
rm -rf public/ && NODE_ENV=production npmR build
```

**Start emulators**

```
npmR start:emulators
```

---------

## Tools

### Performance

 * > [prerender.io][4]   
   > Allows your Javascript website to be crawled perfectly by search engines.
 * > [react-snap][5]
   > Pre-renders a web app into static HTML. Uses Headless Chrome to crawl all available links starting from the root.

### Great tools for SEO

 * [schema-markup-generator][1] or [json-ld-generator][json-ld-generator]


### Other tools

 * [best-marketing-tools][best-marketing-tools]
 * [search-console][search-console]

[1]: https://technicalseo.com/tools/schema-markup-generator/
[json-ld-generator]: https://webcode.tools/json-ld-generator
[best-marketing-tools]: https://saijogeorge.com/best-marketing-tools/
[4]: https://prerender.io/
[5]: https://github.com/stereobooster/react-snap
[firebase-tools]: https://firebase.google.com/docs/cli
[search-console]: https://search.google.com/search-console