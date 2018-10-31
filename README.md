# matchday-messiah

Twitter feed for Premier League fixtures.

## Description

Twitter feed for Premier League fixtures. The full list of fixtures returned from a GET request are iterated through, with the next round of fixtures and a hashtag generated from the backend returned to the client, previous and future fixtures are discarded. When a user clicks on a fixture, a Twitter API call is made using OAuth, passing the hashtag from the request parameters defined in the URL as a search variable. The results are returned to the client where the DOM is updated with tweets of fans talking about that fixture.

## Prerequisites

`.env` Consumer Key and Application Secret for Twitter API

## Getting Started

    $ git clone https://github.com/C87/matchday-messiah.git
    $ cd matchday-messiah
    $ npm install

## License

This project is licensed under the [MIT License](https://github.com/C87/matchday-messiah/blob/master/LICENSE)
