# MemberLog
## Resource
### Members
### Attributes: 
* name (string)
* age (integer)
* date of birth (string) 
* email (string)
* phone number (string)

## Database Schema
'''

CREATE TABLE members (
id INTEGER PRIMARY KEY AUTOINCREMENT, 
name TEXT NOT NULL, 
age INTEGER, 
dob TEXT, 
email TEXT, 
pnumber TEXT);
'''
## REST Endpoints
|      Name     | HTTP Method |       Path        |
| ------------- | ----------- | ----------------- |
| do_preflight  |   OPTIONS   | /members/<int:id> |
|  get_members  |     GET     |     /members      |
| delete_member |   DELETE    | /members/<int:id> |
|  edit_member  |     PUT     | /members/<int:id> |
| create_member |    POST     |     /members      |
|     home      |     GET     |      /home        |
