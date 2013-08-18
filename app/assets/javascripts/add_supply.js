$(function() {
	$('#add-supplies-form').on('ajax:success', function(e, response, xhr, element){
		$.ajax({
			url: '/supplies',
			type: 'GET'
		}).done(function(response){
			$('.user-supplies').empty();
			$('.user-supplies').html(HandlebarsTemplates['current_supply'](response))
			$('form-control').val('');
		});
	});
});