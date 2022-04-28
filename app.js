const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')

// const { render } = require('express/lib/response')
const homeStartingTitle = "Where does 'Lorem Ipsum' come from?"
const homeStartingContent = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.'
const aboutContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
const contactContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat velit ac venenatis sagittis. Donec ipsum urna, consectetur ut tristique elementum, sodales ut dui. Sed viverra, lectus ut aliquam commodo, velit dui vehicula augue, ac porta mi magna quis orci. Pellentesque pharetra felis vel dui congue, eget molestie justo consectetur. Integer a volutpat sapien, in ullamcorper nisl. Phasellus et orci quis elit euismod pellentesque. Nulla sit amet tortor a massa iaculis mollis. Sed tincidunt enim dui, sed facilisis quam commodo quis. Pellentesque ultrices elit ut sem volutpat, elementum malesuada nunc tristique. Ut in tortor felis. Donec id orci est. Proin non nunc nunc.'

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

let posts = []

app.get("/", function(req,res){
    res.render("home", {startingContent: homeStartingContent, 
    posts : posts
    })
    // console.log(posts)
})
app.get("/about", function(req,res){
    res.render("about", {aboutContent: aboutContent})
})
app.get("/contact", function(req,res){
    res.render("contact", {contactContent: contactContent})
})
app.get("/compose", function(req,res){
    res.render("compose")
})
app.post("/compose", function(req,res){
    // console.log(req.body.postBody)
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    }
    posts.push(post)
    res.redirect("/")
})

app.get("/posts/:postName", function(req,res){
    const requestTitle = _.lowerCase(req.params.postName)
    posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title)
        if (storedTitle === requestTitle){
            // console.log("Match found!");
            res.render('post', {
                title: post.title,
                content: post.content
            })
        } 
    })
})

app.listen(3001, function(){
    console.log("Server stared on port 3001")
})