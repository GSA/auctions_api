---
layout: default
title: API Basics
nav: basics
---

### API basics

The Auctions API is a GET API which has currently one operation. The operation will retrieve GSA Auctions, auctions data.  

A couple basic notes: the rate limits for the API are currently 5,000 calls/day and 5 calls per 5 seconds. As we go forward and understand the impact of usage of the API, we will adjust the limits accordingly as well as allow for individual users with specific needs to have customized rate limits appropriate to their use.

##### Example URL

Currently, the below URL won't work without you adding in an API key from api.data.gov. Replace ```<YOUR_API_KEY>``` with your api.data.gov provided API key in the below URL to successfully execute the call.

 https://api.data.gov/test/gsa/auctions?api_key=<YOUR_API_KEY>&format=JSON

##### Output

The output data will be in XML and JSON format. These files are downloadable files.

The data in the API is live data.  

##### Coming soon! 

This is the GSA Auctions first API. More APIs may come in near future.

<body id="basics"></body>

