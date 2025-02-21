module.exports =   
   { 
    users:{
        table:'users',
        fields:{
            id:'id',
            full_name:'full_name',
            user_name:'user_name',
            email:'email',
            password:'password',
            role:{
                name:'role',
                admin:'admin',
                user:'user',
            },
        }
    },
   }
