$(function() {
	$('#add-supplies-form').on('ajax:success', function(e, response, xhr, element){
		$.ajax({
			url: '/supplies',
			type: 'GET'
		}).done(function(response){
			$('.user-supplies').empty();
			$('.user-supplies').append(response.supply_partial)
			$('form-control').val('');
			// $('form-control:first-child').focus();
		});
	});
});