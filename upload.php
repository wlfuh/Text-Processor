<?php
// In PHP versions earlier than 4.1.0, $HTTP_POST_FILES should be used instead
// of $_FILES.

$file_content = null;
$filename=null;
$error=0;

if(!empty($_FILES))
{
	if ($_FILES["file"]["error"] > 0) {
  		//echo "Error: " . $_FILES["userfiles"]["error"] . "<br>";
		exit("Unable to upload file.");
	} else {
	  	//echo "Upload: " . $_FILES["userfiles"]["name"] . "<br>";
		//echo "Type: " . $_FILES["userfiles"]["type"] . "<br>";
	  	//echo "Size: " . ($_FILES["userfiles"]["size"] / 1024) . " kB<br>";
	  	//echo "Stored in: " . $_FILES["userfiles"]["tmp_name"];
              $file_content = file_get_contents($_FILES["file"]["tmp_name"]); //get the content from the file
	}
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<title>Process Text Files</title>
<head>
	<link href="style.css" rel="stylesheet" type="text/css">
	<script> var preload=false; 
		var importedData =<?php echo json_encode($file_content ); ?>;
		</script>
		<script src="data.js">
            
        </script>
          
	<script src="script.js">
            
        </script>
        <script src="script1.js">
            
        </script>

	</head>
<body>
		<div class="overlay" id="over"> <div class="message">
		<div class="aligner">
		<h3>Import Graph Data</h3>
		<p> Please select from your computer a UTF-8 encoded file (i.e *txt, *html, *java, *xml but not *doc, *pdf, *jpg, *mov) to upload the file the "Choose File" button.
			Once the file is selected, click the "Submit" button to view graphical statistics of the file.
			You may also click <a href="javascript:void(0)" onclick="transitionOut(null)">here</a> to view sample data.
			</p>
		<br/>
		<form class="formOverlay" action="upload.php" method="post"
enctype="multipart/form-data">
<div class="inputSurround"> 
	<label for="file">Import:</label>
<input type="file" name="file" id="file">
<input type="submit" name="submit" value="Submit">
</div>
</form>
OR
<div class="spacing">
<textarea cols="5" rows="5" class="textarea" id="textbox" placeholder="Copy Text here:"></textarea> <input type="button" id="subitbox" class="subitbox" value="Submit Text">
	</div>
<div class="spacing"> <a href="javascript:void(0)" onclick="transitionOut(null)">View Default Data &#65515;</a></div>
</div>
		</div>
		</div>
	<div class="container" id="outside">	
		<div class="surround">
			<h1> Graph </h1>
			<table class="dataType">
				<tr>
					<td class="dataMode" id="wrd"><a href="javascript:void(0)" onclick="dataToPlot('word')">Word Distrubution</a></td>
					<td class="dataMode" id="ltr"><a href="javascript:void(0)" onclick="dataToPlot('letter')">Letter Distrubution</a></td>
					</tr>
				</table>
			<br/>
			<br/>
					<form action="upload.php" method="post"
enctype="multipart/form-data">
<div class="inputSurround" style="margin:0;"> 
	<label for="file">Import:</label>
<input type="file" name="file" id="file">
<input type="submit" name="submit" value="Submit">
</div>
</form>
			<div class="graphTitle" id="graphTitle"> Untitled Text</div>
			<div style="
    margin-top: 10px;text-align: left;
"> *Mouse over bars/points to see data. </div>
					<div class="selectType">
			Graph Type: <a href="javascript:void(0)" onclick="drawGraph('bar')"> Bar</a> | <a href="javascript:void(0)" onclick="drawGraph('scatter')"> Scatter</a> | <a href="javascript:void(0)" onclick="drawGraph('line')">Line</a>
			</div>
			<canvas width="700" height="450" id="graph">
			Your browser does not support HTML5. Please update your browser.
						See <a href="http://guides.instructure.com/m/4214/l/41056-which-browsers-does-canvas-support">http://guides.instructure.com/m/4214/l/41056-which-browsers-does-canvas-support</a> for more details.
		</canvas>

		</div>
		</div>

</body>
</html>