---

# Authentication Middlewares Documentation

## authUser

### Description
Middleware to authenticate regular users for protected endpoints. Checks for a JWT token in cookies or the Authorization header, verifies it, and ensures the token is not blacklisted. If valid, attaches the user object to `req.user`.

### Usage
- Used for endpoints like `/users/profile` and `/users/logout`.
- Requires a valid JWT token in the request (cookie or Authorization header).

### Behavior
- Returns `401 Unauthorized` if:
  - No token is provided
  - Token is blacklisted
  - Token is invalid or expired
  - User is not found
- On success, attaches the user object to `req.user` and calls `next()`.

## authCaptain

### Description
Middleware to authenticate captains (drivers) for protected endpoints. Checks for a JWT token in cookies or the Authorization header, verifies it, and ensures the token is not blacklisted. If valid, attaches the captain object to `req.captain`.

### Usage
- Used for endpoints like `/captains/profile` and `/captains/logout`.
- Requires a valid JWT token in the request (cookie or Authorization header).

### Behavior
- Returns `401 Unauthorized` if:
  - No token is provided
  - Token is blacklisted
  - Token is invalid or expired
  - Captain is not found
- On success, attaches the captain object to `req.captain` and calls `next()`.
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

## Responses

### Success
  ```json
  {
    "_id": "<user id>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
  }
  ```

### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json

---

---

# /captains/register Endpoint Documentation

## Endpoint

`POST /captains/register`

## Description
Registers a new captain (driver) in the system with vehicle details. On success, returns an authentication token and captain data.

## Request Body
Send a JSON object with the following structure:

```
{
  "fullName": {
    "firstName": "string (min 3 chars, required)",
    "lastName": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "model": "string (min 3 chars, required)",
    "capacity": "integer (min 1, required)",
    "vehicleType": "string (car | motorcycle | auto, required)"
  }
}
```

### Example
```
{
  "fullName": {
    "firstName": "Alice",
    "lastName": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "strongPassword456",
  "vehicle": {
    "color": "Red",
    "model": "Toyota Camry",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Validation
- `fullName.firstName`: Required, minimum 3 characters
- `fullName.lastName`: Optional, minimum 3 characters
- `email`: Required, must be a valid email
- `password`: Required, minimum 6 characters
- `vehicle.color`: Required, minimum 3 characters
- `vehicle.model`: Required, minimum 3 characters
- `vehicle.capacity`: Required, integer, minimum 1
- `vehicle.vehicleType`: Required, must be one of `car`, `motorcycle`, `auto`

## Responses

### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "captain": {
      "_id": "<captain id>",
      "fullName": {
        "firstName": "Alice",
        "lastName": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "model": "Toyota Camry",
        "capacity": 4,
        "vehicleType": "car"
      }
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

### Duplicate Email
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Captain already exist"
  }
  ```

## Notes
- Passwords are securely hashed before storage.
- Password is never returned in the response.
- The returned token can be used for authenticated requests.

---

# /captains/login Endpoint Documentation

## Endpoint

`POST /captains/login`

## Description
Authenticates a captain and returns a JWT token if credentials are valid.

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
  "email": "alice.smith@example.com",
  "password": "strongPassword456"
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
    "captain": {
      "_id": "<captain id>",
      "fullName": {
        "firstName": "Alice",
        "lastName": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "model": "Toyota Camry",
        "capacity": 4,
        "vehicleType": "car"
      }
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

## Notes
- Passwords are never returned in the response.
- The returned token can be used for authenticated requests.

---

# /captains/profile Endpoint Documentation

## Endpoint

`GET /captains/profile`

## Description
Returns the authenticated captain's profile information. Requires a valid JWT token in the request (cookie or Authorization header).

## Request
- No request body required.
- Must include authentication (token in cookie or Authorization header).

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "<captain id>",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
      "color": "Red",
      "model": "Toyota Camry",
      "capacity": 4,
      "vehicleType": "car"
    }
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

# /captains/logout Endpoint Documentation

## Endpoint

`GET /captains/logout`

## Description
Logs out the authenticated captain by clearing the token cookie and blacklisting the token. Requires a valid JWT token in the request (cookie or Authorization header).

## Request
- No request body required.
- Must include authentication (token in cookie or Authorization header).

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Captain logged out"
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
