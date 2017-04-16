An app to learn React with nodejs. In this app I'm acessing [500px's API](https://github.com/500px/api-documentation). [500px](500px.com) is a place where professional photographers share and sell their work.

Some of the 500px's API require oauth authentication. I'm using the awesome [grant](https://github.com/simov/grant) express middleware to get oauth tokens. To create authenticated requests using the tokens obtained via grant, I'm using another nice library [purest](https://github.com/purestjs) by the same author [simov](https://simov.github.io/).

The app has following features
* view popular images on 500px
* login and view your favorited images on 500px
* add images to your favorites list
