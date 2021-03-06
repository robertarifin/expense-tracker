const Model = require('../models');
const decrypt = require('../helpers/decryptPassword');
const User = Model.User;

class MemberController {
    static addUser(req, res) {
        let input = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
        
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
        .then( data => {
            res.redirect('/member/login');
        })
        .catch( err => {
            res.send(err);
        })
    }

    static loginAuth(req, res) {
        let input = {
            email: req.body.email,
            password: req.body.password,            
        }
        User.findOne({where: {email: input.email}})
        .then(data => {
            if(data === null) throw `Email does not match with data`;
            
            let inputPass = decrypt(input.password, data.password)
            if(!inputPass) throw `Wrong password`;
            req.session.user = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.email
            }
            
            res.redirect('/transaction');
            // res.send(req.session.user);
            // res.send(correctPass);
        })
        .catch(err => {
            console.log(`masuk error =========`, err);
            res.redirect(`/member/login?info=${err}`);
            // res.send(err);
        });
    }
    
}

module.exports = MemberController