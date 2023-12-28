const User = require("../models/user");
const bcrypt = require("bcrypt");
const emailService = require("../helpers/send-mail");
const config = require("../config");

exports.post_login = async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    try{
       const user = await User.findOne({
        where:{
            email:email
        }
       });
       if(!user){
        return res.render("auth/login",{
            title:"login",
            message:{text:"Email hatalı!",class:"danger"}
        });
       }
       const match = await bcrypt.compare(password,user.password);
       if(match){
        // res.cookie("isAuth",1)
        req.session.isAuth =true;
        req.session.username = user.username;
        const url = req.query.returnUrl ? req.query.returnUrl:"/";
        return res.redirect(url);
       }
      
        return res.render("auth/login",{
            title:"login",
            message:{text:"parola hatalı!",class:"danger"}
        });
       

    }
    catch(err){
        console.log(err);
    }
}

exports.get_login = async function(req,res){
    const message = req.session.message;
    delete req.session.message;
    try{
        
        return res.render("auth/login",{
            title:"login",
            message:message,
            csrfToken:req.csrfToken()
        });
    }
    catch(err){
        console.log(err);
    }
}

exports.get_logout = async function(req, res) {
    try {
        await req.session.destroy();
        return res.redirect("/");
    }
    catch(err) {
        console.log(err);
    }
}
exports.post_register = async function(req,res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashpassword = await bcrypt.hash(password,10);
    try{
        const user = await User.findOne({where:{email:email}});
        if(user){
            req.session.message = {text:"Email sistemde kayıtlı",class:"warning"};
            return res.redirect("login");

        }
        await User.create({
            username:username,
            email:email,
            password:hashpassword
        });
        
        emailService.sendMail({
            from:config.email.from,
            to:email,
            subject: "Hesabınızı oluşturuldu.",
            text: "Hesabınızı başarılı şekilde oluşturuldu."
           });
        req.session.message={text:"Kullanıcı bilgilerinizle giriş yapabilirsiniz",class:"success"};
        res.redirect("login");

    }
    catch(err)
    {
        console.log(err);
    }
    
}
exports.get_register = async function(req,res){
    try{
        return res.render("auth/register",{
            title:"register"
        });
    }
    catch(err)
    {
        console.log(err);
    }
}