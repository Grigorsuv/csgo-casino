const authorizerCallback = (req, res, next) => {
    try{
        res.redirect('/');
    }catch (e) {
        next(e)
    }
}

const returnCallback  = (req, res, next) => {
    try{
        res.redirect('/');
    }catch (e) {
        next(e)
    }
}

module.exports = {
    returnCallback,
    authorizerCallback
}
