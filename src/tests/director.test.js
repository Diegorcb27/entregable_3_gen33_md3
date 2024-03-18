const request = require('supertest');
const app = require('../app.js');

let id;

//TEST POST (create)
test("POST/directors debe retornar debe retornar status 201", async()=>{
    const body={
        firstName: "test_name",
        lastName:  "test_lastname",
        nationality: "test_natio",
        image: "http:/image.com",
        birthday: "2005-4-12"
    }

    const res= await request(app)
        .post("/directors")
        .send(body)
        id=res.body.id; 
    expect(res.status).toBe(201) //verifica el status
    expect(res.body.id).toBeDefined() //verifica el id si esta definido
    expect(res.body.name).toBe(body.name) //verifica si el nombre del body traido e el mismo que creamos

})

//TEST PUT
test("PUT/directors/:id debe actualizar un actor", async()=>{
    const body = {
       firstName: "test_update"
    }
   
    const res=await request(app)
       .put(`/directors/${id}`)
       .send(body)
       expect(res.status).toBe(200);
       expect(res.body.name).toBe(body.name);
   })


//TEST GET
test("GET/directors debe retornar status 200", async()=>{
    const res= await request(app)
        .get("/directors")

    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)

})


//TEST DELETE

test("DELETE/directors/:id debe retornar status 204", async()=>{
    const res=await request(app)
        .delete(`/directors/${id}`)
    expect(res.status).toBe(204);
})
