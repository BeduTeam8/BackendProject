require("dotenv").config();

module.exports ={
    "development":{
        "username":process.env.USERDEV,
        "password":process.env.PASSWDDEV,
        "database":process.env.DBDEV,
        "host":process.env.HOSTDEV,
        "port":process.env.PORTDBDEV,
        "dialect":process.env.DIALECTDEV
    },
    "staging":{
        "username":process.env.USERSTG,
        "password":process.env.PASSWDSTG,
        "database":process.env.DBSTG,
        "host":process.env.HOSTSTG,
        "port":process.env.PORTDBSTG,
        "dialect":process.env.DIALECTSTG
    },
    "production":{
        "username":process.env.USERPRD,
        "password":process.env.PASSWDPRD,
        "database":process.env.DBPRD,
        "host":process.env.HOSTPRD,
        "port":process.env.PORTDBPRD,
        "dialect":process.env.DIALECTPRD
    }
}