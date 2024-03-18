const request = require('supertest');
const app = require('../app.js');

const Director = require('../models/Director.js');
const Genre = require('../models/Genre.js');
const Actor = require('../models/Actor.js');


let id;

//TEST POST (create)
test("POST/movies debe retornar debe retornar status 201", async()=>{
    const body={
        name: "pelicula 1",
        image: "http:/pelicula.1.com",
        synopsis: "bla bla bla",
        releaseYear: 2000
       
    }

    const res= await request(app)
        .post("/movies")
        .send(body)
        id=res.body.id; 
    expect(res.status).toBe(201) //verifica el status
    expect(res.body.id).toBeDefined() //verifica el id si esta definido
    expect(res.body.name).toBe(body.name) //verifica si el nombre del body traido e el mismo que creamos

})

//TEST PUT
test("PUT/movies/:id debe actualizar un actor", async()=>{
    const body = {
       name: "test_update"
    }
   
    const res=await request(app)
       .put(`/movies/${id}`)
       .send(body)
       expect(res.status).toBe(200);
       expect(res.body.name).toBe(body.name);
   })


//TEST GET
test("GET/movies debe retornar status 200", async()=>{
    const res= await request(app)
        .get("/movies")

    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)

})


//TEST RELACIONES MUCHOS A MUCHOS


test("POST /movies/:id/actors debe insertar los actores de una pelicula", async()=>{
    const actor=await Actor.create({
        firstName: "test_name",
        lastName: "test_lastname",
        nationality:  "test_nationality",
        image: "http:/image.com",
        birthday: "2000-01-15"
    }); //creamos un name para el test
    const res=await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]) //se le pasa genre.id porque en eñ body se le envia un numero
    console.log(res.body);
    await actor.destroy()
    expect(res.status).toBe(200); //prueba si llega un status 200
    expect(res.body).toBeInstanceOf(Array); //prueba si es un array
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe("test_name");
})



test("POST /movies/:id/directors debe insertar los directores de una pelicula", async()=>{
    const director=await Director.create({
        firstName: "test_name",
        lastName: "test_lastname",
        nationality:  "test_nationality",
        image: "http:/image.com",
        birthday: "1923-2-15"
    }); //creamos un name para el test
    const res=await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]) //se le pasa genre.id porque en el body se le envia un numero
    await director.destroy()
    console.log(res.body);
    expect(res.status).toBe(200); //prueba si llega un status 200
    expect(res.body).toBeInstanceOf(Array); //prueba si es un array
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe("test_name");

})


test("POST /movies/:id/genres debe insertar los generos de una pelicula", async()=>{
    const genre=await Genre.create({
       name: "Accion"
    }); //creamos un name para el test
    const res=await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]) //se le pasa genre.id porque en eñ body se le envia un numero
    await genre.destroy()
    console.log(res.body);
    expect(res.status).toBe(200); //prueba si llega un status 200
    expect(res.body).toBeInstanceOf(Array); //prueba si es un array
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Accion");
  

})


//TEST DELETE

test("DELETE/movies/:id debe retornar status 204", async()=>{
    const res=await request(app)
        .delete(`/movies/${id}`)
    expect(res.status).toBe(204);
})