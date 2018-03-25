# DDoser
> DDoS Stress Tool

# Getting Started
- yarn global add https://github.com/tje3d/ddoser
- ddoser -h

# Help
```
usage: ddoser -t http://localhost -n 1000 -c 50 -p 20

Nodejs DDoser

Optional arguments:
  -h, --help      Show this help message and exit.
  -v, --version   Show program's version number and exit.
  -c CONCURRENCY  Concurrency request
  -t TARGET       Your Target, Example: http://localhost
  -n NUMBER       Number of requests to made
  -p PROCESS      Count of child process
```

# Warning
Do not use this module ta attack servers and services you don't own! It is only for testing purposes and not for unauthorized actions.