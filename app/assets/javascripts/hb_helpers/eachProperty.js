Handlebars.registerHelper('eachProperty', function(context, options) {
    var ret = "";

    for(var prop in context)
    {
        ret = ret + options.fn({property:prop,value:context[prop]});
    }
    return ret;
});