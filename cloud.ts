interface ICloud {
    getRecursoAsync(url: string): Promise<IRecurso | undefined>;
}


interface IDescargador{
    descargarRecurso(url: string): Promise<IRecurso>
}
class Descargador implements IDescargador {
        static descargarRecurso(url: string): Promise<IRecurso> {
        return new Promise(function (resolve, reject) {
            // Get file name from url.
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function () {                              
                resolve(new injector.IRecurso(xhr.response));
                return;
            };
            xhr.onerror = reject;
            xhr.open("GET", url);
            xhr.send();
        });
    }
}

class cloudInjector{
    public static IDescargador = Descargador
}



class Cloud implements ICloud {
	private recursos: Record<string, IRecurso> = {};
	public async getRecursoAsync(url: string) {
		return new Promise<IRecurso>(async (resolve, reject) => {
			var recurso = this.recursos.src;
			if (!recurso) {
				recurso = await cloudInjector.IDescargador.descargarRecurso(url);
			}
			if (recurso) {
				resolve(recurso);
				return;
			}
			reject("Recurso no encontrado");
		});
	}


	
}
