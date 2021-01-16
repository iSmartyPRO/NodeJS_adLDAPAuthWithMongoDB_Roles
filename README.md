# NodeJS. ADLDAP Authentication and manage users via Mongo DB using roles

This is simple application which demonstrate how to authenticate users throught Active Directory.
If authentication is successfull it will create check if user exist in Database, if user not exist in database, it will create automatically.

## How to install

Install all modules:
```
npm i
```

You have to rename .env.sample to .env file

Fill all required details for LDAP and Json Web Token in .env file.

## How to run app

Use following command:
```
npm run dev
```

## How to play

Use browser and try open http://localhost:3000 (depend on your port)

*Should appear JSON response - unauthorized access.*

To authenticate user, you can use Postman Application and make a post request to the URL: http://localhost:3000/api/auth/login, with raw body and JSON type.

### Sample of body:
```
{
    "username": "adusername",
    "password": "adpassword"
}
```

if provided data is ok - you should receive token for future requests.

## Sample of protected URLs
* http://localhost:3000/
* http://localhost:3000/api/auth/secret

# Authors
* **Ilias Aidar** - *Initial work*