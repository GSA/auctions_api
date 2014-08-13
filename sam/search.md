---
published: true
layout: default

---

### SAM Search API

**NOTE: All the documentation on this page refers to the October release of the SAM API**

As part of the next SAM quarterly release, the SAM API service will expand to include the functionality for Search. The SAM Search API has been developed to mimic the Search functionality that is currently available from the SAM website.
The Search API provides the opportunity to perform a search transaction in the following two options. Quick Search takes a single search term provided by the user and compares it to a set of predefined database fields. Advanced Search allows the user to search by entering a value that is then used to search a user selected predefined search category. 

Notice that we are implementing this through a JSON-based “hypermedia as the engine of application state” (HATEOAS with the appropriate links object within the result set). The intent going forward will be to use this model to allow for a scalable architecture of IAE’s APIs to be built. 

Note:  Don’t try to construct links yourself based on the patterns you see in the links object. Assume that those patterns could change. We will account for this requirement as we implement our rate-limiting for the API.

#### Searching SAM using the API

##### Quick Search:

The Quick Search functionality allows a user to enter a single term which is then queried against six fields in the SAM database. The results should return the same entities, grantees, and other registrants in SAM that are found when you do a “Quick Search” on SAM itself.

Example: ```https://api.data.gov/samsearch/v1/registrations?qterms=GSA&api_key=YOUR_KEY```
The Search API will then query the SAM database and display any registrant that matches the user selected search term contained in any of the following fields: 


| Field|
|----------------------|
|Legal Business Name|
|Doing-Business-As Name|
|DUNS|
|DUNS+4|
|CAGE Code|
|DoDAAC|


**Note** that the search will automatically add a wildcard to the end of any term passed in quick search. So ```qterms=Rob``` will match “Robot Co., Inc.”

##### Advanced Search:

The Advanced Search functionality allows a user to enter criteria or a value and a category which is then used to query the database to return all registrations that match that selection criterion. In Advanced Search users are able to string multiple criteria and categories to better refine their search and return a more specific list of registrations.

Advanced Search uses the same qterms construct that we used for quick search, but follows more closely to the Lucene-based syntax for querying by specific terms. It is not exactly the same, but should be familiar for anyone who is used to that syntax.

As a basic example, if you want to make sure you’re searching only Legal Business Name, you can run the following search:
```https://api.data.gov/samsearch/v1/registrations?qterms=(legalBusinessName:incorporated)```

The search terms will be in parentheses. You can group AND and OR search terms together by putting the terms AND or OR between terms, separated by + signs.
For example a user can search for an entity that has a Legal Business Name that includes the term “incorporated” AND has selected the NAICS Code of 123456 for which they are considered to be a Small Business for. 
```https://api.data.gov/samsearch/v1/registrations?qterms=(legalBusinessName:incorporated)+AND+(naicsLimitedSB:12345)```

##### Advanced search fields

The following are the fields you can search for using Advanced Search. Note that, where appropriate, we have used the same field name as the JSON output from the detailed results of the API. Some of them, like minorityOwned are interpreted appropriately.

##### Functional search fields
<table border="1" cellspacing="0" cellpadding="0" > 
<tbody>
<tr>
<td valign="top" ><p><b>Functional Field</b></p></td>
<td valign="top" ><p><b>Definition</b></p></td>
<td valign="top" ><p><b>URL Search Field</b></p></td>
<td valign="top" ><p><b>Possible Search Terms</b></p></td>
</tr>

<tr>
<td><p>Legal Business Name</p></td>
<td valign="top" ><p>The name that has been registered for the organization at Dun and Bradstreet (D&amp;B).</p></td>
<td><p>legalBusinessName</p>

<p>NOTE: This field also searches ‘Doing Business As Name’</p></td>
<td valign="top" > </td>
</tr>

<tr>
<td><p>Doing Business As Name</p></td>
<td valign="top" ><p>Doing Business As (DBA) is the commonly used other name, such as a franchise, licensee name, or an acronym for the entity. The DBA is also part of the registered name at D&amp;B.</p></td>
<td><p>doingBusinessAs</p>

<p>NOTE: This field also searches ‘Legal Business Name’</p></td>
<td valign="top" > </td>
</tr>

<tr>
<td><p>CAGE/NCAGE code</p></td>
<td valign="top" ><p>The Contractor and Government Entity (CAGE) Code or NATO Commercial and Government Entity (NCAGE) Code. This number is assigned to the registration if one does not already exist.</p></td>
<td><p>cage</p></td>
<td valign="top" > </td>
</tr>

