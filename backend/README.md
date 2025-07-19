# /users/register Endpoint Documentation

## Endpoint

`POST /users/register`

## Description
Registers a new user in the system. Requires user details in the request body. On success, returns an authentication token and user data.

## Request Body
Send a JSON object with the following structure:

```
{
  "fullName": {
    "firstName": "string (min 3 chars, required)",
    "lastName": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, min 5 chars, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example
```
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Validation
- `fullName.firstName`: Required, minimum 3 characters
- `fullName.lastName`: Optional, minimum 3 characters
- `email`: Required, must be a valid email, minimum 5 characters
- `password`: Required, minimum 6 characters

## Responses

### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "user": {
      "_id": "<user id>",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "fieldName",
        "location": "body"
      }
    ]
  }
  ```


---

# /users/login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description
Authenticates a user and returns a JWT token if credentials are valid.

## Request Body
Send a JSON object with the following structure:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example
```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Validation
- `email`: Required, must be a valid email
- `password`: Required, minimum 6 characters

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "user": {
      "_id": "<user id>",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### Validation Error
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "fieldName",
        "location": "body"
      }
    ]
  }
  ```

### Invalid Credentials
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  "Invalid email and password"
  ```
  or
  ```json
  "Invalid password"
  ```


---

# /users/profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description
Returns the authenticated user's profile information. Requires a valid JWT token in the request (cookie or Authorization header).

## Request
- No request body required.
- Must include authentication (token in cookie or Authorization header).

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "<user id>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
  ```

### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "error": "Authentication required"
  }
  ```

## Notes
- Requires authentication.
- Password is never returned.

---

# /users/logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description
Logs out the authenticated user by clearing the token cookie and blacklisting the token. Requires a valid JWT token in the request (cookie or Authorization header).

## Request
- No request body required.
- Must include authentication (token in cookie or Authorization header).

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "User logged out"
  }
  ```

### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "error": "Authentication required"
  }
  ```

## Notes
- Requires authentication.
- Token is blacklisted and cannot be reused.
