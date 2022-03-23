const multer = require('multer');
const path = require('path');
const fs = require('fs');
const slug = require('slug');

// set storage
var storage = multer.diskStorage({
    destination : function ( req , file , cb ){
        const drinkName = req.body.drinkName
        const path = `./drinks/${req.body.category}`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename : function (req, file , cb){
        // image.jpg

        cb(null, req.body.drinkName + ".png")
    }
})

var updateStorage = multer.diskStorage({
    destination : function ( req , file , cb ){
        const path = `./drinks/${req.body.category}`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename : function (req, file , cb){
        // image.jpg

        cb(null, req.body.drinkName + ".png")
    }
})


const imagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storedImages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

var upload = multer ({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" 
        ){
            callback(null, true)
        } else {
            console.log("only jpg & png file supported!")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1920 * 1920 * 2
    }
})


var uploadUpdated = multer ({
    storage: updateStorage,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" 
        ){
            callback(null, true)
        } else {
            console.log("only jpg & png file supported!")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1920 * 1920 * 2
    }
})


var uploadStoredImages = multer ({
    storage: imagesStorage,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" 
        ){
            callback(null, true)
        } else {
            console.log("only jpg & png file supported!")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1920 * 1920 * 2
    }
})

const getFile = multer()

module.exports = {upload, getFile, uploadStoredImages, uploadUpdated}