**Users V1**
----

**list users**

`GET supportapi/v1/users`

  Returns the list of users 

* **URL**

  `/users`

* **Method:**

  `GET`


*  **URL Params**

    None
    
*  **Filters**  
    * `offset=[integer]` For pagination, specifies the offset of the first resource to return.<br />
  Default:0
    * `limit=[integer]` For pagination, specifies amount of resources to return. <br />
    Default:5 Max:100
    * `fields=[array]` Specifies the fields to return. The value is a comma sepparated set of fields.<br />
    All fields by default.
     

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **body:** <br />
  ```json
     [ [array]
      { [object]user
        "id": [integer]user-id ,
        "email": [string]email ,
        "name": [string],
        "last-name": [string],
        "active": [boolean],
        "admin": [boolean],
        "created": {
          "by": [integer]user-id,
          "on": [integer]timestamp
        },
        "modified": {
          "by": [integer]user-id,
          "on": [integer]timestamp
        },
        "tickets" : [integer]
      }
    ]
  ```
  **headers:** <br />
  ```json
     X-Total-Count:[integer] The total of users retrieved
  ```   
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Body:** <br />
    ```json
    [ 
      { 
      "user-message":"Please login to use this resource",
      "internal-message":"User is not logged in",
      "code":1
      }
    ]
  	```   

  OR

  * **Code:** 403 Forbidden <br />
    **Body:** <br />
     ```json
        [
          {
            "user-message": "You are not authorized to view this resource",
            "internal-message": "User is not an admin user",
            "code": 2
          }
        ]
      ```
  OR

  * **Code:** 400 – Bad Request <br />
    **Body:** <br />
    ```json
    [
      {
        "user-message": "Exceeded the max limit of rows",
        "internal-message": "Query Exceeded the limit's max",
        "code": 3
      },
      {
        "user-message": "Unidentified field queried",
        "internal-message": "Field requested does not exists",
        "code": 4
      }
    ]
  	```  

* **Notes:**

	* The result list is sorted according to the last name.

* **Sample Calls and Responses:**
  ```json
  GET supportapi/v1/users
    
    [
      {
        "id": 1,
        "email": "druiz@alertlogic.com",
        "name": "Diego",
        "last-name": "Ruiz",
        "active": 1,
        "admin": 1,
        "created": {
          "by": 1,
          "on": 1446996631
        },
        "modified": {
          "by": 1,
          "on": 1446926631
        },
        "tickets": 100
      },
      {
        "id": 2,
        "email": "jmondragon@alertlogic.com",
        "name": "Julian",
        "last-name": "Mondragon",
        "active": 0,
        "admin": 0,
        "created": {
          "by": 1,
          "on": 1446996631
        },
        "modified": {
          "by": 1,
          "on": 1446926631
        },
        "tickets": 2
      }
    ]
  ```
  
    ```json
    GET supportapi/v1/users?limit=2&offset=1
    
     [
      {
        "id": 1,
        "email": "druiz@alertlogic.com",
        "name": "Diego",
        "last-name": "Ruiz",
        "active": 1,
        "admin": 1,
        "created": {
          "by": 1,
          "on": 1446996631
        },
        "modified": {
          "by": 1,
          "on": 1446926631
        },
        "tickets": 3
      }
    ]
  ```
    ```json
    GET supportapi/v1/users?fields=id,name,last-name

    [
      {
        "id": 1,
        "name": "Diego",
        "last-name": "Ruiz",
      }
    ]
  ```

----

**show user**

`GET supportapi/v1/users/<user-id>`

  Returns user information. 

* **URL**

  `/users/<user-id>`

* **Method:**

  `GET`


*  **URL Params**

    `<user-id>: [integer] user-id` **REQUIRED**
    
