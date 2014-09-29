---
layout: default
title: API Basics
nav: basics
---

### API basics

The Auctions API is a GET API which has currently one operation. The operation will retrieve GSA Auctions data.  

A couple basic notes: The rate limits for the API are currently 5,000 calls/day and 5 calls per 5 seconds. As we go forward and understand the impact of usage of the API, we will adjust the limits accordingly as well as allow for individual users with specific needs to have customized rate limits appropriate to their use.

##### Example URL

The below URLs are for initial browsing of API data. This DEMO_KEY will not work after a certain number of attempts. User can  request a personal key from [api.data.gov](https://api.data.gov/signup/). The personal key will have more data access capabilities.    

 [https://api.data.gov/gsa/auctions?api_key=DEMO_KEY&format=JSON](https://api.data.gov/gsa/auctions?api_key=DEMO_KEY&format=JSON)
 [https://api.data.gov/gsa/auctions?api_key=DEMO_KEY&format=XML](https://api.data.gov/gsa/auctions?api_key=DEMO_KEY&format=XML)

##### Output

The output data will be in XML and JSON format. These files are downloadable.

The data in the API output file is live data.  

##### Coming soon! 

This is the GSA Auctions' first API. More APIs may come in near future.

<body id="basics"></body>

