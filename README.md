<p align="center">
  <img src="https://github.com/rutbergphilip/RedisRacer/blob/main/logo_transparent.png?raw=true" width="300" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">RedisRacer</h1>
</p>
<p align="center">
    <em>Accelerating Redis Performance, One Benchmark at a Time!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/rutbergphilip/RedisRacer?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/rutbergphilip/RedisRacer?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/rutbergphilip/RedisRacer?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/rutbergphilip/RedisRacer?style=default&color=0080ff" alt="repo-language-count">
<p>

## Table of Contents

- [ Overview](#-overview)
- [ Benchmark Results](#-benchmark-results)
- [ Repository Structure](#-repository-structure)
- [ Supported Operations](#-supported-operations)
- [ Getting Started](#-getting-started)
  - [ Installation & Usage (Without Docker-Compose)](#-installation-and-usage-without-docker-compose)
  - [ Installation & Usage (With Docker-Compose)](#-installation-and-usage-with-docker-compose)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ Acknowledgments](#-acknowledgments)

---

## Overview

RedisRacer is a performance benchmarking tool that evaluates the speed and efficiency of Redis interactions between the Node-Redis and IORedis libraries. Through a range of benchmark operations such as GET, SET, HSET, HGETALL, and JSON operations.

## Benchmark Results

The following tables summarize the performance benchmarks between `Node-Redis` and `IORedis` libraries based on operations per second (ops/sec), average time (in nanoseconds), and margin of error. This benchmark was made on my machine outside of docker.

```
Macbook Pro
Chip: Apple M2 Pro
Memory: 32GB
OS version: 14.2.1
```

### `Node-Redis` Benchmark Results

| Task Name | Ops/Sec | Average Time (ns) | Margin | Samples |
| --------- | ------- | ----------------- | ------ | ------- |
| GET       | 32,064  | 31,187.59         | ±2.68% | 160321  |
| SET       | 32,915  | 30,381.13         | ±2.77% | 164576  |
| HSET      | 30,565  | 32,716.53         | ±2.22% | 152829  |
| HGETALL   | 31,717  | 31,528.65         | ±2.14% | 158586  |
| JSON.GET  | 29,387  | 34,027.76         | ±2.24% | 146939  |
| JSON.SET  | 30,007  | 33,325.25         | ±2.21% | 150037  |
| MULTI-GET | 573     | 1,742,435.10      | ±2.96% | 2870    |

### `IORedis` Benchmark Results

| Task Name | Ops/Sec | Average Time (ns) | Margin | Samples |
| --------- | ------- | ----------------- | ------ | ------- |
| GET       | 33,079  | 30,230.00         | ±2.66% | 165399  |
| SET       | 34,138  | 29,292.63         | ±2.54% | 170692  |
| HSET      | 32,608  | 30,666.58         | ±1.82% | 163045  |
| HGETALL   | 34,179  | 29,257.15         | ±2.14% | 170899  |
| JSON.GET  | 31,749  | 31,497.05         | ±2.10% | 158746  |
| JSON.SET  | 32,115  | 31,137.53         | ±2.76% | 161140  |
| MULTI-GET | 525     | 1,903,613.81      | ±2.68% | 2627    |

### Average Performance

| Library    | Average Ops/Sec |
| ---------- | --------------- |
| Node-Redis | 26,746.86       |
| IORedis    | 28,341.86       |

### Most Performant

Based on my runs, the `IORedis` library shows the highest performance with an average of `28,341.86` operations per second.

Please refer to the full benchmark tests for a comprehensive understanding of the performance and behavior under different conditions.

---

## Repository Structure

```sh
└── RedisRacer/
    ├── Dockerfile
    ├── LICENSE
    ├── docker-compose.yml
    ├── nodemon.json
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── benchmarks
    │   ├── connection
    │   ├── constants
    │   ├── helpers
    │   ├── index.ts
    │   └── types
    └── tsconfig.json
```

## Supported Operations

- GET
- SET
- HGETALL
- HSET
- MULTI
- JSON
  - GET
  - SET

..more to come

## Getting Started

### Installation & Usage (Without Docker-Compose)

> 1. Clone the RedisRacer repository:
>
> ```console
> $ git clone https://github.com/rutbergphilip/RedisRacer
> ```
>
> 2. Change to the project directory:
>
> ```console
> $ cd RedisRacer
> ```
>
> 3. Install the dependencies:
>
> ```console
> $ npm install
> ```
>
> 4. Create .env file & add the following variable with your own values:
>
> ```console
> REDIS_URL=redis://{HOST}:{PORT}
> ```
>
> 5. Install and setup RedisJSON module:
>
> ```console
> Follow instructions based on your machine at:
> https://github.com/RedisJSON/RedisJSON
> ```
>
> 6. Start your own local Redis instance (this step may differ if you prefer json-module docker approach):
>
> ```console
> redis-server --loadmodule /path/to/module
> ```
>
> 7. Build and start the application:
>
> ```console
> npm run build && npm start
> ```

### Installation & Usage (With Docker-Compose)

> 1. Clone the RedisRacer repository:
>
> ```console
> $ git clone https://github.com/rutbergphilip/RedisRacer
> ```
>
> 2. Change to the project directory:
>
> ```console
> $ cd RedisRacer
> ```
>
> 3. Run the docker-compose:
>
> ```console
> docker-compose up --build
> ```

---

## Project Roadmap

- [ ] `► Benchmark more operations`
- [ ] `► Add unit tests`

---

## Contributing

Contributions are more than welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/rutbergphilip/RedisRacer/issues)**: Submit bugs found or log feature requests for the `RedisRacer` project.
- **[Submit Pull Requests](https://github.com/rutbergphilip/RedisRacer/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/rutbergphilip/RedisRacer
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented some more benchmarks'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-benchmarks
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository where you clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. 😃
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com{/rutbergphilip/RedisRacer/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=rutbergphilip/RedisRacer">
   </a>
</p>
</details>

---

## Acknowledgments

This project is inspired by the benchmarking application made by [**poppinlp**](https://github.com/poppinlp/node_redis-vs-ioredis)

---
