

class Usuarios {
    constructor(){
        this.personas = [];
    }

    // metodos
    agregarPersona(id, nombre, sala){ // 262.
        let persona = {
            id,
            nombre,
            sala
        };

        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id){
        let persona = this.personas.filter(persona => {
            return persona.id === id;   // triple igual es una comparacion
        })[0];
        return persona;
    }

    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala(sala){
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id){
        let personaBorrada = this.getPersona(id);
        // guardar arreglo de todas las personas a excepcion de la que coincide con el id de la persona a borrar
        this.personas = this.personas.filter(persona => {
            return persona.id != id;
        });
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}