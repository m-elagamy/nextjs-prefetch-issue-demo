# Next.js Prefetch Bug Demo

A minimal Next.js app demonstrating a bug where prefetched pages trigger an extra network request during navigation, despite the data being preloaded.

## Overview

This demo reproduces a Next.js issue: when a page is prefetched (e.g., on input blur), navigating to it after a server action still triggers a duplicate fetch request. The expected behavior is for navigation to use the prefetched data, avoiding extra requests. A `setTimeout` workaround prevents the issue, suggesting a timing or caching problem in Next.js’s router.

- **Live Demo**: [https://nextjs-prefetch-issue-demo.vercel.app/](https://nextjs-prefetch-issue-demo.vercel.app/)
- **Bug Report**: [vercel/next.js#77064](https://github.com/vercel/next.js/issues/77064)
