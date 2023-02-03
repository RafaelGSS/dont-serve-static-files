# dont-serve-static-files

Reference: https://calendar.perfplanet.com/2021/content-separation/

## Benchmark results

### App 0

Exposing Node.js server directly to the web

```console
➜ autocannon -d 30 -c 1000 http://172.105.153.49:3000/
Running 30s test @ http://172.105.153.49:3000/
1000 connections


┌─────────┬────────┬────────┬────────┬────────┬──────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg      │ Stdev     │ Max     │
├─────────┼────────┼────────┼────────┼────────┼──────────┼───────────┼─────────┤
│ Latency │ 127 ms │ 131 ms │ 139 ms │ 158 ms │ 137.2 ms │ 106.61 ms │ 3447 ms │
└─────────┴────────┴────────┴────────┴────────┴──────────┴───────────┴─────────┘
┌───────────┬────────┬────────┬────────┬────────┬────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg    │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼────────┼─────────┼────────┤
│ Req/Sec   │ 1893   │ 1893   │ 3471   │ 3599   │ 3376.4 │ 338.78  │ 1893   │
├───────────┼────────┼────────┼────────┼────────┼────────┼─────────┼────────┤
│ Bytes/Sec │ 356 kB │ 356 kB │ 653 kB │ 677 kB │ 635 kB │ 63.7 kB │ 356 kB │
└──────────┴────────┴────────┴────────┴────────┴────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.
# of samples: 30

104k requests in 30.09s, 19 MB read
1k errors (1k timeouts)

~ took 30.2s
➜ autocannon -d 30 -c 1000 http://172.105.153.49:3000/public/index.html
Running 30s test @ http://172.105.153.49:3000/public/index.html
1000 connections


┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼─────────┼────────┤
│ Latency │ 129 ms │ 136 ms │ 165 ms │ 205 ms │ 141.81 ms │ 34.36 ms │ 900 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev  │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┤
│ Req/Sec   │ 1697    │ 1697    │ 3329    │ 3411    │ 3268.07 │ 298.48 │ 1697    │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┤
│ Bytes/Sec │ 3.19 MB │ 3.19 MB │ 6.25 MB │ 6.41 MB │ 6.14 MB │ 560 kB │ 3.19 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 30

100k requests in 30.09s, 184 MB read
1k errors (1k timeouts)
```

### App1

Exposing Node.js app behind a nginx proxy and serving static files through the app.

```console
➜ autocannon -d 30 -c 1000 http://172.105.153.49
Running 30s test @ http://172.105.153.49
1000 connections


┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬─────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max     │
├─────────┼────────┼────────┼────────┼────────┼───────────┼──────────┼─────────┤
│ Latency │ 127 ms │ 132 ms │ 152 ms │ 363 ms │ 137.27 ms │ 37.79 ms │ 1196 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴─────────┘
┌───────────┬─────┬──────┬────────┬────────┬─────────┬─────────┬───────┐
│ Stat      │ 1%  │ 2.5% │ 50%    │ 97.5%  │ Avg     │ Stdev   │ Min   │
├───────────┼─────┼──────┼────────┼────────┼─────────┼─────────┼───────┤
│ Req/Sec   │ 0   │ 0    │ 3323   │ 3517   │ 2238.84 │ 1567.38 │ 2     │
├───────────┼─────┼──────┼────────┼────────┼─────────┼─────────┼───────┤
│ Bytes/Sec │ 0 B │ 0 B  │ 648 kB │ 686 kB │ 436 kB  │ 306 kB  │ 385 B │
└───────────┴─────┴──────┴───────┴────────┴─────────┴─────────┴───────┘

Req/Bytes counts sampled once per second.
# of samples: 30

70k requests in 30.08s, 13.1 MB read
2k errors (2k timeouts)

~ took 30.2s
➜ autocannon -d 30 -c 1000 http://172.105.153.49/public/index.html
Running 30s test @ http://172.105.153.49/public/index.html
1000 connections


┌─────────┬────────┬────────┬────────┬────────┬──────────┬───────────┬──────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg      │ Stdev     │ Max      │
├─────────┼────────┼────────┼────────┼────────┼──────────┼───────────┼──────────┤
│ Latency │ 130 ms │ 148 ms │ 272 ms │ 514 ms │ 167.9 ms │ 265.82 ms │ 10117 ms │
└─────────┴────────┴────────┴────────┴────────┴──────────┴───────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%  │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 7       │ 7       │ 2919    │ 3131   │ 1915.27 │ 1352.64 │ 7       │
├──────────┼─────────┼─────────┼─────────┼────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 13.2 kB │ 13.2 kB │ 5.51 MB │ 5.9 MB │ 3.61 MB │ 2.55 MB │ 13.2 kB │
└───────────┴─────────┴─────────┴─────────┴────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 30

61k requests in 30.1s, 108 MB read
2k errors (2k timeouts)
```

### App2

```console
```
