let query = `
   query GetUser($id:String){
       getUser(id:$id){
           name
           age
           gender
       }
   }
`

let variables ={
    id:"1"
}

fetch("http://localhost:4000/graphql",{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
    body:JSON.stringify({
        query:query,
        variables:variables
    })
}).then(res=>res.json()).then(e=>console.log(e))