//getting the libraries
const express = require('express')
const http = require('http')
const color = require('cli-color')
var validator = require('email-validator');

//configuring the libraries
//express config:
const expressApp = express();
const server = http.createServer(expressApp);
expressApp.use(express.urlencoded({extended: true}))
expressApp.use(express.json())


// function to check if the request is valid
function checkRequest(data)
{    
  if(data == null || data == undefined) //if there is no data then return an error
  {
    return "Bad request"

  } else if(data["Username"] == undefined || data["Password"] == undefined || data["Action"] == undefined || data["Email"] == undefined) //if the request is not complete then return an error
  {
    return "Incomplete request"

  } else if(validator.validate(data["Email"]) == false) //if the email is not valid then return an error
  {
    return "Invalid email"

  } else if(data["Username"].length < 4 ) //if the username is less than 4 characters then return an error
  {
    return "Username must be at least 4 characters"

  } else if(data["Password"].length < 5) //if the password is less than 5 characters then return an error
  {
    return "Password must be at least 5 characters"

  } else
  {
    if(data["Action"] != "LOGIN" && data["Action"] != "CREATE" && data["Action"] != "DELETE") //if the action is login then check if the
    {
      return "Invalid action"

    } else
    {
      return "Success"
    }
  }
}



expressApp.post('/', (req, res) => {
  try // if there is an error then return an 500 response
  {
    var data = req.body; //getting the body from the request


    if(data != undefined) // if the request body don't contain any data or not all data then return an error
    {
      var checkRequestResult = checkRequest(data) // check if the request is valid
  
      //MESSY CODE ALERT, YOU HAVE BEEN WARNED
      if(checkRequestResult == "Bad request")
      {
        res.status(400).send(checkRequestResult)
  
      } else if(checkRequestResult == "Incomplete request")
      {
        res.status(400).send(checkRequestResult)
  
      } else if(checkRequestResult == "Invalid email")
      {
        res.status(400).send(checkRequestResult)
        
      } else if(checkRequestResult == "Username must be at least 4 characters")
      {
        res.status(411).send(checkRequestResult)
  
      } else if(checkRequestResult == "Password must be at least 5 characters")
      {
        res.status(411).send(checkRequestResult)
  
      } else if(checkRequestResult == "Cannot contain spaces")
      {
        res.status(400).send(checkRequestResult)
        console.log(checkRequestResult)
  
      } else if(checkRequestResult == "Invalid action")
      {
        res.status(400).send(checkRequestResult)
      }
      else if(checkRequestResult == "Success") // if the request is valid then process it
      {
        if(data["Action"] == "LOGIN") // if the request demands an login then...
        {
          //do whatever you want to do
        } else if(data["Action"] == "CREATE") // if the request demands to ceate an account then...
        {
          //do whatever you want to do
        } else
        {
          res.status(400).send(checkRequestResult)
        }
      }
    } else
    {
      res.statusCode = 400
      res.send("Bad request")
    }
  } catch (error)
  {
    res.status(500).send("Unexpected error")
    console.log(error)
  }
});


server.listen(3000, () => {
  console.log(color.greenBright("Server is running!"))
  console.log();
  console.log()
});
