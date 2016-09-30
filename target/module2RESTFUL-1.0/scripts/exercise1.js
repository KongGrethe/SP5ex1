/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $("#qcontainer").html("READY");
    $("#failed").hide();
    $("#succeeded").hide();

    newRandomQuote();

    $("#qbutton").click(function () {
        newRandomQuote();
        $("#failed").hide();
        $("#succeeded").hide();
    });
    $("#qbuttonbyid").click(function () {
        newQuoteById();
        $("#failed").hide();
        $("#succeeded").hide();
    });
    $("#qbuttondelete").click(function () {
        deleteQuote();
    });
    $("#qbuttonadd").click(function () {
        addQuote();
    });
});

function newRandomQuote() {
    $.ajax({
        type: 'GET',
        url: 'api/quote/random',
        success: function (response) {
            $("#qcontainer").html(response);
        },
        error: function (error) {
            var json = JSON.parse(error.responseText);
            $("#failed").show().html(json["msg"]);
        }
    });
}

function newQuoteById() {
    $.ajax({
        type: 'GET',
        url: "api/quote/" + $("#qid").val(),
        success: function (response) {
            $("#qcontainer").html(response);
        },
        error: function (error) {
            var json = JSON.parse(error.responseText);
            $("#failed").show().html(json["msg"]);
        }
    });
}

function deleteQuote() {
    $.ajax({
        type: 'DELETE',
        url: 'api/quote/' + $("#qid").val(),
        success: function (response) {
            $("#succeeded").show().html(response);
        },
        error: function (error) {
            var json = JSON.parse(error.responseText);
            $("#failed").show().html(json["msg"]);
        }
    });
}

function addQuote() {
    var query = JSON.stringify({quote: $("#qmsg").val()});
    $("qcontainer").html("");
    $.ajax({
        type: 'PUT',
        url: 'api/quote',
        data: query,
        contentType: 'text/plain',
        success: function (response) {
            $("#succeeded").show().html(response);
        },
        error: function (error) {
            var json = JSON.parse(error.responseText);
            $("#failed").show().html(json["msg"]);
        }
    });
}