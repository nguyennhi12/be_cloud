
var connecttion = {
    server:'gianguyeniot.com',
    user:'yennhi',
    password:'nhi@2009',
    database:'Cloud_Data',
    options: {
        encrypt: false, // for azure
        trustServerCertificate: false, // change to true for local dev / self-signed certs
        instancename: 'MSSQLSERVER',
    },
    port: 1433
    
}



module.exports = connecttion;