import sharp from 'sharp';
// We are not using this module now but it might be useful later to
// reduce image size and provied faster web loading

async function resizeImage() {
  try {
    await sharp('./public/images/uploads/profilepics/profi_test.jpg')
      .resize({
        width: 736,
        height: 736,
      })
      .toFile('./public/images/uploads/profilepics/re_default.jpg');
    console.log('Resized succesfully...');
  } catch (error) {
    console.log('Image resize failed...');
    console.log(error);
  }
}

resizeImage()