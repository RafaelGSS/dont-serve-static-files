# dont-serve-static-files

Reference: https://calendar.perfplanet.com/2021/content-separation/

## Benchmark results

### App 0

Exposing Node.js server directly to the web

```console
rafaelgss@rafaelgss-desktop:~$ wrk2 -c1000 -d30s -R1000 http://172.105.153.49:3000/
Running 30s test @ http://172.105.153.49:3000/
  2 threads and 1000 connections
  Thread calibration: mean lat.: 369.440ms, rate sampling interval: 1135ms
  Thread calibration: mean lat.: 540.130ms, rate sampling interval: 1350ms
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   241.94ms  456.32ms  15.54s    98.45%
    Req/Sec   504.26     53.80   610.00     62.96%
  28689 requests in 30.01s, 5.14MB read
  Socket errors: connect 0, read 0, write 0, timeout 128
Requests/sec:    956.08
Transfer/sec:    175.53KB
```

Static files

```console
rafaelgss@rafaelgss-desktop:~$ wrk2 -c1000 -d30s -R1000 http://172.105.153.49:3000/public/index.html
Running 30s test @ http://172.105.153.49:3000/public/index.html
  2 threads and 1000 connections
  Thread calibration: mean lat.: 172.798ms, rate sampling interval: 541ms
  Thread calibration: mean lat.: 173.186ms, rate sampling interval: 544ms
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   153.31ms  385.01ms  15.61s    99.86%
    Req/Sec   497.28     53.38   581.00     53.12%
  28969 requests in 30.00s, 51.88MB read
  Socket errors: connect 0, read 0, write 0, timeout 59
Requests/sec:    965.51
Transfer/sec:      1.73MB
```

### App1

Exposing Node.js app behind a nginx proxy and serving static files through the app.

```console
rafaelgss@rafaelgss-desktop:~$ wrk2 -c1000 -d30s -R1000 http://172.105.153.49/
Running 30s test @ http://172.105.153.49/
  2 threads and 1000 connections
  Thread calibration: mean lat.: 149.224ms, rate sampling interval: 514ms
  Thread calibration: mean lat.: 148.835ms, rate sampling interval: 307ms
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   151.07ms  413.88ms  15.50s    99.84%
    Req/Sec   418.65     79.94   560.00     61.54%
  24611 requests in 30.00s, 4.58MB read
  Socket errors: connect 0, read 0, write 0, timeout 2020
Requests/sec:    820.30
Transfer/sec:    156.21KB
```

Static files

```console
rafaelgss@rafaelgss-desktop:~$ wrk2 -c1000 -d30s -R1000 http://172.105.153.49/public/index.html
Running 30s test @ http://172.105.153.49/public/index.html
  2 threads and 1000 connections
  Thread calibration: mean lat.: 1058.468ms, rate sampling interval: 8888ms
  Thread calibration: mean lat.: 669.167ms, rate sampling interval: 3733ms
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   285.02ms  597.46ms  15.61s    96.08%
    Req/Sec   405.80     17.61   433.00     60.00%
  24301 requests in 30.01s, 43.69MB read
  Socket errors: connect 0, read 1, write 0, timeout 2222
Requests/sec:    809.82
Transfer/sec:      1.46MB
```

### App2

```console
rafaelgss@rafaelgss-desktop:~$ wrk2 -c1000 -d30s -R1000 http://172.105.153.49/
Running 30s test @ http://172.105.153.49/
  2 threads and 1000 connections
  Thread calibration: mean lat.: 711.841ms, rate sampling interval: 2682ms
  Thread calibration: mean lat.: 714.438ms, rate sampling interval: 2635ms
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   307.84ms  727.57ms  15.68s    96.42%
    Req/Sec   434.08     26.42   468.00     50.00%
  25047 requests in 30.01s, 4.66MB read
  Socket errors: connect 0, read 2, write 0, timeout 1866
Requests/sec:    834.72
Transfer/sec:    158.96KB
```

Static files

```console
rafaelgss@rafaelgss-desktop:~$ wrk2 -c1000 -d30s -R1000 http://172.105.153.49/public/index.html
Running 30s test @ http://172.105.153.49/public/index.html
  2 threads and 1000 connections
  Thread calibration: mean lat.: 504.384ms, rate sampling interval: 2629ms
  Thread calibration: mean lat.: 577.851ms, rate sampling interval: 2682ms
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.95s     4.00s   19.84s    85.65%
    Req/Sec   453.83     44.89   489.00     83.33%
  24431 requests in 30.00s, 42.66MB read
  Socket errors: connect 0, read 1, write 0, timeout 2665
Requests/sec:    814.28
Transfer/sec:      1.42MB
```
