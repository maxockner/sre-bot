# SREBot

Just a toy hacked together at AGI house hackathon.

## Goal
Build an agent with the following capabiltiies:
  - access to error streams (stderr, alerts/monitoring events)
  - ability to issue code changes
  - ability to deploy code changes
 
## Stuff I wanted to do but didnt
  - pagerduty webhooks
  - deployments to an actual production environment
  - Record incident reports.
  - find a less contrived use case


## How to run

```javascript
node run.js
```

Then in another terminal:
```
curl http://localhost:3000/multiply_by_two/3
```

It's broken. Give it a second and hopefully SRE bot will fix it.