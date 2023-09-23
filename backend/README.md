# Backend

# Initial installation
`pip install -r requirements.txt`

## Database setup
if you do not have mysql on your machine, go to [The database engine](./models/engine/dbstorage.py) and apply the changes in the comment

## Redis setup
```
wget http://download.redis.io/releases/redis-7.0.12.tar.gz
tar xzf redis-7.2.1.tar.gz
cd redis-7.2.1
make
# when it is done
src/redis-server
```
to test if redis works, use `redis-cli ping` which should return pong

## Api integration

All requests to the api should be in this format
`curl -XPOST localhost:5000/api/user/login -H "Content-Type:Application/json" -d '{"email":"ade@y.com", "password":"adeyemi"}'`
it should always have a prefix `/api/`

### list of Api endpoints
The data you send should be in json format
- `api/user/register` - user registration
- `api/trainer/register` - gym trainer registration
it should have these order and keys: `name, email, gender, phone, password`.

- `api/user/login` - user login
- `api/trainer/register` - trainer login
    email and password

example url: `https://fitlife360-backend.onrender.com/api/user/login`

| Name               | Endpoint                  | Method | Parameters                              | Response                                       | Status | Failed                  | Status |
| ------------------ | ------------------------- | ------ | --------------------------------------- | ---------------------------------------------- | ------ | ----------------------- | ------ |
| User login         | `/api/user/login`         | POST   | email, password                         | `{'message': 'User login successful', 'token': token}` | 200    | `{'error': 'Invalid credentials'}` | 400    |
| trainer login   | `/api/trainer/login`   | POST   | email, password                         | `{'message': 'User login successful', 'token': token}` | 200    | `{'error': 'Invalid credentials'}` | 401    |
| User registration  | `/api/user/register`      | POST   | name, email, gender, phone, password    | `{'message': 'User registered successfully', 'token': token}` | 200    | `{'error': 'User exists'}`       | 401    |
| trainer login   | `/api/trainer/register` | POST   | name, email, gender, phone, password    | `{'message': 'User registered successfully', 'token': token}` | 200    | `{'error': 'User exists'}`       | 401    |


### What the endpoints do

- registration endpoints: They recieve data from the client, creates the user and return a json 
`{'message': 'User created successfully', 'token': token}` with a status 201
- login endpoints: receive a data from the client and logs the user in, returns
`{'message': 'trainer login successful', 'token': token}` status 200

errors return `invalid credentials` with 401 status

## Things to take note of
- The instruction registration form should contain password
- The user registration does not need the height and weight of the user yet, we can ask for that in their profile
- All requests a user can make to the backend should have their token in their header like so
`curl -XPOST https://fitlife360-backend.onrender.com/api/user -H "Authorization: <token>" ; echo ""` to get a user
this is important but it is for the other pages


