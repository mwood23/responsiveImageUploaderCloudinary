# Optimizing images for your site using Cloudinary

Web performance matters. <Site blog that points out web performance and has number on how much bandwidth is used with images>. If you are developing a new site or trying to make your current one faster, one of the biggest gains can be from optimizing images and allowing the browser to choose the right image depending on the device and screen size. I highly recommend using Cloudinary, a cloud based image solution to handle this. It avoids hosting costs for your images, automatically optimizes large images, has a convenient API to handle transformations, and includes great support for responsive images.

# Seeing where you stand

If you currently have a website deployed use Lighthouse to see what your score is. It is a free tool by Google that measures web performance, best practices, accessibility, and if you follow their PWA guidelines. For this post we're going to focus on best practices and performance.

# The story behind responsive images

Responsive images have been around for a couple of years, but they are not gaining great support in major browsers and fallback gracefully if a browser does not support them. The markup for a responsive images looks like this:

```
Make sure this is right
<img sizes="(max-width: 500) 100vw, (max-width: 1400) 33vw 1400"
  srcset="https://res.cloudinary.com/yourapp/image/upload/c_crop,r_max/c_scale,w_1400/v1501546428/Puppy.jpg 1400w,
  https://res.cloudinary.com/yourapp/image/upload/c_crop,r_max/c_scale,w_1365/v1501546428/Puppy.jpg 1365w,
  https://res.cloudinary.com/yourapp/image/upload/c_crop,r_max/c_scale,w_1202/v1501546428/Puppy.jpg 1202w,
  https://res.cloudinary.com/yourapp/image/upload/c_crop,r_max/c_scale,w_872/v1501546428/Puppy.jpg 872w,
  https://res.cloudinary.com/yourapp/image/upload/c_crop,r_max/c_scale,w_625/v1501546428/Puppy.jpg 625w,
  https://res.cloudinary.com/yourapp/image/upload/c_crop,r_max/c_scale,w_200/v1501546428/Puppy.jpg 200w"
  src="https://res.cloudinary.com/yourapp/image/upload/v1501546428/Puppy.jpg"
  alt=""
/>
```

The two new attributes from our favorite image tag are the sizes and srcset attribute. Sizes are media queries you define based off how your website responds to different screen sizes. For instance, the tag above tells the browser for devices up a width of 500 pixels, the image will be 100% of the view width and only 33% of the view width up to 1400 pixels. If neither are met, fall back to the size of the image.

Next up we have the srcset attribute that defines the various widths of images the browser can choose from when rendering the page.

# Knowing the right amount of images to make

One of the most challenging parts of responsive images is knowing how many different image sizes to make to see relevant performance gains. Luckily, Cloudinary has a built a great tool that allows you to choose the min width, max-width, max images to make, and how many bytes you want to save before making another image transform.

# Images to the cloud!

The first thing you'll need to do is create an account with Cloudinary. They have a generous free tier that supports <numbers here>. Once you have an account you can manually upload images using their web app or their API. We'll be using their API and a little script I made to handle uploading multiple images and generating HTML image tags to place in your app.

First thing is setting it up:
```
git clone https://github.com/mwood23/responsiveImageUploaderCloudinary.git

npm install
```

Next you'll want to take your API information and place it in the .env file from the cloned repo. It can be found on the front page of the Cloudinary web console. While your in the console go over to the settings and choose a default upload quality. I use quality - eco and it trims off a lot of size on the images while keeping the image looking good. Now every time you upload an image it will automatically shave off all kinds of KBs. Next up, getting the images in there.

The script takes in a JSON file with the path of where the file is, the responsive configuration, and if you'd like to transform your image a certain way.

```
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
      "transformation": {"radius": "max", "crop": "crop"}
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
```

The location can take the local path on your computer or a link on the internet. Make sure to give it a public id that is different for each image to keep it organized. It's best to look at the size your image is on your website and use the the responsive breakpoints tool mentioned above to determine the best breakpoints.

Now, back to the script. Navigate to the cloned repo in your terminal of choice and run `node index.js`. This will give you outputs telling you that your image has been updated successfully and write some pretty markup to `output.html` that should look something like this:
