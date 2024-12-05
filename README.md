# Builder.io and Cloudflare Worker Intergration
A Cloudflare Worker for easily integrating the Builder.io CMS system into a any website by replacing a string token {{builderio}} in the response..

A Fetch to the matching builderIO page content is made and the combined response is then returned to the user. 

Additional features to be added will include 
- CF caching for Builder.io requests
- Different stategies for handling multiple occaranges of the {{builderio}} string in the response

## Installation

### Create Worker
Create a new Cloudflare Worker on the CF Account level

![Screenshot of the Cloudflare Variables and Secrets screen.](https://www.develodesign.co.uk/images/builderio/builderio-create-cloudflareworker.png)




### Worker Code
Add the content from this respositories [Builderio-CF-Worker.js](Builderio-CF-Worker.js)
 as the new Worker's script.
![Screenshot of the Cloudflare Worker Screenshot.](https://www.develodesign.co.uk/images/builderio/worker.png)



### API Key
In the worker's Settings add a new "Variables and Secrets" value for BUILDER_API_KEY = YOUR_BUILDER_IO_API_KEY_HERE

![Screenshot of the Cloudflare Variables and Secrets screen.](https://www.develodesign.co.uk/images/builderio/builderio-cloudflare-secrets.png)

### Create a new Web worker route to your new Worker
Inside of a Cloudflare enabled domain add a new Worker Route to your new worker script

![Screenshot of the Cloudflare  new Worker Route screen.](https://www.develodesign.co.uk/images/builderio/cloudflare-worker-routes.png)


## Setup BuilderIO 
Create a Page Content in Builder.io with the same URL as passed from your worker URL param. *Ensure you Publish the page*

![Screenshot of the Cloudflare  new Worker Route screen.](https://www.develodesign.co.uk/images/builderio/builder-io-content-page.png)


## Your Website 
Create a page on your website with a matching URL that is entered in the static url field or follows the same structure as the dynamic URL path e.g /io/* if not using static URLs.

![Screenshot Creating a CMS page with the placeholder and matching urln.](https://www.develodesign.co.uk/images/builderio/magento-builder-io.png)


## Chrome Browser Plugin
To use the Builder.io Preview functionality install the Chrome Browser plugin or fix the CSP/Cores headers to allow builder.io domain as a iframe parent

[Builderio-Chrome-Browser-extension](https://www.builder.io/c/docs/chrome-extension)

### Vistit the Page on your website that has the {{builderio}} plalceholdler string and it should be replaced with your dynamic Builder.io content.

## Example
Here's the final result, full Edge Side rendering which is great for users and SEO
[https://builderio.develo.design/builderio-page](https://builderio.develo.design/builderio-page)

