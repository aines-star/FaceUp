var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary');
var mongoose = require('../models/db')
var pictureModel = require('../models/picture')
const request = require('request');

cloudinary.config({
  cloud_name:'dbfn2hlpx',
  api_key: '724516578316611',
  api_secret:'18wZYbpZ5sAB3DTV2XHczftm2Q8'
})

const subscriptionKey = '0e0c685202a4406bb4aefd4e669e220f';
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

/* GET home page. */
router.get('/', function(req, res, next) {
  pictureModel.find((err, data)=>{
    console.log(data);
    res.json( {data : data} );
  });
});
/* GET home page. */
router.post('/photo', function(req, res, next) {
  var extention;
  if(req.files.photo.mimetype == "image/jpeg") {
    extention = 'jpg';
  } else if(req.files.photo.mimetype == "image/png") {
    extention = 'png';
  }

    console.log('req.files', req.files)
    
 
    if(extention) {
      req.files.photo.mv('./public/images/'+req.files.photo.name +'.'+ extention,
        function(err) {
          if (err) {
            res.json({result: false, message: err} );
          } else {
            cloudinary.v2.uploader.upload('./public/images/'+req.files.photo.name +'.'+ extention, 
                  function(error, result) {
                    console.log(result);
                    if (error) {
                    console.log(error)
                  } else {
                    

                    
                    const imageUrl = 'http://res.cloudinary.com/dbfn2hlpx/image/upload/v1571832929/'+result.public_id + '.jpg'
                    console.log("===>ca",imageUrl);
                    

                    // API AI
                    // Request parameters.
                     const params = {
                       'returnFaceId': 'true',
                       'returnFaceLandmarks': 'false',
                       'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
                           'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
                     };
       
                     // API AI
                     const options = {
                       uri: uriBase,
                       qs: params,
                       body: '{"url": ' + '"' + imageUrl + '"}',
                       headers: {
                           'Content-Type': 'application/json',
                           'Ocp-Apim-Subscription-Key' : subscriptionKey
                       }
                   };
                   request.post(options, (error, response, body) => {
                    if (error) {
                      console.log('Error: ', error);
                      return;
                    }
                    let jsonResponse = JSON.parse(body);
                    console.log(body);
                    console.log('JSON Response\n');
                    console.log(jsonResponse);
                    
                    var newPicture = new pictureModel({

                      pictureUrl: result.secure_url,
                      pictureName: result.original_filename,
                      age: jsonResponse[0].faceAttributes.age,
                      gender: jsonResponse[0].faceAttributes.gender

                    })

                    newPicture.save(function(error, picture){

                      console.log("PICTURE SAVED IN MY DATABSE --> "+picture)
                      res.json({result} );

                    })
                  });
                  }});
                        
          } 
        }
      );
    }
  });
  

module.exports = router;
