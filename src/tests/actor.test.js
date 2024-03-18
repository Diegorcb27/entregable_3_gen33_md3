const request = require('supertest');
const app = require('../app.js');



let id;




//TEST POST (create)
test("POST/actors debe retornar debe retornar status 201", async()=>{
    const body={
        firstName: "test_name",
        lastName: "test_lastname",
        nationality:  "test_nationality",
        image: "http:/image.com",
        birthday: "2000-1-15"
    }

    const res= await request(app)
        .post("/actors")
        .send(body)
        id=res.body.id; 
    expect(res.status).toBe(201) //verifica el status
    expect(res.body.id).toBeDefined() //verifica el id si esta definido
    expect(res.body.name).toBe(body.name) //verifica si el nombre del body traido e el mismo que creamos

})

//TEST PUT
test("PUT/actors/:id debe actualizar un actor", async()=>{
    const body = {
       firstName: "test_update"
    }
   
    const res=await request(app)
       .put(`/actors/${id}`)
       .send(body)
       expect(res.status).toBe(200);
       expect(res.body.name).toBe(body.name);
   })


//TEST GET
test("GET/actors debe retornar status 200", async()=>{
    const res= await request(app)
        .get("/actors")

    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)

})


//TEST DELETE

test("DELETE/actors/:id debe retornar status 204", async()=>{
    const res=await request(app)
        .delete(`/actors/${id}`)
    expect(res.status).toBe(204);
})
