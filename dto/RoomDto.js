class RoomDto {
    constructor(camera, temperatura, umiditatea, nivelGaz, usa, foc, aer, apa, plante) {
      this.camera = camera;
      this.temperatura = temperatura;
      this.umiditatea = umiditatea;
      this.nivelGaz = nivelGaz;
      this.usa = usa;
      this.foc = foc;
      this.aer = aer;   
      this.apa = apa;
      this.plante = plante;
    }
  }
  
  module.exports = RoomDto;
