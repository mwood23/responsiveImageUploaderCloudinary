# Simple Responsive Image Uploader Node

> Upload all your images to Cloudinary with specified breakpoints and get formatted image tags back

### Features:

- Multiple uploads instead of doing it manually
- Local photos and photos on the Internet
- Name, set breakpoints, and do transformations all from the API
- Outputs responsive image tags
- No need to introduce another Javascript dependency in your app


### Install Instructions

```
git clone https://github.com/mwood23/responsiveImageUploaderCloudinary.git

npm install

```

### Useful Resources
- Not sure on the ideal width and height you need for your image? Use http://www.responsivebreakpoints.com/
- Tips on setting the sizes attribute https://cloudfour.com/thinks/responsive-images-101-part-5-sizes/

### Quickstart

```
// Add your API information to the .env file

CLOUD_NAME="<YOUR CLOUD NAME>"
API_KEY="<YOUR API KEY>"
CLOUDINARY_SECRET="<YOUR SECRET>"

// Add your photos and options to the photosToUpload.json file
{
  "photos": [
    {
      "location": "http://res.cloudinary.com/responsivebreakpoints/image/upload/dog.jpg",
      "tags": [],
      "public_id": "Puppy",
      "bytes_step": 20000,
      "min_width": 200,
      "max_width": 1400,
      "max_images": 20,
      "transformation": {"radius": "max", "crop": "crop"} // Make sure to use quotes for transformations since this is JSON
    },
    {
      "location": "/user/name/your/cool/puppy",
      "tags": [],
      "public_id": "Your cool puppy photo",
      "bytes_step": 15000,
      "min_width": 800,
      "max_width": 1200,
      "max_images": 14,
      "transformation": {}
    }
  ]
}

// Run the script
node index.js

// Check your output.html file for something that looks like this:

<!-- Upload for PUBLIC_ID Puppy  -->
<img sizes="(max-width: 1400) 100vw, 1400"
  srcset="https://res.cloudinary.com/woodsproduce/image/upload/c_crop,r_max/c_scale,w_1400/v1501546428/Puppy.jpg 1400w,
  https://res.cloudinary.com/woodsproduce/image/upload/c_crop,r_max/c_scale,w_1365/v1501546428/Puppy.jpg 1365w,
  https://res.cloudinary.com/woodsproduce/image/upload/c_crop,r_max/c_scale,w_1202/v1501546428/Puppy.jpg 1202w,
  https://res.cloudinary.com/woodsproduce/image/upload/c_crop,r_max/c_scale,w_872/v1501546428/Puppy.jpg 872w,
  https://res.cloudinary.com/woodsproduce/image/upload/c_crop,r_max/c_scale,w_625/v1501546428/Puppy.jpg 625w,
  https://res.cloudinary.com/woodsproduce/image/upload/c_crop,r_max/c_scale,w_200/v1501546428/Puppy.jpg 200w"
  src="https://res.cloudinary.com/woodsproduce/image/upload/v1501546428/Puppy.jpg"
  alt=""
/>

<!-- Upload for PUBLIC_ID Your cool puppy photo  -->
<img sizes="(max-width: 1200) 100vw, 1200"
  srcset="https://res.cloudinary.com/woodsproduce/image/upload/c_scale,w_1200/v1501546589/Your%20cool%20puppy%20photo.jpg 1200w,
  https://res.cloudinary.com/woodsproduce/image/upload/c_scale,w_1182/v1501546589/Your%20cool%20puppy%20photo.jpg 1182w,
  https://res.cloudinary.com/woodsproduce/image/upload/c_scale,w_1018/v1501546589/Your%20cool%20puppy%20photo.jpg 1018w,
  https://res.cloudinary.com/woodsproduce/image/upload/c_scale,w_800/v1501546589/Your%20cool%20puppy%20photo.jpg 800w"
  src="https://res.cloudinary.com/woodsproduce/image/upload/v1501546589/Your%20cool%20puppy%20photo.jpg"
  alt=""
/>

// Easy copy paste into your web app!
```
