

class HomeController {
    async index (req,res){
        return res.code(200).send({
            status: "SUCCESS",
            statusCode: 200,
            message: "Welcome To Home Page",
        });

    }
}

module.exports = new HomeController();