*  **Filters**  
    * `fields=[array]` Specifies the fields to return. The value is a comma sepparated set of fields.<br />
    All fields by default.
     

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **body:** <br />
  ```json
    { [object]user
          "id": [integer]user-id ,
          "email": [string]email ,
          "name": [string],
          "last-name": [string],
          "active": [boolean],
          "admin": [boolean],
          "created": {
              "by": [integer]user-id,
              "on": [integer]timestamp
          },
          "modified": {
              "by": [integer]user-id,
              "on": [integer]timestamp
          },
          "last-open-tickets": 
          [ [array]
              {   [object]ticket
                  "id": [integer] ticket-id,
                  "title": [string]

              } 
          ]    
    }
  ```

* **Notes:**

  The param last-open-tickets is an array of max size 3


* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Body:** <br />
    ```json
    [ 
      { 
      "user-message":"Please login to use this resource",
      "internal-message":"User is not logged in",
      "code":1
      }
    ]
  	```   

  OR

  * **Code:** 403 Forbidden <br />
    **Body:** <br />
    ```json
    [
      {
        "user-message": "You are not authorized to view this resource",
        "internal-message": "User is not an admin user",
        "code": 2
      }
    ]
  	```
  OR

  * **Code:** 400 – Bad Request <br />
    **Body:** <br />
    ```json
    [
      {
        "user-message": "The parameter you provided is not valid",
        "internal-message": "Parameter <user-id> is not valid",
        "code": 3
      },
      {
        "user-message": "Unidentified field queried",
        "internal-message": "Field requested does not exists",
        "code": 4
      }
    ]
  	``` 
  OR
 
  * **Code:** 404 – Not Found <br />
    **Body:** <br />
    ```json
    [
      {
        "user-message": "The user you are requesting does not exist",
        "internal-message": "User with id <user-id> not found",
        "code": 5
      }
    ]
  	```
* **Notes:**

	* Admin user can request any `<user-id>`, however not admin user can request only your `<user-id>`
	

* **Sample Calls and Responses:**
  ```json
  GET supportapi/v1/users/1

      {
          "id": 1,
          "email": "druiz@alertlogic.com",
          "name": "Diego",
          "last-name": "Ruiz",
          "active": 1,
          "admin": 1,
          "created": {
            "by": 1,
            "on": 1446996631
          },
          "modified": {
            "by": 1,
            "on": 1446926631
          }
          "last-open-tickets":
          [
              {
                  "id": 1,
                  "title": "My little title"
              },
              {
                  "id": 2,
                  "title": "Support at backend"
              },
              {
                  "id": 3,
                  "title": "Bad request in messages query"
              }
          ]
      }
  ```
    
    ```json
    GET supportapi/v1/users/1/?fields=id,name,last-name

      {
          "id": 1,
          "name": "Diego",
          "last-name": "Ruiz"
          "last-open-tickets":
          [
              {
                  "id": 1,
                  "title": "My little title"
              },
              {
                  "id": 2,
                  "title": "Support at backend"
              },
              {
                  "id": 3,
                  "title": "Bad request in messages query"
              }
          ]
      }
  ```

----

**add user**

`POST supportapi/v1/users`

  Create a new user

* **URL**

  `/users`

* **Method:**

  `POST`


*  **URL Params**

  	None
    
*  **Filters**  
    
    None
     

* **Data Params [payload]**

  ```json
    { [object]user
      "email": [string]email REQUIRED,
      "name": [string] REQUIRED,
      "last-name": [string] REQUIRED,
      "active": [boolean],
      "admin": [boolean],
    }
  ```

* **Notes:**

  * Active is 1 as default.
    
  * Admin is 0 as default.