<tr>
<td><p>DUNS number</p></td>
<td valign="top" ><p>Data Universal Numbering System (DUNS) is a unique nine digit number that is administered by Dun and Bradstreet (D&amp;B) and is a required data element for all registrants in SAM.</p></td>
<td><p>duns</p></td>
<td valign="top" > </td>
</tr>

<tr>
<td><p>Physical Address City</p></td>
<td valign="top" ><p>The city of the address registered for the entity at Dun and Bradstreet (D&amp;B).</p></td>
<td><p>samAddress.city</p></td>
<td valign="top" > </td>
</tr>

<tr>
<td><p>Physical Address Country</p></td>
<td valign="top" ><p>The country of the address registered for the entity at Dun and Bradstreet (D&amp;B).</p></td>
<td><p>samAddress.country</p></td>
<td valign="top" > </td>
</tr>

<tr>
<td><p>State</p></td>
<td valign="top" ><p>The state of the address registered for the entity at Dun and Bradstreet (D&amp;B).</p></td>
<td><p>samAddress.stateOrProvince</p></td>
<td valign="top" > </td>
</tr>

<tr>
<td><p>Zip Code</p></td>
<td valign="top" ><p>The zip code of the address registered for the entity at Dun and Bradstreet (D&amp;B).</p></td>
<td><p>samAddress.zip</p></td>
<td valign="top" > </td>
</tr>

<tr>
<td><p>Congressional District</p></td>
<td valign="top" ><p>An electoral division of a state based on the zip-code in the entity's physical address.</p></td>
<td><p>congressionalDistrict</p></td>
<td valign="top" > </td>
</tr>

<tr>
<td><p>NAICS - Limited SB</p></td>
<td valign="top" ><p>The North American Industry Classification System (NAICS) code represents the type of industry in which the entity does business. ‘Limited SB’ will return only entities which are considered small business but only for the NAICS selected by the registrant in their entity registration for the particular NAICS input into search field.</p></td>
<td><p>naicsLimitedSB</p></td>
<td valign="top" > </td>
</tr>

<tr>
<td><p>NAICS - Any Size</p></td>
<td valign="top" ><p>The North American Industry Classification System (NAICS) code represents the type of industry in which the entity does business. ‘Any Size’ will return all records (large and small business) for the particular NAICS input into search field.</p></td>
<td><p>naicsAnySize</p></td>
<td valign="top" > </td>
</tr>

<tr>
<td><p>Minority Owned Business</p></td>
<td valign="top" ><p>A minority business is defined as a business in which more than 51% of the interest, stock and otherwise, is owned by minority group members. If you select this category, you will need to select a subcategory that best represents the persons who hold primary ownership. Subcategories include Asian-Pacific American Owned, Subcontinent Asian (Asian Indian) Owned, Black American Owned, Hispanic American Owned, Native American Owned, or Other.</p></td>
<td><p>minorityOwned</p></td>
<td><p>true or false</p></td>
</tr>

<tr>
<td><p>Woman Owned Business</p></td>
<td valign="top" ><p>Woman-Owned Business means a business (1) that is at least 51 percent owned by one or more women; or, in the case of any publicly owned business, at least 51 percent of the stock of which is owned by one or more women; and (2) whose management and daily business operations are controlled by one or more women.</p></td>
<td><p>womanOwned</p></td>
<td><p>true or false</p></td>
</tr>

<tr>
<td><p>Veteran Owned Business</p></td>
<td valign="top" ><p>Veteran-Owned Business means a business that (1) not less than 51 percent of which is owned by one or more veterans (as defined at 38 U.S.C. 101(2)) or, in the case of any publicly owned business, not less than 51 percent of the stock of which is owned by one or more veterans; and (2) the management and daily business operations of which are controlled by one or more veterans. For more information please see: </p>

<p>http://www.gpo.gov/fdsys/pkg/USCODE-2011-title38/pdf/USCODE-2011-title38.pdf.</p></td>
<td><p>veteranOwned</p></td>
<td><p>true or false</p></td>
</tr>

