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
      // ...other user fields
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
      // ...more errors
    ]
  }
  ```

## Notes
- Passwords are securely hashed before storage.
- The returned token can be used for authenticated requests.
