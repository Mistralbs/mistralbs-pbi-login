
function printReport(accessToken, reportId, embedUrl) {
// Get models. models contains enums that can be used.
var models = window['powerbi-client'].models;
 
// We give All permissions to demonstrate switching between View and Edit mode and saving report.
var permissions = models.Permissions.All;
 
// Embed configuration used to describe the what and how to embed.
// This object is used when calling powerbi.embed.  tokenType == '0' ? models.TokenType.Aad : 
// This also includes settings and options such as filters.
// You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
var config = {
    type: 'report',
    tokenType: models.TokenType.Embed,
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: reportId,
    permissions: permissions,
    settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: true
    }
};

var Log = console;
 
// Get a reference to the embedded report HTML element
var embedContainer = $('#reportContainer')[0];
 
// Embed the report and display it within the div container.
var report = powerbi.embed(embedContainer, config);
 
// Report.off removes a given event handler if it exists.
report.off("loaded");
 
// Report.on will add an event handler which prints to Log window.
report.on("loaded", function () {
    Log.logText("Loaded");
});
 
// Report.off removes a given event handler if it exists.
report.off("rendered");
 
// Report.on will add an event handler which prints to Log window.
report.on("rendered", function () {
    Log.logText("Rendered");
});
 
report.on("error", function (event) {
    Log.log(event.detail);
 
    report.off("error");
});
 
report.off("saved");
report.on("saved", function (event) {
    Log.log(event.detail);
    if (event.detail.saveAs) {
        Log.logText('In order to interact with the new report, create a new token and load the new report');
    }
});
}