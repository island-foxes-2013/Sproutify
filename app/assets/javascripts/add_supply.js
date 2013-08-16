// AS A USER, I WANT TO SET PRODUCE THAT I HAVE AVAILABLE
// User has many Supplies
// Crop has many Supplies
// Supplies belongs to User, Crop, Status

$(function() {
  $('button').on('click', function(){
	  var crop_name = $('.add-supplies').val();
		console.log(crop_name);
		$('.user-supplies').append(crop_name);
  });

  $('.submit-button').on('ajax:success', function(e, data){
  	e.preventDefault();
  	console.log(data);
  	// $('.user-supplies').append()
  });
});

// $('.comment_form').on('ajax:success', function(e, data){
// 	var comment = $('.comment_append').last().clone();		
// 	$(comment).text(data.comment.content).append('<br><span class="comment_date">comment by: <b>' + data.user.username + '</b> on ' + formatDate() + '</span>').insertAfter($(this).parent().find('hr').last());
// 	$(this).parent().find('.comment_append').last().append('<hr />');
// 	$('.comment_form textarea').val('');
// });