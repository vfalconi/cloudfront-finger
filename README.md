# cloudfront-finger
A small CloudFront function that returns a Mastodon webfinger response. I use this to point a handle on my own domain to my real Mastodon handle.

To finish setting up this function, you'll need the URL to your Mastodon account's webfinger. There's an explanation in `index.js`.

Background: https://tattooed.dev/wrote/using-cloudfront-to-host-your-mastodon-handle-on-your-own-domain/
