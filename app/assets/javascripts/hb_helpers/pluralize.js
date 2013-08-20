Handlebars.registerHelper('pluralize', function (number, word, options) {
  if (number > 1){
    return word.pluralize();
  } else {
    return word;
  }
  
});