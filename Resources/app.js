(function() {

	var form_url = '/upload.php';
	var win = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor : '#fff'
	});
	
	var btnPhoto = Ti.UI.createButton({
		title : 'Select Photo'
	});
	btnPhoto.addEventListener('click', function(e) {
		// Open photo gallery for user to select photo
		Ti.Media.openPhotoGallery({
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
			success : function(e) {
				btnPhoto.value = e.media;
				anImageView.image = e.media;
				btnPhoto.title = '[ Photo Selected ]';
			},
			cancel : function() {
				btnPhoto.value = null;
				btnPhoto.title = 'Select Photo...';
			},
			error : function(err) {
				Ti.API.error(err);
				btnPhoto.value = null;
				btnPhoto.title = 'Select Photo...';
			}
		});
	});
	win.add(btnPhoto);

	var btnSubmit = Ti.UI.createButton({
		title : 'Submit'
	});
	btnSubmit.addEventListener('click', function(e) {

		var c = Titanium.Network.createHTTPClient({
			onload : function(e) {

				Ti.API.info('this.responseText' + this.responseText);
				json = JSON.stringify(this.responseText);
				//alert(this.responseText);
			},
			onerror : function(e) {
				//alert(JSON.stringify(e));
			}
		});
		c.open('POST', form_url);
		Ti.API.info('form_url ' + encodeURI(form_url));
	//	c.setRequestHeader('Content-Type', 'multipart/form-data');
		c.send({
			userid : 81,
			image : btnPhoto.value
		});
	});
	win.add(btnSubmit);
	var anImageView = Ti.UI.createImageView({
		 
	});
	anImageView.addEventListener('load', function() {
		Ti.API.info('Image loaded!');
	});

	// Add to the parent view.
	win.add(anImageView);
	win.open();

})();
