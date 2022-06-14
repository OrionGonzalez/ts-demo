interface ICloud {
	getRecursoAsync(url: string): Promise<IRecurso | undefined>;
}
interface IRecurso {
    // ...
}
class Recurso implements IRecurso{
    constructor(blob: Blob) {
        // Convertir a recurso etc
        blob
    }
}


class Cloud implements ICloud {
	private recursos: Record<string, IRecurso> = {};
	public async getRecursoAsync(url: string) {
		return new Promise<IRecurso>(async (resolve, reject) => {
			var recurso = this.recursos.src;
			if (!recurso) {
				recurso = await this.descargarRecurso(url);
			}
			if (recurso) {
				resolve(recurso);
				return;
			}
			reject("Recurso no encontrado");
		});
	}


	private descargarRecurso(url: string): Promise<IRecurso> {
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
