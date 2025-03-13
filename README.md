# Next.js Prefetch Bug Demo

A minimal Next.js app showing a bug where `router.push` triggers an extra network request after a completed `router.prefetch`, even though the prefetched data is available.

## Overview

This demo highlights an issue in Next.js: `router.push` fails to use preloaded data from `router.prefetch`, causing duplicate requests. Using `setTimeout(() => router.push(), 0)` as a workaround prevents the extra request, pointing to a potential timing or caching issue in the router.

- **Live Demo**: [https://nextjs-prefetch-issue-demo.vercel.app/](https://nextjs-prefetch-issue-demo.vercel.app/)
- **Bug Report**: [vercel/next.js#77064](https://github.com/vercel/next.js/issues/77064)
