exports.isValidComment = data => {
    return (data.text !== undefined &&
        data.date !== undefined &&
        data.author !== undefined);
};

exports.isValidArticle = data => {
    return (data.title !== undefined &&
        data.text !== undefined &&
        data.date !== undefined &&
        data.author !== undefined);
};

exports.isValidId = data => {
    return data.id !== undefined || data.articleId !== undefined;
};
