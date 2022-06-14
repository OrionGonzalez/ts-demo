describe('Tests de cloud', () => {
    const cloud = new injector.ICloud()
    test('Descargar archivo erroneo', async ()=>{
        expect(await cloud.getRecursoAsync("web Erronea")).toBe(undefined);
        expect(await cloud.getRecursoAsync("https://es.wikipedia.org/wiki/Anas_platyrhynchos_domesticus")).toBe(undefined);    
    })
    test('Descargar archivo correcto',async ()=>{
        const src = "web correcta" //TODO Que funcione
        const recurso = await cloud.getRecursoAsync("web correcta")
        expect(typeof recurso).toBe("IRecurso");    
        // expect(recurso.propiedad noseque).toBe(algo que sepamos que tiene que tener)
        
    })
});