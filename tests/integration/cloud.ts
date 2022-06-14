import { injector } from "../../src/injector";

describe('Tests de cloud', () => {
    const cloud = new injector.ICloud()
    
    test('Descargar archivo erroneo', async ()=>{
        expect(await cloud.getRecursoAsync("web Erronea")).toBe(null);
        expect(await cloud.getRecursoAsync("https://es.wikipedia.org/wiki/Anas_platyrhynchos_domesticus")).toBe(null);    
    })
    test('Descargar archivo correcto',async ()=>{
        const src = "web correcta" //TODO Que funcione
        const recurso = await cloud.getRecursoAsync(src)
        expect(typeof recurso).toBe("IRecurso");    
        // expect(recurso.propiedad noseque).toBe(algo que sepamos que tiene que tener)
        
    })
});
describe('Tests del descargador', ()=>{

})