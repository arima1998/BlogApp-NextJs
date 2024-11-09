# Blog Application with Next.js

A blog application built with Next.js and Node.js, showcasing optimized CRUD functionality with MySQL. The application includes server-side rendering, API routes, and dynamic routing.

## Features
- **CRUD Operations**: Create, Read, Update, and Delete blog posts
- **Server-Side Rendering (SSR)**: Utilizes Next.js SSR for improved SEO and performance
- **Responsive Design**: Styled using Tailwind CSS for a clean and adaptable layout

## Performance Evaluation

This project includes load testing using Artillery to measure API performance under simulated load. 

### Results:
- **Average Response Time**: 50.1ms
- **95th Percentile**: 58.6ms – 95% of requests completed within this time
- **99th Percentile**: 80.6ms – 99% of requests handled in under 80.6ms
- **Scalability**: Successfully handled 300 requests with consistent response times

These metrics demonstrate the application's efficiency and scalability under load, with minimal latency for CRUD operations.

## Project Setup

### Prerequisites
- Node.js
- MySQL

