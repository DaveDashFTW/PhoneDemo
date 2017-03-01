/*-----------------------------------------------------------------------------
This template demonstrates how to use an IntentDialog with a LuisRecognizer to add 
natural language support to a bot. 
For a complete walkthrough of creating this type of bot see the article at
http://docs.botframework.com/builder/node/guides/understanding-natural-language/
-----------------------------------------------------------------------------*/
"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

/*
var useEmulator = (process.env.NODE_ENV == 'development');*/

var useEmulator = true;

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);

// Make sure you add code to validate these fields
/*
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'api.projectoxford.ai';*/

var luisAPIKey = '50ad8d52285342b79c0ef82119f803f7';
var luisAppId = 'aeb37298-6655-4be2-8137-4d42f08731c4';
var luisAPIHostName = 'api.projectoxford.ai';


const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

// initalize humans-orders
var humans = {};
var storeArray = [ "Telstra Store, 8 Cross Street, Singapore" , "Telstra Store, 50 George Street, Sydney" ];

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
/*
.matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
*/
.matches('Greeting', (session, args) => {
    session.send('Hi! Firstly let us get started - What is your name?');
})
.matches('SayName', (session, args) => {
    var names = builder.EntityRecognizer.findEntity(args.entities, 'Name');
    
    if (!names) { 
        session.send('Sorry, I did not catch that. Try saying "My name is..."');
    }
    else {
        session.dialogData.name = toTitleCase(names.entity);
        session.send('Hi %s, it is a pleasure to meet you! Which products would you like to purchase today?', session.dialogData.name);
    }
}) 
.matches('EnquirePhones', (session, args) => {
    session.send('%s, We have the following phones available: \n1. iPhone 6s\n2. iPhone 7s', session.dialogData.name); 
})
.matches('AskPrice', (session, args) => {
    var phoneModel = builder.EntityRecognizer.findEntity(args.entities, 'PhoneModel');
    // session.send('Ah, you have asked for the phone model of %pm', phoneModel.entity);
    if (!phoneModel) { 
        session.send('Sorry, I cannot figure out which device youre asking a price for, so here is a list of all prices..\nWe have the following prices: \n1. iPhone 6s - $800.00 SGD\n2. iPhone 7s -  $1000.00 SGD\nWhich one would you like to buy?');
    }
    else if (phoneModel.entity.includes('7')) { 
        session.send('The iPhone 7s costs $1000.00');
    } 
    else if (phoneModel.entity.includes('6')) {
        session.send('The iPhone 6s costs $800.00');
    }
    else { 
        session.send('We have the following prices: \n1. iPhone 6s - $800.00 SGD\n2. iPhone 7s -  $1000.00 SGD\nWhich one would you like to buy?');
    }

})
.matches('OrderPhone', [
    function (session, args, next) {
        var phoneModel = builder.EntityRecognizer.findEntity(args.entities, 'PhoneModel');
        

            //session.send('Sorry, I am not sure which phone you are trying to order. As an example, try typing "I want to buy the iphone7s". Replace the model of the phone with the one you want to purchase.');
            session.dialogData.chosenPhone = new Object();
            var entity = phoneModel.entity;
            
            //session.send('DEBUG: OrderPhone, FoundPhoneModel!');
            
            if (entity.includes('7')) { 
                session.dialogData.chosenPhone.model = '7s';
                session.dialogData.chosenPhone.price = '$1000.00';
                //session.send('DEBUG: OrderPhone, FoundPhoneModel 7!');

            } 
            else if (entity.includes('6')) {
                session.dialogData.chosenPhone.model = '6s';
                session.dialogData.chosenPhone.price = '$800.00';
                //session.send('DEBUG: OrderPhone, FoundPhoneModel 6!');
            }
            
            if (!session.dialogData.chosenPhone.model) {
                builder.Prompts.text(session, 'We have the following phones available: \n1. iPhone 6s - $800.00 SGD \n2. iPhone 7s -  $1000.00 SGD Which one would you like to buy?');
            }
            else {
                next();
            }
    },
    function (session, results) {
        if (results.response) {
            if (results.response == "1") {
                session.dialogData.chosenPhone.model = "6s";
                session.dialogData.chosenPhone.price = "$800.00";
                builder.Prompts.text(session, 'Great, you have chosen to buy the iPhone 6s at a price of $800.00. Would you like the phone delivered, or pick it up from a store?');

            }
            else if (results.response == "2") {
                session.dialogData.chosenPhone.model = "7s";
                session.dialogData.chosenPhone.price = "$1000.00";
                builder.Prompts.text(session, 'Great, you have chosen to buy the iPhone 7s at a price of $1000.00. Would you like the phone delivered, or pick it up from a store?');
            }
        }
        else { 
                builder.Prompts.text(session, 'Great, you have chosen to buy the %s at a price of %s. Would you like the phone delivered, or pick it up from a store?', session.dialogData.chosenPhone.model, session.dialogData.chosenPhone.price);
        }    

    },
    function (session, results) {
        
        if (results.response.match(/delivered/i))
        {
            builder.Prompts.text(session, "Sure OK, what is your delivery address?");
        }
        else {
            session.send("Ok, Checking nearby stores now with stock availability....");
            session.dialogData.storeInt = Math.floor(Math.random() * 2);
            
            /*session.send("DEBUG: " + session.dialogData.storeInt);
            session.send("DEBUG: " + session.dialogData.name);
            session.send("DEBUG: " + session.dialogData.chosenPhone);
            session.send("DEBUG: " + session.dialogData.chosenPhone.model);
            session.send("DEBUG: " + storeArray[session.dialogData.storeInt]);*/
            
            session.endDialog('Got it %s, your new shiny %s is ready to be picked up from %s. Thank you for your order!', session.dialogData.name, session.dialogData.chosenPhone.model, storeArray[session.dialogData.storeInt]);

        }
    }
])
.matches('Delivered', [
    function(session, args, next) {
        session.send('DEBUG: I am at delivered');
        builder.Prompts.text(session, 'Sure Ok, what is your delviery address?');
    },
    function(session, results, next) {
        session.dialogData.address = results.response;
        session.send('DEBUG: I have address');
        next();
    },
    function(session, results) {
        session.endDialog('Got it %s, your new shiny %s will be delivered to %s in 3-5 working days! Thank you for your order.', session.dialogData.name, session.dialogData,chosenPhone.model, session.dialogData.address);
    }
])
.matches('None', (session, args) => {
    session.send('Hi! This is the None intent handler. You said: \'%s\'.', session.message.text);
})
.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});

bot.dialog('/', intents);    

/*
if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}*/

// Handle Bot Framework messages
var express = require('express');
var path = require('path');
var app = express();

app.post('/api/messages', bot.verifyBotFramework(), bot.listen());

app.use('/chat', express.static(path.join(__dirname, '')));
app.use('/', express.static(path.join(__dirname, '../dist')));

app.listen(8080);

// Helper functions
function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function getPhoneModel(entity){ 
    session.send('Found model %s', entity);
    
    var phoneModel = new Object();
    
    if (entity.includes('7')) { 
        phoneModel.model = '7s';
        phoneModel.price = '$1000.00';
    } 
    else if (entity.includes('6')) {
        phoneModel.model = '6s';
        phoneModel.price = '$800.00';
    }
    
    return phoneModel;
}



