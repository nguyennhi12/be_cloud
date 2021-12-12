var connecttion = {
    server:'bvyhctdongthap.ddns.net\\webserver',
    user:'timtro365',
    password:'Timtro365',
    database:'Cloud_data',
    options: {
        encrypt: false, // for azure
        trustServerCertificate: false, // change to true for local dev / self-signed certs
        instancename: 'MSSQLSERVER',
    },
    port: 1433
    
}



module.exports = connecttion;