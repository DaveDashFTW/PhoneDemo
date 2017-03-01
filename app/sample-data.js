module.exports = {
  "stores": {
    "Telstra Cross Street, SG": {
      "orders": [
        {
          "human": "Dave Enright",
               "time": new Date(2016, 4, 5, 15, 13, 15, 0),
          "phones": [{
            "model": "iPhone 7s",
            "size": "32GB",
            "Color": "White"
          }],
          "price": 1000,
          "address": "8 Cross Street, Singapore",
          "status": "Shipping" // status := Open -> Confirmed -> Shipping -> Delivered
        },
        {
          "human": "Sam Bednall",
          "time": new Date(2016, 4, 4, 20, 31, 0, 0),
          "phones": [{
            "model": "iPhone 7s",
            "size": "32GB",
            "Color": "White"
          }],
          "price": 800,
          "address": "Pickup",
          "status": "Confirmed" // status := Open -> Confirmed -> Shipping -> Delivered
        }
      ]
    },
    "Telstra George Street, AU": {
      "orders": []
    }
  },
  "humans": {
    "Dave Enright" : {
      "conversations": [
        {
          "who": "bot",
          "text": "Hello, which product would you like?",
          "time": new Date(2016, 4, 5, 15, 10, 0, 0)
        },
        {
          "who": "human",
          "text": "How much do your iPhones cost?",
          "time": new Date(2016, 4, 5, 15, 10, 30, 0)
        }, 
        {
          "who": "bot",
          "text": "The iPhone 7s costs $1000.00 SGD. The iPhone 6s costs $800.00 SGD. Which one would you like to order?",
          "time": new Date(2016, 4, 5, 15, 11, 0, 0)
        },
        {
          "who": "human",
          "text": "I'd like the iphone 7s please",
          "time": new Date(2016, 4, 5, 15, 11, 30, 0)
        },
        {
          "who": "bot",
          "text": "Ok - would you like that delivered or pick up from a nearby store?",
          "time": new Date(2016, 4, 5, 15, 12, 0, 0)
        },
        {
          "who": "human",
          "text": "delivered",
          "time": new Date(2016, 4, 5, 15, 12, 30, 0)
        },
        {
          "who": "bot",
          "text": "Ok delivered. Where would you like the phone delivered?",
          "time": new Date(2016, 4, 5, 15, 12, 45, 0)
        },
        {
          "who": "human",
          "text": "8 Cross Street, Singapore",
          "time": new Date(2016, 4, 5, 15, 12, 45, 0)
        },
        {
          "who": "bot",
          "text": "Ok, I have confirmed your address. Your delivery will arrive 3-5 days from now. Enjoy your new iPhone!",
          "time": new Date(2016, 4, 5, 15, 13, 0, 0)
        },
      ],
      "orders": [
        {
          "time": new Date(2016, 4, 5, 15, 13, 15, 0),
          "phones": [{
            "model": "iPhone 7s",
            "size": "32GB",
            "Color": "White"
          }],
          "price": 1000,
          "address": "8 Cross Street, Singapore",
          "status": "Shipping" // status := Open -> Confirmed -> In The Oven -> Delivered
        }
      ]
    },
    "Sam Bednall" : {
      "conversations": [
        {
          "who": "bot",
          "text": "Hello, which product would you like?",
          "time": new Date(2016, 4, 5, 15, 10, 0, 0)
        },
        {
          "who": "human",
          "text": "How much do your iPhones cost?",
          "time": new Date(2016, 4, 5, 15, 10, 30, 0)
        }, 
        {
          "who": "bot",
          "text": "The iPhone 7s costs $1000.00 SGD. The iPhone 6s costs $800.00 SGD. Which one would you like to order?",
          "time": new Date(2016, 4, 5, 15, 11, 0, 0)
        },
        {
          "who": "human",
          "text": "I'd like the iphone 6s please",
          "time": new Date(2016, 4, 5, 15, 11, 30, 0)
        },
        {
          "who": "bot",
          "text": "Ok - would you like that delivered or pick up from a nearby store?",
          "time": new Date(2016, 4, 5, 15, 12, 0, 0)
        },
        {
          "who": "human",
          "text": "Pick Up",
          "time": new Date(2016, 4, 5, 15, 12, 30, 0)
        },
        {
          "who": "bot",
          "text": "Ok you want to pick up from the closest store. I've found an iPhone 6s at the Telstra store at 8 Cross St, Singapore. I've put it on hold for you. Enjoy your new phone!",
          "time": new Date(2016, 4, 5, 15, 12, 45, 0)
        },
      ],
      "orders": [
        {
          "time": new Date(2016, 4, 5, 15, 13, 0, 0),
          "phones": [{
            "model": "iPhone 6s",
            "size": "32GB",
            "Color": "White"
          }],
          "price": 800,
          "address": "Pickup",
          "status": "Confirmed" // status := Open -> Confirmed -> Shipping -> Delivered
        }
      ]
    },
  }
};
