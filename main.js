

    let express = require('express')
    let line = require('@line/bot-sdk')
    
    let lineAccount = require("./linekey.json")
    let client = new line.Client(lineAccount)
    
    let app = express()
    
    app.post('/webhook', line.middleware(lineAccount), function (req, res) {
        console.log('start')
        let promise = []
        for (let event in req.body.events) {
            promise.push(lineEvent(event))
        }
    
        Promise.all(promise).then(function () {
            res.status(200).send()
        }).catch(function() {
            res.status(400).send()
        })
    })

    
    let reply = function (event, text) {
        return new Promise(function (resolve, reject) {
            client.replyMessage(event.replyToken, {type: 'text', text: text})
                .then(function () {
                    resolve()
                }).catch(function (error) {
                    console.log(error)
                    reject()
                })
        })
    }



    let lineEvent = function (event) {
        return new Promise(function (resolve, reject) {
            if (event.type === 'message') {
                if (event.message.type === 'text') {
                    let text = event.message.text
                    
                    if(/[Hh]ello|你好/.test(text))
                    {
                        let response='Hello'
                        reply(event, response).then(function () {
                            resolve()
                        }).catch(function () {
                            reject()
                        })     
                    }
                    else if(/[Hh]i|嗨/.test(test))
                    {
                        let response='Hi'
                        reply(event, response).then(function () {
                            resolve(
                                
                        }).catch(function () {
                            reject()
                        })    
                   }


                } else if (event.message.type === 'image') {
    
                }
            } else if (event.message.type === 'follow') {
    
            }
        })
    }
    
    const port = process.env.PORT || 3000
    app.listen(port, function () {
      console.log('listening on ' + port)
    })

