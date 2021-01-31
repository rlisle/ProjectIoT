/**
 * Report
 *
 * Handle ReportState requests
 *
 * It will signal its completion by calling context.succeed()
 * or context.fail()
 */
'use strict';

var constants   = require('../constants');
var helper      = require('./helper');

function handler(request, context, config) {

    var requestedName = request.directive.header.name;
    var token = request.directive.endpoint.scope.token;  // example says payload, but its endpoint
    var timestamp = new Date().toISOString();
    var correlation = request.directive.header.correlationToken;
    var endpoint = request.directive.endpoint;

    helper.log('ReportState',requestedName);

    switch (requestedName) {
        case "ReportState":
            config.Device.reportState(request, context, config).then(function(result){
                // For now, hard code the entire response. Refactor later after its understood better.
                let contextResult = {
                    "properties": [{
                        "namespace": "Alexa.PowerController",
                        "name": "powerState",
                        "value": "OFF",                         //TODO: set this appropriately
                        "timeOfSample": timestamp,
                        "uncertaintyInMilliseconds": 50
                    }]
                };
                var responseHeader = request.directive.header;
                responseHeader.namespace = "Alexa";
                responseHeader.name = "Response";
                responseHeader.messageId = responseHeader.messageId + "-R";
                var response = {
                    "context": contextResult,
                    "event": {
                        "header": responseHeader,
                        "endpoint": endpoint,
                        "payload": {}
                    }
                };
                helper.log("Returning response: ", response);
                context.succeed(response);
            },
            function(error) {
                helper.log("ReportState error",error);
                context.fail("ReportState error: "+error);
            });
            break;

        default:
            helper.log("Report - unsupported operation",requestedName);
            context.fail("Report - Unsupported operation: "+requestedName);
    }
    /*
     Note: No return value or promise.
           Device methods will call context.succeed(result) or context.fail(controllError)
     */
}

/* Export our public functions */
module.exports = {
    handler:handler,
};