* **Success Response:**

  * **Code:** 201 <br />
    **body:** <br />
  ```json
    { [object]user
      "id": [integer]user-id ,
      "email": [string]email ,
      "name": [string],
      "last-name": [string],
      "active": [boolean],
      "admin": [boolean],
      "created": {
        "by": [integer]user-id,
        "on": [integer]timestamp
      },
      "modified": {
        "by": [integer]user-id,
        "on": [integer]timestamp
      }
    }
  ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Body:** <br />
    ```json
    [ 
      { 
      "user-message":"Please login to use this resource",
      "internal-message":"User is not logged in",
      "code":1
      }
    ]
  	```   

  OR

  * **Code:** 403 Forbidden <br />
    **Body:** <br />
    ```json
    [
      {
        "user-message": "You are not authorized to use this resource",
        "internal-message": "User is not an admin user",
        "code": 2
      }
    ]
  	```
  OR

  * **Code:** 400 – Bad Request <br />
    **Body:** <br />
    ```json
    [
      {
        "user-message": "The data you provided is not valid",
        "internal-message": "Payload is not valid JSON",
        "code": 3
      }
    ]
  	``` 
  OR
 
  * **Code:** 422 – Unprocessable Entity <br />
    **Body:** <br />
    ```json
    [
      {
        "user-message": "The parameter you send is incomplete",
        "internal-message": "Missing required fields",
        "code": 4
      }
    ]
  	```

* **Sample Calls and Responses:**
  ```json
  POST supportapi/v1/users
    payload:
      {
        "email": "druiz@alertlogic.com",
        "name": "Diego",
        "last-name": "Ruiz",
        "active": 1,
        "admin": 1,
      }
    response:
    {
        "id": 2,
        "email": "druiz@alertlogic.com",
        "name": "Diego",
        "last-name": "Ruiz",
        "active": 1,
        "admin": 1,
        "created": {
          "by": 1,
          "on": 1446996631
        },
        "modified": {
          "by": 1,
          "on": 1446996631
        }
      }
  ```
    
  ```json
  POST supportapi/v1/users
    payload:
    {
      "email": "mruiz@alertlogic.com",
      "name": "Mario",
      "last-name": "Ruiz",
    }
    response:
    {
      "id": 3,
      "email": "mruiz@alertlogic.com",
      "name": "Mario",
      "last-name": "Ruiz",
      "active": 1,
      "admin": 0,
      "created": {
        "by": 2,
        "on": 1446996631
      },
      "modified": {
        "by": 1,
        "on": 1446996631
      }
    }
  ```

----

**delete user**

`DELETE supportapi/v1/users/<user-id>`

  Delete a user

* **URL**

	`/users/<user-id>`

* **Method:**

  `DELETE`


*  **URL Params**

  	`<user-id>: [integer] user-id` **REQUIRED**
    
*  **Filters**  
    
    None
     

* **Data Params**

	None

* **Success Response:**

  * **Code:** 204 No Content <br />
    

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Body:** <br />
    ```json
    [ 
      { 
      "user-message":"Please login to use this resource",
      "internal-message":"User is not logged in",
      "code":1
      }
    ]
  	```   

  OR

  * **Code:** 403 Forbidden <br />
    **Body:** <br />
    ```json
    [
      {
        "user-message": "You are not authorized to use this resource",
        "internal-message": "User is not an admin user",
        "code": 2
      }
    ]
  	```
  OR

  * **Code:** 400 – Bad Request <br />
    **Body:** <br />
    ```json
    [
      {
        "user-message": "The parameter you provide is not valid",
        "internal-message": "Paramater <user-id> is not valid",
        "code": 3
      }
    ]
  	``` 
  OR
 
  * **Code:** 404 – Not Found <br />
    **Body:** <br />
    ```json
    [
      {
        "user-message": "The user you are requesting does not exist",
        "internal-message": "User with id <user-id> not fount",
        "code": 4
      }
    ]
  	```

* **Sample Calls and Responses:**
  ```json
  DELETE supportapi/v1/users/1
  
  No content
  ```

----

**list user tickets**

`GET supportapi/v1/users/<user-id>/tickets`

  List the user tickets

* **URL**

	`/users/<user-id>/tickets`

* **Method:**

  `GET`


*  **URL Params**

  	`<user-id>: [integer] user-id` **REQUIRED**
    
*  **Filters**  
    
  	* `offset=[integer]` For pagination, specifies the offset of the first resource to return.<br />
	Default:0
    * `limit=[integer]` For pagination, specifies amount of resources to return. <br />
    Default:5 Max:100
    * `fields=[array]` Specifies the fields to return. The value is a comma sepparated set of fields.<br />
    All fields by default.
     

* **Data Params**

	None
    
* **Success Response:**

  * **Code:** 200 <br />
    **body:** <br />
 	```json
     [ [array]
      { [object]ticket
        "id": [integer]ticket-id ,
        "title": [string] ,
        "summary": [string],
        "state": [boolean],
        "created": {
          "by": [integer]user-id,
          "on": [integer]timestamp
        },
        "modified": {
          "by": [integer]user-id,
          "on": [integer]timestamp
        },
        "total-messages": [integer]
      }
    ]
	```
 	**headers:** <br />
 	```json
     X-Total-Count:[integer] The total of tickets retrieved
	```  
    
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Body:** <br />
  	```json
    [ 
      { 
      "user-message":"Please login to use this resource",
      "internal-message":"User is not logged in",
      "code":1
      }
    ]
	```    
    
  OR
  
  * **Code:** 403 Forbidden <br />
    **Body:** <br />
    ```json
    [
      {
        "user-message": "You are not authorized to view this resource",
        "internal-message": "User is not an admin user",
        "code": 2
      }
    ]
  	```

  OR

  * **Code:** 400 – Bad Request <br />
    **Body:** <br />
  	```json
    [
      {
        "user-message": "Exceeded the max limit of rows",
        "internal-message": "Query Exceeded the limit's max",
        "code": 3
      },
      {
        "user-message": "Unidentified field queried",
        "internal-message": "Field requested does not exists",
        "code": 4
      },
      {
        "user-message": "The parameter you provide is not valid",
        "internal-message": "Paramater <user-id> is not valid",
        "code": 3
      }
    ]
	```  
    
    OR
    
    * **Code:** 404 – Not Found <br />
    **Body:** <br />
    ```json
    [
      {
        "user-message": "The user you are requesting does not exist",
        "internal-message": "User with id <user-id> not found",
        "code": 5
      }
    ]
  	```
    
* **Notes:**
  
	* Admin user can request any `<user-id>`, however not admin user can request only your `<user-id>`
	* The result list is sorted according to the date of modification.

* **Sample Calls and Responses:**
	```
    GET supportapi/v1/users/1/tickets
     [
      {
        "id": 1,
        "title": "Can't access the system",
        "summary": "Good morning when I try to access, system tells that the 					password is incorrect but I'm sure that it's correct.",
        "state": 1
        "created": {
          "by": 1,
          "on": 1446996631
        },
        "modified": {
          "by": 1,
          "on": 1446926631
        },
        "total-messages": 3
      },
      {
        "id": 2,
        "title": "I can't change my profile picture",
        "summary": "When I try to change my profile picture not let me format 					image",
        "state": 0
        "created": {
          "by": 1,
          "on": 1446996631
        },
        "modified": {
          "by": 1,
          "on": 1446926631
        },
        "total-messages": 5
      },
    ]
    ```   
    ```
    GET supportapi/v1/users/1/tickets?limit=1&offset=1
    
     [
      {
        "id": 2,
        "title": "I can't change my profile picture",
        "summary": "When I try to change my profile picture not let me format image",
        "state": 0
        "created": {
          "by": 1,
          "on": 1446996631
        },
        "modified": {
          "by": 1,
          "on": 1446926631
        },
        "total-messages": 5
      }
    ]
    ```
    ```
    GET supportapi/v1/users/1/tickets?limit=1&fileds=id,title,state
    
     [
      {
        "id": 1,
        "title": "I can't access the system",
        "state": 1
      }
    ]
    ```