var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles = {
  'article-one' : {
    title: 'Article One | Sundar Raghavan',
    heading: 'Article One',
    date: 'Nov 7 2016',
    Content: '<p>This is Article one pg</p>'
},
  'article-two': {
    title: 'Article Two | Sundar Raghavan',
    heading: 'Article Two',
    date: 'Nov 9 2016',
    Content: '<p>This is Article two pg</p>'
},
  'article-three' : {
    title: 'Article Three | Sundar Raghavan',
    heading: 'Article Three',
    date: 'Nov 11 2016',
    Content: '<p>This is Article third pg</p>'
}
};

function createTemplate (data){
var title = data.title;
var heading = data.heading;
var date = data.date;
var content = data.content;
var htmlTemplate =`
<html>
    <head>
        <title>
             ${title} 
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
       
        </head>
        <boby>
            <div class="container">
        <div>
            <a href="/"> Home </a>
    </div> 
     <hr/>
     <h3>
         ${heading}
         </h3>
         <div>
             ${date}
         </div>
         <div>
            ${content}
                 </div>
                 </div>
                 </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function(req, res){
    //articleName == article-one
    //articles[articleName] == content object for article one
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
