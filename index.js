//getting the libraries
const express = require('express')
const http = require('http')
const firebase = require('firebase-admin')
const color = require('cli-color')


//configuring the libraries
const expressApp = express();
const server = http.createServer(expressApp);
expressApp.use(express.urlencoded({extended: true}))
expressApp.use(express.json())



// function to check if the request is valid
function checkRequest(userData, data)
{
  if(data == undefined || data == null || userData == undefined || userData == null) //if there is no data then return an error
  {
    return "Bad request"

  } else if(userData[0] == undefined|| userData[1] == undefined || userData[2] == undefined) //if the request is not complete then return an error
  {
    return "Invalid request"

  } else if(userData[3] != undefined) //if the body contains a space then return an error
  {
    return "Cannot contain spaces"

  } else
  {
    return "Success"

  }
}



expressApp.post('/', (req, res) => {
  var Rawdata = JSON.parse(JSON.stringify(req.body))
  var data = Rawdata['Data']


  if(data != undefined) // if the request body don't contain any data or not all data then return an error
  {
    //stupid code to get the username and password from the request body
    var correctedData = data.slice(1, data.length).slice(0, data.length - 2)
    var userData = correctedData.split(' ')

    var checkRequestResult = checkRequest(userData, data) // function to check if the request is valid
  
  
    if(checkRequestResult == "Bad request") //if the request is invalid then return an error
    {
      res.statusCode = 204
      res.send(checkRequestResult)
    } else if(checkRequestResult == "Invalid request") //if the request is invalid then return an
    {
      res.statusCode = 206
      res.send(checkRequestResult)
    }
    else if(checkRequestResult == "Cannot contain spaces") //if the request have more than 3 data (Action, Username and Password) then return an error
    {
      res.statusCode = 405
      res.send(checkRequestResult)
    } else //if the request is valid and passed the checks then process the request
    {
      if(userData[0] == "CREATE") //if the request demands an user creation then create the user
      {
        console.log(color.yellow('New account created! ') + 'Username: ' + userData[1])
        res.statusCode = 200
        res.send("Sucess!")

      } else if(userData[0] == "LOGIN") //if the request demands an login request, check the password
      {
        console.log(color.yellow('Logged in successfully! ') + 'Username: ' + userData[1])
        res.statusCode = 200
        res.send("Sucess!")

      } else if(userData[0] == "DELETE") //if the request demands an delete request, check the password
      {
        console.log(color.red('Account deleted! ') +'Username: '+ userData[1])
        res.statusCode = 200
        res.send("Sucess!")

      }
    }
  } else
  {
    res.statusCode = 400
    res.send("Bad request")
  }
});



server.listen(3000, () => {
  console.log(color.green('Server is running on port 3000'))
  console.log(color.yellow('Press Ctrl+C to stop the server'))
  console.log()
  console.log()
});
