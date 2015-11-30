<sos> is a location-based help app for programmers. Post an SOS request, and a nearby programmer will swoop in on feathery, axe-scented wings to help you in your distress. SOS requests can be tagged with "skills" such as jQuery, Ruby, or MySQL, so as to match up a crisis with the right neck-bearded savior.

Default user accounts (@foo.com):

dillon
john
dinah
finn

Todo:

* BUG: adding a comment re-calls the whole Index API, so comment view collapses instead of staying open. Fix by taking the returned JSON and appending it to the DOM without refreshing the whole API.

* need to style your two static pages (login and signup)

* Add reverse geocoding for request location display field https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding

* Remove skip authenticity_token

* Switch from local to CDN versions of various frameworks.

* Minify all JS

* Remove legacy ERB routes

* stretch goal: enable file upload with S3
