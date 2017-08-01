// Get .env stuff
require('dotenv').config();

const cloudinary = require('cloudinary');
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Parse the JSON file of images to upload
const photosToUpload = JSON.parse(fs.readFileSync('./photosToUpload.json', 'utf8'));

photosToUpload.photos.forEach(function(photo) {
  cloudinary.v2.uploader.upload(photo.location, {
    responsive_breakpoints: [
      {
        create_derived: true,
        bytes_step: photo.bytes_step || 20000,
        min_width: photo.min_width || 200,
        max_width: photo.max_width || 1000,
        max_images: photo.max_images || 20,
        transformation: photo.transformation || {}
      }
    ],
    public_id: photo.public_id
  }, function(error, resp) {
    if (error) {
      console.log(error);
    }

    let photoObj = resp
    photoObj.responsive_breakpoints.forEach(function(item, transformIndex) {
      let srcSet = ''
      let maxWidth = item.breakpoints[0].width

      item.breakpoints.forEach(function(breakpoint, index) {
        if (index === item.breakpoints.length - 1) {
          srcSet = srcSet.concat(breakpoint.secure_url, ` ${breakpoint.width}w`)
        } else {
          srcSet = srcSet.concat(breakpoint.secure_url, ` ${breakpoint.width}w, \n \t \t`)
        }
      })

      // Template literals preserve leading whitespace
      let imgTag = `
  <!-- Upload for PUBLIC_ID ${photoObj.public_id}  -->
  <img sizes="(max-width: ${maxWidth}) 100vw, ${maxWidth}"
    srcset="${srcSet}"
    src="${photoObj.secure_url}"
    alt=""
  />
      `

      // Write to output file for easy copy past
      fs.appendFile("./output.html", imgTag, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    })

  });
})
