Handlebars.registerHelper('eachPropertyColumn', function (context, column, totalColumns, options) {
  var ret = "";

  var i = 0;

  for(var prop in context)
  {
    if (((i % totalColumns) + 1) === column){
      ret = ret + options.fn({property:prop,value:context[prop]});
    }
    i++;
      
  }
  return ret;
});