"use strict";
var router = (function ()
{
    var routes = [];

    function addRoute(route, handler)
    {
        routes.push({parts: route.split('/'), handler: handler});
    }

    function load(route)
    {
        window.location.hash = route;
    }

    function start() 
    {
        var path = window.location.hash.substr(1);
        var parts = path.split('/');
        var parts_length = parts.length;

        for (var route = 0; route < routes.length; route++)
        {
            if (routes[route].parts.length === parts_length)
            {
                var params = [];
                for (var j = 0; j < parts_length; j++)
                {
                    if (routes[route].parts[j].substr(0, 1) === ':')
                    {
                        params.push(parts[j]);
                    }
                    else if (routes[route].parts[j] !== parts[j])
                    {
                        break;
                    }
                }
                if (j === parts_length)
                {
                    routes[route].handler.apply(undefined, params);
                    return;
                }
            }
        }
    }

    window.onhashchange = start;

    return {
        addRoute: addRoute,
        load: load,
        start: start
    };
}());