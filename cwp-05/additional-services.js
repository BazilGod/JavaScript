const fs = require('fs');

exports.saveArticles = data => {
    fs.writeFile("./content/articles.json", JSON.stringify(data,null,'\t'),function(err){
        if(err) console.error(err);
    });
};
