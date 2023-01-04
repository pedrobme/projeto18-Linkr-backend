# Linkr API

### POST ("/publish"):

  Receive object by req.body with that object format:
  
    {
    "name": "<string>",
    "url": "<valid uri>" (required)
    }
  
  Receive authorization token by req.headers named "Authorization" with that format:
   
    Authorization: "bearer <token>"  
