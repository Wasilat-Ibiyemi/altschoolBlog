# **Blog Api**
## __An Api for blog application__

## Requirements
___

- ### User should be able to sign up
- ### User should be able to and sign in to the blog app with passport authentication strategy token which expires after 1 hour
- ### Users should have a first_name, last_name, email, password when signing up and - email and password to sign in
- ### Logged in and not logged in users should be able to get a list of published blogs created
- ### Logged in and not logged in users should be able to to get a published blog
- ### A blog can be in two states; draft and published
- ### Logged in users should be able to create a blog.
- ### When a blog is created, it is in draft state
- ### The owner of the blog should be able to update the state of the blog to published
- ### The owner of a blog should be able to edit the blog in draft or published state
- ### The owner of the blog should be able to delete the blog in draft or published state
- ### The owner of the blog should be able to get a list of their blogs.
- ### It should be filterable by state
- ### Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
- ### The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, default it to 20 blogs per page.
- ### It is also searchable by author, title and tags.
- ### It is also orderable by read_count, reading_time and timestamp
- ### When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1

# Setup
___
#### Install Nodejs Moongodb Pull this repo run npm install update env with yours run npm start

# Base URL

#### localhost:process.env.PORT