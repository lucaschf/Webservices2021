function loadFile(name){
    var file = new File(
        [""],name,{
        lastModified: 1605685839310,
        lastModifiedDate: new Date(),
        size: this.size,
        type: "",
        webkitRelativePath: ""
    });

    var reader = new FileReader();

	// file reading finished successfully
	reader.addEventListener('load', function(e) {
	    var text = e.target.result;

	 	var data = $.parseJSON(JSON.stringify(text));
	 	console.log(data);
	});

	// file reading failed
	reader.addEventListener('error', function() {
	    alert('Error : Failed to read file');
	});


	// read as text file
	reader.readAsText(file);
}