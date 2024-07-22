import { Sequelize } from "sequelize";
const sequelize = new Sequelize("dbname", "u", "p", {
    dialect: 'postgres',
    host: 'hname',
    protocol: 'postgres',
    port: 17452,
    pool: {
        min: 0,
        max: 1,
        idle: 1000
    },
    dialectOptions:{
        ssl: {
            //require: true,
            rejectUnauthorized: false,
            /*ca: `-----BEGIN CERTIFICATE-----
    MIIEQTCCAqmgAwIBAgIUWT+POIyIHUX7pYlQCswRi+3GrXYwDQYJKoZIhvcNAQEM
    BQAwOjE4MDYGA1UEAwwvNGY2ZGE0YmQtNzcxZi00ZDhjLWJjODctMWE5ODVkOGVk
    YjQ2IFByb2plY3QgQ0EwHhcNMjQwNzIxMTIwNDM1WhcNMzQwNzE5MTIwNDM1WjA6
    MTgwNgYDVQQDDC80ZjZkYTRiZC03NzFmLTRkOGMtYmM4Ny0xYTk4NWQ4ZWRiNDYg
    UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAPXSZ4mS
    y/9xwVh/lIfh/SG6DseiS4F/ZG2Ux+X7dHvtL1tUvR01IxKIYsAWPDjuVFNst4AM
    7w6Jhjcse6WzZO8V5zrOzjjVC5HoFfrREq9Yf/1oGd4GLjCzInQFU+x4tu8JZXpm
    ZNRTykIm2OKBNdaRRG2iTqaHTHs6kUG+WZ2862w7RlBe5t/J7rk2hBCjclwLw5cK
    gvX7BE+kVJwRjhAuJ1Io2cDA54tq2hxxQNKyLCbedc3clQxi8GUQMrJCt2GnRZw4
    +fpQSXIe5ftHFV/km7vsvYtO1RhJcQ7vin0fXckmUJ7RASoXzPHgNkqb1TO75r0B
    uwNaevKeafkbUtmtqUkhjTUFNnhEOdSAQA/pMYVJImTAYqALFuQDz05LMNnA5tnq
    pOr5udOSkWuUcs5OmRkmhLUY97aTd5YPIZooRpuuLi/+HIaHKYI6ElbzNc+4ytOH
    mGlL+om1qgiqTb9oZmhy+n4sUZ31o3378VYpr0dQHgjCoHSj595xunO/kwIDAQAB
    oz8wPTAdBgNVHQ4EFgQUfxm6BI4we0qpRPEhUNGsO4634YwwDwYDVR0TBAgwBgEB
    /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAOMXxFweFSMl/YYq
    nSjWjK0va3Zc2i/9McP+5ZP9WYyBVDF7wZxeaBEqr7L8V/RDR3lfFOMyqIOsJ5sL
    HVCAPsREPEr/yUdIGGeNAx9UF2e8dEB5fTqWqD9lPFwq9Zd0tO30GYY46iCQVrqf
    31GjELzETTl1zvajvakr+SSbXBLxWF4FZ6Gqsdf15D2bfGkv16KRgsvCImPbEero
    CERUAZYT7FEnbD9uGRlW/0xyUu2HS1PFCD3zU11cldsBzQV7uYsRRvQXzDTe1yc8
    wleLiAmr/rAx/kYHEcS3yGS9VI/WBKvyWAJpgGrr1OLMEjScQFdhsAbz7vynGJUG
    WqMOBQCN36tJckvzx+9idihcmUHPFnyBK0e6ZMgHdEoo9DtOM6NgvV1qD1VEXi9d
    urZZedJ7TyZtAGrGIZmOwhIv9MJdrRL8f3HJF7HefpvBNqrkZxVgp0irPULghKnS
    t+vUSfpMGj2lsOir7T/chO3ITF8WRYG0/Ti6NCerTdJieSb04Q==
    -----END CERTIFICATE-----`, */
        },
    }
})
try {
    await sequelize.authenticate();
    console.log("sequelize connected")
} catch(err) {
    console.log("Sequelize connection failed : ", err)
    sequelize.close();
}
export default sequelize;


// find queries
// insert queries
// update
// delete
// model schems setup with define an init
// model filed properties
// validation
// where conditions
// sort, limit, offset, group
// raw queries
// join
// query interface
// transaction
// trigger
// view
//