# Talentql Nodejs Assessment
---

## Setup the project:

1. Clone the repo
``` bash
git clone https://github.com/giseleiradu/talentql-nodejs-assessment.git
cd talentql-nodejs-assessment
```
2. `yarn install` or `npm install` for dependency to set
3. `yarn start` to trigger all the migrations and the seeders and start the application

## Running the tests


```bash
npm test

```

## Built With

- [Nodejs](https://nodejs.org/en/) - "An open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser."

- [Express](https://expressjs.com/) - "A back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs."

- [Mocha](https://mochajs.org/) - "A JavaScript test framework for Node.js programs, featuring browser support, asynchronous testing, test coverage reports, and use of any assertion library"


## Other status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

404 for Not found requests, when a resource can't be found to fulfill the request

## API Spec

The preferred JSON object to be returned by the API should be structured as follows:

### Users (for authentication)

 #### SignUp

```source-json
{
    "status": 201,
    "message": "successfully registered",
    "newUser": {
        "id": 4,
        "username": "umuturage",
        "email": "example@gmail.com",
        "isLoggedIn": false,
        "updatedAt": "2021-05-17T11:08:16.530Z",
        "createdAt": "2021-05-17T11:08:16.530Z"
    }
}
```
#### SignIn

```source-json
{
    "status": 201,
    "message": "successfully logged in",
    "user": {
        "id": 1,
        "username": "umuturage",
        "email": "girad4@gmail.com",
        "isLoggedIn": true,
        "createdAt": "2021-05-17T09:03:03.161Z",
        "updatedAt": "2021-05-17T09:16:22.812Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnaXJhZDRAZ21haWwuY29tIiwiaWF0IjoxNjIxMjQ5NzkyLCJleHAiOjE2MjE1MDg5OTJ9.CVEamXQqnPUjwIHyjSseJusS4OVEEo-20CA9iw9vxVk"
}
```
#### SignOut

```source-json
{
    "status": 205,
    "message": "Successfully signed out."
}
```

### Single Post

#### Posting

```source-json
{
    "status": 201,
    "data": {
        "post": {
            "liked": false,
            "likeCounts": 0,
            "id": 2,
            "title": "iyi noneho ni iyakabiri",
            "description": "biriko biraza!",
            "body": "burya uzamenye unamenyere! twatangiye natwe ubwau tutabyumva, ariko se nanone, ni inde wari uzi ibibintu!",
            "userId": 1,
            "slug": "iyi-noneho-ni-iyakabiri-529419794",
            "updatedAt": "2021-05-17T11:13:03.161Z",
            "createdAt": "2021-05-17T11:13:03.161Z",
            "images": null
        }
    }
}
```
#### View Post

```source-json
{
    "status": 200,
    "data": {
        "result": {
            "id": 1,
            "slug": "iyi-noneho-ni-iyakabiri-856652293",
            "title": "iyi noneho ni iyakabiri",
            "description": "biriko biraza!",
            "body": "burya uzamenye unamenyere! twatangiye natwe ubwau tutabyumva, ariko se nanone, ni inde wari uzi ibibintu!",
            "images": null,
            "userId": 1,
            "liked": false,
            "likeCounts": 0,
            "createdAt": "2021-05-17T09:03:22.427Z",
            "updatedAt": "2021-05-17T09:03:22.427Z",
            "User": {
                "username": "umuturage1",
                "email": "girad4@gmail.com"
            }
        }
    }
}
```
#### Delete a Post

``` source-json
{
    "status": 200,
    "message": "Post successfully deleted"
}
```

#### Update a Post

``` source-json
{
    "status": 200,
    "data": {
        "post": {
            "id": 2,
            "slug": "iyi-noneho-ni-iyakabiri-529419794",
            "title": "Second Post",
            "description": "I am new to this but what's worse!",
            "body": "if you don't try it, you won't know it! I am new to posting but I am live now, I should post anyway!",
            "images": null,
            "userId": 1,
            "liked": false,
            "likeCounts": 0,
            "createdAt": "2021-05-17T11:13:03.161Z",
            "updatedAt": "2021-05-17T11:34:19.368Z"
        }
    }
}
```

#### Like a Post

``` source-json
{
    "status": 200,
    "message": "You have successfully liked the post"
}
```
#### Undo the Post Like

``` source-json
{
    "status": 200,
    "message": "You have successfully unliked the post"
}
```

#### Comment on a Post

``` source-json
{
    "status": 201,
    "data": {
        "comment": {
            "liked": false,
            "likeCounts": 0,
            "id": 3,
            "body": "Ni ibi ndabindi",
            "userId": 1,
            "postId": 2,
            "updatedAt": "2021-05-17T11:36:28.874Z",
            "createdAt": "2021-05-17T11:36:28.874Z"
        }
    }
}
```

#### Uncomment on a Post

``` source-json
{
    "status": 200,
    "message": "Comment successfully deleted"
}
```

#### Edit an Unexisting Comment

``` source-json
{
    "status": 404,
    "message": "Comment not found"
}
```

#### Get all Comments of a Post

``` source-json
{
    "status": 200,
    "data": {
        "comments": [
            {
                "body": "Ni ibi ndabindi",
                "createdAt": "2021-05-17T11:36:28.874Z",
                "updatedAt": "2021-05-17T11:36:28.874Z",
                "liked": false,
                "likeCounts": 0,
                "id": 3,
                "User": {
                    "username": "umuturage1"
                }
            }
        ],
        "commentsCount": 1
    }
}
```

#### Like a Comment
``` source-json
{
    "status": 200,
    "data": {
        "comment": {
            "id": 3,
            "body": "Ni ibi ndabindi",
            "userId": 1,
            "postId": 2,
            "liked": true,
            "likeCounts": 1,
            "createdAt": "2021-05-17T11:36:28.874Z",
            "updatedAt": "2021-05-17T11:40:28.023Z"
        }
    }
}
```


### All Posts

#### View All Posts

```source-json
{
    "status": 200,
    "data": {
        "posts": [
            {
                "id": 2,
                "slug": "iyi-noneho-ni-iyakabiri-529419794",
                "title": "iyi noneho ni iyakabiri",
                "description": "biriko biraza!",
                "body": "burya uzamenye unamenyere! twatangiye natwe ubwau tutabyumva, ariko se nanone, ni inde wari uzi ibibintu!",
                "images": null,
                "userId": 1,
                "liked": false,
                "likeCounts": 0,
                "createdAt": "2021-05-17T11:13:03.161Z",
                "updatedAt": "2021-05-17T11:13:03.161Z",
                "User": {
                    "username": "umuturage1",
                    "email": "girad4@gmail.com"
                }
            },
            {
                "id": 1,
                "slug": "iyi-noneho-ni-iyakabiri-856652293",
                "title": "iyi noneho ni iyakabiri",
                "description": "biriko biraza!",
                "body": "burya uzamenye unamenyere! twatangiye natwe ubwau tutabyumva, ariko se nanone, ni inde wari uzi ibibintu!",
                "images": null,
                "userId": 1,
                "liked": false,
                "likeCounts": 0,
                "createdAt": "2021-05-17T09:03:22.427Z",
                "updatedAt": "2021-05-17T09:03:22.427Z",
                "User": {
                    "username": "umuturage1",
                    "email": "girad4@gmail.com"
                }
            }
        ],
        "postsCount": 2
    }
}
```
#### View All Posts Belonging to One User

```source-json
{
    "status": 200,
    "data": {
        "posts": [
            {
                "id": 2,
                "slug": "iyi-noneho-ni-iyakabiri-529419794",
                "title": "iyi noneho ni iyakabiri",
                "description": "biriko biraza!",
                "body": "burya uzamenye unamenyere! twatangiye natwe ubwau tutabyumva, ariko se nanone, ni inde wari uzi ibibintu!",
                "images": null,
                "userId": 1,
                "liked": false,
                "likeCounts": 0,
                "createdAt": "2021-05-17T11:13:03.161Z",
                "updatedAt": "2021-05-17T11:13:03.161Z",
                "User": {
                    "username": "umuturage1",
                    "email": "girad4@gmail.com"
                }
            },
            {
                "id": 1,
                "slug": "iyi-noneho-ni-iyakabiri-856652293",
                "title": "iyi noneho ni iyakabiri",
                "description": "biriko biraza!",
                "body": "burya uzamenye unamenyere! twatangiye natwe ubwau tutabyumva, ariko se nanone, ni inde wari uzi ibibintu!",
                "images": null,
                "userId": 1,
                "liked": false,
                "likeCounts": 0,
                "createdAt": "2021-05-17T09:03:22.427Z",
                "updatedAt": "2021-05-17T09:03:22.427Z",
                "User": {
                    "username": "umuturage1",
                    "email": "girad4@gmail.com"
                }
            }
        ],
        "postsCount": 2
    }
}
```



## EndPoints

### Authentication:


#### Registration

`POST /api/v1/auth/signup`

```source-json
{
    "email": "example@gmail.com",
    "username": "umuturage",
    "password": "1234"
}
```

No authentication required, returns a User

Required fields: `email`, `username`, `password`


#### Login

`POST /api/v1/auth/signin`

```source-json
{
    "email": "example@gmail.com",
    "password": "1234"
}
```

No authentication required, returns a User

Required fields: `email`, `password`

#### SignOut

`DELETE /api/v1/auth/signout`

Authentication required, returns a success message

Required fields: none

### Posts

#### Post

`POST api/v1/post`

```source-json
{
    "post":{
        "title": "iyi noneho ni iyakabiri",
        "description": "biriko biraza!",
        "body":"burya uzamenye unamenyere! twatangiye natwe ubwau tutabyumva, ariko se nanone, ni inde wari uzi ibibintu!"

    }

}
```
Authentication required, returns a Post

Required fields: `title`, `description`, `body`

#### Get a Post

`GET api/v1/post/:slug`

No authentication required, returns a Post

Required fields: none

#### Get User's Posts

`GET api/v1/post/:username/private`

No authentication required, returns a user's Posts

Required fields: none

#### Get All Posts

`GET api/v1/post/all_posts`

No authentication required, returns Posts

Required fields: none

#### Delete a Post

`DELETE api/v1/post/:slug`

Authentication required, returns a successful message

Required fields: none

#### Update a Post

`PUT api/v1/post/:slug`

```source-json
{
    "post":{
        "title": "iyi noneho ni iyakabiri",
        "description": "biriko biraza!",
        "body":"burya uzamenye unamenyere! twatangiye natwe ubwau tutabyumva, ariko se nanone, ni inde wari uzi ibibintu!"

    }

}
```
Authentication required, returns a Post

Required fields: none, what you give is what changes

#### Like a Post

`POST api/v1/post/:slug/like`

Authentication required, returns a successful message

Required fields: none

#### Unlike a Post

`DELETE api/v1/post/:slug/like`

Authentication required, returns a successful message

Required fields: none

#### Comment/Relpy to a Post

`POST api/v1/post/:slug/comment`

```source-json
{
    "comment":{
        "body": "Ni ibi ndabindi"
    }
}
```
Authentication required, returns Comment

Required fields: `body`

#### Uncomment/Undo a relpy to a Post

`DELETE api/v1/post/:slug/comment`

Authentication required, returns a successful message

Required fields: none

#### Get all Comments

`GET api/v1/post/:slug/comment`

No authentication required, returns Comments

Required fields: none

#### Delete a Comment

`DELETE api/v1/post/:slug/comment/:id`

Authentication required, returns a successful message

Required fields: none

#### Edit a Comment

`PUT api/v1/post/:slug/comment/:id`

``` source-json
{
    "comment":{
        "body": "Ntakundi"
    }
}
```
Authentication required, returns an updated Comment

Required fields: `body`

#### Like a Comment

`POST api/v1/post/:slug/comment/:id/like`

Authentication required, returns a successful message

Required fields: none

#### Unlike a Comment

`DELETE api/v1/post/:slug/comment/:id/like`

Authentication required, returns a successful message

Required fields: none
