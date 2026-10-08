# WhatToWatch

WhatToWatch is a movie and TV show database application that helps users discover movies and shows, view detailed information about them, write reviews, and organize what they want to watch.

The application uses the TMDB API to retrieve movie and TV show information such as titles, posters, ratings, genres, descriptions, release dates, and other related details.

Users can also sign in using OAuth authentication, allowing them to have their own account and access personalized features such as reviews and watchlists.

> # Currently Under Development...

## Features

- Movie & TV Show Database
  - Browse movies and TV shows
  - View detailed information about each title
  - View posters, ratings, genres, release information, and descriptions
- Search
  - Search for movies and TV shows using the TMDB API
  - Find titles and view their complete details
- User Authentication
  - Sign in using OAuth
  - Securely authenticate users without requiring them to create another password
- Reviews
  - Authenticated users can write reviews for movies and TV shows
  - View reviews associated with titles
- Watchlist Groups
  - Create personalized watchlist groups
  - Organize movies and shows based on how the user wants to categorize them
  - Add titles to different watchlist groups
- Detailed Media Pages
  - View additional information about individual movies and TV shows
  - Display information retrieved from TMDB
- Technologies Used
  - Frontend: HTML/CSS | JavaScript | React
  - Database: Supabase
  - Authentication: OAuth
  - Movie & TV Data: TMDB API
  - Styling: CSS

---

## TMDB API

**WhatToWatch** uses The Movie Database (TMDB) API to retrieve movie and TV show data. TMDB provides API endpoints for searching, discovering, and retrieving detailed information about movies and TV shows.

The application uses this data to provide users with information about the titles available through the application.

For more information, visit the [TMDB API Documentation](https://developer.themoviedb.org/docs/getting-started).

> # Disclaimer: This product uses the TMDB API but is not endorsed or certified by TMDB.

## Authentication

WhatToWatch uses OAuth to allow users to authenticate their accounts.

Once authenticated, users can access features that require an account, such as:

- Writing reviews
- Creating watchlist groups
- Managing their personal watchlists
- Managing their personalized content
- Watchlist Groups

Instead of having one large watchlist, WhatToWatch allows users to organize their saved movies and shows into custom watchlist groups.

For example, a user could create groups such as:

- Movies to Watch
- TV Shows to Watch
- Favorites
- Weekend Movies
- Watch Later

This makes it easier for users to organize and keep track of the content they are interested in.

# Getting Started

1. Clone the repository
   git clone https://github.com/ManuelDeVilla/WhatToWatch.git
   cd whattowatch
2. Install dependencies
   npm install

3. Configure environment variables

Note: Please see the .env.example for sample of environment variables
The exact environment variables may differ depending on the project's implementation.

4. Start the development server
   npm run dev

The application should then be available at the local development address provided by your framework.

## Project Goals

The main goal of WhatToWatch is to create a centralized platform where users can:

- Discover movies and TV shows.
- Learn more about titles they are interested in.
- Share their opinions through reviews.
- Create personalized watchlists.
- Organize their watchlists into custom groups.

The project also serves as a practical implementation of API integration, OAuth authentication, database management, and user-specific application features.

## Future Improvements

Potential improvements for the project include:

- Personalized movie recommendations
- Advanced filtering and sorting
- Social features for following other users
- User profiles
- Like/upvote functionality for reviews
- Movie and TV show ratings from users
- Watch history
- Streaming availability information
- Improved mobile responsiveness

> This project is for educational and/or personal use.
>
> Movie and TV show data and images are provided by TMDB. Please refer to TMDB's API terms and attribution requirements when using the project. TMDB states that non-commercial API use is available with attribution, and applications using the API must include the required TMDB attribution notice.
