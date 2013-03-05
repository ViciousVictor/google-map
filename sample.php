<?php include_once $_SERVER['DOCUMENT_ROOT'].'/includes/ux_template_php/vars.php'; ?>
<?php include  $templatePath.'doctype.php'; ?>
<title>Google Map Prototype - New York State Department of Labor</title>
<style>
#map_canvas{
	height:400px;
	width:100%;
}

</style>
<?php include  $templatePath.'header1.php'; ?>
<?php include  $templatePath.'skip-to-nav.php' ?>
<?php include  $templatePath.'header2.php'; ?>
<?php include  $templatePath.'header3.php'; ?>
<?php include  $templatePath.'app-menu.php'; ?>
<?php include  $templatePath.'app-search.php'; ?>

<?php include  $templatePath.'header4.php'; 
	/* content begin*/
?>
<h2>Google Map Prototype</h2>
		
<!-- ====================== -->	
<div id="map_canvas"></div>


<!-- ====================== -->


<?php /* content end */
	include $templatePath.'footer1.php'; 
?>

<script src="//maps.googleapis.com/maps/api/js?sensor=false"></script>
<script>
$(document).ready(function() {
	
	var map;
	function initialize() {
		var mapOptions = {
			zoom: 7,
			center: new google.maps.LatLng(43, -76),
			mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		map = new google.maps.Map(document.getElementById('map_canvas'),
			mapOptions);
	}

	google.maps.event.addDomListener(window, 'load', initialize);
	
});
	

</script>
<?php include $templatePath.'footer2.php'; ?>
