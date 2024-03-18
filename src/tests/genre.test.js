const request = require('supertest');
const app = require('../app.js');

let id;

//TEST POST (create)
test("POST/genres debe retornar debe retornar status 201", async()=>{
    const body={
        name: "test_name",
       
    }

    const res= await request(app)
        .post("/genres")
        .send(body)
        id=res.body.id; 
    expect(res.status).toBe(201) //verifica el status
    expect(res.body.id).toBeDefined() //verifica el id si esta definido
    expect(res.body.name).toBe(body.name) //verifica si el nombre del body traido e el mismo que creamos

})

//TEST PUT
test("PUT/genres/:id debe actualizar un actor", async()=>{
    const body = {
       name: "test_update"
    }
   
    const res=await request(app)
       .put(`/genres/${id}`)
       .send(body)
       expect(res.status).toBe(200);
       expect(res.body.name).toBe(body.name);
   })


//TEST GET
test("GET/genres debe retornar status 200", async()=>{
    const res= await request(app)
        .get("/genres")

    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)

})


//TEST DELETE

test("DELETE/genres/:id debe retornar status 204", async()=>{
    const res=await request(app)
        .delete(`/genres/${id}`)
    expect(res.status).toBe(204);
})


