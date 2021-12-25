# OMNIVOX-CRAWLER :man_student::school::spider_web:

A crawler that reads data from Omnivox from the user's perspective.  
The crawler works standalone but was mainly made to be imported from another library.

## Features:  
### Mio:  
- [x] Load mios from id
- [x] Load a Mio preview list with the 50 more recent mios
- [x] Search for users by their username
- [x] Send mio to multiple users (I'm not sure if the multiple user is working yet)
- [ ] Load older mios preview

### Lea:
- [x] Get user classes (with some basic info) for the current semester
- [ ] Get documents/surveys notification
- [ ] Get schedule

## Documentation:
There are two manager classes (`MioManager` and `LeaManager`) that contain all the public methods to perform the implemented features. They both take a string array with the Omnivox session cookies. The cookies are sent by Omnivox server upon a successful login.  
There is a login function on the index.ts file that will attempt to login with given credentials.

#### Example:
``` typescript
 import {login, LeaManager, MioManager} from "omnivox-crawler";
 (async() => {
      const loginCookie = await login('2010010', 'PassWord');
      const leaManager = await LeaManager.build(loginCookie.getCache());
      //const mioManager = await MioManager.build(loginCookie.getCache());
 
      console.log(await leaManager.getAllClasses());
  });
```

## Remarks:
All the data that is being mined from the two omnivox services are exposed to the public. It is in no way accessing private or confidential data.
