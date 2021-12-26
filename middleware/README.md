# REST-VOX :rosette:
A **REALLY REALLY SIMPLE** express rest API.

## Documentation
### Auth  	:closed_lock_with_key:
The API authentication works based on Omnivox authentication. If Omnivox accepts your authentication, so will the API.  
You need to authenticate once every session and one session can only be connected to one account at a time.
```HTML
type:     POST
path:     /api/login
params:   {username: string, password: string},
returns:  "Logged in!" | "error" 
```
#### Minimal Python auth requests example:
```python
url = "http://localhost:1337/api/login"

payload='username=yourStudentId&password=YourPassword'
headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
response = requests.request("POST", url, headers=headers, data=payload)
```
### Lea :family:
Fetches data from LEA
- getClasses   
```HTML
type:     GET
path:     /api/lea/getClasses
returns:  {data: LeaClass[]}
```
- getClassByName
```HTML
type:     GET
path:     /api/lea/getClassByName
query:    name:string
returns:  {data: LeaClass} | "Missing name parameter"
```
Simple python example:
```python
url = "http://localhost:1337/api/lea/getClassByName?name=Linear algebra" # I'm not sure if the HTML should be encoded
headers, payload = {}
response = requests.request("GET", url, headers=headers, data=payload)
```
- getClassByCode
```HTML
type:     GET
path:     /api/lea/getClassCode
query:    code:string <!--Code example: 123-NYX-01-->
returns:  {data: LeaClass} | "Missing code parameter"
```
- getClassByTeacher
```HTML
type:     GET
path:     /api/lea/getClassByTeacher
query:    name:string
returns:  {data: LeaClass} | "Missing name parameter"
```
### Mio :mailbox:
Fetches data from MIO. 
- getAllPreview
```HTML
type:     GET
path:     /api/mio/getAllPreview
returns:  {data: MioPreview[]}
```
- getByID
```HTML
type:     GET
path:     /api/mio/getByID
query:    id:string <!-- The MIO ID. -->
returns:  Mio | errorMessage
```
- sendMio
```HTML
type:     POST
path:     /api/mio/sendMio
params:   {users: SearchUser[], mio: MioSendData} <!--MioSendData = {title: string, content: string} -->
returns:  "sent" | "Couldn't parse input"
```
- getUsersByName
```HTML
type:     GET
path:     /api/mio/getUsersByName
query:    name=studentName
returns:  SearchUser[] | "Missing name parameter"
```
- getCachedUserByID  
Tries to find the user with the ID from the user that were previously cached from an old search.
```HTML
type:     GET
path:     /api/mio/getCachedUserByID
query:    id=studentID
returns:  SearchUser[] | "Missing ID parameter"
```

## Dependency
This project is fully dependent on the crawler on this github. 