<tr>
<td><p>Service Disabled Veteran Owned</p></td>
<td valign="top" ><p>Service Disabled Veteran Owned Business means a business that (i) not less than 51 percent of which is owned by one or more service-disabled veterans or, in the case of any publicly owned business, not less 
than 51 percent of the stock of which is owned by one or more service-disabled veterans; and (ii) the management and daily business operations of which are controlled by one or more service-disabled veterans or, in the case of a service-disabled veteran with permanent and severe disability, the spouse or permanent caregiver of such veteran. “Service-disabled veteran” means a veteran, as defined in 38 U.S.C. 101(2), with a disability that is service-connected, as defined in 38 U.S.C. 101(16). For more information please see: http://www.gpo.gov/fdsys/pkg/USCODE-2011-title38/pdf/USCODE-2011-title38.pdf</p></td>
<td><p>serviceDisabledVeteranOwned</p></td>
<td><p>true or false</p></td>
</tr>

<tr>
<td><p>SBA Certified 8A Program</p></td>
<td valign="top" ><p>An SBA program for small concerns owned by socially and economically disadvantaged persons.</p>

<p>Firms admitted to the program can receive Federal contracts designated for 8(a) Business Development Program participants, as well as management and technical assistance.</p>

<p>For more information please see: <a href="http://www.sba.gov/content/8a-business-development-0">http://www.sba.gov/content/8a-business-development-0</a></p></td>
<td><p>sba8AProgram</p></td>
<td><p>true or false</p></td>
</tr>

<tr>
<td><p>SBA Certified HUBzone Program</p></td>
<td valign="top" ><p>The Historically Underutilized Business Zones (HUBZone) program helps small businesses in urban and rural communities gain preferential access to federal procurement opportunities. These preferences go to small businesses that obtain HUBZone certification in part by employing staff who live in a HUBZone. The company must also maintain a "principal office" in one of these specially designated areas.</p>

<p>For more information please see: http://www.sba.gov/content/hubzone-0</p></td>
<td><p>sbaHubzoneProgram</p></td>
<td><p>true or false</p></td>
</tr>

<tr>
<td><p>AbilityOne Certified</p></td>
<td valign="top" ><p>The AbilityOne Program is the largest single provider of jobs for people who are blind or have other significant disabilities in the United States. The AbilityOne Program uses the purchasing power of the federal government to buy products and services from participating, community-based nonprofit agencies nationwide dedicated to training and employing individuals with disabilities.
</p></td>
<td><p>ability1</p></td>
<td><p>true or false</p></td>
</tr>

<tr>
<td><p>Purpose of Registration</p></td>
<td valign="top" ><p>The value that indicates what type of business the entity intends to do with the government (Contracts, Grants and Federal Assistance, Intra-Governmental Transactions).</p></td>
<td><p>purpose</p></td>
<td><p>See codes below</p></td>
</tr>

<tr>
<td><p>Registration Status</p></td>
<td valign="top" ><p>The current status of the registration as it appears in SAM. </p></td>
<td><p>registrationStatus</p></td>
<td><p>See codes below</p></td>
</tr>

<tr>
<td><p>Disaster Response Contractor</p></td>
<td valign="top" ><p>Those contractors who are willing to provide debris removal, distribution of supplies, reconstruction, and other disaster or emergency relief supplies and/or services.</p></td>
<td><p>disasterResponse</p></td>
<td><p>true or false</p></td>
</tr>

</tbody>
</table>




##### Codes for Purpose of registration

* Z1 - Federal AssistanceAwards   
* Z2 - All Awards
* Z4 - AssistanceAwards & IGT
* Z5 - All Awards & IGT

##### Codes for registration status

* A - Active
* W - Work in Progress
* S - Submitted
* I - Inactive

**API Search Output:**

The search results that match the searched condition will be displayed in JSON format and include the following data elements:

#### Advanced Search Fields
<table border="1" cellspacing="0" cellpadding="0" > 
<tbody>
<tr>
<td valign="top" ><p><b>Field Name:</b></p></td>
<td valign="top" ><p><b>Definition:</b></p></td>
<td valign="top" ><p><b>Representation in Output:</b></p></td>
</tr>

<tr>
<td valign="bottom" ><p>Legal Business Name</p></td>
<td valign="top" ><p>The name that has been registered for the organization at Dun and Bradstreet (D&amp;B).</p></td>
<td valign="top" ><p>"legalBusinessName":</p></td>
</tr>

<tr>
<td valign="bottom" ><p>Status</p></td>
<td valign="top" ><p>The current status of the registration as it appears in SAM. Options are: Draft, Work In Progress, Submitted, Active, Inactive. </p></td>
<td valign="top" ><p>"status":</p></td>
</tr>

<tr>
<td valign="bottom" ><p>DUNS</p></td>
<td valign="top" ><p>Data Universal Numbering System (DUNS) is a unique nine digit number that is administered by Dun and Bradstreet (D&amp;B) and is a required data element for all </p>

