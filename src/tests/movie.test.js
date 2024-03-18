const request = require('supertest');
const app = require('../app.js');

const Director = require('../models/Director.js');
const Genre = require('../models/Genre.js');
const Actor = require('../models/Actor.js');


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


//TEST RELACIONES MUCHOS A MUCHOS


// test("POST /movies/:id/actors debe insertar los actores de una pelicula", async()=>{
//     const actor=await Actor.create({
//         firstName: "test_name",
//         lastName: "test_lastname",
//         nationality:  "test_nationality",
//         image: "http:/image.com",
//         birthday: 2000-1-15
//     }); //creamos un name para el test
//     const res=await request(app)
//         .post(`/movies/${id}/actors`)
//         .send([actor.id]) //se le pasa genre.id porque en eñ body se le envia un numero
//     console.log(res.body);
//     await actor.destroy()
//     expect(res.status).toBe(200); //prueba si llega un status 200
//     expect(res.body).toBeInstanceOf(Array); //prueba si es un array
//     expect(res.body.length).toBe(1);
//     // expect(res.body[0].firstName).toBe("test_name");
//})

test('POST /movies/:id/actors must insert the values of actors in movie by their id', async () => {
    const actor = await Actor.create({
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "Estadounidense",
        image: "url",
        birthday: "1974-11-11"
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])
    await actor.destroy()
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe("Leonardo");
});

// test("POST /movies/:id/directors debe insertar los directores de una pelicula", async()=>{
//     const director=await Director.create({
//         firstName: "test_name",
//         lastName: "test_lastname",
//         nationality:  "test_nationality",
//         image: "http:/image.com",
//         birthday: "1923-2-15"
//     }); //creamos un name para el test
//     const res=await request(app)
//         .post(`/movies/${id}/directors`)
//         .send([director.id]) //se le pasa genre.id porque en el body se le envia un numero
//     await director.destroy()
//     console.log(res.body);
//     expect(res.status).toBe(200); //prueba si llega un status 200
//     expect(res.body).toBeInstanceOf(Array); //prueba si es un array
//     expect(res.body.length).toBe(1);
//     expect(res.body[0].firstName).toBe("test_name");

//})


// test("POST /movies/:id/genres debe insertar los generos de una pelicula", async()=>{
//     const genre=await Genre.create({
//        name: "Accion"
//     }); //creamos un name para el test
//     const res=await request(app)
//         .post(`/movies/${id}/genres`)
//         .send([genre.id]) //se le pasa genre.id porque en eñ body se le envia un numero
//     await genre.destroy()
//     console.log(res.body);
//     expect(res.status).toBe(200); //prueba si llega un status 200
//     expect(res.body).toBeInstanceOf(Array); //prueba si es un array
//     expect(res.body.length).toBe(1);
//     expect(res.body[0].name).toBe("Acción");
  

//})


//TEST DELETE

test("DELETE/genres/:id debe retornar status 204", async()=>{
    const res=await request(app)
        .delete(`/genres/${id}`)
    expect(res.status).toBe(204);
})