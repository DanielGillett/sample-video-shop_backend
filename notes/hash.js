const bcrypt = require('bcrypt');

// 1234 -> abcd

// salt -> saltabcd or abcdsalt (genSalt has rounds to encrypt.  
// the higher, the longer 10 is default)
async function run(){
    // Specify 'rounds' for the salt which makes it more complicated
    // the more rounds the more time it takes to run
    // const salt10 = await bcrypt.genSalt(10); // --> 2b$10$HkKSB20SXC1uY3u.iGdzTe
    // const salt20 = await bcrypt.genSalt(20); // --> 2b$20$IEcMlfgQdA8Kr2dBX0dGOO
    
    const salt = await bcrypt.genSalt(10);
    // 2b$10$30YUvLKf/on9ZKTwBi.Fw. 

    // Create a password 1234
    // ,add the salt
    const hashed = await bcrypt.hash('1234', salt);
    // 2b$10$30YUvLKf/on9ZKTwBi.Fw.bLCPXUqfZPhFW4nm2gw9lWGSQTOdNJS // hashed
    // 2b$10$30YUvLKf/on9ZKTwBi.Fw.  ←(salt)  ↑(hashed password 1234)
    // The salt is included in the hashed password.


    console.log(salt);
    console.log(hashed);
}
run();

/*
    to verify the password, use compare (incoming password, with user password)
    const validPassword = await bcrypt.compare(req.body.password, user.password);
*/