<p>registrants in SAM.</p></td>
<td valign="top" ><p>"duns":</p></td>
</tr>

<tr>
<td valign="bottom" ><p>DUNS +4</p></td>
<td valign="top" ><p>The DUNS+4 is a user generated four digit number created if the registered entity only has one physical location but more than one bank account.</p></td>
<td valign="top" ><p>"dunsPlus4”:</p></td>
</tr>

<tr>
<td valign="bottom" ><p>Has Active Exclusion</p></td>
<td valign="top" ><p>True or False value depending on whether the entity has had Exclusion created against it or not.</p></td>
<td valign="top" ><p>"hasKnownExclusion":</p></td>
</tr>

<tr>
<td valign="bottom" ><p>Expiration Date</p></td>
<td valign="top" ><p>The date that the entity registration will expire if the user does not update his/her registration. Registrations must be updated every 360 days to remain Active.</p></td>
<td valign="top" ><p>"expirationDate":</p></td>
</tr>

<tr>
<td valign="bottom" ><p>Physical Address</p></td>
<td valign="top" ><p>The address registered for the entity at Dun and Bradstreet (D&amp;B).</p></td>
<td valign="top" ><p>“samAddress":</p></td>
</tr>

<tr>
<td valign="bottom" ><p>CAGE/NCAGE Code</p></td>
<td valign="top" ><p>The Contractor and Government Entity (CAGE) Code or NATO Commercial and Government Entity (NCAGE) Code. This number is assigned to the registration if one does not already exist.</p></td>
<td valign="top" ><p>"cage":</p></td>
</tr>

<tr>
<td valign="bottom" ><p>DODAAC</p></td>
<td valign="top" ><p>The Department of Defense Activity Address Code (DoDAAC). This is applicable for the Department of Defense (DoD) entities only.</p></td>
<td valign="top" ><p>“dodaac”:</p></td>
</tr>

<tr>
<td valign="bottom" ><p>Delinquent Federal Debt Indicator</p></td>
<td valign="top" ><p>True or False value based on whether the Department of Treasury has indicated the entity has Delinquent Federal Debt or not.</p></td>
<td valign="top" ><p>"hasDelinquentFederalDebt":</p></td>
</tr>

</tbody>
</table>


**The JSON result will return as follows:**

<pre>
{"results":[
  { "hasKnownExclusion":false,
    "samAddress": 
       { "zip": "12345",
         "zip4": "3800",
         "stateOrProvince": "IL",
         "line1": "1234 M St",
         "city": "Chicago","country":"USA"},
    "expirationDate":"2015-03-24 13:56:45.000",
    "status":"Active",
    "hasDelinquentFederalDebt":false,
    "duns":"123456789",
    "links":[
       { "rel":"details",
         "href":"http://api.data.gov/samdata/v1/registrations/1234567890000"}],
    "dunsPlus4":"0000",
    "legalBusinessName":"Sample Company LLC",
    "cage":"12345"}],
    "links":[
       { "rel" : "self",
         "href": "http://api.data.gov/samsearch/v1/registrations?qterms=123456789&start=1&length=10"}]}
</pre>

**Pagination**

The results will be defaulted to 10 records per JSON page. An API developer can navigate between pages by using the Self, Previous, First, and Next links (as appropriate depending on the number of records) at the end of each page.

