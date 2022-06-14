import { injector } from "./injector";
import { IRecurso } from "./recurso";

export interface ICloud {
    getRecursoAsync(url: string): Promise<IRecurso | null>;
}


interface IDescargador{
    descargarRecurso(url: string): Promise<IRecurso | null>
}
type responseMode =  "arraybuffer" | "document" | "blob" | "json" | "text"
export class Descargador implements IDescargador {
    constructor(){}
        private descargar<T>(url: string, type: responseMode): Promise<T | null>{
            return new Promise(function (resolve) {
                // Get file name from url.
                var xhr = new XMLHttpRequest();
                xhr.responseType = "blob"
                xhr.onload = function () {                              
                    resolve(xhr.response);
                    return;
                };
                xhr.onerror = ()=>resolve(null);
                xhr.open("GET", url);
                xhr.send();
            })
        }
        async descargarRecurso(url: string): Promise<IRecurso | null> {
        const response = await this.descargar<Blob>(url, "blob")
        return new injector.IRecurso(response)
    }
}

class cloudInjector{
    public static IDescargador = Descargador
}



export class Cloud implements ICloud {
    private descargador = new cloudInjector.IDescargador()
	private recursos: Record<string, IRecurso> = {};
	public async getRecursoAsync(url: string) {
		return new Promise<IRecurso | null>(async (resolve) => {
			var recurso = this.recursos.src;
			if (!recurso) {
				recurso = await this.descargador.descargarRecurso(url);
			}
			if (recurso) {
				resolve(recurso);
				return;
			}
			resolve(null);
		});
	}


	
}
