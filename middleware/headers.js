module.exports = (req, res, next) =>{
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-requested-with, Content-type, Accept, Authorization');

    next();
}