jQuery(document).ready(function(){

	var filters = {};
	var filterValue;
	var qsRegex; // search

	var jackey = jQuery('#hotmob-isotope').isotope({
		layoutMode: 'fitRows',
		percentPosition: true,
		itemSelector: '.ratecard',
		getSortData: {
			weight: '[weight]'
		},
		// search
		filter: function() {
			var searchResult = qsRegex ? jQuery(this).text().match( qsRegex ) : true;
			var buttonResult = filterValue ? jQuery(this).is( filterValue ) : true;
			return searchResult && buttonResult;
		 }, 
		masonry: {
			gutter: 20,
			columnWidth: 140,
    		isFitWidth: true
		},
		sortBy: 'weight', 
		sortAscending: false 
	});

	var jackey2 = jQuery('#hotmob-network').isotope({
		itemSelector: '.hotmobnetwork',
		masonry: {
			gutter: 60,
			columnWidth: 140,
			isFitWidth: true
		}
	});

	// use value of search field to filter
	var quicksearch = jQuery('.quicksearch').keyup( debounce( function() {
	  qsRegex = new RegExp( quicksearch.val(), 'gi' );
	  jackey.isotope();
	}, 200 ) );


	jackey.imagesLoaded().always( function() {
	  jackey.isotope('layout');
	  console.log('layout');
	  jackey.isotope({ sortBy: 'weight', sortAscending: false });
	  console.log('sortby weight');
	});
	jackey2.imagesLoaded().always( function() {
	  jackey2.isotope('layout');
	});

	jQuery("#advertiser-options button").click(function(){

	  // get group key
	  	var buttonGroup = jQuery(this).parents('.advertise-buttons');
	  	var filterGroup = buttonGroup.attr('data-filter-group');

	  // set filter for group
	  	filters[ filterGroup ] = jQuery(this).attr('data-filter');

	  // combine filters
	  	filterValue = concatValues( filters );
	  	jackey.isotope();

	});

	// ==================== selected buttons

	jQuery('.advertise-buttons').each( function( i, buttonGroup ) {

	  var buttonObject = jQuery( buttonGroup );
	  
	  buttonObject.on( 'click', 'button', function() {
	    buttonObject.find('.is-checked').removeClass('is-checked');
	    jQuery( this ).addClass('is-checked');
	  });

	});

	// ==================== search

	// debounce so filtering doesn't happen every millisecond
	function debounce( fn, threshold ) {
	  var timeout;
	  return function debounced() {
	    if ( timeout ) {
	      clearTimeout( timeout );
	    }
	    function delayed() {
	      fn();
	      timeout = null;
	    }
	    timeout = setTimeout( delayed, threshold || 100 );
	  }
	}

	// ==================== required
	// flatten object by concatting values
	function concatValues( obj ) {
	  	var value = '';
	  	for ( var prop in obj ) {
	    value += obj[ prop ];
	  }
	  
	  return value;
	}

});