<pre>
"links":[
  {"rel": "self",
   "href":"http://api.data.gov/samsearch/v1/registrations?qterms=gsa&start=11&length=10"},
  {"rel": "prev",
   "href": "http://api.data.gov/samsearch/v1/registrations?qterms=gsa&start=1&length=10"},
  {"rel": "first",
   "href": "http://api.data.gov/samsearch/v1/registrations?qterms=gsa&start=1&length=10"},
  {"rel": "next",
   "href": "http://api.data.gov/samsearch/v1/registrations?qterms=gsa&start=21&length=10"}
</pre>

An API developer can change the number of records returned per page by manipulating the start and length parameters at the end of the API search URL like so:

* [http://api.data.gov/samsearch/v1/registrations?qterms=gsa&start=1&length=25](http://api.data.gov/samsearch/v1/registrations?qterms=gsa&start=1&length=25)  
* 

The maximium page size is 500. If more than 500 entities are requested, the API will only return 500 per page without error.

**Connecting Search Fields**

Plus signs '+’ should be used as spaces between terms. ‘+AND+’ and ‘+OR+’ are always used to join two terms like a boolean AND and OR.

* [https://api.data.gov/samsearch/v1/registrations?qterms=legalBusinessName:University+of+Pongo](https://api.data.gov/samsearch/v1/registrations?qterms=legalBusinessName:University+of+Pongo)  
* [https://api.data.gov/samsearch/v1/registrations?qterms=disasterResponse:true+AND+samAddress.stateOrProvince:CO](https://api.data.gov/samsearch/v1/registrations?qterms=disasterResponse:true+AND+samAddress.stateOrProvince:CO)  
* [https://api.data.gov/samsearch/v1/registrations?qterms=naicsAnySize:111411+AND+samAddress.stateOrProvince:XY+AND+legalBusinessName:Test+AND+minorityOwned:true](https://api.data.gov/samsearch/v1/registrations?qterms=naicsAnySize:111411+AND+samAddress.stateOrProvince:XY+AND+legalBusinessName:Test+AND+minorityOwned:true)  

If your search term contains the word(s) ‘and’ or ‘or’, you must not capitalize it.

Example:

* [https://api.data.gov/samsearch/v1/registrations?qterms=legalBusinessName:Snow or Sleet Removal Company](https://api.data.gov/samsearch/v1/registrations?qterms=legalBusinessName:Snow or Sleet Removal Company)  
* [https://api.data.gov/samsearch/v1/registrations?qterms=legalBusinessName:Rain or Shine Rentals](https://api.data.gov/samsearch/v1/registrations?qterms=legalBusinessName:Rain or Shine Rentals)  

##### Grouping Search Terms

Terms can be grouped against the same API advanced search field by using commas between each term.

Examples:

* [https://api.data.gov/samsearch/v1/registrations?qterms=samAddress.zip:(11111,22222,33333)](https://api.data.gov/samsearch/v1/registrations?qterms=samAddress.zip:(11111,22222,33333))  
* [https://api.data.gov/samsearch/v1/registrations?qterms=congressionalDistrict:(AK-00,AS-98,AZ-06)](https://api.data.gov/samsearch/v1/registrations?qterms=congressionalDistrict:(AK-00,AS-98,AZ-06))  
* [https://test.sam.gov/samsearch/v1/registrations?qterms=womanOwned:true+AND+naicsLimitedSB:(111333,111991,111331)](https://test.sam.gov/samsearch/v1/registrations?qterms=womanOwned:true+AND+naicsLimitedSB:(111333,111991,111331))  

Note: For terms having the first character as alpha, you must insert a + symbol after each comma (exception is samAddress.country).

Examples:

* [https://test.sam.gov/samsearch/v1/registrations?qterms=legalBusinessName:(wood,+moore,+general,+temme,+whitney)]()
* [https://test.sam.gov/samsearch/v1/registrations?qterms=samAddress.city:(Moscow,+Oslo,+Geneva)]()
* [https://test.sam.gov/samsearch/v1/registrations?qterms=naicsAnySize:(111332,336413)+AND+samAddress.city:(Napa,+Loire)]()

Exception: 
  
* [https://test.sam.gov/samsearch/v1/registrations?qterms=samAddress.country:(ALB,BLZ,CHL)](https://test.sam.gov/samsearch/v1/registrations?qterms=samAddress.country:(ALB,BLZ,CHL))


##### TIPS/HINTS

There are certain tips to note in order to construct an API search URL properly. We have listed several below. If you discover others as you work with our API, please add them to the ‘Feedback’ section of this GitHub site.

1) Any query terms with special characters must include double quotes: q= “ZY’Z”
	Note:  %26 can be used for ampersand ‘&’

2) Commas must be omitted from search terms

3) Boolean based search fields must be grouped together at the front of a URL:

Note: If your search includes 'Disaster Response Contractor', the disasterResponse search field must be the last Boolean search field in the group  
  
Example: qterms=womanOwnedBusiness:true+AND+sba8AProgram:
true+AND+disasterResponse:true+AND+legalBusinessName:cats

4) There should only be one space (‘+’) between each term and in between “AND” and “OR”

5) Quick Search does not allow grouping

6) When grouping Legal Business Name and Country in an advanced search, the term legalBusinessName must come before samAddress.country.

Example:

* [https://test.sam.gov/samsearch/v1/registrations?qterms=legalBusinessName:technology+OR+samAddress.country:XYZ](https://test.sam.gov/samsearch/v1/registrations?qterms=legalBusinessName:technology+OR+samAddress.country:XYZ)
